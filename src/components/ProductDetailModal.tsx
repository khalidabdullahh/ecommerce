"use client";

import React, { useState, useEffect } from "react";
import { X, Star, Flame, ShoppingBag, Zap, Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setIsCheckoutOpen,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.images[0]);
      setSelectedSize(quickViewProduct.sizes[0] || "Standard");
      setSelectedColor(quickViewProduct.colors[0]?.name || "Default");
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const wishlisted = isInWishlist(quickViewProduct.id);

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Left: Images */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={selectedImage || quickViewProduct.images[0]}
                alt={quickViewProduct.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md ${
                  wishlisted ? "bg-red-500 text-white" : "bg-white/90 text-gray-700 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Thumbnail selector */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 ${
                      selectedImage === img ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Options */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span className="bg-orange-50 text-orange-700 font-semibold px-2 py-0.5 rounded-md">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{quickViewProduct.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-orange-600 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{quickViewProduct.soldCount}</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-1">
                {quickViewProduct.title}
              </h2>

              {quickViewProduct.banglaTitle && (
                <p className="text-xs text-gray-500 mb-3">
                  {quickViewProduct.banglaTitle}
                </p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4 bg-orange-50/70 p-3 rounded-2xl border border-orange-100">
                <span className="text-2xl font-black text-orange-600">
                  ৳{quickViewProduct.price.toLocaleString("en-BD")}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ৳{quickViewProduct.originalPrice.toLocaleString("en-BD")}
                  </span>
                )}
                <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  ইন স্টক
                </span>
              </div>

              {/* Size Selector */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
                    <span>সাইজ সিলেক্ট করুন (Size):</span>
                    <span className="text-orange-600 font-bold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                          selectedSize === size
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
                    <span>রং নির্বাচন করুন (Color):</span>
                    <span className="text-orange-600 font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                          selectedColor === c.name
                            ? "border-orange-500 bg-orange-50/80 text-orange-900 font-bold ring-2 ring-orange-200"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-4">
                <span className="text-xs font-semibold text-gray-700">পরিমাণ (Quantity):</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 pt-2">
              {/* Buy Now (Direct to Black Race style fast checkout) */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-extrabold text-sm py-3 px-4 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ব্যাগে যোগ করুন (Add to Bag)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
