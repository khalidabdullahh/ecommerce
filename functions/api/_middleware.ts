import { Env, HttpError, errorResponse } from "../_lib/http";

// Runs for every /api/* request: CSRF origin check, JSON errors, no-store by default.
export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request } = ctx;
  try {
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
      const origin = request.headers.get("Origin");
      if (origin && new URL(origin).host !== new URL(request.url).host) throw new HttpError(403, "Forbidden");
    }
    const res = await ctx.next();
    const out = new Response(res.body, res);
    if (!out.headers.has("Cache-Control")) out.headers.set("Cache-Control", "no-store");
    out.headers.set("X-Content-Type-Options", "nosniff");
    return out;
  } catch (e) {
    return errorResponse(e);
  }
};
