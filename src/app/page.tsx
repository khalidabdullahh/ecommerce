"use client";

import React, { useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { BKashPaymentModal } from "@/components/BKashPaymentModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { ImageSearchModal } from "@/components/ImageSearchModal";
import { FloatingChat } from "@/components/FloatingChat";
import { useStore } from "@/context/StoreContext";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const categories = [
    "All",
    "Mens Fashion",
    "Winter Wear",
    "Womens Collection",
    "Formal & Party",
    "Home & Kitchen",
    "Gadgets & Accessories"
  ];

  // Filter products based on search & category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.banglaTitle && p.banglaTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const popularProducts = useMemo(() => {
    return products.filter((p) => p.isPopular).slice(0, 4);
  }, [products]);

  const featuredCollections = useMemo(() => {
    return products.filter((p) => p.isFeatured).slice(0, 4);
  }, [products]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-20 md:pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        {/* Banner */}
        <HeroBanner />

        {/* Category Pills (Horizontal Scroll on Mobile) */}
        <section className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchQuery("");
                }}
                className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-2xs ${
                  selectedCategory === cat && !searchQuery
                    ? "bg-slate-900 text-white shadow-sm scale-102"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* If user is searching or filtered category */}
        {searchQuery && (
          <div className="mb-4 bg-orange-50 border border-orange-200 rounded-2xl p-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-orange-950">
              ফলাফল: &ldquo;{searchQuery}&rdquo; ({filteredProducts.length} টি পণ্য পাওয়া গেছে)
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="text-orange-700 hover:text-orange-900 font-bold underline"
            >
              রিসেট
            </button>
          </div>
        )}

        {/* Section 1: Popular Right Now (Matches EasyBuy Reference 5) */}
        {!searchQuery && selectedCategory === "All" && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-5 bg-orange-600 rounded-full" />
                <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                  Popular right now
                </h2>
              </div>
              <button
                onClick={() => setSelectedCategory("Mens Fashion")}
                className="text-xs font-bold text-gray-600 hover:text-orange-600 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Our Collections (Matches Zarposh Reference 2) */}
        {!searchQuery && selectedCategory === "All" && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-5 bg-red-700 rounded-full" />
                <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                  Our Collections
                </h2>
              </div>
              <button
                onClick={() => setSelectedCategory("Winter Wear")}
                className="bg-red-700 hover:bg-red-800 text-white text-[11px] font-bold px-3 py-1 rounded-md"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
              {featuredCollections.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Main Feed: All Products (2-Column Mobile Layout) */}
        <section id="products" className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-5 bg-blue-900 rounded-full" />
              <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                {selectedCategory === "All" ? "সকল পণ্য (All Products)" : selectedCategory}
              </h2>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {filteredProducts.length} টি প্রোডাক্ট
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-2xs">
              <p className="text-sm font-bold text-gray-700 mb-2">কোনো পণ্য পাওয়া যায়নি</p>
              <p className="text-xs text-gray-400 mb-4">অন্য কোনো কিওয়ার্ড বা ক্যাটাগরি দিয়ে চেষ্টা করুন</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-orange-600 text-white text-xs font-bold py-2 px-5 rounded-full"
              >
                সকল পণ্য দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Customer Care (Zarposh Match) */}
      <FloatingChat />

      {/* Mobile Bottom Navigation (EasyBuy Match) */}
      <BottomNav />

      {/* Modals & Slide-overs */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <BKashPaymentModal />
      <OrderSuccessModal />
      <ImageSearchModal />
    </div>
  );
}
