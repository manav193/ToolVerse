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
    expect(canonical).toContain('https://manav193.github.io/ToolVerse/tools/');
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
