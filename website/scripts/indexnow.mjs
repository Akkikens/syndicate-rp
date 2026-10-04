// Pings IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live
// sitemap so new and updated pages get crawled within hours, not weeks.
// Run after a deploy:  node scripts/indexnow.mjs
import { readdirSync } from "node:fs";

const host = "gta6network.org";
const key = readdirSync(new URL("../public", import.meta.url))
  .find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
  ?.replace(".txt", "");
if (!key) throw new Error("No IndexNow key file in public/");

const sitemap = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs`);
