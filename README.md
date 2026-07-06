# ToolVerse

**100% Free Online Tools for Everyone**

ToolVerse is a lightning-fast, privacy-first platform offering 70+ free online tools for PDFs, Images, Text, Developers, Students, and Calculators. Everything runs entirely in your browser using local client-side processing — ensuring your data never leaves your device.

## 🚀 Features

- **70+ Premium Tools:** Covering everything from PDF merging to complex financial calculators.
- **100% Privacy:** Zero server-side file uploads. Everything processes locally via the Web API.
- **Blazing Fast:** Static Site Generation (SSG) architecture with conditional CDN injection.
- **Offline Capable:** Full PWA support allows ToolVerse to work without an internet connection.
- **No Signups:** completely free, no paywalls, and no registration required.

## 🛠️ Architecture

ToolVerse is built on a custom, ultra-lightweight Node.js Static Site Generator (`build.js`). 
- **HTML/CSS/JS:** Vanilla stack for maximum performance.
- **CSS System:** Glassmorphism UI, fully responsive, dark/light mode toggle.
- **SSG:** `build.js` scans the `src/tools/` directory and compiles templates into static HTML.

## 📦 Local Development

1. Clone the repository
2. Run `npm install` to install local development dependencies (used only for the build).
3. Run `npm run build` to compile the static site.
4. Run `npm run serve` to preview the site locally.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to add new tools.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
