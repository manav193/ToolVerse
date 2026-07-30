# ToolVerse

A privacy-first progressive web application containing 70+ browser-based tools for PDFs, images, text, developers, students, calculators, and finance workflows.

![ToolVerse dashboard](https://raw.githubusercontent.com/manav193/MY-PORTFOLIO/main/frontend/images/toolverse_4.png)

[Open ToolVerse](https://tool-verse-theta.vercel.app/) · [View the engineering case study](https://manavagarwal.me/project-toolverse.html)

## Why ToolVerse

Many online utilities are slow, advertisement-heavy, and require users to upload sensitive files. ToolVerse moves supported processing into the browser so files remain on the user's device whenever the workflow can run fully client-side.

## Highlights

- 70+ focused utilities across PDF, image, text, student, developer, calculator, and finance categories
- Client-side processing for privacy-sensitive workflows
- Progressive Web App support and offline app-shell behavior
- Responsive dark and light interface
- Custom Node.js static-site generator
- Search-engine-friendly pre-rendered pages
- Playwright browser testing
- Lighthouse-oriented performance checks
- GitHub Actions automation

## Interface previews

| About and product direction | Local processing workflow |
|---|---|
| ![ToolVerse about interface](https://raw.githubusercontent.com/manav193/MY-PORTFOLIO/main/frontend/images/toolverse_about.png) | ![ToolVerse upload and processing interface](https://raw.githubusercontent.com/manav193/MY-PORTFOLIO/main/frontend/images/toolverse_upload.png) |

## Architecture

ToolVerse uses a static-first architecture rather than a heavy client framework. The build process generates deployable pages while individual tools use browser APIs such as FileReader, Canvas, Service Workers, and other client capabilities.

## Technology

- HTML5
- CSS3 and design variables
- Vanilla JavaScript ES6+
- Node.js static-site generation
- Playwright
- Lighthouse CI
- Service Worker
- Web App Manifest

## Local development

```bash
git clone https://github.com/manav193/ToolVerse.git
cd ToolVerse
npm install
npm run build
npm run serve
```

Use the scripts defined in `package.json` as the source of truth if the workflow changes.

## Privacy model

ToolVerse aims to process user-provided files locally whenever technically possible. Any tool requiring a network request should disclose that behavior clearly before processing begins.

## Contributing

Review [CONTRIBUTING.md](CONTRIBUTING.md) before adding a tool or opening a pull request.

## License

Released under the [MIT License](LICENSE).