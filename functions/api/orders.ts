import { Env, HttpError, isObject, json, randomHex, readJson } from "../_lib/http";
import { ItemRow, OrderRow, toOrder } from "../_lib/mappers";
import { normalizePhone, parseArea, parseLines, priceOrder } from "../_lib/pricing";

function text(v: unknown, min: number, max: number, msg: string): string {
  const s = typeof v === "string" ? v.trim() : "";
  if (s.length < min || s.length > max) throw new HttpError(400, msg);
  return s;
}

function newOrderNumber(): string {
  const n = new Uint32Array(1);
  crypto.getRandomValues(n);
  return `BD-${100000 + (n[0] % 900000)}`;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson(request);
  if (!isObject(body)) throw new HttpError(400, "অবৈধ অনুরোধ");
  const db = env.DB;

  const customerName = text(body.customerName, 2, 80, "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন");
  const customerPhone = normalizePhone(body.customerPhone);
  const deliveryAddress = text(body.deliveryAddress, 8, 300, "সম্পূর্ণ ডেলিভারি ঠিকানা প্রদান করুন (বাসা/রোড/থানা)");
  const area = parseArea(body.deliveryArea);
  const lines = parseLines(body.items);

  const paymentMethod = body.paymentMethod;
  if (paymentMethod !== "cod" && paymentMethod !== "bkash") throw new HttpError(400, "পেমেন্ট মাধ্যম নির্বাচন করুন");

  let trx: string | null = null;
  let sender: string | null = null;
  if (paymentMethod === "bkash") {
    trx = text(body.bkashTrxId, 6, 14, "বিকাশ TrxID দিন").toUpperCase();
    if (!/^[A-Z0-9]+$/.test(trx)) throw new HttpError(400, "বিকাশ TrxID সঠিক নয়");
    sender = normalizePhone(body.bkashSender);
    const dup = await db.prepare("SELECT 1 FROM orders WHERE bkash_trx_id = ?").bind(trx).first();
    if (dup) throw new HttpError(400, "এই TrxID আগেই ব্যবহার করা হয়েছে");
  }

  // Basic spam guard: max 3 orders per phone per 10 minutes.
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const recent = await db.prepare("SELECT COUNT(*) AS c FROM orders WHERE customer_phone = ? AND created_at > ?")
    .bind(customerPhone, since).first<{ c: number }>();
  if ((recent?.c ?? 0) >= 3) throw new HttpError(429, "অনেক বেশি অর্ডার, কিছুক্ষণ পরে চেষ্টা করুন");

  const priced = await priceOrder(db, lines, area, body.couponCode);
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  for (let attempt = 0; attempt < 5; attempt++) {
    const orderNumber = newOrderNumber();
    try {
      await db.batch([
        db.prepare(`INSERT INTO orders (id, order_number, customer_name, customer_phone, delivery_address, delivery_area,
            delivery_fee, subtotal, discount, coupon_code, grand_total, payment_method, payment_status, bkash_trx_id,
            bkash_sender, order_status, created_at, updated_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?, 'Pending', ?,?, 'Pending', ?, ?)`)
          .bind(id, orderNumber, customerName, customerPhone, deliveryAddress, area, priced.deliveryFee, priced.subtotal,
            priced.discount, priced.couponCode, priced.grandTotal, paymentMethod, trx, sender, now, now),
        ...priced.lines.map((l) =>
          db.prepare("INSERT INTO order_items (order_id, product_id, title, price, size, color, quantity) VALUES (?,?,?,?,?,?,?)")
            .bind(id, l.productId, l.title, l.price, l.size, l.color, l.quantity)),
      ]);

      const row: OrderRow = {
        id, order_number: orderNumber, customer_name: customerName, customer_phone: customerPhone,
        delivery_address: deliveryAddress, delivery_area: area, delivery_fee: priced.deliveryFee,
        subtotal: priced.subtotal, discount: priced.discount, coupon_code: priced.couponCode,
        grand_total: priced.grandTotal, payment_method: paymentMethod, payment_status: "Pending",
        bkash_trx_id: trx, bkash_sender: sender, order_status: "Pending", courier_name: null,
        courier_tracking_code: null, created_at: now,
      };
      const items: ItemRow[] = priced.lines.map((l) => ({ order_id: id, product_id: l.productId, title: l.title, price: l.price, size: l.size, color: l.color, quantity: l.quantity }));
      return json({ order: toOrder(row, items) }, 201);
    } catch (e) {
      if (!(e instanceof Error && /UNIQUE/i.test(e.message))) throw e;
      // order-number collision (or duplicate TrxID race): retry with a new number
      if (trx) {
        const dup = await db.prepare("SELECT 1 FROM orders WHERE bkash_trx_id = ?").bind(trx).first();
        if (dup) throw new HttpError(400, "এই TrxID আগেই ব্যবহার করা হয়েছে");
      }
    }
  }
  throw new HttpError(500, "অর্ডার তৈরি করা যায়নি, আবার চেষ্টা করুন");
};
