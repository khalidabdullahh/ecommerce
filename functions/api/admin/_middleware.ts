import { Env, json } from "../../_lib/http";
import { isAdmin } from "../../_lib/auth";

const PUBLIC = new Set(["/api/admin/login", "/api/admin/logout"]);

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { pathname } = new URL(ctx.request.url);
  if (PUBLIC.has(pathname)) return ctx.next();
  if (!(await isAdmin(ctx.request, ctx.env))) return json({ error: "লগইন প্রয়োজন" }, 401);
  return ctx.next();
};
