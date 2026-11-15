/**
 * Build-time sharing pages for the gallery (wired in vite.config.ts):
 *   s/<name>/index.html  title, description, canonical and Open Graph tags for one sound, then a redirect into the gallery
 *   s/<name>/og.png      its 1200x630 card (scripts/og.ts)
 *   sitemap.xml, robots.txt
 * A shared link /s/coin/?p=3&v=42 shows the coin card in chats and opens the gallery at #coin?p=3&v=42.
 */
import { ogCard } from "./og.ts";

export const SITE = "https://sigco3111.github.io/plinkfx/";

interface Catalog {
  categories: Record<string, { title: string }>;
  sounds: { name: string; cat: string; desc: string; env: number[] }[];
}
export interface OutFile {
  fileName: string;
  source: string | Uint8Array;
}

const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function soundPage(s: Catalog["sounds"][number], catTitle: string) {
  const what = s.desc.replace(/\.$/, ""),
    url = `${SITE}s/${s.name}/`,
    title = `${s.name} · 무료 CC0 게임 효과음 · plinkfx`,
    desc = `${what}. 코드로 만든 무료 CC0 게임 효과음(${catTitle}): 재생하고, 조정하고, 코드 한 줄을 복사하거나 WAV로 받으세요.`;
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${attr(title)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${url}">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="plinkfx">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${url}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(`${s.name}: 사운드 파형, plinkfx, CC0`)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${url}og.png">
<script>(function(){var h=location.hash.slice(1),i=h.indexOf("?");location.replace("../../#${s.name}"+(i>=0?h.slice(i):location.search))})()</script>
<noscript><meta http-equiv="refresh" content="0; url=../../#${s.name}"></noscript>
<style>body{margin:0;padding:3rem 1.5rem;font:16px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#16130f;color:#f2ede3}a{color:#ff7a4f}</style>
</head>
<body>
<h1>${attr(s.name)}</h1>
<p>${attr(what)}. 카테고리: ${attr(catTitle)} · CC0.</p>
<p><a href="../../#${s.name}">plinkfx 갤러리에서 ${attr(s.name)} 열기</a></p>
</body>
</html>
`;
}

export function sharingFiles(catalog: Catalog, lastmod = new Date().toISOString().slice(0, 10)): OutFile[] {
  const out: OutFile[] = [];
  for (const s of catalog.sounds) {
    const cat = catalog.categories[s.cat]?.title ?? s.cat;
    out.push({ fileName: `s/${s.name}/index.html`, source: soundPage(s, cat) });
    out.push({ fileName: `s/${s.name}/og.png`, source: ogCard(s, cat) });
  }
  const urls = [SITE, `${SITE}game.html`, ...catalog.sounds.map((s) => `${SITE}s/${s.name}/`)];
  out.push({
    fileName: "sitemap.xml",
    source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`,
  });
  out.push({ fileName: "robots.txt", source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n` });
  return out;
}
