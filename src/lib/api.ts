export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/** Small fetch wrapper: JSON in/out, same-origin cookies, Bengali error messages from the server. */
export async function api<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: init.method ?? (init.body !== undefined ? "POST" : "GET"),
      headers: init.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
      credentials: "same-origin",
    });
  } catch {
    throw new ApiError("ইন্টারনেট সংযোগ সমস্যা, আবার চেষ্টা করুন", 0);
  }
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error || "কিছু ভুল হয়েছে, আবার চেষ্টা করুন";
    throw new ApiError(msg, res.status);
  }
  return data as T;
}
