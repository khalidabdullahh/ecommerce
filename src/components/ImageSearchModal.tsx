"use client";

import React, { useState } from "react";
import { X, Camera, UploadCloud, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const ImageSearchModal: React.FC = () => {
  const { isImageSearchOpen, setIsImageSearchOpen, setSearchQuery, setSelectedCategory } = useStore();
  const [analyzing, setAnalyzing] = useState(false);

  if (!isImageSearchOpen) return null;

  const sampleSearchQueries = [
    { label: "Winter Denim Jacket", query: "Denim Jacket", category: "Mens Fashion" },
    { label: "Knitted Cardigan", query: "Cardigan", category: "Mens Fashion" },
    { label: "Double Breasted Blazer", query: "Blazer", category: "Formal & Party" },
    { label: "Stainless Steel Cutlery", query: "Cutlery", category: "Home & Kitchen" },
    { label: "Sports Barrel Watch", query: "Watch", category: "Gadgets & Accessories" }
  ];

  const handleSelectSample = (query: string, category: string) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setSearchQuery(query);
      setSelectedCategory(category);
      setIsImageSearchOpen(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsImageSearchOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Camera className="w-6 h-6" />
        </div>

        <h3 className="text-base font-extrabold text-gray-900 mb-1">
          ছবি দিয়ে প্রডাক্ট খুঁজুন (Visual Search)
        </h3>
        <p className="text-xs text-gray-500 mb-5">
          আপনার ডিভাইসের যেকোনো পণ্যের ছবি আপলোড করুন অথবা নিচের স্যাম্পল ফটো দিয়ে টেস্ট করুন
        </p>

        {/* Upload Dropzone */}
        <label className="border-2 border-dashed border-gray-200 hover:border-orange-500 bg-gray-50/80 hover:bg-orange-50/30 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all mb-4 group">
          <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-orange-500 transition-colors mb-2" />
          <span className="text-xs font-bold text-gray-700">ছবি আপলোড করতে ক্লিক করুন</span>
          <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WEBP (Max 5MB)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleSelectSample("Jacket", "Mens Fashion");
              }
            }}
          />
        </label>

        {/* Quick Sample Presets */}
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>অথবা স্যাম্পল ইমেজ দিয়ে ট্রাই করুন:</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {sampleSearchQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                disabled={analyzing}
                onClick={() => handleSelectSample(item.query, item.category)}
                className="text-left p-2.5 rounded-xl border border-gray-100 hover:border-orange-500 hover:bg-orange-50/50 bg-gray-50/60 transition-all text-xs font-medium text-gray-800"
              >
                🔍 {item.label}
              </button>
            ))}
          </div>
        </div>

        {analyzing && (
          <div className="mt-4 p-2 bg-orange-100 text-orange-800 rounded-xl text-xs font-bold animate-pulse">
            ছবি অ্যানালাইসিস করা হচ্ছে...
          </div>
        )}
      </div>
    </div>
  );
};
