# ToolVerse

A privacy-first progressive web application containing 70+ browser-based tools for PDFs, images, text, developers, students, calculators, and finance workflows.

ToolVerse is designed around local browser processing: files remain on the user's device whenever the selected tool can run entirely client-side.

## Highlights

- 70+ focused utilities across six major categories
- Client-side processing for privacy-sensitive workflows
- Progressive Web App support and offline app-shell behavior
- Responsive dark and light interface
- Custom Node.js static-site generator
- Search-engine-friendly generated pages
- Playwright browser testing
- Lighthouse-oriented performance checks
- GitHub Actions automation

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js static-site generation
- Playwright
- Lighthouse CI
- Service Worker and Web App Manifest

## Local development

```bash
git clone https://github.com/manav193/ToolVerse.git
cd ToolVerse
npm install
npm run build
npm run serve
```

Use the scripts defined in `package.json` as the source of truth if the local workflow changes.

## Privacy model

ToolVerse aims to process user-provided files locally in the browser whenever technically possible. Individual tools should clearly disclose any workflow that requires a network request.

## Contributing

Review [CONTRIBUTING.md](CONTRIBUTING.md) before adding a tool or opening a pull request.

## License

Released under the [MIT License](LICENSE).
