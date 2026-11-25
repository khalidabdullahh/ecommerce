import { Env, HttpError, json, readJson } from "../../../_lib/http";
import { ProductRow, toProduct } from "../../../_lib/mappers";
import { parseProduct } from "../../../_lib/productInput";

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const id = String(params.id);
  const patch = parseProduct(await readJson(request, 2_000_000), false);
  const cols = Object.keys(patch);
  if (!cols.length) throw new HttpError(400, "কিছু পরিবর্তন করা হয়নি");
  const res = await env.DB.prepare(`UPDATE products SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`)
    .bind(...cols.map((c) => patch[c]), id).run();
  if (!res.meta.changes) throw new HttpError(404, "প্রোডাক্ট পাওয়া যায়নি");
  const saved = await env.DB.prepare("SELECT * FROM products WHERE id = ?").bind(id).first<ProductRow>();
  return json({ product: toProduct(saved!) });
};

export const onRequestDelete: PagesFunction<Env> = async ({ env, params }) => {
  const res = await env.DB.prepare("DELETE FROM products WHERE id = ?").bind(String(params.id)).run();
  if (!res.meta.changes) throw new HttpError(404, "প্রোডাক্ট পাওয়া যায়নি");
  return json({ ok: true });
};
