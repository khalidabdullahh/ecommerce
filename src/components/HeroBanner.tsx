"use client";

import React from "react";
import { Sparkles, Truck, ShieldCheck, Clock } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="mb-4 sm:mb-6">
      {/* Main Promo Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-zinc-900 to-stone-900 text-white p-5 sm:p-8 shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs px-2.5 py-1 rounded-full font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>নতুন শীতকালীন কালেকশন ২০২৬</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2">
            অরিজিনাল প্রিমিয়াম উইন্টার জ্যাকেট ও ট্রেন্ডি ফ্যাশন
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 mb-4 line-clamp-2">
            Zarposh ও Black Race এর কোয়ালিটি প্রোডাক্ট এখন সরাসরি আপনার দোরগোড়ায়। পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা।
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-full shadow-lg transition-transform active:scale-95"
            >
              কালেকশন দেখুন
            </a>
            <span className="text-xs text-orange-300 font-medium">
              ⚡ ২-৩ দিনে সারাদেশে ক্যাশ অন ডেলিভারি
            </span>
          </div>
        </div>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-3 gap-2 mt-2.5 text-center">
        <div className="bg-white border border-gray-100 rounded-xl p-2 sm:p-3 flex items-center justify-center gap-1.5 sm:gap-2 shadow-2xs">
          <Truck className="w-4 h-4 text-orange-500 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-gray-700">ক্যাশ অন ডেলিভারি</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-2 sm:p-3 flex items-center justify-center gap-1.5 sm:gap-2 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-gray-700">১০০% আসল প্রডাক্ট</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-2 sm:p-3 flex items-center justify-center gap-1.5 sm:gap-2 shadow-2xs">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-gray-700">৭ দিনে ইজি রিটার্ন</span>
        </div>
      </div>
    </section>
  );
};
