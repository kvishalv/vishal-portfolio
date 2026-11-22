// Markdown for agents: a request for "/" that accepts text/markdown gets index.md;
// browsers keep getting index.html. Cloudflare's built-in "Markdown for Agents"
// switch needs a paid plan, so this covers the home page on the free plan.
// ponytail: one page only; keep index.md in step with index.html by hand.
export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/functions/")) {
    return new Response("Not found", { status: 404 }); // function source, not a page
  }
  if (url.pathname === "/" && (request.headers.get("Accept") || "").includes("text/markdown")) {
    const md = await env.ASSETS.fetch(new Request(new URL("/index.md", url)));
    return new Response(md.body, {
      status: md.status,
      headers: { "Content-Type": "text/markdown; charset=utf-8", "Vary": "Accept" },
    });
  }
  return next();
}
