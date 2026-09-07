import {chromium,webkit} from '../../swc-js/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
for(const engine of [chromium,webkit]) {
 const browser=await engine.launch({headless:true});const p=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[],external=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.url().startsWith('http')&&!r.url().startsWith('http://localhost:4400'))external.push(r.url());});
 await p.goto('http://localhost:4400',{waitUntil:'networkidle'});
 const panel=p.getByRole('dialog',{name:'Conversation with the Pragmatical AI assistant',includeHidden:true});
 assert.equal(await panel.isVisible(),false);
 await p.getByRole('button',{name:'Open AI assistant',exact:true}).click();assert.equal(await panel.isVisible(),true);
 await p.waitForFunction(()=>document.activeElement?.tagName==='TEXTAREA');
 if(engine===chromium){await p.screenshot({path:'/tmp/pragmatical-floating-desktop.png'});}
 // Deterministic streaming for repeatable UI/history checks; real inference is tested separately.
 const requests=[];
 await p.route('**/swc/chat',async route=>{requests.push(route.request().postDataJSON());await route.fulfill({status:200,contentType:'text/event-stream',body:'data: {"type":"delta","text":"Cherga connects router, store and streaming services."}\n\ndata: {"type":"done"}\n\n'});});
 await panel.locator('textarea').fill('Explain the architecture.');await panel.getByRole('button',{name:'Send message',exact:true}).click();
 await p.waitForFunction(()=>document.querySelectorAll('s-cnv-i').length===3);
 await p.getByRole('button',{name:'Minimise AI assistant',exact:true}).click();assert.equal(await panel.isVisible(),false);
 await p.locator('#primary-navigation a[href="/approach"]').click();await p.waitForURL('**/approach');
 await p.getByRole('button',{name:'Open AI assistant',exact:true}).click();assert.equal(await panel.locator('s-cnv-i').count(),3);
 await p.locator('#primary-navigation a[href="/work"]').click();await p.waitForURL('**/work');assert.equal(await panel.isVisible(),true);assert.equal(await panel.locator('s-cnv-i').count(),3);
 await panel.locator('textarea').fill('And the store?');await panel.getByRole('button',{name:'Send message',exact:true}).click();
 await p.waitForFunction(()=>document.querySelectorAll('s-cnv-i').length===5);assert.equal(requests[1].messages.length,4);
 for(const mode of ['light','dark']) {
  if(mode==='dark')await p.getByRole('button',{name:'Switch to dark mode',exact:true}).click();
  for(const width of [320,390,768,1024,1440]) {
   await p.setViewportSize({width,height:width<=390?844:1000});await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   const box=await panel.boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=width&&box.y+box.height<=(width<=390?844:1000));
   if(engine===chromium&&[390,1440].includes(width))await p.screenshot({path:`/tmp/pragmatical-floating-${mode}-${width}.png`});
  }
  await p.addScriptTag({path:new URL('../../swc-js/node_modules/axe-core/axe.min.js',import.meta.url).pathname});
  const result=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],engine.name()+' '+mode);
 }
 await panel.locator('textarea').focus();await p.keyboard.press('Escape');assert.equal(await panel.isVisible(),false);
 assert.equal(await p.getByRole('button',{name:'Open AI assistant',exact:true}).evaluate(el=>el===document.activeElement),true);
 await p.reload({waitUntil:'networkidle'});await p.getByRole('button',{name:'Open AI assistant',exact:true}).click();assert.equal(await panel.locator('s-cnv-i').count(),5);
 await p.getByRole('button',{name:'New conversation',exact:true}).click();assert.equal(await panel.locator('s-cnv-i').count(),1);
 await p.route('**/swc/chat',async route=>{await new Promise(r=>setTimeout(r,1500));await route.fulfill({status:200,contentType:'text/event-stream',body:'data: {"type":"delta","text":"A late answer"}\n\ndata: {"type":"done"}\n\n'}).catch(()=>{});});
 await panel.locator('textarea').fill('Pause this reply.');await panel.getByRole('button',{name:'Send message',exact:true}).click();
 await panel.getByRole('button',{name:'Stop response',exact:true}).click();
 assert.equal(await p.locator('s-cnv').getAttribute('streaming'),null);
 await p.getByRole('button',{name:'New conversation',exact:true}).click();
 await p.route('**/swc/chat',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'The assistant is temporarily unavailable.'})}));
 await panel.locator('textarea').fill('Check an unavailable response.');await panel.getByRole('button',{name:'Send message',exact:true}).click();
 await p.locator('[rg=chat-error]').waitFor({state:'visible'});assert.equal(await p.locator('s-cnv').getAttribute('streaming'),null);
 await p.getByRole('button',{name:'Minimise AI assistant',exact:true}).click();
 await p.goto('http://localhost:4400/contact',{waitUntil:'networkidle'});
 await p.getByRole('button',{name:'Talk to the AI assistant',exact:true}).click();assert.equal(await panel.isVisible(),true);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log(engine.name(),'PASS: floating assistant, minimise, route/reload history, follow-up context, reset, focus, five widths, both themes, accessibility and local-only assets.');
 await browser.close();
}
