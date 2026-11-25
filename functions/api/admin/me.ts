import { Env, json } from "../../_lib/http";

// The admin middleware already rejected non-admins with 401.
export const onRequestGet: PagesFunction<Env> = async () => json({ ok: true });
