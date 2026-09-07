// Run against npm start on localhost:4400. Uses the linked framework browser tooling.
import { chromium, webkit } from '../../swc-js/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
for(const [name, engine] of [['Chromium',chromium],['WebKit',webkit]]) {
 const browser=await engine.launch({headless:true});
 const p=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:4400',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 assert.ok(await p.evaluate(()=>document.fonts.check('500 32px "Space Grotesk"')));
 const iconButtons=p.locator('site-appearance button, site-navigation button');
 assert.deepEqual(await iconButtons.evaluateAll(els=>els.map(el=>getComputedStyle(el).borderTopWidth)),['0px','0px']);
 const menu=p.getByRole('button',{name:'Toggle navigation',exact:true,includeHidden:true});
 assert.equal(await menu.isVisible(),false);
 await p.getByRole('button',{name:'Explore the platform',exact:true}).click();await p.waitForURL('**/work');await p.goBack();await p.waitForURL('http://localhost:4400/');
 for(const width of [320,390,768,1024,1440]) {
  await p.setViewportSize({width,height:width<=390?844:1000});
  await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name} overflow ${width}`);
  if(width<=390) {
   assert.equal(await menu.isVisible(),true);assert.equal(await menu.getAttribute('aria-expanded'),'false');
   assert.equal(await p.locator('#primary-navigation').isVisible(),false);
   const box=await menu.boundingBox();assert.ok(box.width>=44&&box.height>=44,'menu touch target');
   const themeBox=await p.locator('site-appearance button').boundingBox();assert.ok(themeBox.width>=44&&themeBox.height>=44,'theme touch target');
   const actionBox=await p.getByRole('button',{name:'Explore the platform',exact:true}).boundingBox();assert.ok(actionBox.height>=44,'primary touch target');
   await menu.focus();await p.keyboard.press('Enter');
   assert.equal(await menu.getAttribute('aria-expanded'),'true');
   await p.keyboard.press(name==='WebKit'?'Alt+Tab':'Tab');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Platform');
   await p.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.equal(await menu.evaluate(el=>el===document.activeElement),true);
   await menu.click();await p.locator('#primary-navigation').getByRole('link',{name:'Approach',exact:true}).click();await p.waitForURL('**/approach');
   assert.equal(await menu.getAttribute('aria-expanded'),'false');
   assert.equal(await p.locator('#primary-navigation a[aria-current=page]').textContent(),'Approach');
   await p.goBack();await p.waitForURL('http://localhost:4400/');assert.equal(await menu.getAttribute('aria-expanded'),'false');
   if(name==='Chromium'&&width===390){await p.screenshot({path:'/tmp/pragmatical-cobalt-mobile.png',fullPage:true});await menu.click();await p.screenshot({path:'/tmp/pragmatical-cobalt-menu.png'});await menu.click();}
  }
 }
 // Crossing breakpoints closes the disclosure and preserves a useful focus target.
 await p.setViewportSize({width:390,height:844});await menu.click();
 await p.setViewportSize({width:1024,height:1000});await p.waitForTimeout(100);
 assert.equal(await menu.isVisible(),false);assert.equal(await menu.getAttribute('aria-expanded'),'false');
 assert.equal(await p.locator('#primary-navigation').isVisible(),true);
 await p.setViewportSize({width:390,height:844});await p.waitForTimeout(100);assert.equal(await p.locator('#primary-navigation').isVisible(),false);
 await p.setViewportSize({width:1440,height:1000});
 for(const mode of ['light','dark']) {
  if(mode==='dark'){await p.getByRole('button',{name:'Switch to dark mode',exact:true}).click();await p.waitForTimeout(100);}
  if(name==='Chromium'){
   await p.screenshot({path:`/tmp/pragmatical-cobalt-${mode}.png`,fullPage:true});
   await p.addScriptTag({path:new URL('../../swc-js/node_modules/axe-core/axe.min.js', import.meta.url).pathname});
   const result=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`${mode} home accessibility`);
  }
 }
 // Theme inheritance must also update content below the viewport in WebKit.
 await p.setViewportSize({width:320,height:844});await menu.click();
 await p.addScriptTag({path:new URL('../../swc-js/node_modules/axe-core/axe.min.js', import.meta.url).pathname});
 const mobileDark=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
 assert.deepEqual(mobileDark.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],name+' dark mobile menu accessibility');
 await menu.click();
 await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('html').getAttribute('data-theme'),'dark');
 await p.getByRole('button',{name:'Switch to light mode',exact:true}).click();
 for(const route of ['/work','/approach','/about','/contact','/products','/products/contract-vetting','/products/swc']) {
  await p.goto('http://localhost:4400'+route,{waitUntil:'networkidle'});await p.setViewportSize({width:390,height:844});await p.waitForTimeout(100);
  assert.equal(await p.locator('h1').count(),1,route+' h1');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow');
  if(name==='Chromium'&&['/work','/approach','/about','/contact'].includes(route)){
   await p.addScriptTag({path:new URL('../../swc-js/node_modules/axe-core/axe.min.js', import.meta.url).pathname});
   const result=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],route+' accessibility');
  }
 }
 // Active state follows direct loads, client navigation and browser history.
 for(const [route,label] of [['/work','Platform'],['/approach','Approach'],['/about','Company'],['/contact','Get in touch']]) {
  await p.goto('http://localhost:4400'+route,{waitUntil:'networkidle'});
  assert.equal(await p.locator('#primary-navigation a[aria-current=page]').textContent(),label);
 }
 await p.setViewportSize({width:1440,height:1000});
 await p.locator('#primary-navigation a[href="/about"]').click();await p.waitForURL('**/about');
 assert.equal(await p.locator('#primary-navigation a[aria-current=page]').textContent(),'Company');
 await p.goBack();await p.waitForURL('**/contact');
 assert.equal(await p.locator('#primary-navigation a[aria-current=page]').textContent(),'Get in touch');
 if(name==='Chromium') {
  await p.locator('s-hd').screenshot({path:'/tmp/pragmatical-active-desktop.png'});
  await p.setViewportSize({width:390,height:844});await menu.click();
  await p.screenshot({path:'/tmp/pragmatical-active-mobile.png'});
 }
 const ssr=await browser.newPage({javaScriptEnabled:false});
 await ssr.goto('http://localhost:4400/approach');
 assert.equal(await ssr.locator('#primary-navigation a[aria-current=page]').textContent(),'Approach');
 assert.deepEqual(errors,[]);console.log(name,'PASS: menu, focus, breakpoint changes, theme, 5 widths and 7 routes.');await browser.close();
}
