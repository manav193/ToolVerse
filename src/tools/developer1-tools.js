module.exports = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-brackets-curly',
    shortDesc: 'Format and validate JSON data instantly.',
    metaTitle: 'JSON Formatter & Validator Online | ToolVerse',
    metaDescription: 'Free online JSON formatter and validator. Beautify, validate, and debug JSON data quickly and easily.',
    keywords: ['json formatter', 'json validator', 'beautify json', 'format json'],
    benefits: ['Quick formatting', 'Error validation', 'No data stored on servers'],
    lastUpdated: '2026-07-06',
    features: ['Indentation control', 'Syntax error highlighting'],
    howToUse: ['Paste JSON data', 'Click Format', 'View formatted JSON or errors'],
    faqs: [{ question: 'Is my data secure?', answer: 'Yes, processing happens in your browser.' }],
    relatedSlugs: ['xml-formatter'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input JSON</label>
        <textarea id="json-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste JSON here..."></textarea>
    </div>
    <div>
        <label>Formatted Output</label>
        <textarea id="json-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center;">
    <button id="format-json-btn" class="btn btn-primary">Format JSON</button>
    <button id="clear-json-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-json-btn" class="btn btn-secondary">Copy Output</button>
    <span id="json-status" style="margin-left: 1rem; font-weight: bold;"></span>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/json-formatter.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/json-formatter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/json-formatter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(function() {
        const input = document.getElementById('json-input');
        const output = document.getElementById('json-output');
        const status = document.getElementById('json-status');
        
        document.getElementById('format-json-btn').addEventListener('click', () => {
            const val = input.value.trim();
            if (!val) {
                status.textContent = 'Please enter JSON data.';
                status.style.color = 'var(--text-color)';
                return;
            }
            try {
                const parsed = JSON.parse(val);
                const formatted = JSON.stringify(parsed, null, 2);
                output.value = formatted;
                status.textContent = 'Valid JSON!';
                status.style.color = 'green';
            } catch (err) {
                output.value = '';
                status.textContent = 'Invalid JSON: ' + err.message;
                status.style.color = 'red';
            }
        });
        
        document.getElementById('clear-json-btn').addEventListener('click', () => {
            input.value = '';
            output.value = '';
            status.textContent = '';
        });
        
        document.getElementById('copy-json-btn').addEventListener('click', () => {
            if(output.value) {
                window.copyToClipboard(output.value);
            }
        });
    })();`
  },
  {
    slug: 'xml-formatter',
    name: 'XML Formatter',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-code',
    shortDesc: 'Format and beautify XML strings.',
    metaTitle: 'XML Formatter & Beautifier Online | ToolVerse',
    metaDescription: 'Free online XML formatter. Beautify your XML code with proper indentation.',
    keywords: ['xml formatter', 'beautify xml', 'xml beautifier'],
    benefits: ['Fast processing', 'Browser-based'],
    lastUpdated: '2026-07-06',
    features: ['Proper indentation', 'Fast parsing'],
    howToUse: ['Paste XML', 'Click Format'],
    faqs: [],
    relatedSlugs: ['json-formatter'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input XML</label>
        <textarea id="xml-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste XML here..."></textarea>
    </div>
    <div>
        <label>Formatted Output</label>
        <textarea id="xml-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="format-xml-btn" class="btn btn-primary">Format XML</button>
    <button id="clear-xml-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-xml-btn" class="btn btn-secondary">Copy Output</button>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/xml-formatter.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/xml-formatter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/xml-formatter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(function() {
        function formatXml(xml) {
            let formatted = '';
            let pad = 0;
            xml = xml.replace(/(>)(<)(\\/*)/g, '$1\\n$2$3');
            xml.split('\\n').forEach(function(node) {
                let indent = 0;
                if (node.match( /.+<\\/\\w[^>]*>$/ )) {
                    indent = 0;
                } else if (node.match( /^<\\/\\w/ )) {
                    if (pad !== 0) pad -= 1;
                } else if (node.match( /^<\\w[^>]*[^\\/]>.*$/ )) {
                    indent = 1;
                } else {
                    indent = 0;
                }
                formatted += '  '.repeat(pad) + node + '\\n';
                pad += indent;
            });
            return formatted.trim();
        }
        
        document.getElementById('format-xml-btn').addEventListener('click', () => {
            const input = document.getElementById('xml-input').value;
            if(!input.trim()) return;
            try {
                document.getElementById('xml-output').value = formatXml(input);
            } catch(e) {
                window.showToast('Error formatting XML', 'error');
            }
        });
        
        document.getElementById('clear-xml-btn').addEventListener('click', () => {
            document.getElementById('xml-input').value = '';
            document.getElementById('xml-output').value = '';
        });
        
        document.getElementById('copy-xml-btn').addEventListener('click', () => {
            const out = document.getElementById('xml-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'html-formatter',
    name: 'HTML Formatter',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-html5',
    shortDesc: 'Format and beautify HTML code online.',
    metaTitle: 'HTML Formatter Online | ToolVerse',
    metaDescription: 'Free online HTML formatter. Beautify your HTML code using prettier.',
    keywords: ['html formatter', 'html beautifier', 'format html'],
    benefits: ['Uses standard Prettier formatting', 'Browser based'],
    lastUpdated: '2026-07-06',
    features: ['Prettier integration', 'Syntax formatting'],
    howToUse: ['Paste HTML', 'Click Format'],
    faqs: [],
    relatedSlugs: ['css-formatter', 'html-minifier'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input HTML</label>
        <textarea id="html-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste HTML here..."></textarea>
    </div>
    <div>
        <label>Formatted Output</label>
        <textarea id="html-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="format-html-btn" class="btn btn-primary">Format HTML</button>
    <button id="clear-html-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-html-btn" class="btn btn-secondary">Copy Output</button>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/html-formatter.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/html-formatter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/html-formatter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(async function() {
        document.getElementById('format-html-btn').addEventListener('click', async () => {
            const input = document.getElementById('html-input').value;
            if(!input.trim()) return;
            try {
                if(!window.prettier || !window.prettierPlugins) {
                    throw new Error('Prettier is not loaded.');
                }
                const formatted = await window.prettier.format(input, {
                    parser: "html",
                    plugins: window.prettierPlugins
                });
                document.getElementById('html-output').value = formatted;
            } catch(e) {
                console.error(e);
                window.showToast('Error formatting HTML: ' + e.message, 'error');
            }
        });
        
        document.getElementById('clear-html-btn').addEventListener('click', () => {
            document.getElementById('html-input').value = '';
            document.getElementById('html-output').value = '';
        });
        
        document.getElementById('copy-html-btn').addEventListener('click', () => {
            const out = document.getElementById('html-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'css-formatter',
    name: 'CSS Formatter',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-css3-alt',
    shortDesc: 'Format and beautify CSS code online.',
    metaTitle: 'CSS Formatter Online | ToolVerse',
    metaDescription: 'Free online CSS formatter. Beautify your CSS code using prettier.',
    keywords: ['css formatter', 'css beautifier', 'format css'],
    benefits: ['Uses standard Prettier formatting', 'Browser based'],
    lastUpdated: '2026-07-06',
    features: ['Prettier integration', 'Syntax formatting'],
    howToUse: ['Paste CSS', 'Click Format'],
    faqs: [],
    relatedSlugs: ['html-formatter', 'css-minifier'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input CSS</label>
        <textarea id="css-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste CSS here..."></textarea>
    </div>
    <div>
        <label>Formatted Output</label>
        <textarea id="css-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="format-css-btn" class="btn btn-primary">Format CSS</button>
    <button id="clear-css-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-css-btn" class="btn btn-secondary">Copy Output</button>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/css-formatter.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/css-formatter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/css-formatter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(async function() {
        document.getElementById('format-css-btn').addEventListener('click', async () => {
            const input = document.getElementById('css-input').value;
            if(!input.trim()) return;
            try {
                if(!window.prettier || !window.prettierPlugins) {
                    throw new Error('Prettier is not loaded.');
                }
                const formatted = await window.prettier.format(input, {
                    parser: "css",
                    plugins: window.prettierPlugins
                });
                document.getElementById('css-output').value = formatted;
            } catch(e) {
                console.error(e);
                window.showToast('Error formatting CSS: ' + e.message, 'error');
            }
        });
        
        document.getElementById('clear-css-btn').addEventListener('click', () => {
            document.getElementById('css-input').value = '';
            document.getElementById('css-output').value = '';
        });
        
        document.getElementById('copy-css-btn').addEventListener('click', () => {
            const out = document.getElementById('css-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'javascript-formatter',
    name: 'JavaScript Formatter',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-js',
    shortDesc: 'Format and beautify JS code online.',
    metaTitle: 'JS Formatter Online | ToolVerse',
    metaDescription: 'Free online JavaScript formatter. Beautify your JS code using prettier.',
    keywords: ['js formatter', 'javascript beautifier', 'format js'],
    benefits: ['Uses standard Prettier formatting', 'Browser based'],
    lastUpdated: '2026-07-06',
    features: ['Prettier integration', 'Syntax formatting'],
    howToUse: ['Paste JS', 'Click Format'],
    faqs: [],
    relatedSlugs: ['html-formatter', 'javascript-minifier'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input JavaScript</label>
        <textarea id="js-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste JavaScript here..."></textarea>
    </div>
    <div>
        <label>Formatted Output</label>
        <textarea id="js-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="format-js-btn" class="btn btn-primary">Format JS</button>
    <button id="clear-js-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-js-btn" class="btn btn-secondary">Copy Output</button>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/javascript-formatter.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/javascript-formatter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/javascript-formatter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(async function() {
        document.getElementById('format-js-btn').addEventListener('click', async () => {
            const input = document.getElementById('js-input').value;
            if(!input.trim()) return;
            try {
                if(!window.prettier || !window.prettierPlugins) {
                    throw new Error('Prettier is not loaded.');
                }
                const formatted = await window.prettier.format(input, {
                    parser: "babel",
                    plugins: window.prettierPlugins
                });
                document.getElementById('js-output').value = formatted;
            } catch(e) {
                console.error(e);
                window.showToast('Error formatting JS: ' + e.message, 'error');
            }
        });
        
        document.getElementById('clear-js-btn').addEventListener('click', () => {
            document.getElementById('js-input').value = '';
            document.getElementById('js-output').value = '';
        });
        
        document.getElementById('copy-js-btn').addEventListener('click', () => {
            const out = document.getElementById('js-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'css-minifier',
    name: 'CSS Minifier',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-compress-arrows-alt',
    shortDesc: 'Minify CSS code to reduce file size.',
    metaTitle: 'CSS Minifier Online | ToolVerse',
    metaDescription: 'Free online CSS minifier. Compress your CSS code to save bandwidth and speed up your website.',
    keywords: ['css minifier', 'compress css', 'minify css'],
    benefits: ['Reduces file size', 'Improves load time'],
    lastUpdated: '2026-07-06',
    features: ['Removes comments', 'Removes whitespace'],
    howToUse: ['Paste CSS', 'Click Minify'],
    faqs: [],
    relatedSlugs: ['css-formatter'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input CSS</label>
        <textarea id="min-css-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste CSS here..."></textarea>
    </div>
    <div>
        <label>Minified Output</label>
        <textarea id="min-css-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center;">
    <button id="minify-css-btn" class="btn btn-primary">Minify CSS</button>
    <button id="clear-min-css-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-min-css-btn" class="btn btn-secondary">Copy Output</button>
    <span id="css-min-status" style="margin-left: 1rem; font-weight: bold; color: var(--text-color);"></span>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/css-minifier.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/css-minifier.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/css-minifier.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(function() {
        document.getElementById('minify-css-btn').addEventListener('click', () => {
            const input = document.getElementById('min-css-input').value;
            if(!input.trim()) return;
            // Native regex minify
            let minified = input.replace(/\\/\\*.*?\\*\\//g, '') // remove comments
                                .replace(/\\s+/g, ' ') // collapse spaces
                                .replace(/\\s*([\\{\\}\\:\\;\\,])\\s*/g, '$1') // remove spaces around syntax
                                .trim();
            document.getElementById('min-css-output').value = minified;
            const savings = ((1 - (minified.length / input.length)) * 100).toFixed(2);
            document.getElementById('css-min-status').textContent = \`Saved \${savings}% space\`;
        });
        
        document.getElementById('clear-min-css-btn').addEventListener('click', () => {
            document.getElementById('min-css-input').value = '';
            document.getElementById('min-css-output').value = '';
            document.getElementById('css-min-status').textContent = '';
        });
        
        document.getElementById('copy-min-css-btn').addEventListener('click', () => {
            const out = document.getElementById('min-css-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'javascript-minifier',
    name: 'JavaScript Minifier',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-compress',
    shortDesc: 'Minify JavaScript using Terser.',
    metaTitle: 'JS Minifier Online | ToolVerse',
    metaDescription: 'Free online JavaScript minifier. Compress your JS code to save bandwidth and speed up your website.',
    keywords: ['js minifier', 'compress js', 'minify js'],
    benefits: ['Uses Terser', 'Reduces file size', 'Improves load time'],
    lastUpdated: '2026-07-06',
    features: ['Terser integration', 'Variable mangling'],
    howToUse: ['Paste JS', 'Click Minify'],
    faqs: [],
    relatedSlugs: ['javascript-formatter'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input JavaScript</label>
        <textarea id="min-js-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste JavaScript here..."></textarea>
    </div>
    <div>
        <label>Minified Output</label>
        <textarea id="min-js-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center;">
    <button id="minify-js-btn" class="btn btn-primary">Minify JS</button>
    <button id="clear-min-js-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-min-js-btn" class="btn btn-secondary">Copy Output</button>
    <span id="js-min-status" style="margin-left: 1rem; font-weight: bold; color: var(--text-color);"></span>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/javascript-minifier.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/javascript-minifier.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/javascript-minifier.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(async function() {
        document.getElementById('minify-js-btn').addEventListener('click', async () => {
            const input = document.getElementById('min-js-input').value;
            if(!input.trim()) return;
            try {
                if(!window.Terser) throw new Error("Terser is not loaded.");
                const result = await window.Terser.minify(input);
                if(result.error) throw result.error;
                document.getElementById('min-js-output').value = result.code;
                const savings = ((1 - (result.code.length / input.length)) * 100).toFixed(2);
                document.getElementById('js-min-status').textContent = \`Saved \${savings}% space\`;
            } catch(e) {
                console.error(e);
                window.showToast('Error minifying JS: ' + e.message, 'error');
            }
        });
        
        document.getElementById('clear-min-js-btn').addEventListener('click', () => {
            document.getElementById('min-js-input').value = '';
            document.getElementById('min-js-output').value = '';
            document.getElementById('js-min-status').textContent = '';
        });
        
        document.getElementById('copy-min-js-btn').addEventListener('click', () => {
            const out = document.getElementById('min-js-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'html-minifier',
    name: 'HTML Minifier',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-compress-alt',
    shortDesc: 'Minify HTML code to reduce file size.',
    metaTitle: 'HTML Minifier Online | ToolVerse',
    metaDescription: 'Free online HTML minifier. Compress your HTML code to save bandwidth and speed up your website.',
    keywords: ['html minifier', 'compress html', 'minify html'],
    benefits: ['Reduces file size', 'Improves load time'],
    lastUpdated: '2026-07-06',
    features: ['Removes comments', 'Removes whitespace'],
    howToUse: ['Paste HTML', 'Click Minify'],
    faqs: [],
    relatedSlugs: ['html-formatter'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input HTML</label>
        <textarea id="min-html-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="Paste HTML here..."></textarea>
    </div>
    <div>
        <label>Minified Output</label>
        <textarea id="min-html-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center;">
    <button id="minify-html-btn" class="btn btn-primary">Minify HTML</button>
    <button id="clear-min-html-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-min-html-btn" class="btn btn-secondary">Copy Output</button>
    <span id="html-min-status" style="margin-left: 1rem; font-weight: bold; color: var(--text-color);"></span>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/html-minifier.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/html-minifier.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/html-minifier.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(function() {
        document.getElementById('minify-html-btn').addEventListener('click', () => {
            const input = document.getElementById('min-html-input').value;
            if(!input.trim()) return;
            let minified = input.replace(/<!--[\\s\\S]*?-->/g, '') // remove comments
                                .replace(/\\n/g, ' ')
                                .replace(/\\s+/g, ' ')
                                .replace(/>\\s+</g, '><')
                                .trim();
            document.getElementById('min-html-output').value = minified;
            const savings = ((1 - (minified.length / input.length)) * 100).toFixed(2);
            document.getElementById('html-min-status').textContent = \`Saved \${savings}% space\`;
        });
        
        document.getElementById('clear-min-html-btn').addEventListener('click', () => {
            document.getElementById('min-html-input').value = '';
            document.getElementById('min-html-output').value = '';
            document.getElementById('html-min-status').textContent = '';
        });
        
        document.getElementById('copy-min-html-btn').addEventListener('click', () => {
            const out = document.getElementById('min-html-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-database',
    shortDesc: 'Format and beautify SQL queries.',
    metaTitle: 'SQL Formatter Online | ToolVerse',
    metaDescription: 'Free online SQL formatter. Beautify your SQL queries for better readability.',
    keywords: ['sql formatter', 'sql beautifier', 'format sql'],
    benefits: ['Supports multiple dialects', 'Browser based'],
    lastUpdated: '2026-07-06',
    features: ['SQL parsing', 'Syntax indentation'],
    howToUse: ['Paste SQL', 'Click Format'],
    faqs: [],
    relatedSlugs: ['json-formatter'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="grid-2 gap-4">
    <div>
        <label>Input SQL</label>
        <textarea id="sql-input" class="form-input" style="height: 300px; font-family: monospace;" placeholder="SELECT * FROM users WHERE active = 1;"></textarea>
    </div>
    <div>
        <label>Formatted Output</label>
        <textarea id="sql-output" class="form-input" style="height: 300px; font-family: monospace;" readonly></textarea>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="format-sql-btn" class="btn btn-primary">Format SQL</button>
    <button id="clear-sql-btn" class="btn btn-secondary">Clear</button>
    <button id="copy-sql-btn" class="btn btn-secondary">Copy Output</button>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/sql-formatter.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/sql-formatter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/sql-formatter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(function() {
        document.getElementById('format-sql-btn').addEventListener('click', () => {
            const input = document.getElementById('sql-input').value;
            if(!input.trim()) return;
            try {
                if(!window.sqlFormatter) throw new Error("sqlFormatter is not loaded.");
                const formatted = window.sqlFormatter.format(input);
                document.getElementById('sql-output').value = formatted;
            } catch(e) {
                console.error(e);
                window.showToast('Error formatting SQL', 'error');
            }
        });
        
        document.getElementById('clear-sql-btn').addEventListener('click', () => {
            document.getElementById('sql-input').value = '';
            document.getElementById('sql-output').value = '';
        });
        
        document.getElementById('copy-sql-btn').addEventListener('click', () => {
            const out = document.getElementById('sql-output').value;
            if(out) window.copyToClipboard(out);
        });
    })();`
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'developer',
    categoryName: 'Developer Tools',
    icon: 'fa-search',
    shortDesc: 'Test regular expressions against target text.',
    metaTitle: 'Regex Tester Online | ToolVerse',
    metaDescription: 'Free online Regex Tester. Test your regular expressions with live highlights and match groups.',
    keywords: ['regex tester', 'regular expression', 'test regex'],
    benefits: ['Real-time testing', 'Match highlighting'],
    lastUpdated: '2026-07-06',
    features: ['Custom flags', 'Live highlight'],
    howToUse: ['Enter Regex', 'Enter test string', 'Click Test'],
    faqs: [],
    relatedSlugs: [],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
    <div style="flex: 1;">
        <label>Regular Expression</label>
        <div style="display: flex; align-items: center; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 4px; padding: 0 0.5rem;">
            <span style="color: var(--text-muted); font-size: 1.2rem;">/</span>
            <input type="text" id="regex-pattern" class="form-input" style="border: none; background: transparent; box-shadow: none;" placeholder="pattern" value="\\d+">
            <span style="color: var(--text-muted); font-size: 1.2rem;">/</span>
            <input type="text" id="regex-flags" class="form-input" style="border: none; background: transparent; box-shadow: none; width: 60px;" placeholder="flags" value="g">
        </div>
    </div>
</div>
<div class="grid-2 gap-4">
    <div>
        <label>Test String</label>
        <textarea id="regex-input" class="form-input" style="height: 250px; font-family: monospace;" placeholder="Enter text to test..."></textarea>
    </div>
    <div>
        <label>Results (Highlighted)</label>
        <div id="regex-output" class="form-input" style="height: 250px; overflow-y: auto; background: var(--bg-secondary); white-space: pre-wrap; word-wrap: break-word;"></div>
    </div>
</div>
<div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center;">
    <button id="test-regex-btn" class="btn btn-primary">Test Regex</button>
    <button id="clear-regex-btn" class="btn btn-secondary">Clear</button>
    <span id="regex-status" style="margin-left: 1rem; font-weight: bold;"></span>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/regex-tester.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/regex-tester.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/regex-tester.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
`,
    toolScript: `(function() {
        document.getElementById('test-regex-btn').addEventListener('click', () => {
            const pattern = document.getElementById('regex-pattern').value;
            const flags = document.getElementById('regex-flags').value;
            const text = document.getElementById('regex-input').value;
            const status = document.getElementById('regex-status');
            const output = document.getElementById('regex-output');
            
            if(!pattern) return;
            
            try {
                const re = new RegExp(pattern, flags);
                let matchCount = 0;
                
                // Escape HTML for safe display
                function escapeHtml(unsafe) {
                    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                }
                
                if (flags.includes('g')) {
                    const matches = text.match(re);
                    matchCount = matches ? matches.length : 0;
                    
                    let resultHtml = escapeHtml(text);
                    if (matchCount > 0) {
                        resultHtml = escapeHtml(text).replace(new RegExp(pattern, flags), (m) => {
                            return \`<mark style="background: yellow; color: black; border-radius: 2px;">\${escapeHtml(m)}</mark>\`;
                        });
                    }
                    output.innerHTML = resultHtml;
                } else {
                    const match = text.match(re);
                    matchCount = match ? 1 : 0;
                    if (matchCount > 0) {
                        const m = match[0];
                        const start = match.index;
                        const end = start + m.length;
                        const before = text.substring(0, start);
                        const after = text.substring(end);
                        output.innerHTML = escapeHtml(before) + \`<mark style="background: yellow; color: black; border-radius: 2px;">\${escapeHtml(m)}</mark>\` + escapeHtml(after);
                    } else {
                        output.innerHTML = escapeHtml(text);
                    }
                }
                
                status.textContent = \`Found \${matchCount} match(es)\`;
                status.style.color = matchCount > 0 ? 'green' : 'var(--text-color)';
            } catch(e) {
                output.innerHTML = '';
                status.textContent = 'Invalid Regex: ' + e.message;
                status.style.color = 'red';
            }
        });
        
        document.getElementById('clear-regex-btn').addEventListener('click', () => {
            document.getElementById('regex-pattern').value = '';
            document.getElementById('regex-flags').value = '';
            document.getElementById('regex-input').value = '';
            document.getElementById('regex-output').innerHTML = '';
            document.getElementById('regex-status').textContent = '';
        });
    })();`
  }
];
