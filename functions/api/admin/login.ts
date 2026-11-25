import { Env, HttpError, isObject, json, readJson } from "../../_lib/http";
import { assertConfigured, createSessionCookie, passwordMatches } from "../../_lib/auth";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  assertConfigured(env);
  const body = await readJson(request, 2_000);
  const password = isObject(body) && typeof body.password === "string" ? body.password : "";

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  await env.DB.prepare("DELETE FROM login_attempts WHERE at < ?").bind(now - WINDOW_MS).run();
  const fails = await env.DB.prepare("SELECT COUNT(*) AS c FROM login_attempts WHERE ip = ?").bind(ip).first<{ c: number }>();
  if ((fails?.c ?? 0) >= MAX_FAILS) throw new HttpError(429, "অনেকবার ভুল চেষ্টা হয়েছে, ১৫ মিনিট পরে আবার চেষ্টা করুন");

  if (!(await passwordMatches(password, env))) {
    await env.DB.prepare("INSERT INTO login_attempts (ip, at) VALUES (?, ?)").bind(ip, now).run();
    throw new HttpError(401, "পাসওয়ার্ড সঠিক নয়");
  }
  await env.DB.prepare("DELETE FROM login_attempts WHERE ip = ?").bind(ip).run();
  const secure = new URL(request.url).protocol === "https:";
  return json({ ok: true }, 200, { "Set-Cookie": await createSessionCookie(env, secure) });
};
