"use client";

import React from "react";
import { Star, Heart, Flame, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setQuickViewProduct, toggleWishlist, isInWishlist, addToCart } = useStore();
  const wishlisted = isInWishlist(product.id);

  const calculateDiscount = () => {
    if (!product.originalPrice || product.originalPrice <= product.price) return null;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return `${discount}% OFF`;
  };

  const discountBadge = calculateDiscount();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        {/* Main image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountBadge && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {discountBadge}
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
            wishlisted
              ? "bg-red-500 text-white"
              : "bg-white/80 hover:bg-white text-gray-700 hover:text-red-500"
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Stock Status if Out of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md">
              স্টক আউট (Stock Out)
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Original Price (Matches EasyBuy BD ৳ layout) */}
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-base sm:text-lg font-black text-orange-600">
              ৳{product.price.toLocaleString("en-BD")}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ৳{product.originalPrice.toLocaleString("en-BD")}
              </span>
            )}
          </div>

          {/* Sold Count & Rating (Direct EasyBuy reference style) */}
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1.5">
            <div className="flex items-center gap-0.5 text-orange-600 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{product.soldCount}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-orange-600 cursor-pointer transition-colors leading-snug mb-2"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Action Button (Matches Zarposh "SELECT OPTIONS" red CTA) */}
        <div className="pt-2 border-t border-gray-50 flex gap-1.5">
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2 px-2 rounded-xl transition-all active:scale-95 text-center shadow-xs uppercase tracking-wide"
          >
            Select Options
          </button>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="bg-orange-50 hover:bg-orange-100 text-orange-600 p-2 rounded-xl transition-colors shrink-0"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
