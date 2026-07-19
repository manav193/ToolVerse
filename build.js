const fs = require('fs');
const path = require('path');
const htmlMinifier = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const Terser = require('terser');

const homepageData = require('./src/homepage.js');
const pagesData = require('./src/pages-data.js');

const categories = require('./src/tools/categories.js');
const tools = [];

// Dynamically load all tool files
const toolsDir = path.join(__dirname, 'src', 'tools');
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('-tools.js'));
for (const file of toolFiles) {
    const categoryTools = require(path.join(toolsDir, file));
    tools.push(...categoryTools);
}

// Read components
const headerComponent = fs.readFileSync(path.join(__dirname, 'components', 'header.html'), 'utf8');
const footerComponent = fs.readFileSync(path.join(__dirname, 'components', 'footer.html'), 'utf8');
const sidebarComponent = fs.readFileSync(path.join(__dirname, 'components', 'sidebar.html'), 'utf8');
const adsTop = fs.readFileSync(path.join(__dirname, 'components', 'adsense-top.html'), 'utf8');
const adsMid = fs.readFileSync(path.join(__dirname, 'components', 'adsense-mid.html'), 'utf8');
const adsSidebar = fs.readFileSync(path.join(__dirname, 'components', 'adsense-sidebar.html'), 'utf8');
const adsBottom = fs.readFileSync(path.join(__dirname, 'components', 'adsense-bottom.html'), 'utf8');

const sidebarWithAds = sidebarComponent.replace('<!-- ADSENSE_SIDEBAR -->', adsSidebar);
const baseUrl = 'https://manav193.github.io/ToolVerse';

// Ensure directories exist
['tools', 'pages', 'icons'].forEach(dir => {
    if (!fs.existsSync(path.join(__dirname, dir))) {
        fs.mkdirSync(path.join(__dirname, dir));
    }
});

const minifyHTML = async (html) => {
    try {
        return await htmlMinifier.minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributeQuotes: false
        });
    } catch(e) {
        console.error("Minify error", e);
        return html;
    }
};

const buildToolPage = async (tool) => {
    // Generate Breadcrumb schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": tool.categoryName, "item": `${baseUrl}/index.html#${tool.category}` },
            { "@type": "ListItem", "position": 3, "name": tool.name, "item": `${baseUrl}/tools/${tool.slug}.html` }
        ]
    };

    // Generate SoftwareApplication schema
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "operatingSystem": "Any",
        "applicationCategory": "BrowserApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": tool.shortDesc
    };

    // Generate FAQ Schema
    const faqSchema = tool.faqs && tool.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": tool.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
    } : null;

    let schemasHTML = `
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(softwareAppSchema)}</script>`;
    if (faqSchema) schemasHTML += `\n    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;

    let libraryScripts = '';
    const needsPdfLib = ['merge-pdf', 'split-pdf', 'optimize-pdf', 'jpg-to-pdf', 'rotate-pdf', 'delete-pdf-pages', 'extract-pdf-pages', 'watermark-pdf', 'add-page-numbers'];
    if (needsPdfLib.includes(tool.slug) || tool.slug === 'pdf-to-jpg') {
        libraryScripts += `\n    <script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>`;
    }
    if (tool.slug === 'pdf-to-jpg') {
        libraryScripts += `\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>`;
        libraryScripts += `\n    <script>pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';</script>`;
    }
    if (tool.slug === 'crop-image') {
        libraryScripts += `\n    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css">`;
        libraryScripts += `\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>`;
    }
    if (['html-formatter', 'css-formatter', 'javascript-formatter'].includes(tool.slug)) {
        libraryScripts += `\n    <script src="https://unpkg.com/prettier@3.0.3/standalone.js"></script>`;
        if (tool.slug === 'html-formatter') {
            libraryScripts += `\n    <script src="https://unpkg.com/prettier@3.0.3/plugins/html.js"></script>`;
        }
        if (tool.slug === 'css-formatter') {
            libraryScripts += `\n    <script src="https://unpkg.com/prettier@3.0.3/plugins/postcss.js"></script>`;
        }
        if (tool.slug === 'javascript-formatter') {
            libraryScripts += `\n    <script src="https://unpkg.com/prettier@3.0.3/plugins/estree.js"></script>`;
            libraryScripts += `\n    <script src="https://unpkg.com/prettier@3.0.3/plugins/babel.js"></script>`;
        }
    }
    if (tool.slug === 'sql-formatter') {
        libraryScripts += `\n    <script src="https://unpkg.com/sql-formatter@15.0.2/dist/sql-formatter.min.js"></script>`;
    }
    if (tool.slug === 'javascript-minifier') {
        libraryScripts += `\n    <script src="https://cdn.jsdelivr.net/npm/terser@5.19.2/dist/bundle.min.js"></script>`;
    }
    if (tool.slug === 'hash-generator') {
        libraryScripts += `\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>`;
    }
    if (tool.slug === 'qr-code-generator') {
        libraryScripts += `\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>`;
    }
    if (tool.slug === 'barcode-generator') {
        libraryScripts += `\n    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>`;
    }

    // PWA & Preload
    const headExtra = `
    <link rel="manifest" href="../manifest.json">
    <meta name="theme-color" content="#ffffff">
    <meta property="og:title" content="${tool.metaTitle}">
    <meta property="og:description" content="${tool.metaDescription}">
    <meta property="og:url" content="${baseUrl}/tools/${tool.slug}.html">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${tool.metaTitle}">
    <meta name="twitter:description" content="${tool.metaDescription}">
    <link rel="canonical" href="${baseUrl}/tools/${tool.slug}.html">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${libraryScripts}
    ${schemasHTML}
    `;

    // Added benefits/related tools/share buttons to output HTML if available
    let toolHtmlContent = tool.toolHTML;
    
    // Fallback if subagent hasn't written the share HTML yet
    if (!toolHtmlContent.includes('Share on')) {
        toolHtmlContent += `
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('${baseUrl}/tools/${tool.slug}.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=${baseUrl}/tools/${tool.slug}.html&text=Check out this free ${tool.name} tool!" target="_blank" class="btn btn-secondary btn-sm" aria-label="Share on Twitter">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/tools/${tool.slug}.html" target="_blank" class="btn btn-secondary btn-sm" aria-label="Share on Facebook">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>`;
    }

    let benefitsHTML = '';
    if (tool.benefits && tool.benefits.length > 0) {
        benefitsHTML = `<div class="tool-info-section">
            <h2 style="margin-bottom:1rem;">Key Benefits</h2>
            <ul class="features-list">
                ${tool.benefits.map(b => `<li>✅ ${b}</li>`).join('')}
            </ul>
        </div>`;
    }

    let relatedHTML = '';
    if (tool.relatedSlugs && tool.relatedSlugs.length > 0) {
        relatedHTML = `<div class="tool-info-section" style="margin-top:2rem;">
            <h2 style="margin-bottom:1rem;">Related Tools</h2>
            <div class="grid-3">
                ${tool.relatedSlugs.map(rSlug => {
                    const rTool = tools.find(t => t.slug === rSlug);
                    if (!rTool) return '';
                    return `<a href="${rTool.slug}.html" class="tool-card" style="padding: 1rem;">
                        <h4 style="margin-bottom: 0.5rem;">${rTool.icon} ${rTool.name}</h4>
                        <p style="font-size: 0.8rem; color: var(--text-secondary);">${rTool.shortDesc}</p>
                    </a>`;
                }).join('')}
            </div>
        </div>`;
    }

    let html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.metaTitle}</title>
    <meta name="description" content="${tool.metaDescription}">
    <meta name="keywords" content="${tool.keywords}">
    <meta name="robots" content="index, follow">
    <link rel="stylesheet" href="../css/style.css">
    ${headExtra}
</head>
<body>
    ${headerComponent.replace(/\{\{BASE_URL\}\}/g, '..').replace(/\{\{SITE_NAME\}\}/g, 'ToolVerse')}
    
    <section class="tool-hero">
        <div class="container text-center">
            <nav class="breadcrumb" aria-label="breadcrumb">
                <ol class="breadcrumb-list">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../index.html#${tool.category}">${tool.categoryName}</a></li>
                    <li aria-current="page">${tool.name}</li>
                </ol>
            </nav>
            <span class="tool-category-badge">${tool.icon} ${tool.categoryName}</span>
            <h1 style="margin-bottom: 0.5rem;">${tool.name}</h1>
            <p class="tool-hero-desc">${tool.shortDesc}</p>
            ${tool.lastUpdated ? `<p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.5rem;">Last Updated: ${tool.lastUpdated}</p>` : ''}
        </div>
    </section>
    
    <div class="container page-wrapper">
        <main class="main-content">
            ${adsTop}
            
            <div class="tool-workspace animate-on-scroll">
                ${toolHtmlContent}
            </div>
            
            ${adsMid}
            
            <div class="tool-workspace animate-on-scroll" style="margin-top: 2rem;">
                <div class="tool-info-tabs" role="tablist">
                    <button class="tab-btn active" data-tab="desc" role="tab" aria-selected="true" tabindex="0">About</button>
                    <button class="tab-btn" data-tab="how" role="tab" aria-selected="false" tabindex="-1">How to Use</button>
                    <button class="tab-btn" data-tab="faq" role="tab" aria-selected="false" tabindex="-1">FAQ</button>
                </div>
                
                <div id="tab-desc" class="tab-content active" role="tabpanel" tabindex="0">
                    <h2>About ${tool.name}</h2>
                    <p style="margin-bottom: 1.5rem;">${tool.metaDescription}</p>
                    <h3 style="margin-bottom: 1rem;">Features</h3>
                    <ul class="features-list">
                        ${(tool.features || []).map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                    ${benefitsHTML}
                </div>
                
                <div id="tab-how" class="tab-content" role="tabpanel" tabindex="0" style="display:none;">
                    <h2>How to use ${tool.name}</h2>
                    <ol class="how-to-list">
                        ${(tool.howToUse || ['Upload your file', 'Select options', 'Click Process']).map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                
                <div id="tab-faq" class="tab-content" role="tabpanel" tabindex="0" style="display:none;">
                    <h2>Frequently Asked Questions</h2>
                    <div class="faq-list">
                        ${(tool.faqs || []).map(faq => `
                        <div class="faq-item">
                            <h3 class="faq-question">${faq.q} <span class="faq-icon">▼</span></h3>
                            <div class="faq-answer"><p>${faq.a}</p></div>
                        </div>`).join('')}
                    </div>
                </div>
            </div>

            ${relatedHTML}
            
            ${adsBottom}
        </main>
        
        <aside class="sidebar">
            ${sidebarWithAds.replace(/\{\{BASE_URL\}\}/g, '..')}
        </aside>
    </div>
    
    ${footerComponent.replace(/\{\{BASE_URL\}\}/g, '..')}
    
    <script>
        ${tool.toolScript}
    </script>
    <!-- Analytics Placeholders -->
    <!-- GA4 --> <script>/* window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX'); */</script>
    <script src="../js/main.js" defer></script>
</body>
</html>`;
    
    return await minifyHTML(html);
};

const buildApp = async () => {
    // Generate Tools
    console.log('Generating tools pages...');
    for (const tool of tools) {
        const html = await buildToolPage(tool);
        fs.writeFileSync(path.join(__dirname, 'tools', `${tool.slug}.html`), html);
        console.log(`- Created tools/${tool.slug}.html`);
    }

    // Generate standard pages
    console.log('Generating standard pages...');
    for (const page of pagesData) {
        const headExtra = `
        <link rel="manifest" href="../manifest.json">
        <meta name="theme-color" content="#ffffff">
        <meta property="og:title" content="${page.metaTitle}">
        <meta property="og:description" content="${page.metaDescription}">
        <meta property="og:url" content="${baseUrl}/pages/${page.slug}.html">
        <meta property="og:type" content="website">
        <link rel="canonical" href="${baseUrl}/pages/${page.slug}.html">
        `;
        let html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.metaTitle}</title>
    <meta name="description" content="${page.metaDescription}">
    <meta name="robots" content="index, follow">
    <link rel="stylesheet" href="../css/style.css">
    ${headExtra}
</head>
<body>
    ${headerComponent.replace(/\{\{BASE_URL\}\}/g, '..').replace(/\{\{SITE_NAME\}\}/g, 'ToolVerse')}
    
    <section class="page-hero" style="background: var(--bg-secondary); padding: 4rem 0; text-align: center; border-bottom: 1px solid var(--border);">
        <div class="container">
            <h1 style="font-size: 2.5rem;">${page.title}</h1>
        </div>
    </section>
    
    <div class="container page-wrapper">
        <main class="main-content" style="flex: 1 1 100%; max-width: 800px; margin: 0 auto; padding: 40px 20px;">
            <div class="page-content animate-on-scroll">
                ${page.contentHTML.replace('{{TOOL_LINKS}}', categories.map(c => `
                    <div class="sitemap-category">
                        <h3 style="margin-bottom:1rem; border-bottom: 2px solid ${c.color}; padding-bottom:0.5rem; display:inline-block;">${c.icon} ${c.name}</h3>
                        <ul style="list-style:none;">
                            ${tools.filter(t => t.category === c.slug).map(t => `<li style="margin-bottom:0.5rem;"><a href="../tools/${t.slug}.html">${t.name}</a></li>`).join('')}
                        </ul>
                    </div>
                `).join(''))}
            </div>
        </main>
    </div>
    
    ${footerComponent.replace(/\{\{BASE_URL\}\}/g, '..')}
    <script src="../js/main.js" defer></script>
</body>
</html>`;
        html = await minifyHTML(html);
        fs.writeFileSync(path.join(__dirname, 'pages', `${page.slug}.html`), html);
        console.log(`- Created pages/${page.slug}.html`);
    }

    // Generate homepage
    console.log('Generating homepage...');
    
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": baseUrl,
        "name": "ToolVerse",
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/index.html?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };
    
    const headExtra = `
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#ffffff">
    <meta property="og:title" content="${homepageData.metaTitle}">
    <meta property="og:description" content="${homepageData.metaDescription}">
    <meta property="og:url" content="${baseUrl}/">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="${baseUrl}/">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>
    `;

    // Process featured / trending / latest tools
    const featuredTools = homepageData.featuredSlugs ? homepageData.featuredSlugs.map(slug => tools.find(t => t.slug === slug)).filter(Boolean) : tools.slice(0, 3);
    const trendingTools = homepageData.trendingSlugs ? homepageData.trendingSlugs.map(slug => tools.find(t => t.slug === slug)).filter(Boolean) : tools.slice(3, 6);
    
    const toolCardHTML = (t) => `
        <a href="tools/${t.slug}.html" class="tool-card animate-on-scroll" aria-label="${t.name}">
            <div class="tool-card-icon">${t.icon}</div>
            <h3>${t.name}</h3>
            <p>${t.shortDesc}</p>
        </a>`;

    const categoriesHTML = categories.map(c => `
        <a href="#${c.slug}" class="category-card animate-on-scroll" style="--cat-color: ${c.color}" aria-label="${c.name}">
            <div class="category-icon">${c.icon}</div>
            <h3>${c.name}</h3>
            <p>${c.description}</p>
        </a>
    `).join('');

    let homepageHTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${homepageData.metaTitle}</title>
    <meta name="description" content="${homepageData.metaDescription}">
    <meta name="keywords" content="${homepageData.keywords}">
    <meta name="robots" content="index, follow">
    <link rel="stylesheet" href="css/style.css">
    ${headExtra}
</head>
<body>
    ${headerComponent.replace(/\{\{BASE_URL\}\}/g, '.').replace(/\{\{SITE_NAME\}\}/g, 'ToolVerse')}
    
    <section class="home-hero">
        <div class="container">
            <h1 class="animate-on-scroll">${homepageData.hero.title}</h1>
            <p class="animate-on-scroll">${homepageData.hero.subtitle}</p>
            <div class="search-container animate-on-scroll">
                <input type="text" id="hero-search" placeholder="Search for tools... (e.g. Word Counter)" autocomplete="off" aria-label="Search tools">
                <div id="hero-search-results" class="search-results" role="listbox"></div>
            </div>
            <div class="stats-row animate-on-scroll">
                ${homepageData.hero.stats.map(s => `
                <div class="stat-box">
                    <div class="stat-val" data-target="${s.value.replace(/[^0-9]/g, '')}">${s.value.replace(/[0-9]/g, '0')}</div>
                    <div class="stat-label">${s.label}</div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <section class="section bg-light">
        <div class="container">
            <h2 class="section-title animate-on-scroll">Featured Tools</h2>
            <div class="grid-3">
                ${featuredTools.map(toolCardHTML).join('')}
            </div>
        </div>
    </section>
    
    <section class="section">
        <div class="container">
            <h2 class="section-title animate-on-scroll">Trending Now</h2>
            <div class="grid-3">
                ${trendingTools.map(toolCardHTML).join('')}
            </div>
        </div>
    </section>
    
    <section class="section bg-light">
        <div class="container">
            <h2 class="section-title animate-on-scroll">Browse by Category</h2>
            <div class="grid-3">
                ${categoriesHTML}
            </div>
        </div>
    </section>
    
    <section class="section">
        <div class="container">
            <h2 class="section-title animate-on-scroll">Frequently Asked Questions</h2>
            <div class="faq-list animate-on-scroll" style="max-width: 800px; margin: 0 auto;">
                ${homepageData.faqs.map(faq => `
                <div class="faq-item">
                    <h3 class="faq-question">${faq.q} <span class="faq-icon">▼</span></h3>
                    <div class="faq-answer"><p>${faq.a}</p></div>
                </div>`).join('')}
            </div>
        </div>
    </section>
    
    ${footerComponent.replace(/\{\{BASE_URL\}\}/g, '.')}
    
    <script>
        window.TOOLVERSE_TOOLS = ${JSON.stringify(tools.map(t => ({ name: t.name, slug: t.slug, category: t.categoryName, icon: t.icon, desc: t.shortDesc })))};
    </script>
    <script src="js/main.js" defer></script>
    <!-- Analytics Placeholders -->
    <!-- GA4 --> <script>/* window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX'); */</script>
    <!-- Clarity --> <script>/* (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "XXXXXXXXXX"); */</script>
</body>
</html>`;
    
    homepageHTML = await minifyHTML(homepageHTML);
    fs.writeFileSync(path.join(__dirname, 'index.html'), homepageHTML);
    console.log('- Created index.html');

    // Generate PWA assets
    console.log('Generating PWA assets...');
    const manifest = {
        name: "ToolVerse",
        short_name: "ToolVerse",
        start_url: "/index.html",
        display: "standalone",
        background_color: "#f8fafc",
        theme_color: "#ffffff",
        icons: [
            {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    };
    fs.writeFileSync(path.join(__dirname, 'manifest.json'), JSON.stringify(manifest, null, 2));
    
    const serviceWorker = `
    const CACHE_NAME = 'toolverse-cache-v1';
    const urlsToCache = [
        '/',
        '/index.html',
        '/css/style.css',
        '/js/main.js',
        '/offline.html'
    ];

    self.addEventListener('install', event => {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => cache.addAll(urlsToCache))
        );
    });

    self.addEventListener('fetch', event => {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) return response;
                    return fetch(event.request).catch(() => caches.match('/offline.html'));
                })
        );
    });
    `;
    // Minify JS for Service Worker
    const swResult = await Terser.minify(serviceWorker);
    fs.writeFileSync(path.join(__dirname, 'service-worker.js'), swResult.code || serviceWorker);

    // Create 404
    const html404 = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - ToolVerse</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body style="display: flex; flex-direction: column; min-height: 100vh;">
    ${headerComponent.replace(/\{\{BASE_URL\}\}/g, '').replace(/\{\{SITE_NAME\}\}/g, 'ToolVerse')}
    
    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
        <h1 style="font-size: 6rem; margin: 0; color: var(--accent);">404</h1>
        <h2 style="margin-bottom: 2rem;">Oops! Page not found.</h2>
        <p style="margin-bottom: 2rem;">The tool or page you are looking for does not exist.</p>
        <a href="/" class="btn btn-primary">Go to Homepage</a>
    </div>
    
    ${footerComponent.replace(/\{\{BASE_URL\}\}/g, '')}
    
    <script>
        window.TOOLVERSE_TOOLS = ${JSON.stringify(tools.map(t => ({ name: t.name, slug: t.slug, category: t.categoryName, icon: t.icon })))};
    </script>
    <script src="/js/main.js" defer></script>
</body>
</html>`;
    const min404 = await minifyHTML(html404);
    fs.writeFileSync(path.join(__dirname, '404.html'), min404);
    console.log('- Created 404.html');

    const offlineHTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - ToolVerse</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body style="display: flex; flex-direction: column; min-height: 100vh;">
    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
        <h1 style="font-size: 6rem; margin: 0; color: var(--accent);">Offline</h1>
        <h2 style="margin-bottom: 2rem;">No Internet Connection</h2>
        <p style="margin-bottom: 2rem;">Please check your connection and try again.</p>
        <button onclick="window.location.reload()" class="btn btn-primary">Retry</button>
    </div>
</body>
</html>`;
    const minOffline = await minifyHTML(offlineHTML);
    fs.writeFileSync(path.join(__dirname, 'offline.html'), minOffline);
    console.log('- Created offline.html');

    // Generate sitemap.xml
    console.log('Generating sitemap.xml...');
    const date = new Date().toISOString().split('T')[0];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${date}</lastmod>
        <priority>1.0</priority>
    </url>\n`;
    tools.forEach(t => {
        sitemap += `    <url>
        <loc>${baseUrl}/tools/${t.slug}.html</loc>
        <lastmod>${date}</lastmod>
        <priority>0.8</priority>
    </url>\n`;
    });
    pagesData.forEach(p => {
        sitemap += `    <url>
        <loc>${baseUrl}/pages/${p.slug}.html</loc>
        <lastmod>${date}</lastmod>
        <priority>0.5</priority>
    </url>\n`;
    });
    sitemap += `</urlset>`;
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
    console.log('- Created sitemap.xml');

    // Generate robots.txt
    console.log('Generating robots.txt...');
    const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots);
    console.log('- Created robots.txt');

    console.log('Build complete!');
};

buildApp().catch(err => console.error(err));
