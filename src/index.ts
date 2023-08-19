import filter from "#lib/filter";
import { fixup, getConfig } from "#lib/util";
import { sendWebhook } from "#lib/webhook";
import { View, Html, Status } from "./lib/html";

export default {
  async fetch(req: Request) {
    const url = new URL(req.url);
    // redirect to repo if `GET /`
    if (req.method === "GET" && url.pathname === "/") {
      return new View(Html);
    }
    // everything else should be a POST
    if (req.method !== "POST") {
      return new Status("POSTs only", 405);
    }

    // split url into parts
    const [, id, token] = url.pathname.split("/");
    if (!id || !token) {
      return new Status("Invalid", 400);
    }
    // extract data
    const urlConfig = getConfig(url.searchParams);
    const data = await req.text();
    const json: Record<string, any> = JSON.parse(data);

    // magic
    const filterReason = await filter(req.headers, json, urlConfig);
    if (filterReason !== null) {
      const res = `Ignored by webhook filter | reason: ${filterReason}`;
      console.log(res);
      return new Response(res, { status: 203 });
    }

    let res: Response;
    try {
      fixup(json);
      const webhookResult = await sendWebhook(id, token, req.headers, json);
      if (webhookResult instanceof Response) {
        res = webhookResult;
      } else {
        res = webhookResult;
      }
    } catch (err) {
      res = new Response("Internal Server Error", { status: 500 });
    }

    // clone response to make headers mutable
    res = new Response(res.body, res);

    // remove other headers that don't make sense here
    for (const header of ["set-cookie", "alt-svc"]) {
      res.headers.delete(header);
    }

    return res;
  },
};
