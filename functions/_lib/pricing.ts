import { HttpError, isObject } from "./http";
import { ProductRow } from "./mappers";

export const DELIVERY_FEES = { inside_dhaka: 70, outside_dhaka: 130 } as const;
export type DeliveryArea = keyof typeof DELIVERY_FEES;

export interface LineInput { productId: string; size: string; color: string; quantity: number }

export interface PricedOrder {
  lines: { productId: string; title: string; price: number; size: string; color: string; quantity: number }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode: string | null;
  grandTotal: number;
}

export function normalizePhone(raw: unknown): string {
  let d = String(raw ?? "").replace(/\D/g, "");
  if (d.startsWith("880")) d = d.slice(2);
  if (d.length === 10 && d.startsWith("1")) d = "0" + d;
  if (!/^01[3-9]\d{8}$/.test(d)) throw new HttpError(400, "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)");
  return d;
}

export function parseLines(raw: unknown): LineInput[] {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 30) throw new HttpError(400, "কার্টে কোনো প্রোডাক্ট নেই");
  return raw.map((l) => {
    if (!isObject(l)) throw new HttpError(400, "অবৈধ প্রোডাক্ট তথ্য");
    const quantity = Number(l.quantity);
    if (typeof l.productId !== "string" || typeof l.size !== "string" || typeof l.color !== "string"
      || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new HttpError(400, "অবৈধ প্রোডাক্ট তথ্য");
    }
    return { productId: l.productId, size: l.size, color: l.color, quantity };
  });
}

export function parseArea(raw: unknown): DeliveryArea {
  if (raw !== "inside_dhaka" && raw !== "outside_dhaka") throw new HttpError(400, "ডেলিভারি এলাকা নির্বাচন করুন");
  return raw;
}

/** Server-side source of truth for all money. Never trusts client prices. */
export async function priceOrder(db: D1Database, lines: LineInput[], area: DeliveryArea, couponRaw?: unknown): Promise<PricedOrder> {
  const ids = [...new Set(lines.map((l) => l.productId))];
  const placeholders = ids.map(() => "?").join(",");
  const { results } = await db.prepare(`SELECT * FROM products WHERE id IN (${placeholders})`).bind(...ids).all<ProductRow>();
  const byId = new Map(results.map((p) => [p.id, p]));

  const priced = lines.map((l) => {
    const p = byId.get(l.productId);
    if (!p) throw new HttpError(400, "একটি প্রোডাক্ট আর পাওয়া যাচ্ছে না, কার্ট আপডেট করুন");
    if (!p.in_stock) throw new HttpError(400, `"${p.title}" এখন স্টকে নেই`);
    const sizes: string[] = JSON.parse(p.sizes || "[]");
    const colors: { name: string }[] = JSON.parse(p.colors || "[]");
    if (sizes.length && !sizes.includes(l.size)) throw new HttpError(400, `"${p.title}" এর সাইজ সঠিক নয়`);
    if (colors.length && !colors.some((c) => c.name === l.color)) throw new HttpError(400, `"${p.title}" এর কালার সঠিক নয়`);
    return { productId: p.id, title: p.title, price: p.price, size: l.size, color: l.color, quantity: l.quantity };
  });

  const subtotal = priced.reduce((s, l) => s + l.price * l.quantity, 0);
  const deliveryFee = DELIVERY_FEES[area];

  let discount = 0;
  let couponCode: string | null = null;
  const code = typeof couponRaw === "string" ? couponRaw.trim().toUpperCase() : "";
  if (code) {
    const c = await db.prepare("SELECT * FROM coupons WHERE code = ? AND active = 1").bind(code).first<{ code: string; type: string; value: number; min_spend: number }>();
    if (!c) throw new HttpError(400, "অবৈধ কুপন কোড");
    if (subtotal < c.min_spend) throw new HttpError(400, `এই কুপনের জন্য ন্যূনতম ৳${c.min_spend} কেনাকাটা করতে হবে`);
    if (c.type === "percentage") discount = Math.round((subtotal * c.value) / 100);
    else if (c.type === "fixed") discount = Math.min(c.value, subtotal);
    else if (c.type === "free_shipping") discount = deliveryFee;
    couponCode = c.code;
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);
  return { lines: priced, subtotal, deliveryFee, discount, couponCode, grandTotal };
}
