import { Env, json } from "../../_lib/http";
import { clearSessionCookie } from "../../_lib/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request }) => {
  const secure = new URL(request.url).protocol === "https:";
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie(secure) });
};
