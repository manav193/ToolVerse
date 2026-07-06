module.exports = {
  categories: [
    { slug: 'text', name: 'Text Tools', icon: '📝', description: 'Count words, convert case, compare text', color: '#3b82f6' },
    { slug: 'student', name: 'Student Tools', icon: '🎓', description: 'Calculators and converters for students', color: '#10b981' },
    { slug: 'image', name: 'Image Tools', icon: '🖼️', description: 'Resize, compress, convert and edit images', color: '#8b5cf6' },
    { slug: 'pdf', name: 'PDF Tools', icon: '📄', description: 'Convert, merge, split and manage PDF files', color: '#ef4444' },
    { slug: 'developer', name: 'Developer Tools', icon: '💻', description: 'Format, minify and generate code', color: '#f59e0b' },
    { slug: 'seo', name: 'SEO Tools', icon: '🔍', description: 'Analyze and optimize for search engines', color: '#06b6d4' },
    { slug: 'ai', name: 'AI Tools', icon: '🤖', description: 'AI-powered tools and generators', color: '#ec4899' },
    { slug: 'youtube', name: 'YouTube Tools', icon: '▶️', description: 'YouTube thumbnail, tag and analytics tools', color: '#dc2626' },
    { slug: 'calculator', name: 'Calculator Tools', icon: '🧮', description: 'Financial, scientific and math calculators', color: '#6366f1' },
    { slug: 'utility', name: 'Utility Tools', icon: '🔧', description: 'Everyday utility tools and converters', color: '#84cc16' }
  ],
  tools: [
    // 1. Word Counter
    {
      slug: 'word-counter',
      name: 'Word Counter',
      category: 'text',
      categoryName: 'Text Tools',
      icon: '📝',
      shortDesc: 'Count words, characters, sentences and paragraphs instantly',
      metaTitle: 'Word Counter - Free Online Word Count Tool | ToolVerse',
      metaDescription: 'Count words, characters, sentences, and paragraphs instantly with our free online Word Counter tool. Get reading time estimates and detailed text statistics.',
      keywords: 'word counter, character counter, word count online, text statistics',
      toolHTML: `
        <div class="tool-input-area">
          <label class="form-label" for="wc-input">Type or paste your text below:</label>
          <textarea id="wc-input" class="form-input" rows="10" placeholder="Enter your text here..."></textarea>
        </div>
        <div class="tool-actions" style="margin-bottom: 2rem;">
          <button id="wc-clear" class="btn btn-secondary">Clear Text</button>
          <button id="wc-copy" class="btn btn-primary">Copy Stats</button>
        </div>
        <div class="stats-grid">
          <div class="stat-box"><div class="stat-val" id="wc-words">0</div><div class="stat-label">Words</div></div>
          <div class="stat-box"><div class="stat-val" id="wc-chars">0</div><div class="stat-label">Characters</div></div>
          <div class="stat-box"><div class="stat-val" id="wc-sentences">0</div><div class="stat-label">Sentences</div></div>
          <div class="stat-box"><div class="stat-val" id="wc-paragraphs">0</div><div class="stat-label">Paragraphs</div></div>
          <div class="stat-box"><div class="stat-val" id="wc-read-time">0m</div><div class="stat-label">Reading Time</div></div>
          <div class="stat-box"><div class="stat-val" id="wc-speak-time">0m</div><div class="stat-label">Speaking Time</div></div>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const input = document.getElementById('wc-input');
          const btnClear = document.getElementById('wc-clear');
          const btnCopy = document.getElementById('wc-copy');
          
          const elWords = document.getElementById('wc-words');
          const elChars = document.getElementById('wc-chars');
          const elSentences = document.getElementById('wc-sentences');
          const elParagraphs = document.getElementById('wc-paragraphs');
          const elReadTime = document.getElementById('wc-read-time');
          const elSpeakTime = document.getElementById('wc-speak-time');

          function countStats() {
            const text = input.value;
            const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
            const chars = text.length;
            const sentences = text.trim() ? (text.match(/[.!?]+(?=\\s|$)/g) || []).length : 0;
            const paragraphs = text.trim() ? text.trim().split(/\\n\\s*\\n/).length : 0;
            
            elWords.textContent = words;
            elChars.textContent = chars;
            elSentences.textContent = sentences || (text.trim() ? 1 : 0);
            elParagraphs.textContent = paragraphs;
            
            // Average reading speed: 200 words/min
            // Average speaking speed: 130 words/min
            const readMins = Math.ceil(words / 200);
            const speakMins = Math.ceil(words / 130);
            
            elReadTime.textContent = readMins + 'm';
            elSpeakTime.textContent = speakMins + 'm';
          }

          input.addEventListener('input', countStats);
          
          btnClear.addEventListener('click', () => {
            input.value = '';
            countStats();
          });
          
          btnCopy.addEventListener('click', () => {
            const stats = \`Words: \${elWords.textContent}\\nCharacters: \${elChars.textContent}\\nSentences: \${elSentences.textContent}\\nParagraphs: \${elParagraphs.textContent}\\nReading Time: \${elReadTime.textContent}\`;
            if (window.copyToClipboard) window.copyToClipboard(stats);
          });
        })();
      `,
      howToUse: [
        'Paste or type your text in the input area above.',
        'As you type, the tool will automatically update the counts for words, characters, sentences, and paragraphs.',
        'View the estimated reading time and speaking time based on standard averages.',
        'Click the "Copy Stats" button to copy the results to your clipboard.'
      ],
      faqs: [
        { q: 'Is this word counter free?', a: 'Yes, it is completely free to use with no hidden limits or restrictions.' },
        { q: 'Does it count spaces as characters?', a: 'Yes, the main character count includes spaces. We also offer a dedicated Character Counter tool for more detailed stats.' },
        { q: 'Is my text safe?', a: 'Absolutely. The word counting happens entirely in your browser. We do not save or upload any text you paste.' }
      ],
      relatedSlugs: ['character-counter', 'case-converter'],
      features: ['Real-time counting', 'Reading time estimate', 'Paragraph detection'],
      hasDownload: false,
      hasCopy: true,
      lastUpdated: '2023-10-01',
      benefits: ['Enhances writing productivity', 'Provides precise text metrics', 'Ensures content length compliance']
    },
    
    // 2. Character Counter
    {
      slug: 'character-counter',
      name: 'Character Counter',
      category: 'text',
      categoryName: 'Text Tools',
      icon: '📝',
      shortDesc: 'Count characters with or without spaces and get detailed text density',
      metaTitle: 'Character Counter - Free Online Character Count | ToolVerse',
      metaDescription: 'Accurately count characters with or without spaces, lines, and bytes. Analyze character density with our free online character counter tool.',
      keywords: 'character counter, character count, letter counter, character density, count letters online',
      toolHTML: `
        <div class="tool-input-area">
          <label class="form-label" for="cc-input">Type or paste your text below:</label>
          <textarea id="cc-input" class="form-input" rows="8" placeholder="Enter your text here..."></textarea>
        </div>
        <div class="tool-actions" style="margin-bottom: 2rem;">
          <button id="cc-clear" class="btn btn-secondary">Clear Text</button>
          <button id="cc-copy" class="btn btn-primary">Copy Stats</button>
        </div>
        <div class="stats-grid">
          <div class="stat-box"><div class="stat-val" id="cc-with-spaces">0</div><div class="stat-label">Characters (With Spaces)</div></div>
          <div class="stat-box"><div class="stat-val" id="cc-no-spaces">0</div><div class="stat-label">Characters (No Spaces)</div></div>
          <div class="stat-box"><div class="stat-val" id="cc-words">0</div><div class="stat-label">Words</div></div>
          <div class="stat-box"><div class="stat-val" id="cc-bytes">0</div><div class="stat-label">Bytes (UTF-8)</div></div>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const input = document.getElementById('cc-input');
          const btnClear = document.getElementById('cc-clear');
          const btnCopy = document.getElementById('cc-copy');
          
          const elWithSpaces = document.getElementById('cc-with-spaces');
          const elNoSpaces = document.getElementById('cc-no-spaces');
          const elWords = document.getElementById('cc-words');
          const elBytes = document.getElementById('cc-bytes');

          function countStats() {
            const text = input.value;
            elWithSpaces.textContent = text.length;
            elNoSpaces.textContent = text.replace(/\\s/g, '').length;
            elWords.textContent = text.trim() ? text.trim().split(/\\s+/).length : 0;
            elBytes.textContent = new Blob([text]).size;
          }

          input.addEventListener('input', countStats);
          
          btnClear.addEventListener('click', () => {
            input.value = '';
            countStats();
          });
          
          btnCopy.addEventListener('click', () => {
            const stats = \`Characters (with spaces): \${elWithSpaces.textContent}\\nCharacters (no spaces): \${elNoSpaces.textContent}\\nWords: \${elWords.textContent}\\nBytes: \${elBytes.textContent}\`;
            if (window.copyToClipboard) window.copyToClipboard(stats);
          });
        })();
      `,
      howToUse: [
        'Paste or type your text into the text area.',
        'View the real-time statistics including characters with and without spaces.',
        'Check the byte size for data limit constraints.',
        'Click "Copy Stats" to copy the results.'
      ],
      faqs: [
        { q: 'Is there a limit to how many characters I can count?', a: 'No, you can paste as much text as your browser can handle.' },
        { q: 'Why do I need to know the byte size?', a: 'Some databases and SMS services have byte limits rather than character limits, especially when using emojis or special characters.' }
      ],
      relatedSlugs: ['word-counter', 'case-converter'],
      features: ['Counts spaces separately', 'UTF-8 Byte size calculation', 'Fast and real-time'],
      hasDownload: false,
      hasCopy: true,
      lastUpdated: '2023-10-01',
      benefits: ['Helps meet strict character limits', 'Provides instant byte size for data limits', 'Differentiates spaces for accurate counts']
    },

    // 3. Case Converter
    {
      slug: 'case-converter',
      name: 'Case Converter',
      category: 'text',
      categoryName: 'Text Tools',
      icon: '📝',
      shortDesc: 'Easily convert text to uppercase, lowercase, title case, and more',
      metaTitle: 'Case Converter - Change Text to Uppercase, Lowercase & Title Case | ToolVerse',
      metaDescription: 'Free online tool to convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more.',
      keywords: 'case converter, uppercase to lowercase, title case converter, text case change',
      toolHTML: `
        <div class="tool-input-area">
          <label class="form-label" for="case-input">Enter your text:</label>
          <textarea id="case-input" class="form-input" rows="6" placeholder="Enter your text here..."></textarea>
        </div>
        <div class="tool-actions" style="margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <button class="btn btn-secondary" data-action="upper">UPPERCASE</button>
          <button class="btn btn-secondary" data-action="lower">lowercase</button>
          <button class="btn btn-secondary" data-action="title">Title Case</button>
          <button class="btn btn-secondary" data-action="sentence">Sentence case</button>
          <button class="btn btn-secondary" data-action="camel">camelCase</button>
          <button class="btn btn-secondary" data-action="snake">snake_case</button>
          <button class="btn btn-secondary" data-action="kebab">kebab-case</button>
          <button class="btn btn-secondary" data-action="pascal">PascalCase</button>
        </div>
        <div class="tool-output-area">
          <label class="form-label" for="case-output">Result:</label>
          <textarea id="case-output" class="form-input" rows="6" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button id="case-copy" class="btn btn-primary">Copy Result</button>
          <button id="case-clear" class="btn btn-ghost">Clear All</button>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const input = document.getElementById('case-input');
          const output = document.getElementById('case-output');
          const btns = document.querySelectorAll('[data-action]');
          const btnCopy = document.getElementById('case-copy');
          const btnClear = document.getElementById('case-clear');

          const converters = {
            upper: text => text.toUpperCase(),
            lower: text => text.toLowerCase(),
            title: text => text.toLowerCase().replace(/\\b\\w/g, c => c.toUpperCase()),
            sentence: text => text.toLowerCase().replace(/(^\\s*\\w|[\\.!?]\\s*\\w)/g, c => c.toUpperCase()),
            camel: text => text.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\\s+/g, ''),
            snake: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '',
            kebab: text => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '',
            pascal: text => text.match(/[a-z]+/gi)?.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join('') || ''
          };

          btns.forEach(btn => {
            btn.addEventListener('click', () => {
              const action = btn.getAttribute('data-action');
              if (converters[action]) {
                output.value = converters[action](input.value);
              }
            });
          });

          btnClear.addEventListener('click', () => {
            input.value = '';
            output.value = '';
          });

          btnCopy.addEventListener('click', () => {
            if (window.copyToClipboard) window.copyToClipboard(output.value);
          });
        })();
      `,
      howToUse: [
        'Paste your text into the input field.',
        'Click on the formatting button corresponding to the case you want (e.g., UPPERCASE, lowercase, camelCase).',
        'The converted text will appear in the result box.',
        'Click "Copy Result" to copy it to your clipboard.'
      ],
      faqs: [
        { q: 'What is camelCase?', a: 'camelCase writes compound words without spaces, where each word starts with a capital letter except for the first word. E.g. "thisIsCamelCase".' },
        { q: 'Is this tool safe to use with sensitive data?', a: 'Yes. Processing is done in your browser; your text is never sent to our servers.' }
      ],
      relatedSlugs: ['word-counter', 'remove-duplicate-lines'],
      features: ['8+ case formatting options', 'Developer-friendly cases (snake_case, camelCase)', 'One-click copy'],
      hasDownload: false,
      hasCopy: true,
      lastUpdated: '2023-10-01',
      benefits: ['Quickly formats text to desired case', 'Helps maintain consistent styling', 'Saves time over manual retyping']
    },

    // 4. Remove Duplicate Lines
    {
      slug: 'remove-duplicate-lines',
      name: 'Remove Duplicate Lines',
      category: 'text',
      categoryName: 'Text Tools',
      icon: '📝',
      shortDesc: 'Instantly find and remove duplicate lines from your text lists',
      metaTitle: 'Remove Duplicate Lines | Free Text List Cleaner | ToolVerse',
      metaDescription: 'Easily remove duplicate lines from your text. Sort alphabetically and trim whitespace. Free online list cleaner tool.',
      keywords: 'remove duplicate lines, line deduplicator, text cleaner, unique list generator',
      toolHTML: `
        <div class="tool-input-area">
          <label class="form-label" for="rd-input">Enter your list (one item per line):</label>
          <textarea id="rd-input" class="form-input" rows="8" placeholder="Item 1\nItem 2\nItem 1"></textarea>
        </div>
        <div class="form-group" style="margin: 1rem 0; display: flex; gap: 1rem; flex-wrap: wrap;">
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" id="rd-case" checked> Case-sensitive
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" id="rd-trim" checked> Trim whitespace
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" id="rd-sort"> Sort alphabetically
          </label>
        </div>
        <div class="tool-actions" style="margin-bottom: 2rem;">
          <button id="rd-process" class="btn btn-primary">Remove Duplicates</button>
        </div>
        <div class="stats-grid" style="margin-bottom: 1rem;">
          <div class="stat-box"><div class="stat-val" id="rd-total">0</div><div class="stat-label">Total Lines</div></div>
          <div class="stat-box"><div class="stat-val" id="rd-unique">0</div><div class="stat-label">Unique Lines</div></div>
          <div class="stat-box"><div class="stat-val" id="rd-removed">0</div><div class="stat-label">Duplicates Removed</div></div>
        </div>
        <div class="tool-output-area">
          <label class="form-label" for="rd-output">Result:</label>
          <textarea id="rd-output" class="form-input" rows="8" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button id="rd-copy" class="btn btn-primary">Copy Result</button>
          <button id="rd-clear" class="btn btn-ghost">Clear All</button>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const input = document.getElementById('rd-input');
          const output = document.getElementById('rd-output');
          const btnProcess = document.getElementById('rd-process');
          const btnCopy = document.getElementById('rd-copy');
          const btnClear = document.getElementById('rd-clear');
          
          const chkCase = document.getElementById('rd-case');
          const chkTrim = document.getElementById('rd-trim');
          const chkSort = document.getElementById('rd-sort');

          const elTotal = document.getElementById('rd-total');
          const elUnique = document.getElementById('rd-unique');
          const elRemoved = document.getElementById('rd-removed');

          btnProcess.addEventListener('click', () => {
            const rawText = input.value;
            if (!rawText) return;
            
            let lines = rawText.split('\\n');
            const totalLines = lines.length;
            
            if (chkTrim.checked) {
              lines = lines.map(line => line.trim());
              // Remove completely empty lines optionally, but user might want them. We will keep them for now.
            }
            
            const uniqueSet = new Set();
            const resultLines = [];
            
            lines.forEach(line => {
              const compareLine = chkCase.checked ? line : line.toLowerCase();
              if (!uniqueSet.has(compareLine)) {
                uniqueSet.add(compareLine);
                resultLines.push(line);
              }
            });

            if (chkSort.checked) {
              resultLines.sort();
            }

            output.value = resultLines.join('\\n');
            elTotal.textContent = totalLines;
            elUnique.textContent = resultLines.length;
            elRemoved.textContent = totalLines - resultLines.length;
          });

          btnClear.addEventListener('click', () => {
            input.value = '';
            output.value = '';
            elTotal.textContent = '0';
            elUnique.textContent = '0';
            elRemoved.textContent = '0';
          });

          btnCopy.addEventListener('click', () => {
            if (window.copyToClipboard) window.copyToClipboard(output.value);
          });
        })();
      `,
      howToUse: [
        'Paste your list of items (one per line) into the input area.',
        'Select options such as Case-sensitive, Trim whitespace, or Sort alphabetically.',
        'Click the "Remove Duplicates" button.',
        'Copy your clean, unique list from the result box.'
      ],
      faqs: [
        { q: 'What does "Trim whitespace" do?', a: 'It removes extra spaces at the beginning and end of each line before checking for duplicates.' },
        { q: 'Can it sort the output?', a: 'Yes! Just check the "Sort alphabetically" option before processing.' }
      ],
      relatedSlugs: ['word-counter', 'case-converter'],
      features: ['Case sensitive option', 'Trim whitespace option', 'Alphabetical sorting', 'Instant processing'],
      hasDownload: false,
      hasCopy: true,
      lastUpdated: '2023-10-01',
      benefits: ['Cleans up messy data lists', 'Ensures unique items for accurate processing', 'Easy sorting and formatting']
    },

    // 5. Attendance Calculator
    {
      slug: 'attendance-calculator',
      name: 'Attendance Calculator',
      category: 'student',
      categoryName: 'Student Tools',
      icon: '🎓',
      shortDesc: 'Calculate how many classes you need to attend or can skip',
      metaTitle: 'Attendance Calculator - Check How Many Classes to Attend | ToolVerse',
      metaDescription: 'Free attendance calculator for students. Enter your total classes and attended classes to see how many more you need to attend to reach your target percentage.',
      keywords: 'attendance calculator, calculate attendance, college attendance, school attendance target',
      toolHTML: `
        <div class="grid-2">
          <div class="tool-input-area">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="att-total">Total Classes Held:</label>
              <input type="number" id="att-total" class="form-input" min="0" placeholder="e.g., 50">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="att-attended">Classes Attended:</label>
              <input type="number" id="att-attended" class="form-input" min="0" placeholder="e.g., 35">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label" for="att-target">Target Percentage (%):</label>
              <input type="number" id="att-target" class="form-input" min="1" max="100" value="75">
            </div>
            <button id="att-calc" class="btn btn-primary" style="width: 100%;">Calculate Attendance</button>
          </div>
          <div class="result-card" style="background: var(--bg-secondary); padding: 2rem; border-radius: 12px; text-align: center;">
            <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">Current Attendance</h3>
            <div id="att-current" style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">0%</div>
            <p id="att-message" style="font-size: 1.1rem; font-weight: 500;"></p>
          </div>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const inTotal = document.getElementById('att-total');
          const inAttended = document.getElementById('att-attended');
          const inTarget = document.getElementById('att-target');
          const btnCalc = document.getElementById('att-calc');
          
          const elCurrent = document.getElementById('att-current');
          const elMessage = document.getElementById('att-message');

          btnCalc.addEventListener('click', () => {
            const total = parseInt(inTotal.value);
            const attended = parseInt(inAttended.value);
            const target = parseInt(inTarget.value);

            if (isNaN(total) || isNaN(attended) || isNaN(target)) {
              if (window.showToast) window.showToast('Please fill all fields', 'error');
              return;
            }

            if (attended > total) {
              if (window.showToast) window.showToast('Attended classes cannot be more than total classes', 'error');
              return;
            }

            const currentPercent = ((attended / total) * 100).toFixed(2);
            elCurrent.textContent = currentPercent + '%';

            if (currentPercent < target) {
              elCurrent.style.color = 'var(--error, #ef4444)';
              // Formula: (attended + req) / (total + req) = target / 100
              // attended*100 + req*100 = target*total + target*req
              // req*(100 - target) = target*total - attended*100
              // req = (target*total - attended*100) / (100 - target)
              const req = Math.ceil((target * total - attended * 100) / (100 - target));
              elMessage.textContent = \`You need to attend \${req} more consecutive class(es) to reach \${target}%.\`;
              elMessage.style.color = 'var(--error, #ef4444)';
            } else {
              elCurrent.style.color = 'var(--success, #10b981)';
              // Formula: attended / (total + skip) = target / 100
              // skip = (attended*100 / target) - total
              const skip = Math.floor((attended * 100 / target) - total);
              if (skip === 0) {
                elMessage.textContent = \`You are exactly on track! Do not miss the next class.\`;
                elMessage.style.color = 'var(--accent)';
              } else {
                elMessage.textContent = \`You can safely skip the next \${skip} class(es) and remain above \${target}%.\`;
                elMessage.style.color = 'var(--success, #10b981)';
              }
            }
          });
        })();
      `,
      howToUse: [
        'Enter the total number of classes held so far.',
        'Enter the number of classes you have attended.',
        'Set your target attendance percentage (e.g., 75%).',
        'Click "Calculate" to see your current percentage and how many classes you must attend (or can skip) to meet your target.'
      ],
      faqs: [
        { q: 'How is the required classes calculated?', a: 'It mathematically determines the exact number of consecutive classes you must attend to make the ratio (Attended/Total) hit your target percentage.' }
      ],
      relatedSlugs: ['percentage-calculator', 'cgpa-calculator'],
      features: ['Calculates classes needed to attend', 'Calculates classes safe to skip', 'Color-coded visual feedback'],
      hasDownload: false,
      hasCopy: false,
      lastUpdated: '2023-10-01',
      benefits: ['Helps students track attendance effortlessly', 'Calculates safe skips', 'Prevents falling below target percentages']
    },

    // 6. Percentage Calculator
    {
      slug: 'percentage-calculator',
      name: 'Percentage Calculator',
      category: 'student',
      categoryName: 'Student Tools',
      icon: '🎓',
      shortDesc: 'Solve percentage problems, find percent change, increase and decrease',
      metaTitle: 'Percentage Calculator - Easy Percent Change & Increase | ToolVerse',
      metaDescription: 'Free online percentage calculator. Find what X% of Y is, calculate percentage increase or decrease, and solve percent differences easily.',
      keywords: 'percentage calculator, percent change, what is x percent of y, calculate percentage',
      toolHTML: `
        <div class="grid-2" style="gap: 2rem;">
          <!-- Mode 1: What is X% of Y -->
          <div class="result-card" style="padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px;">
            <h3 style="margin-bottom: 1rem;">What is X% of Y?</h3>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
              <input type="number" id="p1-x" class="form-input" style="width: 80px;" placeholder="X"> % of 
              <input type="number" id="p1-y" class="form-input" style="width: 100px;" placeholder="Y">
              <button id="p1-btn" class="btn btn-primary btn-sm">Calc</button>
            </div>
            <div style="font-weight: bold;">Result: <span id="p1-res" style="color: var(--accent); font-size: 1.2rem;">-</span></div>
          </div>
          
          <!-- Mode 2: X is what % of Y -->
          <div class="result-card" style="padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px;">
            <h3 style="margin-bottom: 1rem;">X is what % of Y?</h3>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
              <input type="number" id="p2-x" class="form-input" style="width: 80px;" placeholder="X"> is what % of 
              <input type="number" id="p2-y" class="form-input" style="width: 100px;" placeholder="Y">
              <button id="p2-btn" class="btn btn-primary btn-sm">Calc</button>
            </div>
            <div style="font-weight: bold;">Result: <span id="p2-res" style="color: var(--accent); font-size: 1.2rem;">-</span></div>
          </div>

          <!-- Mode 3: Percentage Change -->
          <div class="result-card" style="padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px;">
            <h3 style="margin-bottom: 1rem;">Percentage Change</h3>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
              From <input type="number" id="p3-x" class="form-input" style="width: 80px;" placeholder="Val 1"> 
              to <input type="number" id="p3-y" class="form-input" style="width: 80px;" placeholder="Val 2">
              <button id="p3-btn" class="btn btn-primary btn-sm">Calc</button>
            </div>
            <div style="font-weight: bold;">Result: <span id="p3-res" style="color: var(--accent); font-size: 1.2rem;">-</span></div>
          </div>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          document.getElementById('p1-btn').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('p1-x').value);
            const y = parseFloat(document.getElementById('p1-y').value);
            if(isNaN(x) || isNaN(y)) return;
            const res = (x / 100) * y;
            document.getElementById('p1-res').textContent = res;
          });

          document.getElementById('p2-btn').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('p2-x').value);
            const y = parseFloat(document.getElementById('p2-y').value);
            if(isNaN(x) || isNaN(y) || y === 0) return;
            const res = (x / y) * 100;
            document.getElementById('p2-res').textContent = res.toFixed(2) + '%';
          });

          document.getElementById('p3-btn').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('p3-x').value);
            const y = parseFloat(document.getElementById('p3-y').value);
            if(isNaN(x) || isNaN(y) || x === 0) return;
            const res = ((y - x) / Math.abs(x)) * 100;
            const type = res >= 0 ? 'Increase' : 'Decrease';
            document.getElementById('p3-res').textContent = \`\${Math.abs(res).toFixed(2)}% \${type}\`;
          });
        })();
      `,
      howToUse: [
        'Choose the type of calculation you need from the available cards.',
        'Enter the values into the respective input fields.',
        'Click the "Calc" button next to your inputs.',
        'The calculated percentage or value will appear immediately below.'
      ],
      faqs: [
        { q: 'Can I use decimals?', a: 'Yes, you can input decimal numbers for precise calculations.' }
      ],
      relatedSlugs: ['attendance-calculator'],
      features: ['Find X% of Y', 'Find what % X is of Y', 'Calculate percentage change/difference'],
      hasDownload: false,
      hasCopy: false,
      lastUpdated: '2023-10-01',
      benefits: ['Simplifies complex percentage math', 'Quickly calculates increases/decreases', 'Useful for everyday finance and study']
    },

    // 7. Age Calculator
    {
      slug: 'age-calculator',
      name: 'Age Calculator',
      category: 'student',
      categoryName: 'Student Tools',
      icon: '🎓',
      shortDesc: 'Calculate your exact age in years, months, and days',
      metaTitle: 'Age Calculator - Calculate Age in Years, Months, Days | ToolVerse',
      metaDescription: 'Find out your exact age down to the day. Calculate time between two dates in years, months, weeks, and days for free.',
      keywords: 'age calculator, exact age, calculate age from date of birth, date difference calculator',
      toolHTML: `
        <div class="grid-2">
          <div class="tool-input-area">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="age-dob">Date of Birth:</label>
              <input type="date" id="age-dob" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label" for="age-target">Calculate age at this date:</label>
              <input type="date" id="age-target" class="form-input">
            </div>
            <button id="age-calc" class="btn btn-primary" style="width: 100%;">Calculate Age</button>
          </div>
          <div class="result-card" style="background: var(--bg-secondary); padding: 2rem; border-radius: 12px; text-align: center;">
            <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">Your Exact Age is</h3>
            <div id="age-result-main" style="font-size: 1.5rem; font-weight: 700; color: var(--accent); margin-bottom: 1rem;">-</div>
            <hr style="border-color: var(--border); margin: 1rem 0;">
            <div style="font-size: 0.9rem; color: var(--text-secondary);">
              Total Months: <span id="age-m" style="color: var(--text); font-weight:bold;">-</span><br>
              Total Weeks: <span id="age-w" style="color: var(--text); font-weight:bold;">-</span><br>
              Total Days: <span id="age-d" style="color: var(--text); font-weight:bold;">-</span>
            </div>
          </div>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const inDob = document.getElementById('age-dob');
          const inTarget = document.getElementById('age-target');
          const btnCalc = document.getElementById('age-calc');
          
          // Set target to today
          const today = new Date().toISOString().split('T')[0];
          inTarget.value = today;

          btnCalc.addEventListener('click', () => {
            if(!inDob.value || !inTarget.value) return;
            
            const dob = new Date(inDob.value);
            const target = new Date(inTarget.value);
            
            if (dob > target) {
              if(window.showToast) window.showToast('Date of birth cannot be after the target date', 'error');
              return;
            }

            let years = target.getFullYear() - dob.getFullYear();
            let months = target.getMonth() - dob.getMonth();
            let days = target.getDate() - dob.getDate();

            if (days < 0) {
              months--;
              const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
              days += prevMonth.getDate();
            }
            if (months < 0) {
              years--;
              months += 12;
            }

            document.getElementById('age-result-main').innerHTML = \`\${years} <small>years</small> \${months} <small>months</small> \${days} <small>days</small>\`;

            const diffTime = Math.abs(target - dob);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            document.getElementById('age-m').textContent = (years * 12) + months;
            document.getElementById('age-w').textContent = Math.floor(diffDays / 7);
            document.getElementById('age-d').textContent = diffDays;
          });
        })();
      `,
      howToUse: [
        'Select your Date of Birth.',
        'The target date defaults to today, but you can change it to calculate age at a specific future or past date.',
        'Click "Calculate Age".',
        'View your exact age in years, months, and days, along with total counts.'
      ],
      faqs: [
        { q: 'Is this calculator accurate for leap years?', a: 'Yes, it automatically accounts for leap years when calculating the exact number of days.' }
      ],
      relatedSlugs: ['percentage-calculator'],
      features: ['Exact years, months, and days', 'Total months breakdown', 'Total weeks and days calculations'],
      hasDownload: false,
      hasCopy: false,
      lastUpdated: '2023-10-01',
      benefits: ['Provides exact age down to the day', 'Useful for precise form filling', 'Accounts for leap years automatically']
    },

    // 8. BMI Calculator
    {
      slug: 'bmi-calculator',
      name: 'BMI Calculator',
      category: 'student',
      categoryName: 'Student Tools',
      icon: '🎓',
      shortDesc: 'Check your Body Mass Index (BMI) easily with standard metrics',
      metaTitle: 'BMI Calculator - Check Your Body Mass Index | ToolVerse',
      metaDescription: 'Free BMI calculator to check your Body Mass Index. Supports metric (kg/cm) and imperial (lbs/inches) units with visual health status indicators.',
      keywords: 'bmi calculator, body mass index, check bmi, ideal weight calculator',
      toolHTML: `
        <div class="grid-2">
          <div class="tool-input-area">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Units:</label>
              <select id="bmi-units" class="form-input">
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, inches)</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" id="lbl-height">Height (cm):</label>
              <input type="number" id="bmi-height" class="form-input" placeholder="e.g. 175">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label" id="lbl-weight">Weight (kg):</label>
              <input type="number" id="bmi-weight" class="form-input" placeholder="e.g. 70">
            </div>
            <button id="bmi-calc" class="btn btn-primary" style="width: 100%;">Calculate BMI</button>
          </div>
          <div class="result-card" style="background: var(--bg-secondary); padding: 2rem; border-radius: 12px; text-align: center;">
            <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">Your BMI</h3>
            <div id="bmi-val" style="font-size: 3.5rem; font-weight: 800; margin-bottom: 0.5rem;">-</div>
            <div id="bmi-status" style="font-size: 1.2rem; font-weight: bold; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block;">-</div>
          </div>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const selUnits = document.getElementById('bmi-units');
          const lblHeight = document.getElementById('lbl-height');
          const lblWeight = document.getElementById('lbl-weight');
          const inHeight = document.getElementById('bmi-height');
          const inWeight = document.getElementById('bmi-weight');
          const btnCalc = document.getElementById('bmi-calc');
          
          const elVal = document.getElementById('bmi-val');
          const elStatus = document.getElementById('bmi-status');

          selUnits.addEventListener('change', () => {
            if (selUnits.value === 'metric') {
              lblHeight.textContent = 'Height (cm):';
              lblWeight.textContent = 'Weight (kg):';
            } else {
              lblHeight.textContent = 'Height (inches):';
              lblWeight.textContent = 'Weight (lbs):';
            }
            inHeight.value = '';
            inWeight.value = '';
          });

          btnCalc.addEventListener('click', () => {
            const h = parseFloat(inHeight.value);
            const w = parseFloat(inWeight.value);
            
            if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

            let bmi = 0;
            if (selUnits.value === 'metric') {
              const hMeters = h / 100;
              bmi = w / (hMeters * hMeters);
            } else {
              bmi = (w / (h * h)) * 703;
            }

            elVal.textContent = bmi.toFixed(1);

            let status = '';
            let color = '';
            let bgColor = '';
            
            if (bmi < 18.5) {
              status = 'Underweight';
              color = '#eab308'; // yellow
              bgColor = 'rgba(234, 179, 8, 0.1)';
            } else if (bmi < 25) {
              status = 'Normal Weight';
              color = '#10b981'; // green
              bgColor = 'rgba(16, 185, 129, 0.1)';
            } else if (bmi < 30) {
              status = 'Overweight';
              color = '#f97316'; // orange
              bgColor = 'rgba(249, 115, 22, 0.1)';
            } else {
              status = 'Obese';
              color = '#ef4444'; // red
              bgColor = 'rgba(239, 68, 68, 0.1)';
            }

            elStatus.textContent = status;
            elStatus.style.color = color;
            elStatus.style.backgroundColor = bgColor;
            elVal.style.color = color;
          });
        })();
      `,
      howToUse: [
        'Select your preferred measurement units (Metric or Imperial).',
        'Enter your height in the specified unit.',
        'Enter your weight in the specified unit.',
        'Click "Calculate BMI".',
        'View your BMI score and the corresponding health category.'
      ],
      faqs: [
        { q: 'What is a normal BMI?', a: 'A normal, healthy BMI is generally considered to be between 18.5 and 24.9.' },
        { q: 'Is BMI accurate for everyone?', a: 'BMI is a general guideline. It may not be accurate for athletes with high muscle mass, pregnant women, or the elderly.' }
      ],
      relatedSlugs: ['age-calculator'],
      features: ['Metric and Imperial support', 'Instant calculation', 'Color-coded health status category'],
      hasDownload: false,
      hasCopy: false,
      lastUpdated: '2023-10-01',
      benefits: ['Instant health check metric', 'Supports both metric and imperial units', 'Visual color indicators for easy reading']
    },

    // 9. Image Resizer
    {
      slug: 'resize-image',
      name: 'Image Resizer',
      category: 'image',
      categoryName: 'Image Tools',
      icon: '🖼️',
      shortDesc: 'Resize images to exact pixel dimensions securely in your browser',
      metaTitle: 'Image Resizer - Resize Images Online for Free | ToolVerse',
      metaDescription: 'Free online image resizer. Change image dimensions quickly and securely right in your browser. No upload to server required.',
      keywords: 'image resizer, resize image online, change image dimensions, photo resizer, client-side image editor',
      toolHTML: `
        <div class="tool-input-area" style="margin-bottom: 2rem;">
          <div id="img-dropzone" class="drop-zone" style="border: 2px dashed var(--border); padding: 3rem; text-align: center; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">📁</div>
            <p style="margin-bottom: 0.5rem; font-weight: 500;">Drag & Drop Image Here</p>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">or click to browse (JPG, PNG, WebP)</p>
            <input type="file" id="img-input" accept="image/png, image/jpeg, image/webp" style="display: none;">
          </div>
        </div>

        <div id="img-workspace" style="display: none;">
          <div class="grid-2" style="gap: 2rem; margin-bottom: 2rem;">
            <div>
              <h3 style="margin-bottom: 1rem;">Preview</h3>
              <div style="background: var(--bg-secondary); border-radius: 8px; padding: 1rem; text-align: center;">
                <img id="img-preview" style="max-width: 100%; max-height: 300px; border-radius: 4px; object-fit: contain;">
                <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">Original: <span id="img-orig-dim">-</span></p>
              </div>
            </div>
            
            <div>
              <h3 style="margin-bottom: 1rem;">Settings</h3>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label" for="img-w">Width (px):</label>
                <input type="number" id="img-w" class="form-input">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label" for="img-h">Height (px):</label>
                <input type="number" id="img-h" class="form-input">
              </div>
              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" id="img-lock" checked> Lock Aspect Ratio
                </label>
              </div>
              <button id="img-download" class="btn btn-primary" style="width: 100%;">Resize & Download</button>
            </div>
          </div>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const dropzone = document.getElementById('img-dropzone');
          const fileInput = document.getElementById('img-input');
          const workspace = document.getElementById('img-workspace');
          const preview = document.getElementById('img-preview');
          const origDim = document.getElementById('img-orig-dim');
          
          const inW = document.getElementById('img-w');
          const inH = document.getElementById('img-h');
          const chkLock = document.getElementById('img-lock');
          const btnDownload = document.getElementById('img-download');
          
          let currentImage = null;
          let origAspect = 1;
          let originalFileName = 'image';
          let originalFileType = 'image/jpeg';

          dropzone.addEventListener('click', () => fileInput.click());
          
          dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--accent)';
            dropzone.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
          });
          dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--border)';
            dropzone.style.backgroundColor = 'transparent';
          });
          dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--border)';
            dropzone.style.backgroundColor = 'transparent';
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          });
          
          fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          });

          function handleFile(file) {
            if (!file.type.startsWith('image/')) {
              if (window.showToast) window.showToast('Please select an image file', 'error');
              return;
            }
            
            originalFileName = file.name.split('.')[0];
            originalFileType = file.type;

            const reader = new FileReader();
            reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                currentImage = img;
                origAspect = img.width / img.height;
                
                preview.src = img.src;
                origDim.textContent = \`\${img.width}x\${img.height}px\`;
                
                inW.value = img.width;
                inH.value = img.height;
                
                workspace.style.display = 'block';
                dropzone.style.display = 'none';
              };
              img.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }

          inW.addEventListener('input', () => {
            if (chkLock.checked && inW.value) {
              inH.value = Math.round(inW.value / origAspect);
            }
          });

          inH.addEventListener('input', () => {
            if (chkLock.checked && inH.value) {
              inW.value = Math.round(inH.value * origAspect);
            }
          });

          btnDownload.addEventListener('click', () => {
            if (!currentImage) return;
            
            const w = parseInt(inW.value);
            const h = parseInt(inH.value);
            
            if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
              if (window.showToast) window.showToast('Invalid dimensions', 'error');
              return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            
            // Draw image resized
            ctx.drawImage(currentImage, 0, 0, w, h);
            
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              // Determine extension
              let ext = '.jpg';
              if (originalFileType === 'image/png') ext = '.png';
              else if (originalFileType === 'image/webp') ext = '.webp';
              
              a.download = \`\${originalFileName}_resized\${ext}\`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }, originalFileType, 0.9);
          });
        })();
      `,
      howToUse: [
        'Drag and drop an image into the dashed upload area, or click to browse files.',
        'View the original dimensions of your uploaded image.',
        'Enter the new Width or Height. Keep "Lock Aspect Ratio" checked to avoid distortion.',
        'Click "Resize & Download" to save the resized image.'
      ],
      faqs: [
        { q: 'Is my image uploaded to your server?', a: 'No, all image processing happens securely inside your browser. We never see or store your files.' },
        { q: 'Does this tool maintain image quality?', a: 'Yes, it uses native browser Canvas APIs which preserve high quality while changing dimensions.' }
      ],
      relatedSlugs: ['jpg-to-png'],
      features: ['Client-side processing (100% Private)', 'Aspect ratio locking', 'Drag & drop support'],
      hasDownload: true,
      hasCopy: false,
      lastUpdated: '2023-10-01',
      benefits: ['Fast client-side processing without uploads', 'Maintains original aspect ratio easily', 'Perfect for meeting image size requirements']
    },

    // 10. JPG to PNG Converter
    {
      slug: 'jpg-to-png',
      name: 'JPG to PNG Converter',
      category: 'image',
      categoryName: 'Image Tools',
      icon: '🖼️',
      shortDesc: 'Convert JPEG images to transparent PNG format quickly',
      metaTitle: 'JPG to PNG Converter - Free Image Format Tool | ToolVerse',
      metaDescription: 'Convert JPG/JPEG files to PNG format instantly. Secure, browser-based conversion with no limits and no data uploads.',
      keywords: 'jpg to png, convert jpeg to png, image format converter, free image converter',
      toolHTML: `
        <div class="tool-input-area" style="margin-bottom: 2rem;">
          <div id="jp-dropzone" class="drop-zone" style="border: 2px dashed var(--border); padding: 3rem; text-align: center; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🔄</div>
            <p style="margin-bottom: 0.5rem; font-weight: 500;">Upload JPG/JPEG File</p>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">Drag & Drop or Click (No Upload - Processed Locally)</p>
            <input type="file" id="jp-input" accept="image/jpeg, .jpg, .jpeg" style="display: none;">
          </div>
        </div>
        <div id="jp-workspace" style="display: none; text-align: center; padding: 2rem; background: var(--bg-secondary); border-radius: 12px;">
          <img id="jp-preview" style="max-width: 100%; max-height: 300px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 1.5rem;">
          <h3 id="jp-filename" style="margin-bottom: 1rem;">image.jpg</h3>
          <button id="jp-convert" class="btn btn-primary btn-lg">Convert to PNG & Download</button>
          <button id="jp-reset" class="btn btn-ghost" style="margin-left: 1rem;">Convert Another</button>
        </div>
        <div class="tool-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Share feature coming soon!')">🔗 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Report Issue feature coming soon!')">🚩 Report Issue</button>
        </div>
      `,
      toolScript: `
        (function(){
          const dropzone = document.getElementById('jp-dropzone');
          const fileInput = document.getElementById('jp-input');
          const workspace = document.getElementById('jp-workspace');
          const preview = document.getElementById('jp-preview');
          const filename = document.getElementById('jp-filename');
          const btnConvert = document.getElementById('jp-convert');
          const btnReset = document.getElementById('jp-reset');
          
          let currentImage = null;
          let originalName = '';

          dropzone.addEventListener('click', () => fileInput.click());
          
          dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--accent)';
          });
          dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--border)';
          });
          dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--border)';
            if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          });
          
          fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
          });

          function handleFile(file) {
            if (file.type !== 'image/jpeg') {
              if (window.showToast) window.showToast('Please select a JPG/JPEG file', 'error');
              return;
            }
            
            originalName = file.name.split('.')[0];
            filename.textContent = file.name;

            const reader = new FileReader();
            reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                currentImage = img;
                preview.src = img.src;
                workspace.style.display = 'block';
                dropzone.style.display = 'none';
              };
              img.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }

          btnConvert.addEventListener('click', () => {
            if (!currentImage) return;
            
            const canvas = document.createElement('canvas');
            canvas.width = currentImage.width;
            canvas.height = currentImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(currentImage, 0, 0);
            
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = \`\${originalName}.png\`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              
              if (window.showToast) window.showToast('Successfully converted to PNG', 'success');
            }, 'image/png');
          });

          btnReset.addEventListener('click', () => {
            currentImage = null;
            fileInput.value = '';
            workspace.style.display = 'none';
            dropzone.style.display = 'block';
          });
        })();
      `,
      howToUse: [
        'Click the upload area or drag and drop a JPG or JPEG file.',
        'Preview the uploaded image to verify it is correct.',
        'Click the "Convert to PNG & Download" button.',
        'The converted file will automatically download to your device.'
      ],
      faqs: [
        { q: 'Is there a file size limit?', a: 'Since processing is done inside your browser, the limit depends on your device\'s memory, but generally up to 50MB works perfectly.' },
        { q: 'Does it upload to a server?', a: 'No, all format conversion uses native browser technologies, ensuring complete privacy.' }
      ],
      relatedSlugs: ['resize-image'],
      features: ['Browser-based instant conversion', 'No upload needed', 'Preserves original resolution'],
      hasDownload: true,
      hasCopy: false,
      lastUpdated: '2023-10-01',
      benefits: ['Converts formats securely in-browser', 'Requires no software installation', 'Preserves image quality perfectly']
    }
  ]
};
