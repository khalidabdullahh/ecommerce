"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/context/StoreContext";
import { Package, Search, CheckCircle2, Truck, ArrowLeft } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { BKashPaymentModal } from "@/components/BKashPaymentModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { ImageSearchModal } from "@/components/ImageSearchModal";
import { ProductDetailModal } from "@/components/ProductDetailModal";

export default function TrackOrderPage() {
  const { orders } = useStore();
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState(false);

  // Search by orderNumber or phone
  const matchedOrders = orders.filter((o) => {
    if (!searchInput.trim()) return false;
    const cleanSearch = searchInput.trim().toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(cleanSearch) ||
      o.customerPhone.includes(cleanSearch)
    );
  });

  const getStepIndex = (status: string) => {
    switch (status) {
      case "Pending":
        return 1;
      case "Confirmed":
        return 2;
      case "In Courier":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-20 md:pb-12">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-orange-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমপেজে ফিরে যান</span>
        </Link>

        {/* Search Header */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6 text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 mb-1">
            আপনার অর্ডার ট্র্যাক করুন (Track Order)
          </h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto mb-5">
            অর্ডারের বর্তমান অবস্থা ও কুরিয়ার ট্র্যাকিং জানতে অর্ডার নম্বর  অথবা মোবাইল নম্বর প্রদান করুন।
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(true);
            }}
            className="flex items-center max-w-md mx-auto relative"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="অর্ডার নম্বর বা ফোন নম্বর"
              className="w-full text-xs sm:text-sm pl-4 pr-24 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 bg-gray-50/70"
            />
            <button
              type="submit"
              className="absolute right-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>খুঁজুন</span>
            </button>
          </form>

        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-4">
            {matchedOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-100">
                <p className="text-sm font-bold text-gray-700 mb-1">কোনো অর্ডার পাওয়া যায়নি</p>
                <p className="text-xs text-gray-400">
                  সঠিক অর্ডার নম্বর অথবা অর্ডারের সময় ব্যবহৃত মোবাইল নম্বর দিয়ে পুনরায় চেষ্টা করুন।
                </p>
              </div>
            ) : (
              matchedOrders.map((order) => {
                const step = getStepIndex(order.orderStatus);

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm space-y-6"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">অর্ডার নম্বর:</span>
                          <span className="text-base font-black text-gray-900 tracking-wide">
                            {order.orderNumber}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400">
                          তারিখ: {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          order.orderStatus === "Delivered"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.orderStatus === "In Courier"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {order.orderStatus === "In Courier"
                            ? "🚚 কুরিয়ারে আছে"
                            : order.orderStatus === "Delivered"
                            ? "✅ ডেলিভার্ড"
                            : "⏳ প্রসেসিং"}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Visualizer */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">
                        ডেলিভারি ট্র্যাকিং স্ট্যাটাস
                      </h3>

                      <div className="grid grid-cols-4 relative text-center text-xs">
                        {/* Connecting Line */}
                        <div className="absolute top-4 left-1/8 right-1/8 h-1 bg-gray-200 -z-0">
                          <div
                            className="h-full bg-orange-500 transition-all duration-500"
                            style={{
                              width:
                                step === 1
                                  ? "0%"
                                  : step === 2
                                  ? "33%"
                                  : step === 3
                                  ? "66%"
                                  : "100%"
                            }}
                          />
                        </div>

                        {/* Steps */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 ${
                            step >= 1 ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-gray-200 text-gray-500"
                          }`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-gray-800 text-[11px]">অর্ডার রিসিভড</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 ${
                            step >= 2 ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-gray-200 text-gray-500"
                          }`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-gray-800 text-[11px]">কনফার্মড</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 ${
                            step >= 3 ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "bg-gray-200 text-gray-500"
                          }`}>
                            <Truck className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-gray-800 text-[11px]">কুরিয়ারে হস্তান্তর</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 ${
                            step >= 4 ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : "bg-gray-200 text-gray-500"
                          }`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-gray-800 text-[11px]">ডেলিভার্ড</span>
                        </div>
                      </div>
                    </div>

                    {/* Courier Tracking Info if assigned */}
                    {order.courierTrackingCode && (
                      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-600 text-white rounded-xl">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-blue-950">
                              কুরিয়ার পার্টনার: {order.courierName || "Steadfast Courier"}
                            </div>
                            <div className="text-xs text-blue-800 font-mono font-semibold">
                              Consignment ID: {order.courierTrackingCode}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-blue-700 bg-white px-3 py-1 rounded-full shadow-2xs border border-blue-100">
                          লাইভ এপিআই ট্র্যাকিং
                        </span>
                      </div>
                    )}

                    {/* Delivery Address & Customer Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                      <div>
                        <span className="text-gray-500 block">গ্রাহকের নাম ও ফোন:</span>
                        <strong className="text-gray-900">{order.customerName}</strong>
                        <p className="text-gray-600 font-mono">{order.customerPhone}</p>
                      </div>

                      <div>
                        <span className="text-gray-500 block">ডেলিভারি ঠিকানা:</span>
                        <p className="text-gray-800 font-medium">{order.deliveryAddress}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        অর্ডারের পণ্যসমূহ ({order.items.length})
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50">
                            <div className="flex items-center gap-2">
                              <img src={item.image} alt="thumb" className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                              <div>
                                <p className="font-semibold text-gray-900">{item.title}</p>
                                <p className="text-[10px] text-gray-500">সাইজ: {item.size} • কালার: {item.color}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">৳{(item.price * item.quantity).toLocaleString("en-BD")}</span>
                              <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 mt-3 text-xs">
                        <span className="font-semibold text-gray-600">
                          মোট প্রদেয় ({order.paymentMethod === "cod" ? "ক্যাশ অন ডেলিভারি" : "বিকাশে পেইড"}):
                        </span>
                        <span className="text-base font-black text-gray-900">
                          ৳{order.grandTotal.toLocaleString("en-BD")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      <BottomNav />

      {/* Global Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <BKashPaymentModal />
      <OrderSuccessModal />
      <ImageSearchModal />
    </div>
  );
}
