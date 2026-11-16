export interface Product {
  id: string;
  title: string;
  banglaTitle?: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isFeatured?: boolean;
  isPopular?: boolean;
  inStock: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string; // unique cart line id (productId + size + color)
  productId: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export type PaymentMethod = "cod" | "bkash" | "card";

export type OrderStatus = "Pending" | "Confirmed" | "In Courier" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryArea: "inside_dhaka" | "outside_dhaka";
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "Pending" | "Paid";
  orderStatus: OrderStatus;
  courierName?: "Steadfast" | "Pathao" | "RedX";
  courierTrackingCode?: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  discountValue: number;
  minSpend?: number;
}
