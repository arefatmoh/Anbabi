import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const publicDir = new URL("../public/", import.meta.url);
const manifest = JSON.parse(
  await readFile(new URL("assets/manifest.json", publicDir), "utf8"),
);
const seen = new Set();

async function assertPublicFile(path) {
  assert.match(path, /^\/assets\/[\w./-]+$/, `Invalid public asset: ${path}`);
  assert(!path.split("/").includes(".."), `Invalid asset traversal: ${path}`);
  const file = await stat(new URL(path.slice(1), publicDir));
  assert(file.isFile() && file.size > 0, `Missing or empty asset: ${path}`);
}

for (const { path, approvalStatus } of manifest) {
  assert(!seen.has(path), `Duplicate asset path: ${path}`);
  assert.equal(approvalStatus, "accepted", `Unapproved public asset: ${path}`);
  seen.add(path);
  await assertPublicFile(path);
}

const registry = await readFile(new URL("../src/lib/assets.ts", import.meta.url), "utf8");
const paths = [...new Set(registry.match(/\/assets\/[\w./-]+/g))];
for (const path of paths) await assertPublicFile(path);

console.log(`Checked ${seen.size} manifest assets and ${paths.length} asset registry paths.`);
