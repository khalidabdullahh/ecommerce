"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/context/StoreContext";
import { api, ApiError } from "@/lib/api";
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Truck,
  Trash2,
  CheckCircle,
  Clock,
  ArrowLeft,
  UploadCloud,
  X,
  LogOut,
  RefreshCw,
  Lock
} from "lucide-react";
import { Order, OrderStatus, Product } from "@/types";

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { products, reloadProducts } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Any 401 means the 8-hour session expired -> back to the login screen.
  const guard = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T> => {
      try {
        return await fn();
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) onLogout();
        throw e;
      }
    },
    [onLogout]
  );

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const r = await guard(() => api<{ orders: Order[] }>("/api/admin/orders"));
      setOrders(r.orders);
    } catch {
      /* shown as empty list; 401 handled by guard */
    } finally {
      setOrdersLoading(false);
    }
  }, [guard]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const patchOrder = async (id: string, body: Record<string, unknown>) => {
    try {
      await guard(() => api(`/api/admin/orders/${id}`, { method: "PATCH", body }));
      await loadOrders();
    } catch (e) {
      if (!(e instanceof ApiError && e.status === 401)) alert(e instanceof Error ? e.message : "আপডেট করা যায়নি");
    }
  };
  const updateOrderStatus = (id: string, status: OrderStatus) => patchOrder(id, { orderStatus: status });

  const addProduct = async (product: Omit<Product, "id">) => {
    await guard(() => api("/api/admin/products", { body: product }));
    reloadProducts();
  };
  const updateProduct = async (id: string, patch: Partial<Product>) => {
    try {
      await guard(() => api(`/api/admin/products/${id}`, { method: "PUT", body: patch }));
      reloadProducts();
    } catch (e) {
      alert(e instanceof Error ? e.message : "আপডেট করা যায়নি");
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      await guard(() => api(`/api/admin/products/${id}`, { method: "DELETE" }));
      reloadProducts();
    } catch (e) {
      alert(e instanceof Error ? e.message : "ডিলিট করা যায়নি");
    }
  };

  const [activeTab, setActiveTab] = useState<"orders" | "products" | "new_product">("orders");

  // New Product Form State
  const [newTitle, setNewTitle] = useState("");
  const [newBanglaTitle, setNewBanglaTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Mens Fashion");
  const [newPrice, setNewPrice] = useState("");
  const [newOrigPrice, setNewOrigPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newSizes, setNewSizes] = useState("M, L, XL");
  const [newDescription, setNewDescription] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("ছবির সাইজ সর্বোচ্চ 10MB হতে পারে");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        // Shrink to <=900px JPEG so it fits in the database comfortably.
        const scale = Math.min(1, 900 / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        let out = canvas.toDataURL("image/jpeg", 0.8);
        if (out.length > 440_000) out = canvas.toDataURL("image/jpeg", 0.6);
        if (out.length > 440_000) {
          alert("ছবিটি অনেক বড়, ছোট ছবি ব্যবহার করুন");
          return;
        }
        setNewImage(out);
      };
      img.onerror = () => alert("ছবিটি পড়া যায়নি");
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  // KPI Calculations
  const totalSales = orders.filter((o) => o.orderStatus !== "Cancelled").reduce((sum, ord) => sum + ord.grandTotal, 0);
  const pendingCount = orders.filter((o) => o.orderStatus === "Pending").length;
  const inCourierCount = orders.filter((o) => o.orderStatus === "In Courier").length;
  const deliveredCount = orders.filter((o) => o.orderStatus === "Delivered").length;

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) {
      alert("প্রোডাক্টের নাম এবং মূল্য অবশ্যই দিতে হবে");
      return;
    }

    const sizesArr = newSizes.split(",").map((s) => s.trim()).filter(Boolean);

    const created = await addProduct({
      title: newTitle,
      banglaTitle: newBanglaTitle || undefined,
      category: newCategory,
      price: parseFloat(newPrice),
      originalPrice: newOrigPrice ? parseFloat(newOrigPrice) : undefined,
      rating: 4.8,
      soldCount: "1 sold",
      images: [
        newImage ||
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80"
      ],
      description: newDescription || "প্রিমিয়াম কোয়ালিটি পণ্য।",
      sizes: sizesArr.length > 0 ? sizesArr : ["Standard"],
      colors: [{ name: "Classic", hex: "#18181b" }],
      inStock: true
    }).then(() => true).catch((err: Error) => {
      alert(err.message);
      return false;
    });
    if (!created) return;

    alert("নতুন পণ্য সফলভাবে যুক্ত করা হয়েছে!");
    setNewTitle("");
    setNewBanglaTitle("");
    setNewPrice("");
    setNewOrigPrice("");
    setNewImage("");
    setNewDescription("");
    setActiveTab("products");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-20 md:pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 bg-white rounded-xl border border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
                <h1 className="text-xl font-extrabold text-gray-900">
                  অ্যাডমিন ড্যাশবোর্ড (Store Management)
                </h1>
              </div>
              <p className="text-xs text-gray-500">
                অর্ডার ম্যানেজমেন্ট, স্টেডফাস্ট/পাঠাও কুরিয়ার বুকিং ও ইনভেন্টরি কন্ট্রোল
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadOrders}
              className="p-2 bg-white rounded-xl border border-gray-200 text-gray-600 hover:text-purple-700"
              title="রিফ্রেশ"
            >
              <RefreshCw className={`w-4 h-4 ${ordersLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={async () => {
                await api("/api/admin/logout", { method: "POST", body: {} }).catch(() => {});
                onLogout();
              }}
              className="p-2 bg-white rounded-xl border border-gray-200 text-gray-600 hover:text-red-600"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                activeTab === "orders"
                  ? "bg-purple-700 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              📦 অর্ডার সমূহ ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                activeTab === "products"
                  ? "bg-purple-700 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              🛍️ প্রোডাক্ট তালিকা ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("new_product")}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                activeTab === "new_product"
                  ? "bg-purple-700 text-white shadow-sm"
                  : "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
              }`}
            >
              + নতুন পণ্য যোগ করুন
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>মোট সেলস (Revenue)</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl font-black text-gray-900">
              ৳{totalSales.toLocaleString("en-BD")}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">লাইভ ট্রানজেকশন ডেটা</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>পেন্ডিং অর্ডার (Pending)</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-black text-amber-600">{pendingCount}</div>
            <span className="text-[10px] text-gray-400">কনফার্মেশন প্রয়োজন</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>কুরিয়ারে হস্তান্তর (In Courier)</span>
              <Truck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xl font-black text-blue-600">{inCourierCount}</div>
            <span className="text-[10px] text-blue-500 font-semibold">Steadfast / Pathao</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>সফল ডেলিভারি (Delivered)</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl font-black text-emerald-600">{deliveredCount}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">পেমেন্ট সম্পন্ন</span>
          </div>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">সাম্প্রতিক অর্ডারসমূহ</h3>
                <p className="text-xs text-gray-500">
                  অর্ডারের স্ট্যাটাস পরিবর্তন করুন ও ১-ক্লিকে কুরিয়ারে বুক করুন
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Package className="w-12 h-12 stroke-1 mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-semibold">এখনো কোনো অর্ডার প্লেস হয়নি</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                    <tr>
                      <th className="p-3.5">অর্ডার নম্বর</th>
                      <th className="p-3.5">গ্রাহক ও মোবাইল</th>
                      <th className="p-3.5">ঠিকানা ও এলাকা</th>
                      <th className="p-3.5">পণ্য ও পরিমাণ</th>
                      <th className="p-3.5">মোট মূল্য</th>
                      <th className="p-3.5">পেমেন্ট</th>
                      <th className="p-3.5">স্ট্যাটাস</th>
                      <th className="p-3.5 text-right">কুরিয়ার এপিআই বুকিং</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="p-3.5 font-black text-gray-900 font-mono">
                          {ord.orderNumber}
                          <div className="text-[10px] font-normal text-gray-400">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <strong className="text-gray-900 block">{ord.customerName}</strong>
                          <span className="text-gray-500 font-mono">{ord.customerPhone}</span>
                        </td>

                        <td className="p-3.5 max-w-xs">
                          <p className="truncate text-gray-700">{ord.deliveryAddress}</p>
                          <span className="text-[10px] font-semibold text-orange-600">
                            {ord.deliveryArea === "inside_dhaka" ? "ঢাকার ভেতরে (৳৭০)" : "ঢাকার বাইরে (৳১৩০)"}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <div className="space-y-1">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="text-gray-800">
                                <span className="font-semibold">{item.title}</span>{" "}
                                <span className="text-gray-500">
                                  ({item.size}, {item.color}) x{item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-3.5 font-black text-gray-900">
                          ৳{ord.grandTotal.toLocaleString("en-BD")}
                        </td>

                        <td className="p-3.5 space-y-1">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            ord.paymentMethod === "bkash"
                              ? "bg-pink-100 text-pink-700"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {ord.paymentMethod === "bkash" ? "bKash" : "Cash on Delivery"}
                          </span>
                          {ord.paymentMethod === "bkash" && (
                            <div className="text-[10px] text-gray-600 font-mono">
                              TrxID: {ord.bkashTrxId}
                              <br />
                              From: {ord.bkashSender}
                            </div>
                          )}
                          <div>
                            <button
                              onClick={() =>
                                patchOrder(ord.id, { paymentStatus: ord.paymentStatus === "Paid" ? "Pending" : "Paid" })
                              }
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                ord.paymentStatus === "Paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                              title="ক্লিক করে পেমেন্ট স্ট্যাটাস বদলান"
                            >
                              {ord.paymentStatus === "Paid" ? "✓ Paid" : "Unpaid (mark paid)"}
                            </button>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="text-xs font-bold rounded-lg border border-gray-200 bg-white px-2 py-1 focus:outline-none focus:border-purple-500"
                          >
                            <option value="Pending">⏳ Pending</option>
                            <option value="Confirmed">👍 Confirmed</option>
                            <option value="In Courier">🚚 In Courier</option>
                            <option value="Delivered">✅ Delivered</option>
                            <option value="Cancelled">❌ Cancelled</option>
                          </select>
                        </td>

                        <td className="p-3.5 text-right">
                          <CourierCell order={ord} onSave={(courierName, code) =>
                            patchOrder(ord.id, { courierName, courierTrackingCode: code, orderStatus: "In Courier" })
                          } />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Products Management */}
        {activeTab === "products" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">প্রোডাক্ট তালিকা ({products.length})</h3>
                <p className="text-xs text-gray-500">ইন-স্টক বা আউট-অব-স্টক টগল করুন অথবা এডিট করুন</p>
              </div>
              <button
                onClick={() => setActiveTab("new_product")}
                className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl"
              >
                + নতুন প্রোডাক্ট
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <tr>
                    <th className="p-3.5">ছবি ও নাম</th>
                    <th className="p-3.5">ক্যাটাগরি</th>
                    <th className="p-3.5">মূল্য (৳)</th>
                    <th className="p-3.5">রেটিং ও সেলস</th>
                    <th className="p-3.5">স্টক স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">একশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-3.5 flex items-center gap-2.5">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-50 shrink-0"
                        />
                        <div>
                          <strong className="text-gray-900 block truncate max-w-xs">{p.title}</strong>
                          {p.banglaTitle && (
                            <span className="text-[10px] text-gray-400 block">{p.banglaTitle}</span>
                          )}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-semibold text-[10px]">
                          {p.category}
                        </span>
                      </td>

                      <td className="p-3.5 font-black text-gray-900">
                        ৳{p.price.toLocaleString("en-BD")}
                      </td>

                      <td className="p-3.5 text-gray-500">
                        ★ {p.rating} ({p.soldCount})
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                            p.inStock
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.inStock ? "ইন স্টক (In Stock)" : "আউট অব স্টক"}
                        </button>
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`আপনি কি "${p.title}" পণ্যটি ডিলিট করতে চান?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: New Product Form */}
        {activeTab === "new_product" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 max-w-2xl mx-auto">
            <h3 className="text-base font-bold text-gray-900 mb-1">নতুন পণ্য যুক্ত করুন</h3>
            <p className="text-xs text-gray-500 mb-6">
              প্রোডাক্টের বিবরণ, ক্যাটাগরি, সাইজ এবং ছবি প্রদান করুন
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">পণ্যের ইংরেজি নাম *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Vintage Winter Corduroy Jacket"
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">পণ্যের বাংলা নাম</label>
                <input
                  type="text"
                  value={newBanglaTitle}
                  onChange={(e) => setNewBanglaTitle(e.target.value)}
                  placeholder="যেমন: ভিন্টেজ উইন্টার কর্ডুরয় জ্যাকেট"
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                  >
                    <option value="Mens Fashion">Mens Fashion</option>
                    <option value="Winter Wear">Winter Wear</option>
                    <option value="Womens Collection">Womens Collection</option>
                    <option value="Formal & Party">Formal & Party</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Gadgets & Accessories">Gadgets & Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="1250"
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">আসল মূল্য / ছাড় পূর্বের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={newOrigPrice}
                    onChange={(e) => setNewOrigPrice(e.target.value)}
                    placeholder="1650"
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">সাইজসমূহ (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    value={newSizes}
                    onChange={(e) => setNewSizes(e.target.value)}
                    placeholder="M, L, XL, XXL"
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Product Image: Manual Upload + Image URL */}
              <div className="space-y-2 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200">
                <label className="block font-bold text-gray-700">পণ্যের ছবি (Product Image) *</label>

                {/* Option 1: Device File Upload */}
                <div>
                  <label className="border-2 border-dashed border-gray-300 hover:border-purple-600 bg-white rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors group">
                    <UploadCloud className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    <span className="font-bold text-gray-700">ডিভাইস থেকে ছবি আপলোড করুন</span>
                    <span className="text-[10px] text-gray-400">(JPG, PNG, WEBP)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-[10px] justify-center my-1">
                  <span className="h-px bg-gray-200 flex-1" />
                  <span>অথবা ছবির লিঙ্ক (URL) দিন</span>
                  <span className="h-px bg-gray-200 flex-1" />
                </div>

                {/* Option 2: Image URL */}
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-600"
                />

                {/* Preview Thumbnail */}
                {newImage && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-purple-200 bg-white shadow-2xs group">
                      <img
                        src={newImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewImage("")}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                        title="ছবি মুছে ফেলুন"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-gray-600">
                      <span className="font-bold text-emerald-600 block">✓ ছবি সিলেক্ট করা হয়েছে</span>
                      <span>ছবি পরিবর্তন করতে নতুন ছবি আপলোড বা লিঙ্ক দিন</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">বিবরণ (Description)</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="ফেব্ৰিক, কোয়ালিটি ও ফিটিং সংক্রান্ত তথ্য..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className="bg-gray-200 text-gray-800 font-bold px-4 py-2.5 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 rounded-xl shadow-md"
                >
                  প্রোডাক্ট সেভ করুন
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

const COURIERS = ["Steadfast", "Pathao", "RedX"] as const;

function CourierCell({ order, onSave }: { order: Order; onSave: (courier: string, code: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [courier, setCourier] = useState<string>(order.courierName || "Steadfast");
  const [code, setCode] = useState(order.courierTrackingCode || "");

  if (order.courierTrackingCode && !editing) {
    return (
      <div className="text-right">
        <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md block">
          {order.courierTrackingCode}
        </span>
        <span className="text-[10px] text-gray-400">{order.courierName}</span>{" "}
        <button onClick={() => setEditing(true)} className="text-[10px] text-purple-700 underline">
          এডিট
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={courier}
        onChange={(e) => setCourier(e.target.value)}
        className="text-[11px] rounded-lg border border-gray-200 bg-white px-1.5 py-1"
      >
        {COURIERS.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="ট্র্যাকিং কোড"
        maxLength={60}
        className="w-32 text-[11px] rounded-lg border border-gray-200 px-2 py-1 font-mono"
      />
      <button
        disabled={!code.trim()}
        onClick={() => {
          onSave(courier, code.trim());
          setEditing(false);
        }}
        className="bg-purple-700 disabled:opacity-40 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg"
      >
        সেভ ও কুরিয়ারে পাঠান
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [state, setState] = useState<"checking" | "out" | "in">("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/api/admin/me")
      .then(() => setState("in"))
      .catch(() => setState("out"));
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/login", { body: { password } });
      setPassword("");
      setState("in");
    } catch (err) {
      setError(err instanceof Error ? err.message : "লগইন করা যায়নি");
    } finally {
      setBusy(false);
    }
  };

  if (state === "checking") {
    return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">লোড হচ্ছে...</div>;
  }
  if (state === "in") return <AdminDashboard onLogout={() => setState("out")} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <form onSubmit={login} className="bg-white w-full max-w-sm rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-extrabold text-gray-900">অ্যাডমিন লগইন</h1>
          <p className="text-xs text-gray-500">K Commerce স্টোর ম্যানেজমেন্ট</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="পাসওয়ার্ড"
          autoFocus
          autoComplete="current-password"
          className="w-full text-sm px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:outline-none bg-gray-50/70"
        />
        {error && <p className="text-xs text-red-600 font-semibold text-center">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="w-full bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-sm py-3 rounded-2xl"
        >
          {busy ? "অপেক্ষা করুন..." : "লগইন"}
        </button>
        <Link href="/" className="block text-center text-xs text-gray-400 hover:text-gray-600">
          ← স্টোরে ফিরে যান
        </Link>
      </form>
    </div>
  );
}
