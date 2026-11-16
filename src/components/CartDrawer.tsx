"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h2 className="font-bold text-gray-900 text-base">আপনার শপিং ব্যাগ ({cartCount})</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <ShoppingBag className="w-16 h-16 stroke-1 text-gray-300 mb-3" />
              <p className="font-semibold text-gray-700 text-sm">আপনার ব্যাগ খালি রয়েছে</p>
              <p className="text-xs text-gray-500 mt-1 mb-4">পছন্দের যেকোনো পণ্য ব্যাগে যোগ করুন</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2.5 px-6 rounded-full"
              >
                কেনাকাটা চালিয়ে যান
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 my-0.5">
                    <span>সাইজ: <strong className="text-gray-800">{item.size}</strong></span>
                    <span>•</span>
                    <span>কালার: <strong className="text-gray-800">{item.color}</strong></span>
                  </div>
                  <div className="text-xs font-black text-orange-600">
                    ৳{item.price.toLocaleString("en-BD")}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-0.5 text-gray-700 hover:bg-gray-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-2 py-0.5 font-bold text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-0.5 text-gray-700 hover:bg-gray-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-gray-800">
              <span>সাবটোটাল (Subtotal):</span>
              <span className="text-base text-orange-600 font-black">
                ৳{cartTotal.toLocaleString("en-BD")}
              </span>
            </div>

            <p className="text-[11px] text-gray-500">
              * ডেলিভারি চার্জ চেকআউট পেইজে হিসাব করা হবে।
            </p>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>চেকআউট করুন (Proceed to Checkout)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
