module.exports = [
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
  "toolScript": "\n        (function(){\n          const input = document.getElementById('case-input');\n          const output = document.getElementById('case-output');\n          const btns = document.querySelectorAll('[data-action]');\n          const btnCopy = document.getElementById('case-copy');\n          const btnClear = document.getElementById('case-clear');\n\n          const converters = {\n            upper: text => text.toUpperCase(),\n            lower: text => text.toLowerCase(),\n            title: text => text.toLowerCase().replace(/\\b\\w/g, c => c.toUpperCase()),\n            sentence: text => text.toLowerCase().replace(/(^\\s*\\w|[\\.!?]\\s*\\w)/g, c => c.toUpperCase()),\n            camel: text => text.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\\s+/g, ''),\n            snake: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '',\n            kebab: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '',\n            pascal: text => text.match(/[a-z]+/gi)?.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join('') || ''\n          };\n\n          btns.forEach(btn => {\n            btn.addEventListener('click', () => {\n              const action = btn.getAttribute('data-action');\n              if (converters[action]) {\n                output.value = converters[action](input.value);\n              }\n            });\n          });\n\n          btnClear.addEventListener('click', () => {\n            input.value = '';\n            output.value = '';\n          });\n\n          btnCopy.addEventListener('click', () => {\n            if (window.copyToClipboard) window.copyToClipboard(output.value);\n          });\n        })();\n      ",
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
