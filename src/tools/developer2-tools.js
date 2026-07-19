module.exports = [
    {
        slug: 'uuid-generator',
        name: 'UUID Generator',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>',
        shortDesc: 'Generate random UUIDs (v4) quickly and easily.',
        metaTitle: 'UUID Generator - Generate Random UUID v4',
        metaDescription: 'Generate universally unique identifiers (UUID version 4) instantly. Generate single or multiple UUIDs with our free online tool.',
        keywords: ['uuid generator', 'guid generator', 'uuid v4', 'random uuid', 'developer tools'],
        benefits: ['Generates cryptographically strong random values', 'Fast and secure client-side generation', 'Bulk generation support'],
        lastUpdated: '2026-07-06',
        features: ['Single and bulk UUID generation', 'Copy to clipboard', 'No server-side processing'],
        howToUse: ['Select the number of UUIDs you want to generate.', 'Click "Generate".', 'Copy the results to your clipboard.'],
        faqs: [
            { q: 'What is a UUID?', a: 'A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems.' },
            { q: 'Is this UUID v4?', a: 'Yes, this tool generates version 4 UUIDs which are created using random numbers.' }
        ],
        relatedSlugs: ['hash-generator', 'timestamp-converter'],
        hasDownload: false,
        hasCopy: true,
        toolHTML: `
        <div class="tool-group">
            <label for="uuid-count">Number of UUIDs to generate:</label>
            <input type="number" id="uuid-count" class="tool-input" min="1" max="1000" value="1">
            <button id="generate-uuid-btn" class="btn btn-primary" style="margin-top: 1rem;">Generate UUIDs</button>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem;">
            <label for="uuid-output">Generated UUIDs:</label>
            <textarea id="uuid-output" class="tool-textarea" rows="10" readonly></textarea>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/uuid-generator.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/uuid-generator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/uuid-generator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const countInput = document.getElementById('uuid-count');
            const generateBtn = document.getElementById('generate-uuid-btn');
            const outputArea = document.getElementById('uuid-output');
            
            function generateUUIDs() {
                const count = Math.min(Math.max(parseInt(countInput.value) || 1, 1), 1000);
                let uuids = [];
                for(let i=0; i<count; i++) {
                    uuids.push(crypto.randomUUID());
                }
                outputArea.value = uuids.join('\\n');
                if (window.toolState) window.toolState.output = outputArea.value;
            }
            
            generateBtn.addEventListener('click', generateUUIDs);
            generateUUIDs();
        })();
        `
    },
    {
        slug: 'hash-generator',
        name: 'Hash Generator',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        shortDesc: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly.',
        metaTitle: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512',
        metaDescription: 'Generate secure cryptographic hashes for your strings online. Supports MD5, SHA-1, SHA-256, and SHA-512 algorithms.',
        keywords: ['hash generator', 'md5 hash', 'sha256 hash', 'sha1 generator', 'sha512 generator', 'crypto hash'],
        benefits: ['Real-time hashing as you type', 'Supports multiple algorithms', 'Client-side processing only'],
        lastUpdated: '2026-07-06',
        features: ['MD5 generation via CryptoJS', 'SHA-1, SHA-256, SHA-512 via Native Web Crypto API', 'Auto-update on typing'],
        howToUse: ['Enter your text in the input box.', 'The hashes will be generated automatically.', 'Click "Copy" to copy a hash.'],
        faqs: [
            { q: 'Is the hashing done on the server?', a: 'No, all hashing is performed locally in your browser.' },
            { q: 'Which algorithms are supported?', a: 'MD5, SHA-1, SHA-256, and SHA-512.' }
        ],
        relatedSlugs: ['uuid-generator', 'base64-encode'],
        hasDownload: false,
        hasCopy: true,
        toolHTML: `
        <div class="tool-group">
            <label for="hash-input">Enter Text:</label>
            <textarea id="hash-input" class="tool-textarea" rows="4" placeholder="Enter text to hash..."></textarea>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <label>MD5:</label>
                <div class="input-with-button">
                    <input type="text" id="hash-md5" class="tool-input" readonly>
                    <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('hash-md5').value)">Copy</button>
                </div>
            </div>
            <div>
                <label>SHA-1:</label>
                <div class="input-with-button">
                    <input type="text" id="hash-sha1" class="tool-input" readonly>
                    <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('hash-sha1').value)">Copy</button>
                </div>
            </div>
            <div>
                <label>SHA-256:</label>
                <div class="input-with-button">
                    <input type="text" id="hash-sha256" class="tool-input" readonly>
                    <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('hash-sha256').value)">Copy</button>
                </div>
            </div>
            <div>
                <label>SHA-512:</label>
                <div class="input-with-button">
                    <input type="text" id="hash-sha512" class="tool-input" readonly>
                    <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('hash-sha512').value)">Copy</button>
                </div>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/hash-generator.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/hash-generator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/hash-generator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const input = document.getElementById('hash-input');
            const md5Out = document.getElementById('hash-md5');
            const sha1Out = document.getElementById('hash-sha1');
            const sha256Out = document.getElementById('hash-sha256');
            const sha512Out = document.getElementById('hash-sha512');
            
            async function generateHashes() {
                const text = input.value;
                if (!text) {
                    md5Out.value = '';
                    sha1Out.value = '';
                    sha256Out.value = '';
                    sha512Out.value = '';
                    return;
                }
                
                try {
                    if (window.CryptoJS && window.CryptoJS.MD5) {
                        md5Out.value = window.CryptoJS.MD5(text).toString();
                    } else {
                        md5Out.value = 'CryptoJS not loaded';
                    }
                    
                    const encoder = new TextEncoder();
                    const data = encoder.encode(text);
                    
                    const hashBuffer1 = await crypto.subtle.digest('SHA-1', data);
                    const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
                    sha1Out.value = hashArray1.map(b => b.toString(16).padStart(2, '0')).join('');
                    
                    const hashBuffer256 = await crypto.subtle.digest('SHA-256', data);
                    const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
                    sha256Out.value = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');
                    
                    const hashBuffer512 = await crypto.subtle.digest('SHA-512', data);
                    const hashArray512 = Array.from(new Uint8Array(hashBuffer512));
                    sha512Out.value = hashArray512.map(b => b.toString(16).padStart(2, '0')).join('');
                    
                } catch (e) {
                    console.error("Hashing error", e);
                }
            }
            
            input.addEventListener('input', generateHashes);
        })();
        `
    },
    {
        slug: 'base64-encode',
        name: 'Base64 Encode',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        shortDesc: 'Encode text to Base64 format.',
        metaTitle: 'Base64 Encoder - Encode Text to Base64 Online',
        metaDescription: 'Free online tool to encode plain text into Base64 format. Fast, secure, and works entirely in your browser.',
        keywords: ['base64 encode', 'text to base64', 'base64 encoder', 'online base64 tool'],
        benefits: ['Real-time encoding', 'Client-side processing', 'Easy to use'],
        lastUpdated: '2026-07-06',
        features: ['Native btoa() implementation', 'Copy result easily'],
        howToUse: ['Paste or type text into the input field.', 'The Base64 encoded result will appear automatically.', 'Click "Copy" to save it.'],
        faqs: [
            { q: 'Is my data sent to a server?', a: 'No, encoding happens locally in your browser.' }
        ],
        relatedSlugs: ['base64-decode', 'url-encode-decode'],
        hasDownload: false,
        hasCopy: true,
        toolHTML: `
        <div class="tool-group">
            <label for="b64enc-input">Plain Text:</label>
            <textarea id="b64enc-input" class="tool-textarea" rows="6" placeholder="Enter text to encode..."></textarea>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem;">
            <label for="b64enc-output">Base64 Encoded Output:</label>
            <textarea id="b64enc-output" class="tool-textarea" rows="6" readonly></textarea>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/base64-encode.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/base64-encode.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/base64-encode.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const input = document.getElementById('b64enc-input');
            const output = document.getElementById('b64enc-output');
            
            input.addEventListener('input', function() {
                try {
                    const text = unescape(encodeURIComponent(input.value));
                    output.value = btoa(text);
                    if (window.toolState) window.toolState.output = output.value;
                } catch (e) {
                    output.value = 'Error encoding text.';
                }
            });
        })();
        `
    },
    {
        slug: 'base64-decode',
        name: 'Base64 Decode',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
        shortDesc: 'Decode Base64 format to plain text.',
        metaTitle: 'Base64 Decoder - Decode Base64 to Text Online',
        metaDescription: 'Free online tool to decode Base64 encoded strings into plain text. Fast, secure, and works entirely in your browser.',
        keywords: ['base64 decode', 'base64 to text', 'base64 decoder', 'online base64 tool'],
        benefits: ['Real-time decoding', 'Handles Unicode properly', 'Client-side only'],
        lastUpdated: '2026-07-06',
        features: ['Native atob() implementation', 'Robust error handling for invalid strings'],
        howToUse: ['Paste your Base64 string into the input field.', 'The plain text will appear automatically.', 'Copy the result if needed.'],
        faqs: [
            { q: 'Can it handle unicode characters?', a: 'Yes, it decodes properly formatted UTF-8 encoded Base64 strings.' }
        ],
        relatedSlugs: ['base64-encode', 'jwt-decoder'],
        hasDownload: false,
        hasCopy: true,
        toolHTML: `
        <div class="tool-group">
            <label for="b64dec-input">Base64 Encoded Text:</label>
            <textarea id="b64dec-input" class="tool-textarea" rows="6" placeholder="Enter Base64 string..."></textarea>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem;">
            <label for="b64dec-output">Plain Text Output:</label>
            <textarea id="b64dec-output" class="tool-textarea" rows="6" readonly></textarea>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/base64-decode.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/base64-decode.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/base64-decode.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const input = document.getElementById('b64dec-input');
            const output = document.getElementById('b64dec-output');
            
            input.addEventListener('input', function() {
                try {
                    if (!input.value.trim()) {
                        output.value = '';
                        return;
                    }
                    const text = atob(input.value.trim());
                    output.value = decodeURIComponent(escape(text));
                    if (window.toolState) window.toolState.output = output.value;
                } catch (e) {
                    output.value = 'Invalid Base64 string.';
                }
            });
        })();
        `
    },
    {
        slug: 'url-encode-decode',
        name: 'URL Encode / Decode',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        shortDesc: 'Encode or decode URL components easily.',
        metaTitle: 'URL Encoder and Decoder - Online Tool',
        metaDescription: 'Free online tool to encode and decode URLs and URI components using native browser functions.',
        keywords: ['url encode', 'url decode', 'uri encode', 'url encoder online'],
        benefits: ['Switch easily between encoding and decoding', 'Real-time processing'],
        lastUpdated: '2026-07-06',
        features: ['Native encodeURIComponent / decodeURIComponent', 'Real-time output updates'],
        howToUse: ['Select whether you want to encode or decode.', 'Paste your text or URL into the input.', 'The result will be generated instantly.'],
        faqs: [
            { q: 'What function does this use?', a: 'It uses encodeURIComponent() and decodeURIComponent() to properly handle all characters.' }
        ],
        relatedSlugs: ['base64-encode', 'hash-generator'],
        hasDownload: false,
        hasCopy: true,
        toolHTML: `
        <div class="tool-group" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="radio" name="url-mode" value="encode" checked> Encode</label>
            <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="radio" name="url-mode" value="decode"> Decode</label>
        </div>
        <div class="tool-group">
            <label for="url-input">Input:</label>
            <textarea id="url-input" class="tool-textarea" rows="5" placeholder="Enter string..."></textarea>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem;">
            <label for="url-output">Output:</label>
            <textarea id="url-output" class="tool-textarea" rows="5" readonly></textarea>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/url-encode-decode.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/url-encode-decode.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/url-encode-decode.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const input = document.getElementById('url-input');
            const output = document.getElementById('url-output');
            const radios = document.querySelectorAll('input[name="url-mode"]');
            
            function processUrl() {
                const mode = document.querySelector('input[name="url-mode"]:checked').value;
                try {
                    if (!input.value) {
                        output.value = '';
                        return;
                    }
                    if (mode === 'encode') {
                        output.value = encodeURIComponent(input.value);
                    } else {
                        output.value = decodeURIComponent(input.value);
                    }
                    if (window.toolState) window.toolState.output = output.value;
                } catch (e) {
                    output.value = 'Error processing URL.';
                }
            }
            
            input.addEventListener('input', processUrl);
            radios.forEach(r => r.addEventListener('change', processUrl));
        })();
        `
    },
    {
        slug: 'jwt-decoder',
        name: 'JWT Decoder',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg>',
        shortDesc: 'Decode JSON Web Tokens (JWT) payload instantly.',
        metaTitle: 'JWT Decoder - Decode JSON Web Tokens',
        metaDescription: 'Free online tool to decode JWT (JSON Web Token) payload. View header and payload data without server verification.',
        keywords: ['jwt decoder', 'decode jwt', 'jwt parser', 'json web token tool'],
        benefits: ['Parses Header and Payload safely', 'Pretty prints JSON output'],
        lastUpdated: '2026-07-06',
        features: ['Splits JWT into parts', 'Decodes Base64Url', 'Formats JSON'],
        howToUse: ['Paste your JWT string.', 'View the decoded Header and Payload below.'],
        faqs: [
            { q: 'Does this tool verify the signature?', a: 'No, this tool decodes the JWT only and does not verify authenticity.' }
        ],
        relatedSlugs: ['base64-decode', 'hash-generator'],
        hasDownload: false,
        hasCopy: true,
        toolHTML: `
        <div class="alert alert-warning" style="margin-bottom: 1rem; padding: 1rem; background: #fff3cd; color: #856404; border-radius: 4px; border: 1px solid #ffeeba;">
            <strong>Note:</strong> This tool decodes JWT only and does not verify authenticity. Do not share sensitive tokens.
        </div>
        <div class="tool-group">
            <label for="jwt-input">Enter JWT:</label>
            <textarea id="jwt-input" class="tool-textarea" rows="4" placeholder="eyJhbGciOiJIUzI1..."></textarea>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem;">
            <label>Header (Algorithm & Type):</label>
            <textarea id="jwt-header" class="tool-textarea" rows="4" readonly style="font-family: monospace;"></textarea>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem;">
            <label>Payload (Data):</label>
            <textarea id="jwt-payload" class="tool-textarea" rows="8" readonly style="font-family: monospace;"></textarea>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/jwt-decoder.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/jwt-decoder.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/jwt-decoder.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const input = document.getElementById('jwt-input');
            const headerOut = document.getElementById('jwt-header');
            const payloadOut = document.getElementById('jwt-payload');
            
            function decodeBase64Url(str) {
                let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                let pad = base64.length % 4;
                if(pad) {
                    if(pad === 1) throw new Error('InvalidLengthError');
                    base64 += new Array(5-pad).join('=');
                }
                return decodeURIComponent(escape(atob(base64)));
            }
            
            input.addEventListener('input', function() {
                const token = input.value.trim();
                if(!token) {
                    headerOut.value = '';
                    payloadOut.value = '';
                    return;
                }
                const parts = token.split('.');
                if(parts.length !== 3) {
                    headerOut.value = 'Invalid JWT format.';
                    payloadOut.value = '';
                    return;
                }
                
                try {
                    const headerObj = JSON.parse(decodeBase64Url(parts[0]));
                    headerOut.value = JSON.stringify(headerObj, null, 2);
                } catch(e) {
                    headerOut.value = 'Error decoding header.';
                }
                
                try {
                    const payloadObj = JSON.parse(decodeBase64Url(parts[1]));
                    payloadOut.value = JSON.stringify(payloadObj, null, 2);
                    if (window.toolState) window.toolState.output = payloadOut.value;
                } catch(e) {
                    payloadOut.value = 'Error decoding payload.';
                }
            });
        })();
        `
    },
    {
        slug: 'timestamp-converter',
        name: 'Unix Timestamp Converter',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        shortDesc: 'Convert Unix timestamps to dates and vice versa.',
        metaTitle: 'Unix Timestamp Converter - Epoch to Date',
        metaDescription: 'Convert epoch Unix timestamps to human-readable dates, and convert dates back to Unix timestamps online.',
        keywords: ['timestamp converter', 'unix epoch', 'epoch converter', 'date to timestamp'],
        benefits: ['Supports milliseconds and seconds', 'Local and UTC time formats'],
        lastUpdated: '2026-07-06',
        features: ['Convert Timestamp to Date', 'Convert Date to Timestamp', 'Current Timestamp generation'],
        howToUse: ['Enter a timestamp to see the formatted date.', 'Or select a date to generate a timestamp.'],
        faqs: [
            { q: 'What is a Unix Timestamp?', a: 'It is the number of seconds (or milliseconds) that have elapsed since January 1, 1970 (midnight UTC/GMT).' }
        ],
        relatedSlugs: ['uuid-generator'],
        hasDownload: false,
        hasCopy: false,
        toolHTML: `
        <div class="tool-group" style="margin-bottom: 2rem;">
            <h3>Current Epoch Time</h3>
            <div class="input-with-button" style="max-width: 300px;">
                <input type="text" id="current-ts" class="tool-input" readonly>
                <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('current-ts').value)">Copy</button>
            </div>
        </div>
        <div class="tool-group" style="margin-bottom: 2rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: 8px;">
            <h3>Timestamp to Date</h3>
            <label>Unix Timestamp (seconds or ms):</label>
            <input type="number" id="ts-input" class="tool-input" placeholder="e.g. 1704067200">
            <div style="margin-top: 1rem;">
                <p><strong>Local Time:</strong> <span id="ts-local-out">-</span></p>
                <p><strong>UTC Time:</strong> <span id="ts-utc-out">-</span></p>
            </div>
        </div>
        <div class="tool-group" style="padding: 1.5rem; background: var(--bg-secondary); border-radius: 8px;">
            <h3>Date to Timestamp</h3>
            <label>Select Date & Time (Local):</label>
            <input type="datetime-local" id="date-input" class="tool-input">
            <div style="margin-top: 1rem;">
                <p><strong>Timestamp (Seconds):</strong> <span id="date-sec-out">-</span></p>
                <p><strong>Timestamp (Milliseconds):</strong> <span id="date-ms-out">-</span></p>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/timestamp-converter.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/timestamp-converter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/timestamp-converter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const currentTs = document.getElementById('current-ts');
            const tsInput = document.getElementById('ts-input');
            const tsLocalOut = document.getElementById('ts-local-out');
            const tsUtcOut = document.getElementById('ts-utc-out');
            const dateInput = document.getElementById('date-input');
            const dateSecOut = document.getElementById('date-sec-out');
            const dateMsOut = document.getElementById('date-ms-out');
            
            // Update current TS
            setInterval(() => {
                currentTs.value = Math.floor(Date.now() / 1000);
            }, 1000);
            currentTs.value = Math.floor(Date.now() / 1000);
            
            tsInput.addEventListener('input', () => {
                let val = parseInt(tsInput.value);
                if (isNaN(val)) {
                    tsLocalOut.textContent = '-';
                    tsUtcOut.textContent = '-';
                    return;
                }
                // Guess if seconds or ms
                if (val < 10000000000) val *= 1000; 
                const d = new Date(val);
                tsLocalOut.textContent = d.toLocaleString();
                tsUtcOut.textContent = d.toUTCString();
            });
            
            dateInput.addEventListener('input', () => {
                if (!dateInput.value) {
                    dateSecOut.textContent = '-';
                    dateMsOut.textContent = '-';
                    return;
                }
                const d = new Date(dateInput.value);
                const ms = d.getTime();
                dateMsOut.textContent = ms;
                dateSecOut.textContent = Math.floor(ms / 1000);
            });
        })();
        `
    },
    {
        slug: 'qr-code-generator',
        name: 'QR Code Generator',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>',
        shortDesc: 'Generate customizable QR codes for links, text, and data.',
        metaTitle: 'QR Code Generator - Create Free QR Codes Online',
        metaDescription: 'Generate customized QR codes instantly for URLs, text, and contact info. Free online QR code creator with download option.',
        keywords: ['qr code generator', 'create qr code', 'free qr code', 'url to qr code'],
        benefits: ['Instant generation', 'Download as Image', 'High quality rendering'],
        lastUpdated: '2026-07-06',
        features: ['Uses QRCode.js library', 'Generates standard QR format', 'Downloadable output'],
        howToUse: ['Enter the text or URL you want to convert.', 'The QR code will appear automatically.', 'Click Download to save the image.'],
        faqs: [
            { q: 'Do these QR codes expire?', a: 'No, these are static QR codes containing the raw data, so they never expire.' }
        ],
        relatedSlugs: ['barcode-generator', 'url-encode-decode'],
        hasDownload: true,
        hasCopy: false,
        toolHTML: `
        <div class="tool-group">
            <label for="qr-input">Enter URL or Text:</label>
            <textarea id="qr-input" class="tool-textarea" rows="3" placeholder="https://example.com"></textarea>
        </div>
        <div class="tool-group" style="margin-top: 1.5rem; text-align: center;">
            <div id="qrcode-container" style="display: inline-block; padding: 1rem; background: #fff; border-radius: 8px;"></div>
            <div style="margin-top: 1rem;">
                <button id="qr-download-btn" class="btn btn-primary" style="display: none;">Download QR Code</button>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/qr-code-generator.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/qr-code-generator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/qr-code-generator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const input = document.getElementById('qr-input');
            const container = document.getElementById('qrcode-container');
            const downloadBtn = document.getElementById('qr-download-btn');
            let qrCodeObj = null;

            function generateQR() {
                container.innerHTML = '';
                const text = input.value.trim();
                if (!text) {
                    downloadBtn.style.display = 'none';
                    return;
                }
                
                if (window.QRCode) {
                    qrCodeObj = new QRCode(container, {
                        text: text,
                        width: 256,
                        height: 256,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    setTimeout(() => {
                        downloadBtn.style.display = 'inline-block';
                    }, 100);
                } else {
                    container.innerHTML = '<p style="color:red;">QRCode library not loaded</p>';
                }
            }

            input.addEventListener('input', generateQR);
            
            downloadBtn.addEventListener('click', () => {
                const img = container.querySelector('img');
                const canvas = container.querySelector('canvas');
                let url = '';
                if (img && img.src) {
                    url = img.src;
                } else if (canvas) {
                    url = canvas.toDataURL("image/png");
                }
                
                if (url) {
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'qrcode.png';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
        })();
        `
    },
    {
        slug: 'barcode-generator',
        name: 'Barcode Generator',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-barcode"><path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/></svg>',
        shortDesc: 'Generate standard barcodes instantly.',
        metaTitle: 'Barcode Generator - Create Code128 Barcodes Online',
        metaDescription: 'Free online tool to generate standard Code128 barcodes from text or numbers. Download as high-quality image.',
        keywords: ['barcode generator', 'create barcode', 'code128 generator', 'free barcode maker'],
        benefits: ['Supports standard Code128', 'Instant rendering', 'High-quality export'],
        lastUpdated: '2026-07-06',
        features: ['Uses JsBarcode library', 'Live preview', 'PNG download'],
        howToUse: ['Type numbers or text.', 'The barcode generates instantly.', 'Click download to save it.'],
        faqs: [
            { q: 'Which barcode format is used?', a: 'By default, it uses Code128 which supports alphanumeric characters.' }
        ],
        relatedSlugs: ['qr-code-generator'],
        hasDownload: true,
        hasCopy: false,
        toolHTML: `
        <div class="tool-group">
            <label for="barcode-input">Enter Text or Numbers:</label>
            <input type="text" id="barcode-input" class="tool-input" placeholder="e.g. 1234567890">
        </div>
        <div class="tool-group" style="margin-top: 1.5rem; text-align: center;">
            <div style="padding: 1rem; background: #fff; border-radius: 8px; display: inline-block;">
                <canvas id="barcode-canvas"></canvas>
            </div>
            <div style="margin-top: 1rem;">
                <button id="barcode-download-btn" class="btn btn-primary" style="display: none;">Download Barcode</button>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/barcode-generator.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/barcode-generator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/barcode-generator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const input = document.getElementById('barcode-input');
            const canvas = document.getElementById('barcode-canvas');
            const downloadBtn = document.getElementById('barcode-download-btn');

            function generateBarcode() {
                const text = input.value.trim();
                if (!text) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    downloadBtn.style.display = 'none';
                    return;
                }
                
                if (window.JsBarcode) {
                    try {
                        window.JsBarcode(canvas, text, {
                            format: "CODE128",
                            lineColor: "#000",
                            width: 2,
                            height: 100,
                            displayValue: true
                        });
                        downloadBtn.style.display = 'inline-block';
                    } catch(e) {
                        console.error('Barcode error', e);
                    }
                }
            }

            input.addEventListener('input', generateBarcode);
            
            downloadBtn.addEventListener('click', () => {
                const url = canvas.toDataURL("image/png");
                const a = document.createElement('a');
                a.href = url;
                a.download = 'barcode.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        })();
        `
    },
    {
        slug: 'color-converter',
        name: 'Color Picker & Converter',
        category: 'developer',
        categoryName: 'Developer Tools',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
        shortDesc: 'Pick colors and convert between HEX, RGB, HSL, and CMYK.',
        metaTitle: 'Color Converter - HEX, RGB, HSL, CMYK',
        metaDescription: 'Pick any color and instantly convert its values to HEX, RGB, HSL, and CMYK formats. Great tool for web developers and designers.',
        keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'color picker online', 'hex to hsl', 'cmyk converter'],
        benefits: ['Native color picker integration', 'Accurate conversions', 'Easy copying of formats'],
        lastUpdated: '2026-07-06',
        features: ['HTML5 Color Input', 'RGB & HSL Parsing', 'CMYK estimation'],
        howToUse: ['Click the color box to open the picker.', 'Alternatively, type a HEX code.', 'View and copy the converted values below.'],
        faqs: [
            { q: 'Is CMYK exact?', a: 'CMYK conversion is an estimation based on RGB values and may differ slightly depending on color profiles.' }
        ],
        relatedSlugs: ['hash-generator', 'base64-encode'],
        hasDownload: false,
        hasCopy: true,
        toolHTML: `
        <div class="tool-group" style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem;">
            <div>
                <label>Pick a Color:</label>
                <input type="color" id="color-picker" value="#3b82f6" style="width: 100px; height: 100px; cursor: pointer; border: none; border-radius: 8px; padding: 0;">
            </div>
            <div style="flex-grow: 1;">
                <label>HEX Code:</label>
                <input type="text" id="color-hex" class="tool-input" value="#3b82f6" style="text-transform: uppercase;">
            </div>
        </div>
        <div class="tool-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <label>RGB:</label>
                <div class="input-with-button">
                    <input type="text" id="color-rgb" class="tool-input" readonly>
                    <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('color-rgb').value)">Copy</button>
                </div>
            </div>
            <div>
                <label>HSL:</label>
                <div class="input-with-button">
                    <input type="text" id="color-hsl" class="tool-input" readonly>
                    <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('color-hsl').value)">Copy</button>
                </div>
            </div>
            <div style="grid-column: 1 / -1;">
                <label>CMYK:</label>
                <div class="input-with-button">
                    <input type="text" id="color-cmyk" class="tool-input" readonly>
                    <button class="btn btn-secondary" onclick="window.copyToClipboard(document.getElementById('color-cmyk').value)">Copy</button>
                </div>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/color-converter.html')">🔗 Copy URL</button>
            <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/color-converter.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/color-converter.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
            <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
        </div>
        `,
        toolScript: `
        (function() {
            const picker = document.getElementById('color-picker');
            const hexInput = document.getElementById('color-hex');
            const rgbOut = document.getElementById('color-rgb');
            const hslOut = document.getElementById('color-hsl');
            const cmykOut = document.getElementById('color-cmyk');

            function hexToRgb(hex) {
                let result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }

            function rgbToHsl(r, g, b) {
                r /= 255, g /= 255, b /= 255;
                let max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                if(max == min){
                    h = s = 0; // achromatic
                } else {
                    let d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch(max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
            }
            
            function rgbToCmyk(r, g, b) {
                let c = 1 - (r / 255);
                let m = 1 - (g / 255);
                let y = 1 - (b / 255);
                let k = Math.min(c, Math.min(m, y));
                if (k === 1) {
                    return { c: 0, m: 0, y: 0, k: 100 };
                }
                c = Math.round(((c - k) / (1 - k)) * 100);
                m = Math.round(((m - k) / (1 - k)) * 100);
                y = Math.round(((y - k) / (1 - k)) * 100);
                k = Math.round(k * 100);
                return { c, m, y, k };
            }

            function updateColors(hexStr) {
                const rgb = hexToRgb(hexStr);
                if (rgb) {
                    rgbOut.value = \`rgb(\${rgb.r}, \${rgb.g}, \${rgb.b})\`;
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    hslOut.value = \`hsl(\${hsl.h}, \${hsl.s}%, \${hsl.l}%)\`;
                    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
                    cmykOut.value = \`cmyk(\${cmyk.c}%, \${cmyk.m}%, \${cmyk.y}%, \${cmyk.k}%)\`;
                } else {
                    rgbOut.value = '';
                    hslOut.value = '';
                    cmykOut.value = '';
                }
            }

            picker.addEventListener('input', (e) => {
                hexInput.value = e.target.value;
                updateColors(e.target.value);
            });

            hexInput.addEventListener('input', (e) => {
                let val = e.target.value;
                if (!val.startsWith('#')) val = '#' + val;
                if (/^#[0-9A-F]{6}$/i.test(val)) {
                    picker.value = val;
                    updateColors(val);
                }
            });

            updateColors(picker.value);
        })();
        `
    }
];
