const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('ToolVerse federation artifacts', () => {
    test('emits a valid module manifest and factual knowledge for every tool', () => {
        const root = path.resolve(__dirname, '..');
        const manifest = JSON.parse(fs.readFileSync(path.join(root, 'project-manifest.json'), 'utf8'));
        const knowledge = JSON.parse(fs.readFileSync(path.join(root, 'toolverse-knowledge.json'), 'utf8'));
        expect(manifest).toMatchObject({
            id: 'toolverse', type: 'utility-module', entry: 'index.html', knowledge: 'toolverse-knowledge.json', status: 'stable'
        });
        expect(manifest.version).toMatch(/^\d+\.\d+\.\d+/);
        expect(knowledge.module).toBe('toolverse');
        expect(knowledge.tools).toHaveLength(70);
        expect(knowledge.tools.find(tool => tool.id === 'compress-image')).toMatchObject({ route: 'tools/compress-image.html' });
        expect(knowledge.tools.find(tool => tool.id === 'merge-pdf')).toMatchObject({ route: 'tools/merge-pdf.html' });
        expect(new Set(knowledge.tools.map(tool => tool.id)).size).toBe(knowledge.tools.length);
    });
});

test.describe('ToolVerse maintenance Easter egg', () => {
    test('pointer drift is bounded, repairs once, and leaves the real link clickable', async ({ page }) => {
        await page.addInitScript(() => {
            window.__repairEvents = [];
            window.addEventListener('nimo:project-event', event => window.__repairEvents.push(event.detail));
        });
        await page.goto('/');
        const card = page.locator('[data-repair-utility="compress-image"]');
        await card.scrollIntoViewIfNeeded();
        const box = await card.boundingBox();
        await page.mouse.move(box.x + 4, box.y + box.height / 2);
        await page.waitForTimeout(180);
        await page.mouse.move(box.x + box.width - 4, box.y + box.height / 2);
        await expect(card).toHaveAttribute('data-repair-state', 'stable', { timeout: 2500 });
        expect(await card.evaluate(element => getComputedStyle(element).getPropertyValue('--repair-x').trim())).toBe('0px');
        const events = await page.evaluate(() => window.__repairEvents);
        expect(events.map(event => event.type)).toEqual(['repairEventStarted', 'repairEventCompleted']);
        expect(events[0].detail.dodges).toBeLessThanOrEqual(2);
        await card.click();
        await expect(page).toHaveURL(/\/tools\/compress-image(?:\.html)?$/);
    });

    test('keyboard focus never dodges and Enter starts repair immediately', async ({ page }) => {
        await page.goto('/');
        const card = page.locator('[data-repair-utility="compress-image"]');
        await card.focus();
        const before = await card.evaluate(element => ({
            x: getComputedStyle(element).getPropertyValue('--repair-x').trim(),
            y: getComputedStyle(element).getPropertyValue('--repair-y').trim()
        }));
        expect(before).toEqual({ x: '0px', y: '0px' });
        await page.keyboard.press('Enter');
        await expect(card).toHaveAttribute('data-repair-state', 'stable', { timeout: 2500 });
        await expect(page).toHaveURL(/\/$/);
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(/\/tools\/compress-image(?:\.html)?$/);
    });

    test('reduced motion disables dodge while preserving repair', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/');
        const card = page.locator('[data-repair-utility="compress-image"]');
        await card.hover();
        await page.waitForTimeout(220);
        expect(await card.evaluate(element => getComputedStyle(element).transform)).toBe('none');
        await card.click();
        await expect(card).toHaveAttribute('data-repair-state', 'stable', { timeout: 1500 });
    });
});
