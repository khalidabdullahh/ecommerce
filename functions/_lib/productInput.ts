import { HttpError, isObject } from "./http";

const IMG_DATA = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

function str(v: unknown, min: number, max: number, msg: string): string {
  const s = typeof v === "string" ? v.trim() : "";
  if (s.length < min || s.length > max) throw new HttpError(400, msg);
  return s;
}
function money(v: unknown, msg: string): number {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0 || n > 10_000_000) throw new HttpError(400, msg);
  return Math.round(n);
}
function strList(v: unknown, maxItems: number, maxLen: number, msg: string): string[] {
  if (!Array.isArray(v) || v.length > maxItems) throw new HttpError(400, msg);
  return v.map((x) => str(x, 1, maxLen, msg));
}

export interface ProductPatch { [column: string]: unknown }

/** Returns DB column -> value for the provided fields. `full` requires all mandatory fields. */
export function parseProduct(body: unknown, full: boolean): ProductPatch {
  if (!isObject(body)) throw new HttpError(400, "অবৈধ অনুরোধ");
  const out: ProductPatch = {};
  const has = (k: string) => body[k] !== undefined;

  if (full || has("title")) out.title = str(body.title, 1, 200, "প্রোডাক্টের নাম দিন");
  if (has("banglaTitle")) out.bangla_title = body.banglaTitle ? str(body.banglaTitle, 1, 200, "বাংলা নাম সঠিক নয়") : null;
  if (full || has("category")) out.category = str(body.category, 1, 60, "ক্যাটাগরি দিন");
  if (full || has("price")) out.price = money(body.price, "সঠিক মূল্য দিন");
  if (has("originalPrice")) out.original_price = body.originalPrice ? money(body.originalPrice, "সঠিক আসল মূল্য দিন") : null;
  if (has("rating")) {
    const r = Number(body.rating);
    if (!Number.isFinite(r) || r < 0 || r > 5) throw new HttpError(400, "রেটিং ০-৫ এর মধ্যে হবে");
    out.rating = r;
  }
  if (has("soldCount")) out.sold_count = str(body.soldCount, 0, 40, "সোল্ড কাউন্ট সঠিক নয়");
  if (full || has("images")) {
    if (!Array.isArray(body.images) || body.images.length < 1 || body.images.length > 6) throw new HttpError(400, "১-৬টি ছবি দিন");
    out.images = JSON.stringify(body.images.map((u) => {
      if (typeof u !== "string" || u.length > 450_000) throw new HttpError(400, "ছবি অনেক বড়");
      if (!(u.startsWith("https://") || IMG_DATA.test(u))) throw new HttpError(400, "ছবির লিংক https:// হতে হবে অথবা আপলোড করা ছবি দিন");
      return u;
    }));
  }
  if (has("description")) out.description = str(body.description, 0, 5000, "বিবরণ অনেক বড়");
  if (full || has("sizes")) out.sizes = JSON.stringify(strList(body.sizes, 20, 20, "সাইজ তালিকা সঠিক নয়"));
  if (full || has("colors")) {
    if (!Array.isArray(body.colors) || body.colors.length > 20) throw new HttpError(400, "কালার তালিকা সঠিক নয়");
    out.colors = JSON.stringify(body.colors.map((c) => {
      if (!isObject(c) || typeof c.name !== "string" || !c.name.trim() || c.name.length > 40 || typeof c.hex !== "string" || !/^#[0-9a-fA-F]{6}$/.test(c.hex)) {
        throw new HttpError(400, "কালার সঠিক নয়");
      }
      return { name: c.name.trim(), hex: c.hex };
    }));
  }
  if (has("tags")) out.tags = JSON.stringify(strList(body.tags, 20, 30, "ট্যাগ সঠিক নয়"));
  if (has("isFeatured")) out.is_featured = body.isFeatured ? 1 : 0;
  if (has("isPopular")) out.is_popular = body.isPopular ? 1 : 0;
  if (has("inStock")) out.in_stock = body.inStock ? 1 : 0;
  return out;
}
