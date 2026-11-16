"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, X, Send } from "lucide-react";

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 z-40 flex flex-col items-end">
      {/* Expanded Popover */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72 text-gray-800 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-900">লাইভ কাস্টমার সাপোর্ট</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            আসসালামু আলাইকুম! সাইজ, অর্ডার বা ডেলিভারি নিয়ে যেকোনো তথ্যের জন্য সরাসরি কথা বলুন।
          </p>

          <div className="space-y-2">
            <a
              href="https://wa.me/8801643526721"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold p-2.5 rounded-xl transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে চ্যাট করুন (WhatsApp)</span>
            </a>

            <a
              href="https://m.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold p-2.5 rounded-xl transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>ফেসবুক মেসেঞ্জার (Messenger)</span>
            </a>

            <a
              href="tel:01643526721"
              className="flex items-center gap-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold p-2.5 rounded-xl transition-all"
            >
              <Phone className="w-4 h-4 text-purple-600" />
              <span>সরাসরি কল করুন (01643-526721)</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Bubble (Direct Zarposh "Contact us" Style) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white px-3.5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-95 group"
        title="Contact Us"
      >
        <span className="text-xs font-bold hidden sm:inline group-hover:inline">Contact us</span>
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </button>
    </div>
  );
};
