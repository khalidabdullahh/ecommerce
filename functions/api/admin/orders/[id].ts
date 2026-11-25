import { Env, HttpError, isObject, json, readJson } from "../../../_lib/http";

const ORDER_STATUS = ["Pending", "Confirmed", "In Courier", "Delivered", "Cancelled"];
const PAYMENT_STATUS = ["Pending", "Paid"];
const COURIERS = ["Steadfast", "Pathao", "RedX"];

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  const id = String(params.id);
  const body = await readJson(request, 2_000);
  if (!isObject(body)) throw new HttpError(400, "অবৈধ অনুরোধ");

  const sets: string[] = [];
  const vals: unknown[] = [];
  if (body.orderStatus !== undefined) {
    if (!ORDER_STATUS.includes(body.orderStatus as string)) throw new HttpError(400, "অবৈধ স্ট্যাটাস");
    sets.push("order_status = ?"); vals.push(body.orderStatus);
  }
  if (body.paymentStatus !== undefined) {
    if (!PAYMENT_STATUS.includes(body.paymentStatus as string)) throw new HttpError(400, "অবৈধ পেমেন্ট স্ট্যাটাস");
    sets.push("payment_status = ?"); vals.push(body.paymentStatus);
  }
  if (body.courierName !== undefined) {
    if (body.courierName !== null && !COURIERS.includes(body.courierName as string)) throw new HttpError(400, "অবৈধ কুরিয়ার");
    sets.push("courier_name = ?"); vals.push(body.courierName);
  }
  if (body.courierTrackingCode !== undefined) {
    const code = body.courierTrackingCode === null ? null : String(body.courierTrackingCode).trim().slice(0, 60);
    sets.push("courier_tracking_code = ?"); vals.push(code || null);
  }
  if (!sets.length) throw new HttpError(400, "কিছু পরিবর্তন করা হয়নি");

  sets.push("updated_at = ?"); vals.push(new Date().toISOString());
  const res = await env.DB.prepare(`UPDATE orders SET ${sets.join(", ")} WHERE id = ?`).bind(...vals, id).run();
  if (!res.meta.changes) throw new HttpError(404, "অর্ডার পাওয়া যায়নি");
  return json({ ok: true });
};
