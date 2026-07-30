const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LIVE_URL = 'https://tool-verse-theta.vercel.app';
const LEGACY_URL = 'https://manav193.github.io/ToolVerse';
const IMAGE_SLUGS = new Set([
  'compress-image', 'crop-image', 'png-to-jpg', 'webp-converter',
  'rotate-image', 'flip-image', 'blur-image', 'bg-color-changer',
  'image-watermark', 'ico-generator', 'resize-image', 'jpg-to-png'
]);

function titleFromSlug(slug = '') {
  return slug.split('-').filter(Boolean).map(word => word[0]?.toUpperCase() + word.slice(1)).join(' ');
}

function walk(directory, visitor) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, visitor);
    else visitor(fullPath);
  }
}

function patchGeneratedHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (html.includes(LEGACY_URL)) {
    html = html.split(LEGACY_URL).join(LIVE_URL);
    changed = true;
  }

  if (path.basename(filePath) === 'index.html') {
    const catalogPattern = /window\.TOOLVERSE_TOOLS\s*=\s*(\[[\s\S]*?\]);<\/script>/;
    const match = html.match(catalogPattern);
    if (match) {
      try {
        const catalog = JSON.parse(match[1]).map(tool => {
          const slug = String(tool.slug || '');
          const imageTool = IMAGE_SLUGS.has(slug);
          return {
            ...tool,
            name: tool.name || titleFromSlug(slug),
            category: tool.category || (imageTool ? 'Image Tools' : 'Utility Tools'),
            icon: tool.icon || (imageTool ? '🖼️' : '🔧'),
            desc: tool.desc || 'Open this browser-powered tool.'
          };
        });
        html = html.replace(catalogPattern, `window.TOOLVERSE_TOOLS=${JSON.stringify(catalog)};</script>`);
        changed = true;
      } catch (error) {
        console.warn('QA post-build: search catalog could not be normalized.', error.message);
      }
    }
  }

  if (changed) fs.writeFileSync(filePath, html);
}

walk(ROOT, filePath => {
  if (filePath.endsWith('.html')) patchGeneratedHtml(filePath);
});

for (const fileName of ['sitemap.xml', 'robots.txt']) {
  const filePath = path.join(ROOT, fileName);
  if (!fs.existsSync(filePath)) continue;
  const source = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, source.split(LEGACY_URL).join(LIVE_URL));
}

const manifest = {
  name: 'ToolVerse',
  short_name: 'ToolVerse',
  start_url: './index.html',
  scope: './',
  display: 'standalone',
  background_color: '#f8fafc',
  theme_color: '#ffffff',
  icons: [
    { src: './icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: './icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
  ]
};
fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));

const serviceWorker = `const CACHE_NAME='toolverse-cache-v3';
const CORE_ASSETS=['./','./index.html','./css/style.css','./js/main.js','./offline.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('toolverse-cache-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))));self.clients.claim();});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(event.request,response.clone());}return response;}catch{return(await caches.match(event.request,{ignoreSearch:true}))||(await caches.match('./offline.html'));}})());return;}event.respondWith((async()=>{const cached=await caches.match(event.request);if(cached)return cached;try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(event.request,response.clone());}return response;}catch{return new Response('Offline and this resource is not cached.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}})());});`;
fs.writeFileSync(path.join(ROOT, 'service-worker.js'), serviceWorker);

console.log('QA post-build checks applied.');