import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";

const origin = new URL(process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000");
const request = (path) =>
  fetch(new URL(path, origin), { signal: AbortSignal.timeout(10_000) });

let sitemap;
for (let attempt = 0; attempt < 30; attempt++) {
  sitemap = await request("/sitemap.xml").catch(() => undefined);
  if (sitemap?.ok) break;
  await delay(1000);
}
assert(sitemap?.ok, `Sitemap unavailable at ${origin.origin}`);

const routes = new Set(
  [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, url]) => new URL(url).pathname,
  ),
);
for (const route of ["/", "/books", "/voices", "/community", "/contact"]) {
  assert(routes.has(route), `Missing sitemap route: ${route}`);
}
for (const prefix of ["/books/", "/cycles/", "/voices/"]) {
  assert([...routes].some((path) => path.startsWith(prefix)), `Missing detail route: ${prefix}`);
}

for (const route of routes) {
  const response = await request(route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert(/<main\b/.test(html), `Missing main landmark: ${route}`);
  assert(/<h1\b/.test(html), `Missing primary heading: ${route}`);
  assert(/rel="canonical"/.test(html), `Missing canonical URL: ${route}`);
}

const cycleShortcut = await request("/current-cycle");
assert(cycleShortcut.ok && cycleShortcut.redirected);
assert(routes.has(new URL(cycleShortcut.url).pathname));

for (const route of ["/index.html", "/books/not-a-real-book", "/voices/not-a-real-voice", "/not-a-real-page"]) {
  assert.equal((await request(route)).status, 404, route);
}
assert.equal((await request("/robots.txt")).status, 200);
assert.equal((await request("/favicon.svg")).status, 200);
console.log(`Checked ${routes.size} public pages, crawler endpoints, and expected 404s.`);
