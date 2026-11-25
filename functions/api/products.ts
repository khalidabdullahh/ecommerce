import { Env, json } from "../_lib/http";
import { ProductRow, toProduct } from "../_lib/mappers";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare("SELECT * FROM products ORDER BY sort_order DESC, created_at DESC").all<ProductRow>();
  return json({ products: results.map(toProduct) }, 200, { "Cache-Control": "public, max-age=15" });
};
