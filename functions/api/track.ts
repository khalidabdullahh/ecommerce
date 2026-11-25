import { Env, HttpError, json } from "../_lib/http";
import { ItemRow, OrderRow, toOrder } from "../_lib/mappers";
import { normalizePhone } from "../_lib/pricing";

// Customers need BOTH their order number and the phone used at checkout.
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const orderNumber = (url.searchParams.get("order") || "").trim().toUpperCase();
  if (!/^BD-\d{5,6}$/.test(orderNumber)) throw new HttpError(404, "কোনো অর্ডার পাওয়া যায়নি");
  let phone: string;
  try { phone = normalizePhone(url.searchParams.get("phone")); } catch { throw new HttpError(404, "কোনো অর্ডার পাওয়া যায়নি"); }

  const order = await env.DB.prepare("SELECT * FROM orders WHERE order_number = ? AND customer_phone = ?").bind(orderNumber, phone).first<OrderRow>();
  if (!order) throw new HttpError(404, "কোনো অর্ডার পাওয়া যায়নি");
  const { results } = await env.DB.prepare(
    `SELECT oi.*, p.images FROM order_items oi LEFT JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ?`
  ).bind(order.id).all<ItemRow>();
  return json({ order: toOrder(order, results) });
};
