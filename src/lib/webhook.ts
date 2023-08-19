export async function sendWebhook(
  id: string,
  token: string,
  headers: Headers,
  data: Record<string, any>
): Promise<Response> {
  const url = `https://discord.com/api/webhooks/${id}/${token}/github?wait=1`;
  const body = JSON.stringify(data);
  const req = new Request(url, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const res = await fetch(req);

  return res;
}
