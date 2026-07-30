const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LIVE_URL = 'https://tool-verse-theta.vercel.app';
const LEGACY_URL = 'https://manav193.github.io/ToolVerse';
const IMAGE_CATALOG = {
  'compress-image': {
    name: 'Compress Image',
    desc: 'Reduce image file size with adjustable quality and a before-and-after preview.',
    faqQ: 'Does compression reduce image quality?',
    faqA: 'Lossy compression can reduce quality. Use the quality slider to balance file size and visual detail.',
    related: ['png-to-jpg', 'webp-converter']
  },
  'crop-image': {
    name: 'Crop Image',
    desc: 'Crop images freely or lock the crop to a square aspect ratio.',
    faqQ: 'Can I lock the crop aspect ratio?',
    faqA: 'Yes. The square-lock control keeps the crop at a 1:1 aspect ratio.',
    related: ['rotate-image', 'flip-image']
  },
  'png-to-jpg': {
    name: 'PNG to JPG Converter',
    desc: 'Convert PNG images to JPG format and fill transparent areas with white.',
    faqQ: 'What happens to transparent pixels?',
    faqA: 'Transparent areas are filled with white because JPG does not support transparency.',
    related: ['webp-converter', 'compress-image']
  },
  'webp-converter': {
    name: 'WebP Converter',
    desc: 'Convert images to WebP for efficient web delivery and smaller file sizes.',
    faqQ: 'Why should I use WebP?',
    faqA: 'WebP often provides smaller files than PNG or JPG while maintaining useful visual quality.',
    related: ['png-to-jpg', 'compress-image']
  },
  'rotate-image': {
    name: 'Rotate Image',
    desc: 'Rotate images clockwise or counter-clockwise in 90-degree steps.',
    faqQ: 'Can I rotate by a custom angle?',
    faqA: 'The current tool supports 90-degree rotation steps.',
    related: ['flip-image', 'crop-image']
  },
  'flip-image': {
    name: 'Flip Image',
    desc: 'Mirror images horizontally or vertically in the browser.',
    faqQ: 'Does flipping reduce image quality?',
    faqA: 'The operation preserves the original pixel dimensions, though the exported file is newly encoded.',
    related: ['rotate-image', 'crop-image']
  },
  'blur-image': {
    name: 'Blur Image',
    desc: 'Apply an adjustable whole-image blur effect for privacy or creative use.',
    faqQ: 'Can I blur only one part of an image?',
    faqA: 'The current tool applies blur to the complete image.',
    related: ['image-watermark', 'bg-color-changer']
  },
  'bg-color-changer': {
    name: 'Background Color Changer',
    desc: 'Fill transparent image backgrounds with a solid color or gradient.',
    faqQ: 'Does this tool remove an existing background?',
    faqA: 'No. It fills areas that are already transparent.',
    related: ['png-to-jpg', 'image-watermark']
  },
  'image-watermark': {
    name: 'Image Watermark',
    desc: 'Add a configurable text watermark to an image before downloading it.',
    faqQ: 'Can I change the watermark position?',
    faqA: 'Use the available placement and appearance controls shown in the workspace.',
    related: ['blur-image', 'bg-color-changer']
  },
  'ico-generator': {
    name: 'ICO Generator',
    desc: 'Create a favicon ICO file or standard PNG icon sizes from an image.',
    faqQ: 'Which icon sizes are generated?',
    faqA: 'The tool provides favicon-oriented output and standard PNG sizes shown in its controls.',
    related: ['resize-image', 'png-to-jpg']
  },
  'resize-image': {
    name: 'Image Resizer',
    desc: 'Resize images to exact pixel dimensions in the browser.'
  },
  'jpg-to-png': {
    name: 'JPG to PNG Converter',
    desc: 'Convert JPG and JPEG images to PNG format.'
  }
};

function walk(directory, visitor) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, visitor);
    else visitor(fullPath);
  }
}

function escapeJs(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function repairAdvancedImagePage(html, slug, data) {
  const name = escapeHtml(data.name);
  const desc = escapeHtml(data.desc);
  const title = `${name} - Free Online Image Tool | ToolVerse`;

  html = html
    .replace(/<title>undefined<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="undefined">/, `<meta name="description" content="${desc}">`)
    .replace(/<meta property="og:title" content="undefined">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content="undefined">/, `<meta property="og:description" content="${desc}">`)
    .replace(/<meta name="twitter:title" content="undefined">/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description" content="undefined">/, `<meta name="twitter:description" content="${desc}">`)
    .replace(/<li><a href="\.\.\/index\.html#Image Tools">undefined<\/a><\/li>/, '<li><a href="../index.html#image">Image Tools</a></li>')
    .replace(/<li aria-current="page">undefined<\/li>/, `<li aria-current="page">${name}</li>`)
    .replace(/<span class="tool-category-badge">undefined undefined<\/span>/, '<span class="tool-category-badge">🖼️ Image Tools</span>')
    .replace(/<h1 style="margin-bottom:\.5rem">undefined<\/h1>/, `<h1 style="margin-bottom:.5rem">${name}</h1>`)
    .replace(/<p class="tool-hero-desc">undefined<\/p>/, `<p class="tool-hero-desc">${desc}</p>`)
    .replace(/<h2>About undefined<\/h2>/, `<h2>About ${name}</h2>`)
    .replace(/<h2>How to use undefined<\/h2>/, `<h2>How to use ${name}</h2>`)
    .replace(/<p style="margin-bottom:1\.5rem">undefined<\/p>/, `<p style="margin-bottom:1.5rem">${desc}</p>`)
    .replace(/Check out this free undefined tool!/g, `Check out this free ${name} tool!`);

  if (data.faqQ && data.faqA) {
    html = html
      .replace(/<h3 class="faq-question">undefined <span class="faq-icon">▼<\/span><\/h3>/, `<h3 class="faq-question">${escapeHtml(data.faqQ)} <span class="faq-icon">▼</span></h3>`)
      .replace(/<div class="faq-answer"><p>undefined<\/p><\/div>/, `<div class="faq-answer"><p>${escapeHtml(data.faqA)}</p></div>`);
  }

  if (Array.isArray(data.related)) {
    for (const relatedSlug of data.related) {
      const related = IMAGE_CATALOG[relatedSlug];
      if (!related) continue;
      const cardPattern = new RegExp(`(<a href="${relatedSlug}\\.html" class="tool-card"[^>]*><h4[^>]*>)undefined undefined(<\\/h4><p[^>]*>)undefined(<\\/p><\\/a>)`);
      html = html.replace(cardPattern, `$1🖼️ ${escapeHtml(related.name)}$2${escapeHtml(related.desc)}$3`);
    }
  }

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: LIVE_URL },
      { '@type': 'ListItem', position: 2, name: 'Image Tools', item: `${LIVE_URL}/index.html#image` },
      { '@type': 'ListItem', position: 3, name: data.name, item: `${LIVE_URL}/tools/${slug}.html` }
    ]
  });
  const appSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    operatingSystem: 'Any',
    applicationCategory: 'BrowserApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: data.desc
  });
  const faqSchema = data.faqQ ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question',
      name: data.faqQ,
      acceptedAnswer: { '@type': 'Answer', text: data.faqA }
    }]
  }) : '';

  const schemaPattern = /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"BreadcrumbList"[\s\S]*?<\/script><script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"SoftwareApplication"[\s\S]*?<\/script>(?:<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>)?/;
  html = html.replace(schemaPattern, `<script type="application/ld+json">${breadcrumbSchema}</script><script type="application/ld+json">${appSchema}</script>${faqSchema ? `<script type="application/ld+json">${faqSchema}</script>` : ''}`);

  const actionsPattern = /(<div class="tool-actions"[^>]*>[\s\S]*?<\/div>)<div class="tool-actions"[^>]*>[\s\S]*?<\/div>(?=<\/div><div class="ad-container ad-mid">)/;
  html = html.replace(actionsPattern, '$1');

  if (html.includes('undefined')) {
    throw new Error(`QA post-build: unresolved metadata remains in tools/${slug}.html.`);
  }
  return html;
}

function patchGeneratedHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (html.includes(LEGACY_URL)) {
    html = html.split(LEGACY_URL).join(LIVE_URL);
    changed = true;
  }

  if (path.basename(filePath) === 'index.html') {
    for (const [slug, data] of Object.entries(IMAGE_CATALOG)) {
      if (!data.faqQ) continue;
      const malformed = `{slug:"${slug}"}`;
      const repaired = `{name:"${escapeJs(data.name)}",slug:"${slug}",category:"Image Tools",icon:"🖼️",desc:"${escapeJs(data.desc)}"}`;
      if (html.includes(malformed)) {
        html = html.split(malformed).join(repaired);
        changed = true;
      }
    }
  }

  const slug = path.basename(filePath, '.html');
  const advancedData = IMAGE_CATALOG[slug];
  if (advancedData?.faqQ && filePath.includes(`${path.sep}tools${path.sep}`)) {
    const repaired = repairAdvancedImagePage(html, slug, advancedData);
    changed = changed || repaired !== html;
    html = repaired;
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
  name: 'ToolVerse', short_name: 'ToolVerse', start_url: './index.html', scope: './', display: 'standalone',
  background_color: '#f8fafc', theme_color: '#ffffff',
  icons: [
    { src: './icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: './icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
  ]
};
fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));

const serviceWorker = `const CACHE_NAME='toolverse-cache-v5';
const CORE_ASSETS=['./','./index.html','./css/style.css','./js/main.js','./offline.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('toolverse-cache-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))));self.clients.claim();});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(event.request,response.clone());}return response;}catch{return(await caches.match(event.request,{ignoreSearch:true}))||(await caches.match('./offline.html'));}})());return;}event.respondWith((async()=>{const cached=await caches.match(event.request);if(cached)return cached;try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(event.request,response.clone());}return response;}catch{return new Response('Offline and this resource is not cached.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}})());});`;
fs.writeFileSync(path.join(ROOT, 'service-worker.js'), serviceWorker);

console.log('QA post-build checks applied.');