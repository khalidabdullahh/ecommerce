"use client";

import React from "react";
import Link from "next/link";
import { Search, Camera, ShoppingBag, Heart, Truck, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setIsImageSearchOpen
  } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span>🔥 উইন্টার মেগা অফার! সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা</span>
        <span className="hidden sm:inline">| হেল্পলাইন: 01700-000000</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
            <div className="bg-orange-500 group-hover:bg-orange-600 text-white p-1.5 rounded-xl flex items-center justify-center shadow-md transition-all">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-orange-600">easy</span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-900">BUY</span>
                <span className="text-[10px] font-bold text-gray-400 ml-1">.bd</span>
              </div>
            </div>
          </Link>

          {/* Search Bar - App like with Camera Icon (Direct EasyBuy Match) */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, jackets..."
                className="w-full bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-gray-800 text-sm pl-4 pr-20 py-2 sm:py-2.5 rounded-full border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                {/* Image Search Button (Reference Feature!) */}
                <button
                  type="button"
                  onClick={() => setIsImageSearchOpen(true)}
                  title="Search by Image"
                  className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
                >
                  <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
                <button
                  type="button"
                  className="bg-blue-950 hover:bg-blue-900 text-white p-1.5 rounded-full transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/track"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-orange-600 transition-colors py-1 px-2.5 rounded-lg hover:bg-gray-50"
            >
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Track Order</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors py-1.5 px-3 rounded-lg border border-purple-200"
            >
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Admin Panel</span>
            </Link>

            <Link
              href="/wishlist"
              className="relative p-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs font-bold py-2 px-3.5 rounded-full shadow-sm hover:shadow transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>কার্ট</span>
              {cartCount > 0 && (
                <span className="bg-white text-orange-600 text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-800 hover:text-orange-600"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
