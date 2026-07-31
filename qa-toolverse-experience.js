const fs=require('fs');
const path=require('path');
const root=__dirname;
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const fail=message=>{throw new Error(`[ToolVerse experience QA] ${message}`)};
const entry=read('js/adaptive-entry.js');
const moduleSource=read('js/toolverse-experience.js');
const css=read('css/toolverse-experience.css');
const build=read('build.js');

if(!entry.includes("import { initToolVerseExperience } from './toolverse-experience.js'"))fail('adaptive entry does not import the experience module');
if(!entry.includes('initToolVerseExperience();'))fail('adaptive entry does not initialize the experience module');
if(!build.includes('js/adaptive-entry.js'))fail('generated pages do not load adaptive-entry.js');
[
  'data-tv-command','data-tv-favorites','data-tv-density','data-tv-reset',
  'data-tv-favorite-tool','data-tv-recent','data-tv-network'
].forEach(token=>{if(!moduleSource.includes(token))fail(`missing runtime contract: ${token}`)});
if(!moduleSource.includes("const STORAGE_PREFIX='toolverse:'"))fail('missing ToolVerse storage namespace');
if(!moduleSource.includes("read('favorites',[])"))fail('favorites are not restored from local storage');
if(!moduleSource.includes("write('favorites',[...state.favorites])"))fail('favorites are not persisted to local storage');
[
  '.tv-productivity-bar','.tv-recent-grid','.tv-favorite-button',
  '.tv-command-backdrop','.tv-network-status','[data-tool-density=compact]'
].forEach(selector=>{if(!css.includes(selector))fail(`missing CSS contract: ${selector}`)});
if(!moduleSource.includes("prefers-reduced-motion")&&!css.includes('prefers-reduced-motion'))fail('reduced motion safeguard missing');
if(!moduleSource.includes("window.addEventListener('offline'"))fail('offline state listener missing');
if(!moduleSource.includes("event.ctrlKey&&event.key.toLowerCase()==='k'"))fail('command shortcut missing');
console.log('ToolVerse experience QA passed');
