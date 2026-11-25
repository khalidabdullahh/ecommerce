"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Order, NewOrderInput } from "@/types";
import { initialProducts } from "@/data/initialProducts";
import { api } from "@/lib/api";

interface StoreContextType {
  products: Product[];
  productsLoading: boolean;
  productsError: string;
  reloadProducts: () => void;

  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  placeOrder: (input: NewOrderInput) => Promise<Order>;

  // Modals & Navigation States
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;

  // Filter & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isImageSearchOpen: boolean;
  setIsImageSearchOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [productsReloadKey, setProductsReloadKey] = useState(0);

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("easybuy_cart");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("easybuy_wishlist");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse wishlist", e);
        }
      }
    }
    return [];
  });

  // Modal UI States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Save to LocalStorage
  // Load the catalogue from the D1-backed API (dev without the API falls back to the seed data).
  useEffect(() => {
    let cancelled = false;
    setProductsLoading(true);
    setProductsError("");
    api<{ products: Product[] }>("/api/products")
      .then((r) => {
        if (!cancelled) setProducts(r.products);
      })
      .catch((e) => {
        if (cancelled) return;
        if (process.env.NODE_ENV !== "production") setProducts(initialProducts);
        else setProductsError(e instanceof Error ? e.message : "প্রোডাক্ট লোড করা যায়নি");
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productsReloadKey]);

  // Old demo data lived in localStorage; orders/products are now server-side.
  useEffect(() => {
    try {
      localStorage.removeItem("easybuy_products");
      localStorage.removeItem("easybuy_orders");
    } catch {
      /* ignore */
    }
  }, []);

  // Keep cart prices in sync with the live catalogue and drop items that no longer exist.
  useEffect(() => {
    if (!products.length) return;
    setCart((prev) => {
      const next = prev
        .filter((i) => products.some((p) => p.id === i.productId && p.inStock))
        .map((i) => {
          const p = products.find((x) => x.id === i.productId)!;
          return p.price === i.price ? i : { ...i, price: p.price };
        });
      return next.length === prev.length && next.every((n, idx) => n === prev[idx]) ? prev : next;
    });
  }, [products]);

  useEffect(() => {
    localStorage.setItem("easybuy_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("easybuy_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Functions
  const addToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const chosenSize = size || (product.sizes.length > 0 ? product.sizes[0] : "Standard");
    const chosenColor = color || (product.colors.length > 0 ? product.colors[0].name : "Default");
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          size: chosenSize,
          color: chosenColor,
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = async (input: NewOrderInput): Promise<Order> => {
    const { order } = await api<{ order: Order }>("/api/orders", { body: input });
    clearCart();
    setLastCompletedOrder(order);
    setIsOrderSuccessOpen(true);
    return order;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        reloadProducts: () => setProductsReloadKey((k) => k + 1),
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isImageSearchOpen,
        setIsImageSearchOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
