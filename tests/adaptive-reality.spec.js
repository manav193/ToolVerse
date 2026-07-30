const { test, expect } = require('@playwright/test');

test.describe('ToolVerse adaptive host', () => {
  test('loads the shared engine without changing core navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.adaptiveSession && window.ArcadeFabric);
    await expect(page.locator('#arcade-fabric canvas')).toHaveCount(1);
    const api = await page.evaluate(() => ['emit', 'disturb', 'focus', 'reset'].every(key => typeof window.ArcadeFabric[key] === 'function'));
    expect(api).toBe(true);
    await expect(page.locator('.arcade-tool-card').first()).toHaveAttribute('href', /tools\/.+\.html/);
  });

  test('stores resolved intent but never raw search text', async ({ page }) => {
    await page.goto('/');
    await page.locator('#hero-search').fill('private invoice pdf phrase');
    await page.waitForTimeout(600);
    const result = await page.evaluate(() => ({
      intent: window.adaptiveSession.getState().intentCounts['pdf-tool'],
      storage: JSON.stringify(sessionStorage)
    }));
    expect(result.intent).toBe(1);
    expect(result.storage).not.toContain('private invoice pdf phrase');
  });

  test('settings are keyboard accessible and reset is local', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.openAdaptiveSettings());
    const panel = page.locator('#adaptive-settings');
    await expect(panel).toBeVisible();
    await expect(panel.locator('[data-adaptive-close]')).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(panel.locator('[data-adaptive-reset]')).toBeFocused();
    await panel.locator('[data-pref="nimoSuggestions"]').uncheck();
    expect(await page.evaluate(() => window.adaptiveSession.getPreference('nimoSuggestions'))).toBe(false);
    await panel.locator('[data-adaptive-reset]').click();
    expect(await page.evaluate(() => window.adaptiveSession.getPreference('nimoSuggestions'))).toBe(true);
  });

  test('touch input selects touch-primary without reordering focusable content', async ({ page }) => {
    await page.goto('/');
    const before = await page.locator('a[href],button,input').evaluateAll(items => items.map(item => item.id || item.getAttribute('href') || item.textContent.trim()).slice(0, 25));
    await page.evaluate(() => {
      for (let i = 0; i < 5; i++) document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', bubbles: true }));
    });
    await expect(page.locator('html')).toHaveAttribute('data-interaction-mode', 'touch-primary');
    const after = await page.locator('a[href],button,input').evaluateAll(items => items.map(item => item.id || item.getAttribute('href') || item.textContent.trim()).slice(0, 25));
    expect(after).toEqual(before);
  });

  test('reduced motion forces a static fabric', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('#arcade-fabric')).toHaveAttribute('data-quality', 'static');
    expect(await page.evaluate(() => window.adaptiveSession.getSummary().qualityMode)).toBe('static');
  });
});
