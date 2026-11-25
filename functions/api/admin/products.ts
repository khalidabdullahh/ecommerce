import { Env, json, randomHex, readJson } from "../../_lib/http";
import { ProductRow, toProduct } from "../../_lib/mappers";
import { parseProduct } from "../../_lib/productInput";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson(request, 2_000_000);
  const p = parseProduct(body, true);
  const id = `p_${randomHex(5)}`;
  const now = new Date().toISOString();
  const row = {
    bangla_title: null, original_price: null, rating: 4.8, sold_count: "", description: "", tags: "[]",
    is_featured: 0, is_popular: 0, in_stock: 1, ...p, id, created_at: now, sort_order: Date.now(),
  } as Record<string, unknown>;
  const cols = Object.keys(row);
  await env.DB.prepare(`INSERT INTO products (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`).bind(...cols.map((c) => row[c])).run();
  const saved = await env.DB.prepare("SELECT * FROM products WHERE id = ?").bind(id).first<ProductRow>();
  return json({ product: toProduct(saved!) }, 201);
};
