"use client";

import React, { useState } from "react";
import { X, CreditCard, Banknote, ShieldCheck, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PaymentMethod } from "@/types";
import { initialCoupons } from "@/data/initialProducts";
import confetti from "canvas-confetti";

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartTotal,
    createOrder,
    setIsBKashOpen
  } = useStore();

  const [paymentOption, setPaymentOption] = useState<PaymentMethod>("cod");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isCheckoutOpen) return null;

  const deliveryFee = deliveryArea === "inside_dhaka" ? 70 : 130;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, cartTotal + deliveryFee - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const cleanCode = couponCode.trim().toUpperCase();

    if (!cleanCode) return;

    if (initialCoupons[cleanCode]) {
      let discount = 0;
      if (cleanCode === "EASY10") {
        discount = Math.round(cartTotal * 0.1);
      } else if (cleanCode === "WELCOME50") {
        discount = 50;
      } else if (cleanCode === "FREEDEL") {
        discount = deliveryFee;
      }
      setAppliedCoupon({ code: cleanCode, discount });
      setCouponCode("");
    } else {
      setCouponError("অবৈধ কুপন কোড! ট্রাই করুন: EASY10 বা WELCOME50");
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!customerName.trim()) {
      errors.name = "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন";
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, "").length < 11) {
      errors.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)";
    }
    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      errors.address = "সম্পূর্ণ ডেলিভারি ঠিকানা প্রদান করুন (বাসা/রোড/থানা)";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      alert("আপনার কার্টে কোনো প্রোডাক্ট নেই!");
      return;
    }

    if (!validateForm()) return;

    const orderPayload = {
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryArea,
      deliveryFee,
      items: [...cart],
      subtotal: cartTotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      grandTotal,
      paymentMethod: paymentOption,
      paymentStatus: paymentOption === "cod" ? ("Pending" as const) : ("Paid" as const),
      orderStatus: "Pending" as const
    };

    if (paymentOption === "bkash") {
      // Store in window for simulated bkash completion
      (window as any).__pendingOrderPayload = orderPayload;
      setIsCheckoutOpen(false);
      setIsBKashOpen(true);
      return;
    }

    // Direct COD Order
    createOrder(orderPayload);
    setIsCheckoutOpen(false);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if unavailable
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <h2 className="font-extrabold text-base tracking-tight">চেকআউট ও অর্ডার কনফার্মেশন</h2>
            <p className="text-[11px] text-gray-300">১-পেজ দ্রুত ক্যাশ অন ডেলিভারি অর্ডার</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* 1. Payment Options (Direct Black Race UI Match) */}
          <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-900 text-white rounded-lg">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">Payment Options</h3>
                <p className="text-[11px] text-gray-500">How would you like to pay?</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Cash on delivery */}
              <label
                onClick={() => setPaymentOption("cod")}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentOption === "cod"
                    ? "bg-white border-blue-600 ring-2 ring-blue-100 shadow-xs"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentOption === "cod" ? "border-blue-600 bg-blue-600" : "border-gray-300"
                  }`}>
                    {paymentOption === "cod" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs sm:text-sm font-bold text-gray-800">Cash on delivery</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-black text-gray-900">
                  ৳{grandTotal.toLocaleString("en-BD")}
                </span>
              </label>

              {/* Pay total amount (bKash / Online) */}
              <label
                onClick={() => setPaymentOption("bkash")}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentOption === "bkash"
                    ? "bg-white border-pink-600 ring-2 ring-pink-100 shadow-xs"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentOption === "bkash" ? "border-pink-600 bg-pink-600" : "border-gray-300"
                  }`}>
                    {paymentOption === "bkash" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-pink-600 text-white px-1.5 py-0.5 rounded">
                      bKash
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-800">Pay total amount (Online MFS)</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-black text-gray-900">
                  ৳{grandTotal.toLocaleString("en-BD")}
                </span>
              </label>
            </div>
          </div>

          {/* 2. Items In Your Bag (Black Race Match) */}
          <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-2xs">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              🛍️ {cart.length} Item{cart.length > 1 ? "s" : ""} In Your Bag
            </h3>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">{item.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded font-bold text-gray-700">{item.size}</span>
                      <span>{item.color}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-gray-900">
                      ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                    </div>
                    <div className="text-[10px] text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Delivery Details Form */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              📍 ডেলিভারি তথ্য (Delivery Details)
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                আপনার নাম *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="যেমন: মোঃ সাকিব হাসান"
                className={`w-full text-xs p-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                  formErrors.name ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-gray-200 focus:border-orange-500"
                }`}
              />
              {formErrors.name && (
                <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                মোবাইল নম্বর (১১ ডিজিট) *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className={`w-full text-xs p-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                  formErrors.phone ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-gray-200 focus:border-orange-500"
                }`}
              />
              {formErrors.phone && (
                <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/জেলা) *
              </label>
              <textarea
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="যেমন: বাসা #৪৫, রোড #১০, সেক্টর #১১, উত্তরা, ঢাকা"
                className={`w-full text-xs p-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                  formErrors.address ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-gray-200 focus:border-orange-500"
                }`}
              />
              {formErrors.address && (
                <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.address}
                </p>
              )}
            </div>

            {/* Delivery Area Switcher */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1.5">
                ডেলিভারি জোন নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryArea("inside_dhaka")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    deliveryArea === "inside_dhaka"
                      ? "border-orange-600 bg-orange-50/80 text-orange-950 ring-2 ring-orange-200 font-bold"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-xs">ঢাকার ভেতরে</div>
                  <div className="text-[11px] font-black text-orange-600">৳৭০ (২ দিন)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryArea("outside_dhaka")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    deliveryArea === "outside_dhaka"
                      ? "border-orange-600 bg-orange-50/80 text-orange-950 ring-2 ring-orange-200 font-bold"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-xs">ঢাকার বাইরে</div>
                  <div className="text-[11px] font-black text-orange-600">৳১৩০ (৩-৪ দিন)</div>
                </button>
              </div>
            </div>
          </div>

          {/* 4. Order Summary (Direct Black Race Match) */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 space-y-2.5">
            <h4 className="text-xs font-black text-gray-900 tracking-wider uppercase">ORDER SUMMARY</h4>

            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">Tk.{cartTotal.toLocaleString("en-BD")}</span>
            </div>

            {/* Coupon Accordion */}
            <div className="py-1">
              {!appliedCoupon ? (
                <div>
                  {!showCouponInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCouponInput(true)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>+ Add coupon</span>
                    </button>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="কুপন লিখুন (e.g. EASY10)"
                        className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 focus:outline-none uppercase font-bold"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[10px] text-red-500 mt-1">{couponError}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>কুপন ({appliedCoupon.code}) প্রযোগ হয়েছে</span>
                  </div>
                  <span>-Tk.{appliedCoupon.discount}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-xs text-gray-600">
              <span>Delivery Charge</span>
              <span className="font-semibold text-emerald-600">Tk.{deliveryFee}</span>
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-900">Grand Total</span>
              <span className="text-lg font-black text-gray-900">Tk.{grandTotal.toLocaleString("en-BD")}</span>
            </div>
          </div>
        </div>

        {/* Sticky Submit Button */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={handleConfirmOrder}
            className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 hover:from-orange-700 hover:to-red-700 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>
              {paymentOption === "cod"
                ? "অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)"
                : "বিকাশে পেমেন্ট করে অর্ডার কনফার্ম করুন"}
            </span>
          </button>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            🔒 ১০০% নিরাপদ চেকআউট • অর্ডার প্লেস করার পর আমাদের প্রতিনিধি কল করবেন
          </p>
        </div>
      </div>
    </div>
  );
};
