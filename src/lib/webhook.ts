export async function sendWebhook(
  id: string,
  token: string,
  headers: Headers,
  body: string
): Promise<Response> {
  const url = `https://discord.com/api/webhooks/${id}/${token}/github?wait=1`;

  const req = new Request(url, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const res = await fetch(req);

  return res;
}
