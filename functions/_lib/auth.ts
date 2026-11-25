import { Env, HttpError } from "./http";

export const COOKIE_NAME = "kc_admin";
const SESSION_MS = 8 * 60 * 60 * 1000; // 8 hours
const enc = new TextEncoder();

function hex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(secret: string, msg: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function assertConfigured(env: Env): { password: string; secret: string } {
  const password = env.ADMIN_PASSWORD;
  const secret = env.SESSION_SECRET;
  if (!password || password.length < 8 || !secret || secret.length < 16) {
    throw new HttpError(500, "অ্যাডমিন সেটআপ সম্পূর্ণ নয় (ADMIN_PASSWORD / SESSION_SECRET)");
  }
  return { password, secret };
}

export async function passwordMatches(input: string, env: Env): Promise<boolean> {
  const { password } = assertConfigured(env);
  // Compare digests so length differences don't leak.
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(input)),
    crypto.subtle.digest("SHA-256", enc.encode(password)),
  ]);
  return safeEqual(hex(a), hex(b));
}

export async function createSessionCookie(env: Env, secure: boolean): Promise<string> {
  const { secret } = assertConfigured(env);
  const exp = String(Date.now() + SESSION_MS);
  const token = `${exp}.${await hmac(secret, exp)}`;
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_MS / 1000}${secure ? "; Secure" : ""}`;
}

export function clearSessionCookie(secure: boolean): string {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secure ? "; Secure" : ""}`;
}

export async function isAdmin(request: Request, env: Env): Promise<boolean> {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 16) return false;
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.split(/;\s*/).find((c) => c.startsWith(COOKIE_NAME + "="));
  if (!match) return false;
  const token = match.slice(COOKIE_NAME.length + 1);
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(env.SESSION_SECRET, exp));
}
