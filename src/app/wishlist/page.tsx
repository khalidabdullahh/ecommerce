"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/context/StoreContext";
import { Heart, ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { BKashPaymentModal } from "@/components/BKashPaymentModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { ImageSearchModal } from "@/components/ImageSearchModal";

export default function WishlistPage() {
  const { wishlist, products } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-20 md:pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-orange-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমপেজে ফিরে যান</span>
        </Link>

        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-red-100 text-red-600 rounded-xl">
            <Heart className="w-5 h-5 fill-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              আপনার পছন্দের তালিকা (Wishlist)
            </h1>
            <p className="text-xs text-gray-500">
              {wishlistedProducts.length} টি পছন্দের পণ্য সংরক্ষিত রয়েছে
            </p>
          </div>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-2xs max-w-md mx-auto">
            <Heart className="w-16 h-16 stroke-1 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              পছন্দের তালিকা এখনো খালি
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              যেকোনো প্রডাক্টের হার্ট আইকনে ক্লিক করে তালিকায় যুক্ত করুন
            </p>
            <Link
              href="/"
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2.5 px-6 rounded-full inline-block shadow-sm"
            >
              প্রোডাক্ট দেখুন
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <BKashPaymentModal />
      <OrderSuccessModal />
      <ImageSearchModal />
    </div>
  );
}
