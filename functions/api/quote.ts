import { Env, HttpError, isObject, json, readJson } from "../_lib/http";
import { parseArea, parseLines, priceOrder } from "../_lib/pricing";

// Price a cart (incl. coupon) so the checkout can show server-verified totals.
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson(request);
  if (!isObject(body)) throw new HttpError(400, "অবৈধ অনুরোধ");
  const priced = await priceOrder(env.DB, parseLines(body.items), parseArea(body.deliveryArea), body.couponCode);
  const { lines, ...totals } = priced;
  return json({ quote: totals });
};
