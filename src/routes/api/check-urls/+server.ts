import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, fetch }) => {
    const reqText: string = await request.text();
    const urls: string[] = reqText.split("\n").map((v) => v.trim());

    const invalid: [string, string][] = [];
    const promises: Promise<void>[] = urls.map((url) => new Promise((r) => {
        fetch(url).catch((e: Error) => {
            invalid.push([url, `${e.message}: ${e.cause}`]);
        }).then((res) => {
            if (res && !res.ok) invalid.push([url, `${res.status}: ${res.statusText}`]);
            r();
        });
    }));

    await Promise.all(promises);

    return json(invalid);
}