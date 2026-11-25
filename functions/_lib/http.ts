export interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

export function errorResponse(e: unknown): Response {
  if (e instanceof HttpError) return json({ error: e.message }, e.status);
  console.error("Unhandled API error", e);
  return json({ error: "সার্ভারে সমস্যা হয়েছে, একটু পরে আবার চেষ্টা করুন" }, 500);
}

/** Read a JSON body with a hard size cap. */
export async function readJson<T = unknown>(request: Request, maxBytes = 20_000): Promise<T> {
  const type = request.headers.get("Content-Type") || "";
  if (!type.includes("application/json")) throw new HttpError(415, "Content-Type must be application/json");
  const text = await request.text();
  if (text.length > maxBytes) throw new HttpError(413, "অনুরোধ অনেক বড়");
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new HttpError(400, "অবৈধ JSON");
  }
}

export function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function randomHex(bytes: number): string {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
}
