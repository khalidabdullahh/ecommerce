"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingBag, Heart, Package, User } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useStore();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Categories", href: "/categories", icon: Grid },
    {
      label: "Cart",
      icon: ShoppingBag,
      isAction: true,
      onClick: () => setIsCartOpen(true),
      badge: cartCount
    },
    { label: "Wishlist", href: "/wishlist", icon: Heart, badge: wishlist.length },
    { label: "Track", href: "/track", icon: Package },
    { label: "Account", href: "/admin", icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] safe-area-pb">
      <div className="grid grid-cols-6 items-center h-14">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;

          if (item.isAction) {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="relative flex flex-col items-center justify-center h-full text-gray-600 hover:text-orange-600 transition-colors"
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={index}
              href={item.href || "/"}
              className={`relative flex flex-col items-center justify-center h-full transition-colors ${
                isActive ? "text-orange-600 font-bold" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-orange-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
