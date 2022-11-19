import { status } from "itty-router-extras";
import filter from "./filter";
import { getURLConfig } from "./util";
import { sendWebhook } from "./webhook";
export interface Env { }

export default {
  async fetch(
    req: Request,
    _env: Env,
    _ctx: ExecutionContext
  ): Promise<Response | [Response, Record<string, string>]> {
    const url = new URL(req.url);

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
    const urlConfig = getURLConfig(url.searchParams);
    const data = await req.text();
    const json = JSON.parse(data);

    // do the thing
    const filterReason = await filter(req.headers, json, urlConfig);
    if (filterReason !== null) {
      console.log(filterReason);
      return new Response(
        `Ignored by webhook filter (reason: ${filterReason})`,
        { status: 203 }
      );
    }

    return await sendWebhook(id, token, req.headers, data);
  },
};
