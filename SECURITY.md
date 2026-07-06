# Security Policy

## Supported Versions

Currently, only the latest version of ToolVerse is actively supported for security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

Security is a high priority for ToolVerse. Because the platform relies 100% on client-side processing, traditional server vulnerabilities (like SQL injection) do not apply. However, we take Client-Side vulnerabilities (such as Cross-Site Scripting / XSS) very seriously.

If you discover a security vulnerability within ToolVerse, please DO NOT disclose it publicly. 

Instead, open a private issue or email the maintainers directly. We will review the vulnerability and issue a patch as quickly as possible.

### Safe Architecture
ToolVerse intentionally avoids `.innerHTML` when handling user-provided text payload strings and utilizes native Web APIs to ensure sandbox safety within the browser.
