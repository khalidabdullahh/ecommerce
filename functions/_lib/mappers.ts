export interface ProductRow {
  id: string; title: string; bangla_title: string | null; category: string; price: number;
  original_price: number | null; rating: number; sold_count: string; images: string;
  description: string; sizes: string; colors: string; is_featured: number; is_popular: number;
  in_stock: number; tags: string;
}

function parse<T>(s: string, fallback: T): T {
  try { return JSON.parse(s) as T; } catch { return fallback; }
}

export function toProduct(r: ProductRow) {
  return {
    id: r.id,
    title: r.title,
    banglaTitle: r.bangla_title ?? undefined,
    category: r.category,
    price: r.price,
    originalPrice: r.original_price ?? undefined,
    rating: r.rating,
    soldCount: r.sold_count,
    images: parse<string[]>(r.images, []),
    description: r.description,
    sizes: parse<string[]>(r.sizes, []),
    colors: parse<{ name: string; hex: string }[]>(r.colors, []),
    isFeatured: !!r.is_featured,
    isPopular: !!r.is_popular,
    inStock: !!r.in_stock,
    tags: parse<string[]>(r.tags, []),
  };
}

export interface OrderRow {
  id: string; order_number: string; customer_name: string; customer_phone: string;
  delivery_address: string; delivery_area: string; delivery_fee: number; subtotal: number;
  discount: number; coupon_code: string | null; grand_total: number; payment_method: string;
  payment_status: string; bkash_trx_id: string | null; bkash_sender: string | null;
  order_status: string; courier_name: string | null; courier_tracking_code: string | null;
  created_at: string;
}
export interface ItemRow {
  order_id: string; product_id: string; title: string; price: number; size: string;
  color: string; quantity: number; images?: string | null;
}

export function toOrder(r: OrderRow, items: ItemRow[]) {
  return {
    id: r.id,
    orderNumber: r.order_number,
    customerName: r.customer_name,
    customerPhone: r.customer_phone,
    deliveryAddress: r.delivery_address,
    deliveryArea: r.delivery_area,
    deliveryFee: r.delivery_fee,
    items: items.map((i) => ({
      id: `${i.product_id}-${i.size}-${i.color}`,
      productId: i.product_id,
      title: i.title,
      price: i.price,
      image: i.images ? (parse<string[]>(i.images, [])[0] ?? "") : "",
      size: i.size,
      color: i.color,
      quantity: i.quantity,
    })),
    subtotal: r.subtotal,
    discount: r.discount,
    couponCode: r.coupon_code ?? undefined,
    grandTotal: r.grand_total,
    paymentMethod: r.payment_method,
    paymentStatus: r.payment_status,
    bkashTrxId: r.bkash_trx_id ?? undefined,
    bkashSender: r.bkash_sender ?? undefined,
    orderStatus: r.order_status,
    courierName: r.courier_name ?? undefined,
    courierTrackingCode: r.courier_tracking_code ?? undefined,
    createdAt: r.created_at,
  };
}
