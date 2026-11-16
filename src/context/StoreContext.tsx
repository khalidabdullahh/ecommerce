"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Order, OrderStatus } from "@/types";
import { initialProducts } from "@/data/initialProducts";

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

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

  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "orderNumber" | "createdAt">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignCourier: (orderId: string, courierName: "Steadfast" | "Pathao" | "RedX") => void;

  // Modals & Navigation States
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isBKashOpen: boolean;
  setIsBKashOpen: (open: boolean) => void;
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
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("easybuy_products");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved products", e);
        }
      }
    }
    return initialProducts;
  });

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

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("easybuy_orders");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse orders", e);
        }
      }
    }
    // Pre-seed with a realistic test order for demo
    return [
      {
        id: "ord_101",
        orderNumber: "BD-90214",
        customerName: "Md. Tanvir Ahmed",
        customerPhone: "01712345678",
        deliveryAddress: "House 24, Road 7, Dhanmondi, Dhaka",
        deliveryArea: "inside_dhaka",
        deliveryFee: 70,
        items: [
          {
            id: "p1-L-Denim Blue",
            productId: "p1",
            title: "Autumn and Winter fleece-lined Denim Jacket",
            price: 1273,
            image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
            size: "L",
            color: "Denim Blue",
            quantity: 1
          }
        ],
        subtotal: 1273,
        discount: 0,
        grandTotal: 1343,
        paymentMethod: "cod",
        paymentStatus: "Pending",
        orderStatus: "In Courier",
        courierName: "Steadfast",
        courierTrackingCode: "STDF-9938210",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  });

  // Modal UI States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBKashOpen, setIsBKashOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("easybuy_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("easybuy_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("easybuy_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("easybuy_orders", JSON.stringify(orders));
  }, [orders]);

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

  // Orders Functions
  const createOrder = (orderData: Omit<Order, "id" | "orderNumber" | "createdAt">): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber: `BD-${randomNum}`,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setLastCompletedOrder(newOrder);
    setIsOrderSuccessOpen(true);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
  };

  const assignCourier = (orderId: string, courierName: "Steadfast" | "Pathao" | "RedX") => {
    const trackingCode = `${courierName.substring(0, 4).toUpperCase()}-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId
          ? {
              ...ord,
              courierName,
              courierTrackingCode: trackingCode,
              orderStatus: "In Courier"
            }
          : ord
      )
    );
  };

  // Product Admin Functions
  const addProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: `p_${Date.now()}`
    };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
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
        orders,
        createOrder,
        updateOrderStatus,
        assignCourier,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBKashOpen,
        setIsBKashOpen,
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
