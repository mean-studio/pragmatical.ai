import { chromium, webkit } from '../../swc-js/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';

for (const engine of [chromium, webkit]) {
  const browser = await engine.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [], external = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (request.url().startsWith('http') && !request.url().startsWith('http://localhost:4400')) external.push(request.url());
  });
  await page.goto('http://localhost:4400', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const primary = page.locator('primary-assistant');
  const panel = page.getByRole('dialog', { name: 'Conversation with the Pragmatical AI assistant', includeHidden: true });
  const conversation = page.locator('s-cnv');
  const launcher = page.getByRole('button', { name: 'Open AI assistant', exact: true });
  assert.equal(await primary.isVisible(), true);
  assert.equal(await page.locator('[rg=assistant-launcher]').count(), 0);
  await page.getByRole('button', { name: 'Explore the platform', exact: true }).click();
  await page.waitForURL('**/work');
  await page.goBack();
  await page.waitForURL('http://localhost:4400/');
  assert.equal(await primary.locator('s-cnv-i').count(), 1, 'greeting survives browser back');

  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark mode', exact: true }).click();
    for (const width of [320, 390, 768, 1024, 1440]) {
      const height = width <= 390 ? 844 : 1000;
      await page.setViewportSize({ width, height });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${engine.name()} ${theme} ${width} overflow`);
      const input = await primary.locator('textarea').boundingBox();
      assert.ok(input.y > 0 && input.y + input.height <= height, `${engine.name()} ${width} composer must appear on the opening screen`);
      const box = await primary.boundingBox();
      assert.ok(Math.abs(box.x + box.width / 2 - width / 2) < 2, 'primary conversation is centred');
      if (engine === chromium) await page.screenshot({ path: `/tmp/pragmatical-central-${theme}-${width}.png` });
      for (const button of await primary.getByRole('button').all()) {
        if (!await button.isVisible()) continue;
        const target = await button.boundingBox();
        assert.ok(target.height >= 44 && target.width >= 44, `chat touch target ${await button.getAttribute('aria-label')}: ${JSON.stringify(target)}`);
      }
    }
    await page.addScriptTag({ path: new URL('../../swc-js/node_modules/axe-core/axe.min.js', import.meta.url).pathname });
    const result = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }));
    assert.deepEqual(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `${engine.name()} ${theme}`);
  }

  // Slow response allows navigation while the shared native service is busy.
  await page.route('**/swc/chat', async route => {
    requests.push(route.request().postDataJSON());
    await new Promise(resolve => setTimeout(resolve, 700));
    await route.fulfill({ status: 200, contentType: 'text/event-stream', body: 'data: {"type":"delta","text":"Cherga connects router, store and streaming services."}\n\ndata: {"type":"done"}\n\n' });
  });
  await primary.locator('textarea').fill('Explain the architecture.');
  await primary.getByRole('button', { name: 'Send message', exact: true }).click();
  await page.locator('#primary-navigation a[href="/approach"]').click();
  await page.waitForURL('**/approach');
  await panel.waitFor({ state: 'visible' });
  await page.waitForFunction(() => document.querySelectorAll('s-cnv-i').length === 3);
  assert.equal(await conversation.count(), 1);
  await panel.locator('textarea').fill('And the store?');
  await panel.getByRole('button', { name: 'Send message', exact: true }).click();
  await page.waitForFunction(() => document.querySelectorAll('s-cnv-i').length === 5);
  assert.equal(requests[1].messages.length, 4);

  for (const width of [320, 390, 768, 1024, 1440]) {
    const height = width <= 390 ? 844 : 1000;
    await page.setViewportSize({ width, height });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const box = await panel.boundingBox();
    assert.ok(box.x >= 0 && box.y >= 0 && box.x + box.width <= width && box.y + box.height <= height, 'panel fits viewport');
    assert.ok(Math.abs(box.x + box.width / 2 - width / 2) < 2, 'panel is centred');
    if (engine === chromium) await page.screenshot({ path: `/tmp/pragmatical-central-panel-${width}.png` });
  }
  await panel.locator('textarea').focus();
  await page.keyboard.press('Escape');
  assert.equal(await panel.isVisible(), false);
  assert.equal(await launcher.evaluate(element => element === document.activeElement), true);
  await launcher.click();
  assert.equal(await panel.locator('s-cnv-i').count(), 5);
  await page.locator('#primary-navigation a[href="/contact"]').click();
  await page.waitForURL('**/contact');
  assert.equal(await primary.isVisible(), true);
  assert.equal(await conversation.count(), 1);
  assert.equal(await primary.locator('s-cnv-i').count(), 5);
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await primary.locator('s-cnv-i').count(), 5);
  await primary.getByRole('button', { name: 'New conversation', exact: true }).click();
  assert.equal(await primary.locator('s-cnv-i').count(), 1);
  assert.equal(await primary.locator('textarea').evaluate(element => element === document.activeElement), true);

  await page.route('**/swc/chat', async route => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await route.fulfill({ status: 200, contentType: 'text/event-stream', body: 'data: {"type":"delta","text":"A late answer"}\n\ndata: {"type":"done"}\n\n' }).catch(() => {});
  });
  await primary.locator('textarea').fill('Pause this reply.');
  await primary.getByRole('button', { name: 'Send message', exact: true }).click();
  await primary.getByRole('button', { name: 'Stop response', exact: true }).click();
  assert.equal(await conversation.getAttribute('streaming'), null);
  await primary.getByRole('button', { name: 'New conversation', exact: true }).click();
  await page.route('**/swc/chat', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'The assistant is temporarily unavailable.' }) }));
  await primary.locator('textarea').fill('Check an unavailable response.');
  await primary.getByRole('button', { name: 'Send message', exact: true }).click();
  await primary.locator('[rg=chat-error]').waitFor({ state: 'visible' });
  assert.equal(await conversation.getAttribute('streaming'), null);
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(engine.name(), 'PASS: primary chat above fold, central panel, navigation during response, minimise, route/reload history, context, reset, focus, five widths, themes, accessibility and local fonts.');
  await browser.close();
}
