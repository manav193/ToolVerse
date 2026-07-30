const textTools = [
{
  "slug": "word-counter",
  "name": "Word Counter",
  "category": "text",
  "categoryName": "Text Tools",
  "icon": "📝",
  "shortDesc": "Count words, characters, sentences and paragraphs instantly",
  "metaTitle": "Word Counter - Free Online Word Count Tool | ToolVerse",
  "metaDescription": "Count words, characters, sentences, and paragraphs instantly with our free online Word Counter tool. Get reading time estimates and detailed text statistics.",
  "keywords": "word counter, character counter, word count online, text statistics",
  "toolHTML": "\n        <div class=\"tool-input-area\">\n          <label class=\"form-label\" for=\"wc-input\">Type or paste your text below:</label>\n          <textarea id=\"wc-input\" class=\"form-input\" rows=\"10\" placeholder=\"Enter your text here...\"></textarea>\n        </div>\n        <div class=\"tool-actions\" style=\"margin-bottom: 2rem;\">\n          <button id=\"wc-clear\" class=\"btn btn-secondary\">Clear Text</button>\n          <button id=\"wc-copy\" class=\"btn btn-primary\">Copy Stats</button>\n        </div>\n        <div class=\"stats-grid\">\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"wc-words\">0</div><div class=\"stat-label\">Words</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"wc-chars\">0</div><div class=\"stat-label\">Characters</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"wc-sentences\">0</div><div class=\"stat-label\">Sentences</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"wc-paragraphs\">0</div><div class=\"stat-label\">Paragraphs</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"wc-read-time\">0m</div><div class=\"stat-label\">Reading Time</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"wc-speak-time\">0m</div><div class=\"stat-label\">Speaking Time</div></div>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const input = document.getElementById('wc-input');\n          const btnClear = document.getElementById('wc-clear');\n          const btnCopy = document.getElementById('wc-copy');\n          \n          const elWords = document.getElementById('wc-words');\n          const elChars = document.getElementById('wc-chars');\n          const elSentences = document.getElementById('wc-sentences');\n          const elParagraphs = document.getElementById('wc-paragraphs');\n          const elReadTime = document.getElementById('wc-read-time');\n          const elSpeakTime = document.getElementById('wc-speak-time');\n\n          function countStats() {\n            const text = input.value;\n            const words = text.trim() ? text.trim().split(/\\s+/).length : 0;\n            const chars = text.length;\n            const sentences = text.trim() ? (text.match(/[.!?]+(?=\\s|$)/g) || []).length : 0;\n            const paragraphs = text.trim() ? text.trim().split(/\\n\\s*\\n/).length : 0;\n            \n            elWords.textContent = words;\n            elChars.textContent = chars;\n            elSentences.textContent = sentences || (text.trim() ? 1 : 0);\n            elParagraphs.textContent = paragraphs;\n            \n            // Average reading speed: 200 words/min\n            // Average speaking speed: 130 words/min\n            const readMins = Math.ceil(words / 200);\n            const speakMins = Math.ceil(words / 130);\n            \n            elReadTime.textContent = readMins + 'm';\n            elSpeakTime.textContent = speakMins + 'm';\n          }\n\n          input.addEventListener('input', countStats);\n          \n          btnClear.addEventListener('click', () => {\n            input.value = '';\n            countStats();\n          });\n          \n          btnCopy.addEventListener('click', () => {\n            const stats = `Words: ${elWords.textContent}\\nCharacters: ${elChars.textContent}\\nSentences: ${elSentences.textContent}\\nParagraphs: ${elParagraphs.textContent}\\nReading Time: ${elReadTime.textContent}`;\n            if (window.copyToClipboard) window.copyToClipboard(stats);\n          });\n        })();\n      ",
  "howToUse": [
    "Paste or type your text in the input area above.",
    "As you type, the tool will automatically update the counts for words, characters, sentences, and paragraphs.",
    "View the estimated reading time and speaking time based on standard averages.",
    "Click the \"Copy Stats\" button to copy the results to your clipboard."
  ],
  "faqs": [
    {
      "q": "Is this word counter free?",
      "a": "Yes, it is completely free to use with no hidden limits or restrictions."
    },
    {
      "q": "Does it count spaces as characters?",
      "a": "Yes, the main character count includes spaces. We also offer a dedicated Character Counter tool for more detailed stats."
    },
    {
      "q": "Is my text safe?",
      "a": "Absolutely. The word counting happens entirely in your browser. We do not save or upload any text you paste."
    }
  ],
  "relatedSlugs": [
    "character-counter",
    "case-converter"
  ],
  "features": [
    "Real-time counting",
    "Reading time estimate",
    "Paragraph detection"
  ],
  "hasDownload": false,
  "hasCopy": true,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Enhances writing productivity",
    "Provides precise text metrics",
    "Ensures content length compliance"
  ]
},
{
  "slug": "character-counter",
  "name": "Character Counter",
  "category": "text",
  "categoryName": "Text Tools",
  "icon": "📝",
  "shortDesc": "Count characters with or without spaces and get detailed text density",
  "metaTitle": "Character Counter - Free Online Character Count | ToolVerse",
  "metaDescription": "Accurately count characters with or without spaces, lines, and bytes. Analyze character density with our free online character counter tool.",
  "keywords": "character counter, character count, letter counter, character density, count letters online",
  "toolHTML": "\n        <div class=\"tool-input-area\">\n          <label class=\"form-label\" for=\"cc-input\">Type or paste your text below:</label>\n          <textarea id=\"cc-input\" class=\"form-input\" rows=\"8\" placeholder=\"Enter your text here...\"></textarea>\n        </div>\n        <div class=\"tool-actions\" style=\"margin-bottom: 2rem;\">\n          <button id=\"cc-clear\" class=\"btn btn-secondary\">Clear Text</button>\n          <button id=\"cc-copy\" class=\"btn btn-primary\">Copy Stats</button>\n        </div>\n        <div class=\"stats-grid\">\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"cc-with-spaces\">0</div><div class=\"stat-label\">Characters (With Spaces)</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"cc-no-spaces\">0</div><div class=\"stat-label\">Characters (No Spaces)</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"cc-words\">0</div><div class=\"stat-label\">Words</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"cc-bytes\">0</div><div class=\"stat-label\">Bytes (UTF-8)</div></div>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const input = document.getElementById('cc-input');\n          const btnClear = document.getElementById('cc-clear');\n          const btnCopy = document.getElementById('cc-copy');\n          \n          const elWithSpaces = document.getElementById('cc-with-spaces');\n          const elNoSpaces = document.getElementById('cc-no-spaces');\n          const elWords = document.getElementById('cc-words');\n          const elBytes = document.getElementById('cc-bytes');\n\n          function countStats() {\n            const text = input.value;\n            elWithSpaces.textContent = text.length;\n            elNoSpaces.textContent = text.replace(/\\s/g, '').length;\n            elWords.textContent = text.trim() ? text.trim().split(/\\s+/).length : 0;\n            elBytes.textContent = new Blob([text]).size;\n          }\n\n          input.addEventListener('input', countStats);\n          \n          btnClear.addEventListener('click', () => {\n            input.value = '';\n            countStats();\n          });\n          \n          btnCopy.addEventListener('click', () => {\n            const stats = `Characters (with spaces): ${elWithSpaces.textContent}\\nCharacters (no spaces): ${elNoSpaces.textContent}\\nWords: ${elWords.textContent}\\nBytes: ${elBytes.textContent}`;\n            if (window.copyToClipboard) window.copyToClipboard(stats);\n          });\n        })();\n      ",
  "howToUse": [
    "Paste or type your text into the text area.",
    "View the real-time statistics including characters with and without spaces.",
    "Check the byte size for data limit constraints.",
    "Click \"Copy Stats\" to copy the results."
  ],
  "faqs": [
    {
      "q": "Is there a limit to how many characters I can count?",
      "a": "No, you can paste as much text as your browser can handle."
    },
    {
      "q": "Why do I need to know the byte size?",
      "a": "Some databases and SMS services have byte limits rather than character limits, especially when using emojis or special characters."
    }
  ],
  "relatedSlugs": [
    "word-counter",
    "case-converter"
  ],
  "features": [
    "Counts spaces separately",
    "UTF-8 Byte size calculation",
    "Fast and real-time"
  ],
  "hasDownload": false,
  "hasCopy": true,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Helps meet strict character limits",
    "Provides instant byte size for data limits",
    "Differentiates spaces for accurate counts"
  ]
},
{
  "slug": "case-converter",
  "name": "Case Converter",
  "category": "text",
  "categoryName": "Text Tools",
  "icon": "📝",
  "shortDesc": "Easily convert text to uppercase, lowercase, title case, and more",
  "metaTitle": "Case Converter - Change Text to Uppercase, Lowercase & Title Case | ToolVerse",
  "metaDescription": "Free online tool to convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more.",
  "keywords": "case converter, uppercase to lowercase, title case converter, text case change",
  "toolHTML": "\n        <div class=\"tool-input-area\">\n          <label class=\"form-label\" for=\"case-input\">Enter your text:</label>\n          <textarea id=\"case-input\" class=\"form-input\" rows=\"6\" placeholder=\"Enter your text here...\"></textarea>\n        </div>\n        <div class=\"tool-actions\" style=\"margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: 0.5rem;\">\n          <button class=\"btn btn-secondary\" data-action=\"upper\">UPPERCASE</button>\n          <button class=\"btn btn-secondary\" data-action=\"lower\">lowercase</button>\n          <button class=\"btn btn-secondary\" data-action=\"title\">Title Case</button>\n          <button class=\"btn btn-secondary\" data-action=\"sentence\">Sentence case</button>\n          <button class=\"btn btn-secondary\" data-action=\"camel\">camelCase</button>\n          <button class=\"btn btn-secondary\" data-action=\"snake\">snake_case</button>\n          <button class=\"btn btn-secondary\" data-action=\"kebab\">kebab-case</button>\n          <button class=\"btn btn-secondary\" data-action=\"pascal\">PascalCase</button>\n        </div>\n        <div class=\"tool-output-area\">\n          <label class=\"form-label\" for=\"case-output\">Result:</label>\n          <textarea id=\"case-output\" class=\"form-input\" rows=\"6\" readonly></textarea>\n        </div>\n        <div class=\"tool-actions\">\n          <button id=\"case-copy\" class=\"btn btn-primary\">Copy Result</button>\n          <button id=\"case-clear\" class=\"btn btn-ghost\">Clear All</button>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const input = document.getElementById('case-input');\n          const output = document.getElementById('case-output');\n          const btns = document.querySelectorAll('[data-action]');\n          const btnCopy = document.getElementById('case-copy');\n          const btnClear = document.getElementById('case-clear');\n\n          const converters = {\n            upper: text => text.toUpperCase(),\n            lower: text => text.toLowerCase(),\n            title: text => text.toLowerCase().replace(/(?:^|[^a-zA-Z0-9'])([a-z])/g, c => c.toUpperCase()),\n            sentence: text => text.toLowerCase().replace(/(^\\s*\\w|[\\.!?]\\s*\\w)/g, c => c.toUpperCase()),\n            camel: text => text.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\\s+/g, ''),\n            snake: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '',\n            kebab: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '',\n            pascal: text => text.match(/[a-z]+/gi)?.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join('') || ''\n          };\n\n          btns.forEach(btn => {\n            btn.addEventListener('click', () => {\n              const action = btn.getAttribute('data-action');\n              if (converters[action]) {\n                output.value = converters[action](input.value);\n              }\n            });\n          });\n\n          btnClear.addEventListener('click', () => {\n            input.value = '';\n            output.value = '';\n          });\n\n          btnCopy.addEventListener('click', () => {\n            if (window.copyToClipboard) window.copyToClipboard(output.value);\n          });\n        })();\n      ",
  "howToUse": [
    "Paste your text into the input field.",
    "Click on the formatting button corresponding to the case you want (e.g., UPPERCASE, lowercase, camelCase).",
    "The converted text will appear in the result box.",
    "Click \"Copy Result\" to copy it to your clipboard."
  ],
  "faqs": [
    {
      "q": "What is camelCase?",
      "a": "camelCase writes compound words without spaces, where each word starts with a capital letter except for the first word. E.g. \"thisIsCamelCase\"."
    },
    {
      "q": "Is this tool safe to use with sensitive data?",
      "a": "Yes. Processing is done in your browser; your text is never sent to our servers."
    }
  ],
  "relatedSlugs": [
    "word-counter",
    "remove-duplicate-lines"
  ],
  "features": [
    "8+ case formatting options",
    "Developer-friendly cases (snake_case, camelCase)",
    "One-click copy"
  ],
  "hasDownload": false,
  "hasCopy": true,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Quickly formats text to desired case",
    "Helps maintain consistent styling",
    "Saves time over manual retyping"
  ]
},
{
  "slug": "remove-duplicate-lines",
  "name": "Remove Duplicate Lines",
  "category": "text",
  "categoryName": "Text Tools",
  "icon": "📝",
  "shortDesc": "Instantly find and remove duplicate lines from your text lists",
  "metaTitle": "Remove Duplicate Lines | Free Text List Cleaner | ToolVerse",
  "metaDescription": "Easily remove duplicate lines from your text. Sort alphabetically and trim whitespace. Free online list cleaner tool.",
  "keywords": "remove duplicate lines, line deduplicator, text cleaner, unique list generator",
  "toolHTML": "\n        <div class=\"tool-input-area\">\n          <label class=\"form-label\" for=\"rd-input\">Enter your list (one item per line):</label>\n          <textarea id=\"rd-input\" class=\"form-input\" rows=\"8\" placeholder=\"Item 1\nItem 2\nItem 1\"></textarea>\n        </div>\n        <div class=\"form-group\" style=\"margin: 1rem 0; display: flex; gap: 1rem; flex-wrap: wrap;\">\n          <label style=\"display: flex; align-items: center; gap: 0.5rem; cursor: pointer;\">\n            <input type=\"checkbox\" id=\"rd-case\" checked> Case-sensitive\n          </label>\n          <label style=\"display: flex; align-items: center; gap: 0.5rem; cursor: pointer;\">\n            <input type=\"checkbox\" id=\"rd-trim\" checked> Trim whitespace\n          </label>\n          <label style=\"display: flex; align-items: center; gap: 0.5rem; cursor: pointer;\">\n            <input type=\"checkbox\" id=\"rd-sort\"> Sort alphabetically\n          </label>\n        </div>\n        <div class=\"tool-actions\" style=\"margin-bottom: 2rem;\">\n          <button id=\"rd-process\" class=\"btn btn-primary\">Remove Duplicates</button>\n        </div>\n        <div class=\"stats-grid\" style=\"margin-bottom: 1rem;\">\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"rd-total\">0</div><div class=\"stat-label\">Total Lines</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"rd-unique\">0</div><div class=\"stat-label\">Unique Lines</div></div>\n          <div class=\"stat-box\"><div class=\"stat-val\" id=\"rd-removed\">0</div><div class=\"stat-label\">Duplicates Removed</div></div>\n        </div>\n        <div class=\"tool-output-area\">\n          <label class=\"form-label\" for=\"rd-output\">Result:</label>\n          <textarea id=\"rd-output\" class=\"form-input\" rows=\"8\" readonly></textarea>\n        </div>\n        <div class=\"tool-actions\">\n          <button id=\"rd-copy\" class=\"btn btn-primary\">Copy Result</button>\n          <button id=\"rd-clear\" class=\"btn btn-ghost\">Clear All</button>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const input = document.getElementById('rd-input');\n          const output = document.getElementById('rd-output');\n          const btnProcess = document.getElementById('rd-process');\n          const btnCopy = document.getElementById('rd-copy');\n          const btnClear = document.getElementById('rd-clear');\n          \n          const chkCase = document.getElementById('rd-case');\n          const chkTrim = document.getElementById('rd-trim');\n          const chkSort = document.getElementById('rd-sort');\n\n          const elTotal = document.getElementById('rd-total');\n          const elUnique = document.getElementById('rd-unique');\n          const elRemoved = document.getElementById('rd-removed');\n\n          btnProcess.addEventListener('click', () => {\n            const rawText = input.value;\n            if (!rawText) return;\n            \n            let lines = rawText.split('\\n');\n            const totalLines = lines.length;\n            \n            if (chkTrim.checked) {\n              lines = lines.map(line => line.trim());\n              // Remove completely empty lines optionally, but user might want them. We will keep them for now.\n            }\n            \n            const uniqueSet = new Set();\n            const resultLines = [];\n            \n            lines.forEach(line => {\n              const compareLine = chkCase.checked ? line : line.toLowerCase();\n              if (!uniqueSet.has(compareLine)) {\n                uniqueSet.add(compareLine);\n                resultLines.push(line);\n              }\n            });\n\n            if (chkSort.checked) {\n              resultLines.sort();\n            }\n\n            output.value = resultLines.join('\\n');\n            elTotal.textContent = totalLines;\n            elUnique.textContent = resultLines.length;\n            elRemoved.textContent = totalLines - resultLines.length;\n          });\n\n          btnClear.addEventListener('click', () => {\n            input.value = '';\n            output.value = '';\n            elTotal.textContent = '0';\n            elUnique.textContent = '0';\n            elRemoved.textContent = '0';\n          });\n\n          btnCopy.addEventListener('click', () => {\n            if (window.copyToClipboard) window.copyToClipboard(output.value);\n          });\n        })();\n      ",
  "howToUse": [
    "Paste your list of items (one per line) into the input area.",
    "Select options such as Case-sensitive, Trim whitespace, or Sort alphabetically.",
    "Click the \"Remove Duplicates\" button.",
    "Copy your clean, unique list from the result box."
  ],
  "faqs": [
    {
      "q": "What does \"Trim whitespace\" do?",
      "a": "It removes extra spaces at the beginning and end of each line before checking for duplicates."
    },
    {
      "q": "Can it sort the output?",
      "a": "Yes! Just check the \"Sort alphabetically\" option before processing."
    }
  ],
  "relatedSlugs": [
    "word-counter",
    "case-converter"
  ],
  "features": [
    "Case sensitive option",
    "Trim whitespace option",
    "Alphabetical sorting",
    "Instant processing"
  ],
  "hasDownload": false,
  "hasCopy": true,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Cleans up messy data lists",
    "Ensures unique items for accurate processing",
    "Easy sorting and formatting"
  ]
},
];

const textWorkspaceMarkup = {
  'word-counter': `
    <div class="text-tool text-tool--analysis">
      <div class="text-analysis-layout">
        <section class="text-editor-panel" aria-labelledby="wc-input-heading">
          <div class="text-panel-heading">
            <div><p class="text-panel-kicker">Input</p><h3 id="wc-input-heading">Text to analyze</h3></div>
            <span class="text-panel-hint">Updates as you type</span>
          </div>
          <label class="form-label" for="wc-input">Type or paste your text</label>
          <textarea id="wc-input" class="form-input text-workspace-textarea" rows="12" placeholder="Start writing or paste text here..."></textarea>
          <div class="text-action-row">
            <button type="button" id="wc-clear" class="btn btn-ghost">Clear text</button>
            <button type="button" id="wc-copy" class="btn btn-secondary" disabled>Copy statistics</button>
          </div>
          <p class="text-tool-status" id="wc-status" role="status" aria-live="polite"></p>
        </section>
        <section class="text-results-panel" aria-labelledby="wc-results-heading">
          <div class="text-panel-heading">
            <div><p class="text-panel-kicker">Live results</p><h3 id="wc-results-heading">Text statistics</h3></div>
          </div>
          <dl class="text-metrics-grid" aria-label="Live text statistics">
            <div class="text-metric text-metric--primary"><dt>Words</dt><dd id="wc-words">0</dd></div>
            <div class="text-metric text-metric--primary"><dt>Characters</dt><dd id="wc-chars">0</dd></div>
            <div class="text-metric"><dt>Sentences</dt><dd id="wc-sentences">0</dd></div>
            <div class="text-metric"><dt>Paragraphs</dt><dd id="wc-paragraphs">0</dd></div>
            <div class="text-metric"><dt>Reading time</dt><dd id="wc-read-time">0m</dd></div>
            <div class="text-metric"><dt>Speaking time</dt><dd id="wc-speak-time">0m</dd></div>
          </dl>
        </section>
      </div>
    </div>`,
  'character-counter': `
    <div class="text-tool text-tool--analysis">
      <div class="text-analysis-layout">
        <section class="text-editor-panel" aria-labelledby="cc-input-heading">
          <div class="text-panel-heading">
            <div><p class="text-panel-kicker">Input</p><h3 id="cc-input-heading">Text to measure</h3></div>
            <span class="text-panel-hint">Updates as you type</span>
          </div>
          <label class="form-label" for="cc-input">Type or paste your text</label>
          <textarea id="cc-input" class="form-input text-workspace-textarea" rows="12" placeholder="Start writing or paste text here..."></textarea>
          <div class="text-action-row">
            <button type="button" id="cc-clear" class="btn btn-ghost">Clear text</button>
            <button type="button" id="cc-copy" class="btn btn-secondary" disabled>Copy statistics</button>
          </div>
          <p class="text-tool-status" id="cc-status" role="status" aria-live="polite"></p>
        </section>
        <section class="text-results-panel" aria-labelledby="cc-results-heading">
          <div class="text-panel-heading">
            <div><p class="text-panel-kicker">Live results</p><h3 id="cc-results-heading">Character statistics</h3></div>
          </div>
          <dl class="text-metrics-grid" aria-label="Live character statistics">
            <div class="text-metric text-metric--primary"><dt>With spaces</dt><dd id="cc-with-spaces">0</dd></div>
            <div class="text-metric text-metric--primary"><dt>Without spaces</dt><dd id="cc-no-spaces">0</dd></div>
            <div class="text-metric"><dt>Words</dt><dd id="cc-words">0</dd></div>
            <div class="text-metric"><dt>UTF-8 bytes</dt><dd id="cc-bytes">0</dd></div>
          </dl>
        </section>
      </div>
    </div>`,
  'case-converter': `
    <div class="text-tool text-tool--transform">
      <section class="text-mode-section" aria-labelledby="case-mode-heading">
        <div class="text-panel-heading">
          <div><p class="text-panel-kicker">Conversion style</p><h3 id="case-mode-heading">Choose a text case</h3></div>
        </div>
        <div class="text-mode-controls" role="group" aria-label="Text case options">
          <button type="button" class="text-mode-control" data-action="upper" aria-pressed="false">UPPERCASE</button>
          <button type="button" class="text-mode-control" data-action="lower" aria-pressed="false">lowercase</button>
          <button type="button" class="text-mode-control" data-action="title" aria-pressed="false">Title Case</button>
          <button type="button" class="text-mode-control" data-action="sentence" aria-pressed="false">Sentence case</button>
          <button type="button" class="text-mode-control" data-action="camel" aria-pressed="false">camelCase</button>
          <button type="button" class="text-mode-control" data-action="snake" aria-pressed="false">snake_case</button>
          <button type="button" class="text-mode-control" data-action="kebab" aria-pressed="false">kebab-case</button>
          <button type="button" class="text-mode-control" data-action="pascal" aria-pressed="false">PascalCase</button>
        </div>
      </section>
      <div class="text-transform-layout">
        <section class="text-editor-panel" aria-labelledby="case-input-heading">
          <div class="text-panel-heading"><div><p class="text-panel-kicker">Input</p><h3 id="case-input-heading">Original text</h3></div></div>
          <label class="form-label" for="case-input">Text to convert</label>
          <textarea id="case-input" class="form-input text-workspace-textarea" rows="10" placeholder="Enter text to convert..."></textarea>
        </section>
        <section class="text-editor-panel text-editor-panel--output" aria-labelledby="case-output-heading">
          <div class="text-panel-heading"><div><p class="text-panel-kicker">Result</p><h3 id="case-output-heading">Converted text</h3></div></div>
          <label class="form-label" for="case-output">Conversion result</label>
          <textarea id="case-output" class="form-input text-workspace-textarea" rows="10" readonly placeholder="Choose a conversion style to see the result"></textarea>
        </section>
      </div>
      <div class="text-action-row text-action-row--end">
        <button type="button" id="case-clear" class="btn btn-ghost">Clear all</button>
        <button type="button" id="case-copy" class="btn btn-secondary" disabled>Copy result</button>
      </div>
      <p class="text-tool-status" id="case-status" role="status" aria-live="polite"></p>
    </div>`,
  'remove-duplicate-lines': `
    <div class="text-tool text-tool--transform">
      <fieldset class="text-options-group">
        <legend>Processing options</legend>
        <div class="text-option-list">
          <label class="text-option" for="rd-case"><input type="checkbox" id="rd-case" checked><span>Case-sensitive</span></label>
          <label class="text-option" for="rd-trim"><input type="checkbox" id="rd-trim" checked><span>Trim whitespace</span></label>
          <label class="text-option" for="rd-sort"><input type="checkbox" id="rd-sort"><span>Sort alphabetically</span></label>
        </div>
      </fieldset>
      <div class="text-transform-layout">
        <section class="text-editor-panel" aria-labelledby="rd-input-heading">
          <div class="text-panel-heading"><div><p class="text-panel-kicker">Input</p><h3 id="rd-input-heading">Original list</h3></div></div>
          <label class="form-label" for="rd-input">One item per line</label>
          <textarea id="rd-input" class="form-input text-workspace-textarea text-workspace-textarea--lines" rows="11" placeholder="Item 1&#10;Item 2&#10;Item 1"></textarea>
        </section>
        <section class="text-editor-panel text-editor-panel--output" aria-labelledby="rd-output-heading">
          <div class="text-panel-heading"><div><p class="text-panel-kicker">Result</p><h3 id="rd-output-heading">Unique lines</h3></div></div>
          <label class="form-label" for="rd-output">Cleaned list</label>
          <textarea id="rd-output" class="form-input text-workspace-textarea text-workspace-textarea--lines" rows="11" readonly placeholder="Your cleaned list will appear here"></textarea>
        </section>
      </div>
      <div class="text-action-row text-action-row--end">
        <button type="button" id="rd-clear" class="btn btn-ghost">Clear all</button>
        <button type="button" id="rd-copy" class="btn btn-secondary" disabled>Copy result</button>
        <button type="button" id="rd-process" class="btn btn-primary">Remove duplicates</button>
      </div>
      <p class="text-tool-status" id="rd-status" role="status" aria-live="polite"></p>
      <dl class="text-metrics-grid text-metrics-grid--compact" aria-label="Line processing statistics">
        <div class="text-metric"><dt>Total lines</dt><dd id="rd-total">0</dd></div>
        <div class="text-metric"><dt>Unique lines</dt><dd id="rd-unique">0</dd></div>
        <div class="text-metric"><dt>Duplicates removed</dt><dd id="rd-removed">0</dd></div>
      </dl>
    </div>`
};

const textWorkspaceScripts = {
  'word-counter': `(function() {
    const input = document.getElementById('wc-input');
    const clearButton = document.getElementById('wc-clear');
    const copyButton = document.getElementById('wc-copy');
    const status = document.getElementById('wc-status');
    const wordsElement = document.getElementById('wc-words');
    const charactersElement = document.getElementById('wc-chars');
    const sentencesElement = document.getElementById('wc-sentences');
    const paragraphsElement = document.getElementById('wc-paragraphs');
    const readingElement = document.getElementById('wc-read-time');
    const speakingElement = document.getElementById('wc-speak-time');
    let updateFrame = 0;

    function updateStatistics() {
      updateFrame = 0;
      const text = input.value;
      const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
      const sentences = text.trim() ? (text.match(/[.!?]+(?=\\s|$)/g) || []).length : 0;
      const paragraphs = text.trim() ? text.trim().split(/\\n\\s*\\n/).length : 0;
      wordsElement.textContent = words;
      charactersElement.textContent = text.length;
      sentencesElement.textContent = sentences || (text.trim() ? 1 : 0);
      paragraphsElement.textContent = paragraphs;
      readingElement.textContent = Math.ceil(words / 200) + 'm';
      speakingElement.textContent = Math.ceil(words / 130) + 'm';
      copyButton.disabled = !text;
    }

    input.addEventListener('input', () => {
      if (!updateFrame) updateFrame = requestAnimationFrame(updateStatistics);
      status.textContent = '';
    });
    clearButton.addEventListener('click', () => {
      input.value = '';
      updateStatistics();
      status.textContent = 'Text and statistics cleared.';
      input.focus();
    });
    copyButton.addEventListener('click', async () => {
      const summary = \`Words: \${wordsElement.textContent}\\nCharacters: \${charactersElement.textContent}\\nSentences: \${sentencesElement.textContent}\\nParagraphs: \${paragraphsElement.textContent}\\nReading Time: \${readingElement.textContent}\`;
      try {
        await navigator.clipboard.writeText(summary);
        status.textContent = 'Statistics copied to clipboard.';
        if (window.showToast) window.showToast('Statistics copied!', 'success');
      } catch (error) {
        status.textContent = 'Unable to copy statistics. Select and copy them manually.';
        if (window.showToast) window.showToast('Copy failed', 'error');
      }
    });
    updateStatistics();
  })();`,
  'character-counter': `(function() {
    const input = document.getElementById('cc-input');
    const clearButton = document.getElementById('cc-clear');
    const copyButton = document.getElementById('cc-copy');
    const status = document.getElementById('cc-status');
    const withSpacesElement = document.getElementById('cc-with-spaces');
    const withoutSpacesElement = document.getElementById('cc-no-spaces');
    const wordsElement = document.getElementById('cc-words');
    const bytesElement = document.getElementById('cc-bytes');
    let updateFrame = 0;

    function updateStatistics() {
      updateFrame = 0;
      const text = input.value;
      withSpacesElement.textContent = text.length;
      withoutSpacesElement.textContent = text.replace(/\\s/g, '').length;
      wordsElement.textContent = text.trim() ? text.trim().split(/\\s+/).length : 0;
      bytesElement.textContent = new Blob([text]).size;
      copyButton.disabled = !text;
    }

    input.addEventListener('input', () => {
      if (!updateFrame) updateFrame = requestAnimationFrame(updateStatistics);
      status.textContent = '';
    });
    clearButton.addEventListener('click', () => {
      input.value = '';
      updateStatistics();
      status.textContent = 'Text and statistics cleared.';
      input.focus();
    });
    copyButton.addEventListener('click', async () => {
      const summary = \`Characters (with spaces): \${withSpacesElement.textContent}\\nCharacters (without spaces): \${withoutSpacesElement.textContent}\\nWords: \${wordsElement.textContent}\\nUTF-8 bytes: \${bytesElement.textContent}\`;
      try {
        await navigator.clipboard.writeText(summary);
        status.textContent = 'Statistics copied to clipboard.';
        if (window.showToast) window.showToast('Statistics copied!', 'success');
      } catch (error) {
        status.textContent = 'Unable to copy statistics. Select and copy them manually.';
        if (window.showToast) window.showToast('Copy failed', 'error');
      }
    });
    updateStatistics();
  })();`,
  'case-converter': `(function() {
    const input = document.getElementById('case-input');
    const output = document.getElementById('case-output');
    const modeButtons = Array.from(document.querySelectorAll('.text-mode-control[data-action]'));
    const copyButton = document.getElementById('case-copy');
    const clearButton = document.getElementById('case-clear');
    const status = document.getElementById('case-status');
    const converters = {
      upper: text => text.toUpperCase(),
      lower: text => text.toLowerCase(),
      title: text => text.toLowerCase().replace(/(?:^|[^a-zA-Z0-9'])([a-z])/g, character => character.toUpperCase()),
      sentence: text => text.toLowerCase().replace(/(^\\s*\\w|[.!?]\\s*\\w)/g, character => character.toUpperCase()),
      camel: text => text.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\\s+/g, ''),
      snake: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(value => value.toLowerCase()).join('_') || '',
      kebab: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(value => value.toLowerCase()).join('-') || '',
      pascal: text => text.match(/[a-z]+/gi)?.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join('') || ''
    };

    modeButtons.forEach(button => button.addEventListener('click', () => {
      modeButtons.forEach(candidate => candidate.setAttribute('aria-pressed', String(candidate === button)));
      const action = button.dataset.action;
      if (!input.value) {
        output.value = '';
        copyButton.disabled = true;
        status.textContent = 'Enter text before choosing a conversion style.';
        input.focus();
        return;
      }
      output.value = converters[action](input.value);
      copyButton.disabled = !output.value;
      status.textContent = \`Converted using \${button.textContent.trim()}.\`;
    }));
    input.addEventListener('input', () => {
      status.textContent = '';
      if (!input.value) {
        output.value = '';
        copyButton.disabled = true;
        modeButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
      }
    });
    clearButton.addEventListener('click', () => {
      input.value = '';
      output.value = '';
      copyButton.disabled = true;
      modeButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
      status.textContent = 'Input and result cleared.';
      input.focus();
    });
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(output.value);
        status.textContent = 'Converted text copied to clipboard.';
        if (window.showToast) window.showToast('Result copied!', 'success');
      } catch (error) {
        status.textContent = 'Unable to copy the result. Select and copy it manually.';
        if (window.showToast) window.showToast('Copy failed', 'error');
      }
    });
  })();`,
  'remove-duplicate-lines': `(function() {
    const input = document.getElementById('rd-input');
    const output = document.getElementById('rd-output');
    const processButton = document.getElementById('rd-process');
    const copyButton = document.getElementById('rd-copy');
    const clearButton = document.getElementById('rd-clear');
    const caseSensitive = document.getElementById('rd-case');
    const trimWhitespace = document.getElementById('rd-trim');
    const sortAlphabetically = document.getElementById('rd-sort');
    const totalElement = document.getElementById('rd-total');
    const uniqueElement = document.getElementById('rd-unique');
    const removedElement = document.getElementById('rd-removed');
    const status = document.getElementById('rd-status');

    function resetResults() {
      output.value = '';
      totalElement.textContent = '0';
      uniqueElement.textContent = '0';
      removedElement.textContent = '0';
      copyButton.disabled = true;
    }

    processButton.addEventListener('click', () => {
      const text = input.value;
      if (!text) {
        resetResults();
        status.textContent = 'Enter at least one line to process.';
        input.focus();
        return;
      }
      let lines = text.split('\\n');
      const total = lines.length;
      if (trimWhitespace.checked) lines = lines.map(line => line.trim());
      const seen = new Set();
      const uniqueLines = [];
      lines.forEach(line => {
        const comparisonValue = caseSensitive.checked ? line : line.toLowerCase();
        if (!seen.has(comparisonValue)) {
          seen.add(comparisonValue);
          uniqueLines.push(line);
        }
      });
      if (sortAlphabetically.checked) uniqueLines.sort();
      output.value = uniqueLines.join('\\n');
      totalElement.textContent = total;
      uniqueElement.textContent = uniqueLines.length;
      removedElement.textContent = total - uniqueLines.length;
      copyButton.disabled = !output.value;
      status.textContent = \`Removed \${total - uniqueLines.length} duplicate \${total - uniqueLines.length === 1 ? 'line' : 'lines'}.\`;
    });
    input.addEventListener('input', () => { status.textContent = ''; });
    clearButton.addEventListener('click', () => {
      input.value = '';
      resetResults();
      status.textContent = 'Input, result, and statistics cleared.';
      input.focus();
    });
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(output.value);
        status.textContent = 'Cleaned list copied to clipboard.';
        if (window.showToast) window.showToast('Result copied!', 'success');
      } catch (error) {
        status.textContent = 'Unable to copy the result. Select and copy it manually.';
        if (window.showToast) window.showToast('Copy failed', 'error');
      }
    });
    resetResults();
  })();`
};

textTools.forEach(tool => {
  tool.toolHTML = textWorkspaceMarkup[tool.slug];
  tool.toolScript = textWorkspaceScripts[tool.slug];
});

module.exports = textTools;
