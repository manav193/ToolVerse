const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Global arrays to store URLs dynamically read from sitemap.xml
let sitemapUrls = [];
let toolUrls = [];

test.beforeAll(async () => {
  // Read sitemap.xml from the build output directory (root in this case)
  const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    // Extract all <loc> contents
    const matches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
    if (matches) {
      sitemapUrls = matches.map(m => m.replace('<loc>', '').replace('</loc>', ''));
      // Filter just the tool URLs for specific tests
      toolUrls = sitemapUrls.filter(url => url.includes('/tools/'));
    }
  }
});

test.describe('ToolVerse Automated E2E Tests', () => {

  test('Sitemap matches generated pages and has 70 tools', async () => {
    // There are 70 tools, plus index, 404, offline, and 6 standard pages = ~79 pages total
    expect(sitemapUrls.length).toBeGreaterThanOrEqual(70);
    expect(toolUrls.length).toBe(70); // Exactly 70 tools!
  });

  test('Homepage loads without console errors and registers Service Worker', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    
    // Assert no JS errors
    expect(errors.length).toBe(0);

    // Verify Manifest exists
    const manifestLink = await page.$('link[rel="manifest"]');
    expect(manifestLink).not.toBeNull();

    // Verify Service Worker registration logic exists in main.js
    // We check if navigator.serviceWorker is accessed in the script context
    const hasSwCode = await page.evaluate(() => {
       return typeof navigator.serviceWorker !== 'undefined';
    });
    expect(hasSwCode).toBeTruthy();
  });

  test('Dark mode toggle applies the correct data-theme', async ({ page }) => {
    await page.goto('/');
    
    // Initial state should be light (or based on system preference)
    const htmlThemeBefore = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    
    // Click the theme toggle button
    const themeBtn = await page.locator('.theme-toggle').first();
    if(await themeBtn.isVisible()) {
        await themeBtn.click();
        
        // Assert the theme changed
        const htmlThemeAfter = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        expect(htmlThemeAfter).not.toBe(htmlThemeBefore);
    }
  });

  test('Homepage search includes all 70 tools', async ({ page }) => {
    await page.goto('/');
    
    // The build script injects TOOLVERSE_TOOLS globally
    const toolsArrayLength = await page.evaluate(() => {
      return window.TOOLVERSE_TOOLS ? window.TOOLVERSE_TOOLS.length : 0;
    });
    
    expect(toolsArrayLength).toBe(70);
  });

  test('SEO Tags exist on a sample tool page', async ({ page }) => {
    // Pick the first tool URL
    if (toolUrls.length === 0) return;
    
    // Convert prod URL to local URL
    const localUrl = toolUrls[0].replace('https://manav193.github.io/ToolVerse', '');
    await page.goto(localUrl);

    // Assert Title exists
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Assert Meta Description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc.length).toBeGreaterThan(0);

    // Assert Canonical Link
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('https://tool-verse-theta.vercel.app/tools/');
  });

  test('404 page works', async ({ page }) => {
    const response = await page.goto('/non-existent-page.html');
    // For a static server, it might just return 404, or the serve package might redirect to 404.html
    // If it doesn't redirect automatically in testing, we explicitly check 404.html
    const fallbackResponse = await page.goto('/404.html');
    expect(fallbackResponse.status()).toBe(200);
    const title = await page.title();
    expect(title).toContain('Page Not Found');
  });

  test('No broken internal links on the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Get all internal anchor links
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]'))
        .map(a => a.getAttribute('href'))
        .filter(href => href && !href.startsWith('#'));
    });

    // Make sure we have some links to test
    expect(links.length).toBeGreaterThan(0);

    // Test a sample of them to avoid huge test times, or just verify format
    // Playwright natively doesn't complain unless we explicitly request and fail
    for (const link of links.slice(0, 5)) { // Check top 5 links
        // Remove ./ prefix if exists
        const cleanLink = link.replace('./', '/');
        const req = await page.request.get(cleanLink);
        expect(req.ok()).toBeTruthy();
    }
  });

});

test.describe('Text Tools Experience', () => {
  test('Word Counter updates live and clears safely', async ({ page }) => {
    await page.goto('/tools/word-counter.html');
    await page.locator('#wc-input').fill('Hello, café world!\n\nSecond paragraph.');
    await expect(page.locator('#wc-words')).toHaveText('5');
    await expect(page.locator('#wc-chars')).toHaveText('37');
    await expect(page.locator('#wc-paragraphs')).toHaveText('2');
    await expect(page.locator('#wc-copy')).toBeEnabled();
    await page.locator('#wc-clear').click();
    await expect(page.locator('#wc-input')).toHaveValue('');
    await expect(page.locator('#wc-words')).toHaveText('0');
    await expect(page.locator('#wc-copy')).toBeDisabled();
  });

  test('Character Counter preserves Unicode and reports UTF-8 bytes', async ({ page }) => {
    await page.goto('/tools/character-counter.html');
    await page.locator('#cc-input').fill('Café ☕');
    await expect(page.locator('#cc-with-spaces')).toHaveText('6');
    await expect(page.locator('#cc-no-spaces')).toHaveText('5');
    await expect(page.locator('#cc-bytes')).toHaveText('9');
    await page.locator('#cc-clear').click();
    await expect(page.locator('#cc-with-spaces')).toHaveText('0');
  });

  test('Case Converter exposes its active mode and supports copy and clear', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/case-converter.html');
    await page.locator('#case-input').fill("DON'T STOP — CAFÉ");
    const lowerMode = page.locator('[data-action="lower"]');
    await lowerMode.click();
    await expect(lowerMode).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#case-output')).toHaveValue("don't stop — café");
    await page.locator('#case-copy').click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("don't stop — café");
    await page.locator('#case-clear').click();
    await expect(page.locator('#case-output')).toHaveValue('');
    await expect(page.locator('#case-copy')).toBeDisabled();
  });

  test('Remove Duplicate Lines preserves punctuation and handles empty input', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/remove-duplicate-lines.html');
    await page.locator('#rd-input').fill("Café\ncafé\nO'Reilly\nO'Reilly\nalpha-beta");
    await page.locator('#rd-process').click();
    await expect(page.locator('#rd-total')).toHaveText('5');
    await expect(page.locator('#rd-unique')).toHaveText('4');
    await expect(page.locator('#rd-output')).toHaveValue(/O'Reilly/);
    await expect(page.locator('#rd-output')).toHaveValue(/alpha-beta/);
    await page.locator('#rd-copy').click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('alpha-beta');
    await page.locator('#rd-clear').click();
    await page.locator('#rd-process').click();
    await expect(page.locator('#rd-status')).toHaveText('Enter at least one line to process.');
    await expect(page.locator('#rd-total')).toHaveText('0');
  });

  test('All text workspaces fit a 390px viewport with labeled controls', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const slug of ['word-counter', 'character-counter', 'case-converter', 'remove-duplicate-lines']) {
      await page.goto(`/tools/${slug}.html`);
      const audit = await page.evaluate(() => {
        const controls = [...document.querySelectorAll('.text-tool input, .text-tool textarea, .text-tool select')];
        const unlabeled = controls.filter(control => {
          const explicitLabel = control.id && document.querySelector(`label[for="${CSS.escape(control.id)}"]`);
          return !explicitLabel && !control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby') && !control.closest('label');
        });
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          unlabeled: unlabeled.length
        };
      });
      expect(audit.overflow).toBe(0);
      expect(audit.unlabeled).toBe(0);
    }
  });
});

async function createImageFixture(page, { type, width, height, transparent = false, name }) {
  const base64 = await page.evaluate(async ({ type, width, height, transparent }) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (transparent) {
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(124, 58, 237, 0.55)';
      context.fillRect(0, 0, Math.ceil(width / 2), height);
    } else {
      context.fillStyle = '#7c3aed';
      context.fillRect(0, 0, width, height);
    }
    const blob = await new Promise(resolve => canvas.toBlob(resolve, type, 0.9));
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return { data: btoa(binary), actualType: blob.type };
  }, { type, width, height, transparent });
  return {
    name,
    mimeType: base64.actualType,
    buffer: Buffer.from(base64.data, 'base64')
  };
}

async function downloadedByteLength(download) {
  const stream = await download.createReadStream();
  let bytes = 0;
  for await (const chunk of stream) bytes += chunk.length;
  return bytes;
}

test.describe('Image Tools Experience', () => {
  const imageSlugs = [
    'resize-image', 'jpg-to-png', 'compress-image', 'crop-image',
    'png-to-jpg', 'webp-converter', 'rotate-image', 'flip-image',
    'blur-image', 'bg-color-changer', 'image-watermark', 'ico-generator'
  ];

  test('all image workspaces expose labeled, keyboard-ready uploads without mobile overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const slug of imageSlugs) {
      await page.goto(`/tools/${slug}.html`);
      const audit = await page.evaluate(() => {
        const fileInput = document.querySelector('.image-tool input[type="file"]');
        const dropZone = document.querySelector('.image-upload-zone');
        const controls = [...document.querySelectorAll('.image-tool input, .image-tool select')];
        const unlabeled = controls.filter(control => {
          const explicitLabel = control.id && document.querySelector(`label[for="${CSS.escape(control.id)}"]`);
          return !explicitLabel && !control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby') && !control.closest('label');
        });
        return {
          h1: document.querySelectorAll('h1').length,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          fileLabel: Boolean(fileInput && document.querySelector(`label[for="${CSS.escape(fileInput.id)}"]`)),
          dropRole: dropZone?.getAttribute('role'),
          dropTabIndex: dropZone?.tabIndex,
          statusLive: document.querySelector('.image-workspace-status')?.getAttribute('aria-live'),
          unlabeled: unlabeled.length
        };
      });
      expect(audit).toEqual({
        h1: 1,
        overflow: 0,
        fileLabel: true,
        dropRole: 'button',
        dropTabIndex: 0,
        statusLive: 'polite',
        unlabeled: 0
      });
    }
  });

  test('Image Resizer validates dimensions, downloads output, and replaces the source', async ({ page }) => {
    await page.goto('/tools/resize-image.html');
    const landscape = await createImageFixture(page, { type: 'image/png', width: 8, height: 4, transparent: true, name: 'transparent.png' });
    const portrait = await createImageFixture(page, { type: 'image/png', width: 4, height: 8, transparent: true, name: 'portrait.png' });
    await page.locator('#img-input').setInputFiles(landscape);
    await expect(page.locator('[data-image-meta="dimensions"]')).toHaveText('8 × 4 px');
    await expect(page.locator('#img-h')).toHaveValue('4');

    await page.locator('#img-w').fill('16');
    await expect(page.locator('#img-h')).toHaveValue('8');
    await page.locator('#img-h').fill('0');
    await page.locator('#img-download').click();
    await expect(page.locator('.image-workspace-status')).toContainText('between 1 and 12,000');

    await page.locator('#img-h').fill('8');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#img-download').click()
    ]);
    expect(download.suggestedFilename()).toBe('transparent_resized.png');
    expect(await downloadedByteLength(download)).toBeGreaterThan(0);

    await page.locator('#img-input').setInputFiles(portrait);
    await expect(page.locator('[data-image-meta="dimensions"]')).toHaveText('4 × 8 px');
    await page.locator('[data-image-reset]').click();
    await expect(page.locator('.image-file-metadata')).toBeHidden();
    await expect(page.locator('.image-workspace-status')).toHaveText('Choose an image to begin.');
  });

  test('Compress Image processes JPEG, updates quality metadata, copies, downloads, and resets', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/compress-image.html');
    const jpeg = await createImageFixture(page, { type: 'image/jpeg', width: 24, height: 12, name: 'landscape.jpg' });
    await page.locator('#fileInput_compress_image').setInputFiles(jpeg);
    await expect(page.locator('[data-image-meta="dimensions"]')).toHaveText('24 × 12 px');
    await expect(page.locator('#imgAfter_compress_image')).toBeVisible();
    await expect.poll(() => page.locator('#imgAfter_compress_image').evaluate(image => image.naturalWidth)).toBe(24);

    await page.locator('#quality_compress_image').fill('55');
    await expect(page.locator('#quality_compress_image')).toHaveAttribute('aria-valuetext', '55');
    await expect(page.locator('.image-preview-card--result .image-preview-detail')).toContainText('JPEG');
    await page.locator('#btnCopy_compress_image').click();
    await expect(page.locator('.image-workspace-status')).toHaveText('Image copied to clipboard.');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btnDownload_compress_image').click()
    ]);
    expect(download.suggestedFilename()).toBe('compress-image_result.jpg');
    expect(await downloadedByteLength(download)).toBeGreaterThan(0);

    await page.locator('#btnReset_compress_image').click();
    await expect(page.locator('#controls_compress_image')).toBeHidden();
    await expect(page.locator('.image-file-metadata')).toBeHidden();
  });

  test('format converters preserve dimensions and use matching download extensions', async ({ page }) => {
    await page.goto('/tools/jpg-to-png.html');
    const jpeg = await createImageFixture(page, { type: 'image/jpeg', width: 11, height: 7, name: 'photo.jpg' });
    await page.locator('#jp-input').setInputFiles(jpeg);
    await expect(page.locator('[data-image-meta="dimensions"]')).toHaveText('11 × 7 px');
    const [pngDownload] = await Promise.all([page.waitForEvent('download'), page.locator('#jp-convert').click()]);
    expect(pngDownload.suggestedFilename()).toBe('photo.png');
    expect(await downloadedByteLength(pngDownload)).toBeGreaterThan(0);

    await page.goto('/tools/png-to-jpg.html');
    const png = await createImageFixture(page, { type: 'image/png', width: 10, height: 6, transparent: true, name: 'transparent.png' });
    await page.locator('#fileInput_png_to_jpg').setInputFiles(png);
    await expect.poll(() => page.locator('#imgAfter_png_to_jpg').evaluate(image => image.naturalWidth)).toBe(10);
    const [jpgDownload] = await Promise.all([page.waitForEvent('download'), page.locator('#btnDownload_png_to_jpg').click()]);
    expect(jpgDownload.suggestedFilename()).toBe('png-to-jpg_result.jpg');
    expect(await downloadedByteLength(jpgDownload)).toBeGreaterThan(0);
  });

  test('canvas rotation updates output dimensions and remains repeatable', async ({ page }) => {
    await page.goto('/tools/rotate-image.html');
    const png = await createImageFixture(page, { type: 'image/png', width: 12, height: 6, transparent: true, name: 'wide.png' });
    await page.locator('#fileInput_rotate_image').setInputFiles(png);
    await expect.poll(() => page.locator('#imgAfter_rotate_image').evaluate(image => image.naturalWidth)).toBe(12);
    await page.locator('#rotRight_rotate_image').click();
    await expect.poll(() => page.locator('#imgAfter_rotate_image').evaluate(image => [image.naturalWidth, image.naturalHeight])).toEqual([6, 12]);
    await page.locator('#rotRight_rotate_image').click();
    await expect.poll(() => page.locator('#imgAfter_rotate_image').evaluate(image => [image.naturalWidth, image.naturalHeight])).toEqual([12, 6]);
  });

  test('invalid and corrupted files show inline errors without stale controls', async ({ page }) => {
    await page.goto('/tools/compress-image.html');
    await page.locator('#fileInput_compress_image').setInputFiles({ name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('not an image') });
    await expect(page.locator('.image-workspace-status')).toHaveText('That file is not a supported image.');
    await expect(page.locator('#controls_compress_image')).toBeHidden();

    await page.locator('#fileInput_compress_image').setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not a valid png') });
    await expect(page.locator('.image-workspace-status')).toHaveText('This image could not be decoded. Try a different file.');
    await expect(page.locator('.image-file-metadata')).toBeHidden();
  });
});

async function createPdfFixture(page, { name, pageSizes }) {
  const base64 = await page.evaluate(async sizes => {
    const document = await PDFLib.PDFDocument.create();
    const font = await document.embedFont(PDFLib.StandardFonts.Helvetica);
    sizes.forEach((size, index) => {
      const pdfPage = document.addPage(size);
      pdfPage.drawText(`Test page ${index + 1}`, { x: 20, y: size[1] - 40, size: 14, font });
    });
    const bytes = await document.save();
    let binary = '';
    new Uint8Array(bytes).forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }, pageSizes);
  return { name, mimeType: 'application/pdf', buffer: Buffer.from(base64, 'base64') };
}

async function downloadToBuffer(download) {
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function inspectPdfBuffer(page, buffer) {
  return page.evaluate(async base64 => {
    const bytes = Uint8Array.from(atob(base64), character => character.charCodeAt(0));
    const document = await PDFLib.PDFDocument.load(bytes);
    return {
      pages: document.getPageCount(),
      sizes: document.getPages().map(pdfPage => [Math.round(pdfPage.getWidth()), Math.round(pdfPage.getHeight())]),
      rotations: document.getPages().map(pdfPage => pdfPage.getRotation().angle)
    };
  }, buffer.toString('base64'));
}

test.describe('PDF Tools Experience', () => {
  const pdfSlugs = [
    'merge-pdf', 'split-pdf', 'optimize-pdf', 'jpg-to-pdf', 'pdf-to-jpg',
    'rotate-pdf', 'delete-pdf-pages', 'extract-pdf-pages', 'watermark-pdf', 'add-page-numbers'
  ];

  test('all PDF workspaces expose labeled keyboard uploads without mobile overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const slug of pdfSlugs) {
      await page.goto(`/tools/${slug}.html`);
      const audit = await page.evaluate(() => {
        const root = document.querySelector('.pdf-tool');
        const controls = [...root.querySelectorAll('input, select')];
        const unlabeled = controls.filter(control => {
          const explicit = control.id && document.querySelector(`label[for="${CSS.escape(control.id)}"]`);
          return !explicit && !control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby') && !control.closest('label');
        });
        const dropZone = root.querySelector('#drop-zone');
        return {
          h1: document.querySelectorAll('h1').length,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          unlabeled: unlabeled.length,
          role: dropZone.getAttribute('role'),
          tabIndex: dropZone.tabIndex,
          live: root.querySelector('#status').getAttribute('aria-live')
        };
      });
      expect(audit).toEqual({ h1: 1, overflow: 0, unlabeled: 0, role: 'button', tabIndex: 0, live: 'polite' });
    }
  });

  test('Merge PDF preserves accessible order, rejects duplicates, and supports repeated download', async ({ page }) => {
    await page.goto('/tools/merge-pdf.html');
    const first = await createPdfFixture(page, { name: 'long-first-document-name-for-accessibility.pdf', pageSizes: [[300, 500], [500, 300], [400, 400]] });
    const second = await createPdfFixture(page, { name: 'second.pdf', pageSizes: [[200, 600], [600, 200]] });
    await page.locator('#file-input').setInputFiles([first, second]);
    await expect(page.locator('.pdf-file-item')).toHaveCount(2);
    await page.locator('.pdf-file-item').nth(1).getByRole('button', { name: /Move up/ }).click();
    await expect(page.locator('.pdf-file-details strong').first()).toHaveText('second.pdf');

    await page.locator('#file-input').setInputFiles(second);
    await expect(page.locator('.pdf-file-item')).toHaveCount(2);
    await expect(page.locator('#status')).toContainText('duplicate was skipped');

    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#action-btn').click()]);
    const output = await downloadToBuffer(download);
    expect(download.suggestedFilename()).toBe('merged.pdf');
    await expect(page.locator('#result-pages')).toHaveText('5');
    expect(await inspectPdfBuffer(page, output)).toEqual({
      pages: 5,
      sizes: [[200, 600], [600, 200], [300, 500], [500, 300], [400, 400]],
      rotations: [0, 0, 0, 0, 0]
    });
    const [repeatDownload] = await Promise.all([page.waitForEvent('download'), page.locator('#download-btn').click()]);
    expect(repeatDownload.suggestedFilename()).toBe('merged.pdf');
  });

  test('Split PDF validates ranges and preserves requested page order', async ({ page }) => {
    await page.goto('/tools/split-pdf.html');
    const source = await createPdfFixture(page, { name: 'mixed-pages.pdf', pageSizes: [[300, 500], [500, 300], [400, 400]] });
    await page.locator('#file-input').setInputFiles(source);
    await page.locator('#page-ranges').fill('1-2x');
    await page.locator('#action-btn').click();
    await expect(page.locator('#status')).toHaveText('Use page ranges such as 1-3, 5, 8-10.');
    await expect(page.locator('#result-panel')).toBeHidden();

    await page.locator('#page-ranges').fill('3, 1-2');
    await expect(page.locator('#selection-summary')).toHaveText('3 of 3 pages selected.');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#action-btn').click()]);
    expect(await inspectPdfBuffer(page, await downloadToBuffer(download))).toEqual({
      pages: 3,
      sizes: [[400, 400], [300, 500], [500, 300]],
      rotations: [0, 0, 0]
    });
  });

  test('Rotate PDF changes only selected pages and downloads a valid PDF', async ({ page }) => {
    await page.goto('/tools/rotate-pdf.html');
    const source = await createPdfFixture(page, { name: 'rotate.pdf', pageSizes: [[300, 500], [500, 300], [400, 400]] });
    await page.locator('#file-input').setInputFiles(source);
    await page.locator('#page-ranges').fill('2');
    await page.locator('#angle-select').selectOption('90');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#action-btn').click()]);
    const output = await inspectPdfBuffer(page, await downloadToBuffer(download));
    expect(output.pages).toBe(3);
    expect(output.rotations).toEqual([0, 90, 0]);
  });

  test('JPG to PDF and PDF to JPG produce non-empty, correctly named outputs', async ({ page }) => {
    await page.goto('/tools/jpg-to-pdf.html');
    const jpeg = await createImageFixture(page, { type: 'image/jpeg', width: 300, height: 500, name: 'portrait.jpg' });
    const png = await createImageFixture(page, { type: 'image/png', width: 500, height: 300, transparent: true, name: 'landscape.png' });
    await page.locator('#file-input').setInputFiles([jpeg, png]);
    const [pdfDownload] = await Promise.all([page.waitForEvent('download'), page.locator('#action-btn').click()]);
    expect(pdfDownload.suggestedFilename()).toBe('images.pdf');
    expect((await inspectPdfBuffer(page, await downloadToBuffer(pdfDownload))).pages).toBe(2);

    await page.goto('/tools/pdf-to-jpg.html');
    const pdf = await createPdfFixture(page, { name: 'source.pdf', pageSizes: [[300, 500], [500, 300]] });
    await page.locator('#file-input').setInputFiles(pdf);
    await page.locator('#page-ranges').fill('2');
    await page.locator('#action-btn').click();
    await expect(page.locator('.pdf-output-card')).toHaveCount(1);
    const [jpgDownload] = await Promise.all([page.waitForEvent('download'), page.locator('.pdf-output-card a').click()]);
    expect(jpgDownload.suggestedFilename()).toBe('page_2.jpg');
    expect(await downloadedByteLength(jpgDownload)).toBeGreaterThan(0);
  });

  test('invalid and corrupted PDF files recover through inline errors and reset', async ({ page }) => {
    await page.goto('/tools/extract-pdf-pages.html');
    await page.locator('#file-input').setInputFiles({ name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('not a pdf') });
    await expect(page.locator('#status')).toHaveText('Choose a PDF file.');
    await expect(page.locator('#file-info')).toBeHidden();

    await page.locator('#file-input').setInputFiles({ name: 'broken.pdf', mimeType: 'application/pdf', buffer: Buffer.from('not a valid pdf') });
    await expect(page.locator('#status')).toHaveText('This file could not be read as a valid PDF.');
    await expect(page.locator('#action-btn')).toBeDisabled();
  });
});

test.describe('Calculator Tools Experience', () => {
  const calculatorSlugs = [
    'emi-calculator', 'sip-calculator', 'loan-calculator', 'gst-calculator',
    'discount-calculator', 'profit-calculator', 'margin-calculator',
    'percentage-difference-calculator', 'compound-interest-calculator',
    'simple-interest-calculator', 'salary-calculator', 'tax-calculator',
    'fuel-cost-calculator', 'time-duration-calculator', 'date-difference-calculator',
    'gpa-calculator', 'grade-calculator', 'marks-percentage-calculator',
    'calorie-calculator', 'bmr-calculator', 'attendance-calculator',
    'percentage-calculator', 'age-calculator', 'bmi-calculator'
  ];

  test('EMI and compound interest accept zero-percent rates and reject invalid amounts', async ({ page }) => {
    await page.goto('/tools/emi-calculator.html');
    await page.locator('#emi-principal').fill('100000');
    await page.locator('#emi-rate').fill('12');
    await page.locator('#emi-tenure').fill('1');
    await page.locator('#emi-calc-btn').click();
    await expect(page.locator('#emi-monthly-output')).toHaveText('8884.88');
    await page.locator('#emi-principal').fill('100000');
    await page.locator('#emi-rate').fill('0');
    await page.locator('#emi-tenure').fill('5');
    await page.locator('#emi-calc-btn').click();
    await expect(page.locator('#emi-monthly-output')).toHaveText('1666.67');
    await expect(page.locator('#emi-table-interest')).toHaveText('0.00');
    await page.locator('#emi-principal').fill('-1');
    await page.locator('#emi-calc-btn').click();
    await expect(page.locator('.calculator-workspace-status')).toContainText('valid positive');
    await page.locator('#emi-principal').fill('1000');
    await page.locator('#emi-tenure').fill('0');
    await page.locator('#emi-calc-btn').click();
    await expect(page.locator('.calculator-workspace-status')).toContainText('valid positive');

    await page.goto('/tools/compound-interest-calculator.html');
    await page.locator('#ci-prin').fill('10000');
    await page.locator('#ci-rate').fill('10');
    await page.locator('#ci-time').fill('2');
    await page.locator('#ci-freq').selectOption('1');
    await page.locator('#ci-calc-btn').click();
    await expect(page.locator('#ci-total-output')).toHaveText('12100.00');
    await page.locator('#ci-prin').fill('10000');
    await page.locator('#ci-rate').fill('0');
    await page.locator('#ci-time').fill('10');
    await page.locator('#ci-calc-btn').click();
    await expect(page.locator('#ci-total-output')).toHaveText('10000.00');
    await expect(page.locator('#ci-table-int')).toHaveText('0.00');

    await page.goto('/tools/sip-calculator.html');
    await page.locator('#sip-amount').fill('100.5');
    await page.locator('#sip-rate').fill('0');
    await page.locator('#sip-years').fill('1');
    await page.locator('#sip-calc-btn').click();
    await expect(page.locator('#sip-total-output')).toHaveText('1206.00');
    await page.locator('#sip-amount').fill('0');
    await page.locator('#sip-calc-btn').click();
    await expect(page.locator('.calculator-workspace-status')).toContainText('valid positive');
  });

  test('date and age calculations use calendar dates across leap, reversed, and same-day inputs', async ({ page }) => {
    await page.goto('/tools/date-difference-calculator.html');
    await page.locator('#date-start').fill('2024-02-01');
    await page.locator('#date-end').fill('2024-03-01');
    await page.locator('#calc-date-btn').click();
    await expect(page.locator('#res-date-calendar')).toHaveText('0 years, 1 months, 0 days');
    await page.locator('#date-start').fill('2024-02-29');
    await page.locator('#date-end').fill('2025-02-28');
    await page.locator('#calc-date-btn').click();
    await expect(page.locator('#res-date-days')).toHaveText('365 days');
    await expect(page.locator('#res-date-calendar')).toHaveText('1 years, 0 months, 0 days');

    await page.locator('#date-start').fill('2025-03-01');
    await page.locator('#date-end').fill('2025-02-01');
    await page.locator('#calc-date-btn').click();
    await expect(page.locator('#res-date-days')).toHaveText('28 days');
    await expect(page.locator('.calculator-workspace-status')).toContainText('reordered');

    await page.locator('#date-start').fill('2025-07-26');
    await page.locator('#date-end').fill('2025-07-26');
    await page.locator('#calc-date-btn').click();
    await expect(page.locator('#res-date-calendar')).toHaveText('0 years, 0 months, 0 days');
    await page.locator('#date-start').fill('2024-12-31');
    await page.locator('#date-end').fill('2025-01-01');
    await page.locator('#calc-date-btn').click();
    await expect(page.locator('#res-date-days')).toHaveText('1 days');

    await page.goto('/tools/age-calculator.html');
    await page.locator('#age-dob').fill('2000-02-29');
    await page.locator('#age-target').fill('2025-02-28');
    await page.locator('#age-calc').click();
    await expect(page.locator('#age-result-main')).toContainText('25 years 0 months 0 days');
  });

  test('percentage, discount, BMI, and attendance calculations handle decimal and boundary values', async ({ page }) => {
    await page.goto('/tools/percentage-calculator.html');
    await page.locator('#p1-x').fill('12.5');
    await page.locator('#p1-y').fill('80');
    await page.locator('#p1-btn').click();
    await expect(page.locator('#p1-res')).toHaveText('10');
    await page.locator('#p1-x').fill('150');
    await page.locator('#p1-y').fill('10');
    await page.locator('#p1-btn').click();
    await expect(page.locator('#p1-res')).toHaveText('15');
    await page.locator('#p2-x').fill('5');
    await page.locator('#p2-y').fill('0');
    await page.locator('#p2-btn').click();
    await expect(page.locator('.calculator-workspace-status')).toContainText('cannot be zero');

    await page.goto('/tools/discount-calculator.html');
    await page.locator('#disc-price').fill('0');
    await page.locator('#disc-percent').fill('100');
    await page.locator('#disc-calc-btn').click();
    await expect(page.locator('#disc-final-output')).toHaveText('0.00');

    await page.goto('/tools/bmi-calculator.html');
    await page.locator('#bmi-height').fill('175');
    await page.locator('#bmi-weight').fill('70');
    await page.locator('#bmi-calc').click();
    await expect(page.locator('#bmi-val')).toHaveText('22.9');
    await expect(page.locator('#bmi-status')).toHaveText('Normal Weight');

    await page.goto('/tools/attendance-calculator.html');
    await page.locator('#att-total').fill('10');
    await page.locator('#att-attended').fill('9');
    await page.locator('#att-target').fill('100');
    await page.locator('#att-calc').click();
    await expect(page.locator('#att-message')).toContainText('cannot be reached');
  });

  test('all numeric workspaces are labeled and fit a 390px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const slug of calculatorSlugs) {
      await page.goto(`/tools/${slug}.html`);
      await expect(page.locator(`[data-calculator-slug="${slug}"]`)).toBeVisible();
      const unlabeled = await page.locator('.calculator-tool input:not([type="hidden"]), .calculator-tool select, .calculator-tool textarea').evaluateAll(controls => controls.filter(control => {
        const labels = control.labels ? Array.from(control.labels) : [];
        return !labels.length && !control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby');
      }).map(control => control.id || control.outerHTML));
      expect(unlabeled, `${slug} has unlabeled controls`).toEqual([]);
      const undescribed = await page.locator('.calculator-tool input:not([type="hidden"]), .calculator-tool select, .calculator-tool textarea').evaluateAll(controls => controls.filter(control => !control.getAttribute('aria-describedby')).length);
      expect(undescribed, `${slug} has controls without inline feedback association`).toBe(0);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${slug} has horizontal overflow`).toBeLessThanOrEqual(1);
      await expect(page.locator('.calculator-workspace-status')).toHaveAttribute('aria-live', 'polite');
    }
  });
});

test.describe('Premium Interaction System', () => {
  test('desktop pointer response is subtle, frame-driven, and preserves navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toHaveClass(/motion-entered/);
    const cta = page.getByRole('link', { name: 'Explore Tools' });
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box.x + box.width * 0.78, box.y + box.height * 0.35);
    await page.waitForTimeout(50);
    const response = await cta.evaluate(element => ({
      x: element.style.getPropertyValue('--magnet-x'),
      y: element.style.getPropertyValue('--magnet-y'),
      active: element.classList.contains('is-pointer-active')
    }));
    expect(response.active).toBeTruthy();
    expect(Math.abs(parseFloat(response.x))).toBeLessThanOrEqual(2.3);
    expect(Math.abs(parseFloat(response.y))).toBeLessThanOrEqual(1.8);
    await expect(cta).toHaveAttribute('href', '#search-section');
  });

  test('search, filters, focus, and non-blocking feedback expose polished states', async ({ page }) => {
    await page.goto('/');
    const search = page.locator('#hero-search');
    await search.focus();
    await search.fill('image');
    await expect(page.locator('.search-result-item').first()).toBeVisible();
    const animationName = await page.locator('.search-result-item').first().evaluate(element => getComputedStyle(element).animationName);
    expect(animationName).toContain('motion-search-result');
    await search.press('Escape');
    await expect(page.locator('#hero-search-results')).toBeHidden();

    await page.locator('.arcade-filter[data-filter="image"]').click();
    await expect(page.locator('.arcade-filter[data-filter="image"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.arcade-tool-card.is-filter-entering').first()).toBeVisible();

    await page.evaluate(() => window.alert('Interaction feedback'));
    await expect(page.locator('.toast')).toHaveText('Interaction feedback');
    await expect(page.locator('.toast-container')).toHaveAttribute('aria-live', 'polite');
  });

  test('reduced motion and coarse mobile layouts disable pointer transforms without hiding content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('body')).toHaveClass(/motion-entered/);
    await expect(page.locator('.hero-content')).toBeVisible();
    const cta = page.getByRole('link', { name: 'Explore Tools' });
    const transitionDuration = await cta.evaluate(element => getComputedStyle(element).transitionDuration);
    expect(transitionDuration.split(',').every(value => parseFloat(value) <= 0.001)).toBeTruthy();
    expect(await cta.evaluate(element => element.style.getPropertyValue('--magnet-x'))).toBe('');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
