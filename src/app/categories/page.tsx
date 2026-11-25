"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Grid } from "lucide-react";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { ImageSearchModal } from "@/components/ImageSearchModal";

export default function CategoriesPage() {
  const router = useRouter();
  const { setSelectedCategory, setSearchQuery } = useStore();

  const categoryList = [
    {
      name: "Mens Fashion",
      bangla: "মেনস ফ্যাশন ও শার্ট",
      color: "bg-blue-50 text-blue-600",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80",
      items: "২৫+ আইটেম"
    },
    {
      name: "Winter Wear",
      bangla: "শীতকালীন হুডি ও জ্যাকেট",
      color: "bg-cyan-50 text-cyan-600",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=80",
      items: "১৫+ আইটেম"
    },
    {
      name: "Formal & Party",
      bangla: "প্রিমিয়াম ব্লেজার ও স্যুট",
      color: "bg-amber-50 text-amber-600",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80",
      items: "১০+ আইটেম"
    },
    {
      name: "Womens Collection",
      bangla: "উইমেনস টপ ও কার্ডিগান",
      color: "bg-rose-50 text-rose-600",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=80",
      items: "১৮+ আইটেম"
    },
    {
      name: "Home & Kitchen",
      bangla: "কিচেন ও হোম অ্যাপ্লায়েন্সেস",
      color: "bg-emerald-50 text-emerald-600",
      image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=80",
      items: "৩০+ আইটেম"
    },
    {
      name: "Gadgets & Accessories",
      bangla: "ঘড়ি ও ইলেকট্রনিক গ্যাজেটস",
      color: "bg-purple-50 text-purple-600",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=80",
      items: "৪০+ আইটেম"
    }
  ];

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery("");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-20 md:pb-12">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Grid className="w-5 h-5 text-orange-600" />
          <h1 className="text-xl font-extrabold text-gray-900">
            ক্যাটাগরি সমূহ (All Categories)
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {categoryList.map((cat, i) => {
            return (
              <div
                key={i}
                onClick={() => handleSelect(cat.name)}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 rounded-xl object-cover bg-gray-50 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500">{cat.bangla}</p>
                    <span className="text-[10px] font-semibold text-orange-600 mt-0.5 inline-block">
                      {cat.items}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-orange-50 text-gray-400 group-hover:text-orange-600 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <ImageSearchModal />
    </div>
  );
}
