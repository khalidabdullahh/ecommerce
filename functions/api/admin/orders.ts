import { Env, json } from "../../_lib/http";
import { ItemRow, OrderRow, toOrder } from "../../_lib/mappers";

const LIMIT = 300;

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results: orders } = await env.DB.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT ?").bind(LIMIT).all<OrderRow>();
  const { results: items } = await env.DB.prepare(
    `SELECT oi.*, p.images FROM order_items oi
       JOIN (SELECT id FROM orders ORDER BY created_at DESC LIMIT ?) o ON o.id = oi.order_id
       LEFT JOIN products p ON p.id = oi.product_id`
  ).bind(LIMIT).all<ItemRow>();

  const byOrder = new Map<string, ItemRow[]>();
  for (const i of items) {
    const list = byOrder.get(i.order_id) ?? [];
    list.push(i);
    byOrder.set(i.order_id, list);
  }
  return json({ orders: orders.map((o) => toOrder(o, byOrder.get(o.id) ?? [])) });
};
