export async function sendWebhook(
    id: string,
    token: string,
    headers: Headers,
    body: string
): Promise<[Response, Record<string, string>]> {
    const url = `https://discord.com/api/webhooks/${id}/${token}/github?wait=1`;

    let res: Response;
    do {
        const req = new Request(url, {
            method: "POST",
            headers: headers,
            body: body,
        });

        res = await fetch(req);

        // return response if everything's fine
        if (res.status !== 429) break;
    } while (true);

    // set metadata
    const meta: Record<string, string> = {};

    return [res, meta];
}
