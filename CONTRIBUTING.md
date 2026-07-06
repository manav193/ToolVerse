# Contributing to ToolVerse

Thank you for your interest in contributing to ToolVerse! Our goal is to build the fastest, most reliable, and privacy-focused online tools platform.

## How to Add a New Tool

ToolVerse uses a custom Static Site Generator. Adding a new tool is as simple as defining a JavaScript object.

1. **Locate the Category File:**
   Navigate to `src/tools/` and find the appropriate category file (e.g., `text-tools.js`, `developer1-tools.js`). If creating a new category, update `categories.js` first.

2. **Define the Tool Object:**
   Append your tool object to the `module.exports` array in the chosen file. 

```javascript
{
  slug: 'my-new-tool',
  name: 'My New Tool',
  category: 'developer',
  categoryName: 'Developer Tools',
  icon: '🛠️',
  shortDesc: 'A brief description of what it does.',
  metaTitle: 'My New Tool - Free Online | ToolVerse',
  metaDescription: 'An SEO optimized description for the meta tag.',
  keywords: 'keyword1, keyword2, keyword3',
  benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
  lastUpdated: '2023-11-01',
  features: ['Feature 1', 'Feature 2'],
  howToUse: ['Step 1', 'Step 2', 'Step 3'],
  faqs: [{ q: 'Is it free?', a: 'Yes!' }],
  relatedSlugs: ['some-other-tool'],
  hasDownload: false,
  hasCopy: true,
  toolHTML: `<div class="tool-workspace">...HTML UI...</div>`,
  toolScript: `(function() { /* Vanilla JS Logic */ })();`
}
```

3. **Rules for Tool Logic (`toolScript`):**
   - **No External Libraries:** Unless absolutely necessary, stick to native Web APIs (Canvas, DOM, Web Crypto).
   - **No Server Processing:** All logic MUST execute in the browser.
   - **Isolation:** Always wrap your logic in an IIFE `(function() { ... })();` to prevent global scope pollution.
   - **Styling:** Use existing utility classes from `css/style.css` (e.g., `.form-input`, `.btn-primary`).

4. **Testing:**
   - Run `npm run build` to generate the HTML.
   - Run `npm run serve` to test your tool locally.
   - Ensure the browser console has no errors.

## Pull Requests

1. Fork the repo and create your branch from `main`.
2. Ensure your code follows the existing style (no heavy dependencies).
3. Issue a pull request describing the tool you added or the bug you fixed.
