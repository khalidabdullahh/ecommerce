"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastCompletedOrder } = useStore();

  if (!isOrderSuccessOpen || !lastCompletedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 mb-1">
          অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          ধন্যবাদ! আপনার অর্ডারটি প্লেস করা হয়েছে। আমাদের কাস্টমার সাপোর্ট থেকে শীঘ্রই কল করে অর্ডারটি নিশ্চিত করা হবে।
        </p>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-100 mb-5 space-y-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200/80">
            <span className="text-gray-500">অর্ডার নম্বর:</span>
            <span className="font-black text-orange-600 text-sm tracking-wide">
              {lastCompletedOrder.orderNumber}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">গ্রাহকের নাম:</span>
            <span className="font-semibold text-gray-800">{lastCompletedOrder.customerName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">মোবাইল নম্বর:</span>
            <span className="font-semibold text-gray-800">{lastCompletedOrder.customerPhone}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">পেমেন্ট মেথড:</span>
            <span className="font-bold text-gray-800">
              {lastCompletedOrder.paymentMethod === "cod" ? "Cash on Delivery" : "bKash (Paid)"}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200/80 text-sm">
            <span className="font-bold text-gray-700">সর্বমোট প্রদেয়:</span>
            <span className="font-black text-gray-900">
              ৳{lastCompletedOrder.grandTotal.toLocaleString("en-BD")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-orange-700 bg-orange-50 p-2.5 rounded-xl border border-orange-100 mb-5 font-semibold">
          <Truck className="w-4 h-4 text-orange-600 shrink-0" />
          <span>
            আনুমানিক ডেলিভারি: {lastCompletedOrder.deliveryArea === "inside_dhaka" ? "২-৩ দিন (ঢাকার ভেতরে)" : "৩-৫ দিন (ঢাকার বাইরে)"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/track"
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full bg-slate-900 hover:bg-black text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>অর্ডার ট্র্যাক করুন (Track Order)</span>
          </Link>

          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
          >
            আরো কেনাকাটা করুন
          </button>
        </div>
      </div>
    </div>
  );
};
