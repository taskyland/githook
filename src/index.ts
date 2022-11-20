import { status, text } from "itty-router-extras";
import filter from "#lib/filter";
import { getConfig } from "#lib/util";
import { sendWebhook } from "#lib/webhook";
export interface Env { }

export default {
  async fetch(
    req: Request,
    _env: Env,
    _ctx: ExecutionContext
  ): Promise<Response | [Response, Record<string, string>]> {
    const url = new URL(req.url);
    // redirect to repo if `GET /`
    if (req.method === "GET" && url.pathname === "/") {
      return text("Hello!");
    }
    // everything else should be a POST
    if (req.method !== "POST") {
      return status(405);
    }

    // split url into parts
    const [, id, token] = url.pathname.split("/");
    if (!id || !token) {
      return status(400);
    }
    // extract data
    const urlConfig = getConfig(url.searchParams);
    const data = await req.text();
    const json = JSON.parse(data);

    // magic
    const filterReason = await filter(req.headers, json, urlConfig);
    if (filterReason !== null) {
      const res = `Ignored by webhook filter (reason: ${filterReason})`;
      console.log(res);
      return new Response(res, { status: 203 });
    }

    return await sendWebhook(id, token, req.headers, data);
  },
};
