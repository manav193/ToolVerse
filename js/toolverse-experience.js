const STORAGE_PREFIX='toolverse:';
const read=(key,fallback)=>{try{const raw=localStorage.getItem(STORAGE_PREFIX+key);return raw==null?fallback:JSON.parse(raw)}catch{return fallback}};
const write=(key,value)=>{try{localStorage.setItem(STORAGE_PREFIX+key,JSON.stringify(value))}catch{}};
const toolCards=()=>[...document.querySelectorAll('.arcade-tool-card')];
const toolMeta=card=>({href:card.getAttribute('href'),name:card.querySelector('h3')?.textContent?.trim()||'Tool',category:card.dataset.category||'utility',description:card.querySelector('p')?.textContent?.trim()||''});
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));

export function initToolVerseExperience(){
  if(window.ToolVerseExperience)return window.ToolVerseExperience;
  ensureStyles();
  const state={favorites:new Set(read('favorites',[])),recent:read('recent',[]),density:read('density','comfortable'),lastFilter:read('filter','all')};
  const api={state,refresh:()=>refreshAll(state),clearPreferences:()=>clearPreferences(state),openCommandPalette};
  window.ToolVerseExperience=api;

  document.documentElement.dataset.toolDensity=state.density;
  trackCurrentTool(state);
  enhanceHomepage(state);
  installGlobalShortcuts(state);
  installNetworkStatus();
  return api;
}

function ensureStyles(){
  if(document.querySelector('link[data-toolverse-experience]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href=(location.pathname.includes('/tools/')||location.pathname.includes('/pages/'))?'../css/toolverse-experience.css':'css/toolverse-experience.css';
  link.dataset.toolverseExperience='';
  document.head.appendChild(link);
}

function enhanceHomepage(state){
  const grid=document.getElementById('tools-arcade-grid');
  if(!grid)return;
  const container=grid.closest('.container');
  const heading=container?.querySelector('.arcade-heading');
  const toolbar=document.createElement('section');
  toolbar.className='tv-productivity-bar';
  toolbar.setAttribute('aria-label','ToolVerse productivity controls');
  toolbar.innerHTML=`<div class="tv-productivity-copy"><span>PERSONAL TOOLKIT</span><strong>Pick up where you left off.</strong></div><div class="tv-productivity-actions"><button type="button" data-tv-command>⌘ Search</button><button type="button" data-tv-favorites>★ Favorites <b data-tv-favorite-count>0</b></button><button type="button" data-tv-density>${state.density==='compact'?'Comfortable':'Compact'} view</button><button type="button" data-tv-reset>Reset</button></div>`;
  heading?.insertAdjacentElement('afterend',toolbar);

  const recent=document.createElement('section');
  recent.className='tv-recent-section';
  recent.dataset.tvRecent='';
  toolbar.insertAdjacentElement('afterend',recent);

  const empty=document.createElement('div');
  empty.className='tv-empty-state';
  empty.hidden=true;
  empty.innerHTML='<strong>No tools match this view.</strong><span>Clear the filter or open command search.</span><button type="button" data-tv-clear-filter>Show all tools</button>';
  grid.insertAdjacentElement('afterend',empty);

  toolCards().forEach(card=>decorateCard(card,state));
  syncFilterCounts();
  restoreFilter(state);
  renderRecent(state);
  refreshAll(state);

  document.addEventListener('click',event=>{
    const favorite=event.target.closest('[data-tv-favorite-tool]');
    if(favorite){event.preventDefault();event.stopPropagation();toggleFavorite(favorite.dataset.tvFavoriteTool,state);return}
    if(event.target.closest('[data-tv-command]'))openCommandPalette(state);
    if(event.target.closest('[data-tv-favorites]'))applyFavoritesView(state);
    if(event.target.closest('[data-tv-density]'))toggleDensity(state);
    if(event.target.closest('[data-tv-reset]'))clearPreferences(state);
    if(event.target.closest('[data-tv-clear-filter]'))showAll(state);
    const card=event.target.closest('.arcade-tool-card');
    if(card)rememberRecent(toolMeta(card),state);
  });

  document.querySelectorAll('.arcade-filter').forEach(button=>button.addEventListener('click',()=>{
    state.lastFilter=button.dataset.filter||'all';write('filter',state.lastFilter);queueMicrotask(()=>updateEmptyState());
  }));

  const search=document.getElementById('hero-search');
  if(search){
    const params=new URLSearchParams(location.search);const initial=params.get('q');
    if(initial){search.value=initial;search.dispatchEvent(new Event('input',{bubbles:true}));search.scrollIntoView({block:'center'});}
    search.addEventListener('input',()=>updateEmptyState());
  }
}

function decorateCard(card,state){
  const meta=toolMeta(card);
  card.dataset.toolName=meta.name.toLowerCase();
  card.dataset.toolSearch=`${meta.name} ${meta.category} ${meta.description}`.toLowerCase();
  if(card.querySelector('[data-tv-favorite-tool]'))return;
  const button=document.createElement('button');
  button.type='button';button.className='tv-favorite-button';button.dataset.tvFavoriteTool=meta.href;
  button.setAttribute('aria-label',`Favorite ${meta.name}`);
  card.appendChild(button);
}

function toggleFavorite(href,state){
  state.favorites.has(href)?state.favorites.delete(href):state.favorites.add(href);
  write('favorites',[...state.favorites]);refreshAll(state);
}
function refreshAll(state){
  toolCards().forEach(card=>{const href=card.getAttribute('href');const active=state.favorites.has(href);card.classList.toggle('is-favorite',active);const button=card.querySelector('[data-tv-favorite-tool]');if(button){button.textContent=active?'★':'☆';button.setAttribute('aria-pressed',String(active));}});
  const count=document.querySelector('[data-tv-favorite-count]');if(count)count.textContent=String(state.favorites.size);
  renderRecent(state);updateEmptyState();
}
function renderRecent(state){
  const host=document.querySelector('[data-tv-recent]');if(!host)return;
  const items=state.recent.slice(0,4);
  host.hidden=!items.length;
  host.innerHTML=items.length?`<div class="tv-section-heading"><span>RECENTLY USED</span><button type="button" data-tv-clear-recent>Clear</button></div><div class="tv-recent-grid">${items.map(item=>`<a href="${escapeHtml(item.href)}"><span>${escapeHtml(item.category)}</span><strong>${escapeHtml(item.name)}</strong><small>Open again →</small></a>`).join('')}</div>`:'';
  host.querySelector('[data-tv-clear-recent]')?.addEventListener('click',()=>{state.recent=[];write('recent',[]);renderRecent(state)});
}
function rememberRecent(meta,state){
  state.recent=[meta,...state.recent.filter(item=>item.href!==meta.href)].slice(0,8);write('recent',state.recent);
}
function trackCurrentTool(state){
  const match=location.pathname.match(/\/tools\/([^/]+)\.html$/);if(!match)return;
  const name=document.querySelector('h1')?.textContent?.trim()||match[1].replace(/-/g,' ');
  const category=document.querySelector('.tool-category-badge')?.textContent?.trim()||'Tool';
  rememberRecent({href:`tools/${match[1]}.html`,name,category,description:''},state);
}
function applyFavoritesView(state){
  const cards=toolCards();cards.forEach(card=>card.hidden=!state.favorites.has(card.getAttribute('href')));
  document.querySelectorAll('.arcade-filter').forEach(button=>{button.classList.remove('active');button.setAttribute('aria-pressed','false')});
  const status=document.getElementById('arcade-filter-status');if(status)status.textContent=`Showing ${state.favorites.size} favorite tool${state.favorites.size===1?'':'s'}`;
  updateEmptyState();
}
function toggleDensity(state){
  state.density=state.density==='compact'?'comfortable':'compact';write('density',state.density);document.documentElement.dataset.toolDensity=state.density;
  const button=document.querySelector('[data-tv-density]');if(button)button.textContent=state.density==='compact'?'Comfortable view':'Compact view';
}
function clearPreferences(state){
  ['favorites','recent','density','filter'].forEach(key=>localStorage.removeItem(STORAGE_PREFIX+key));state.favorites.clear();state.recent=[];state.density='comfortable';state.lastFilter='all';document.documentElement.dataset.toolDensity='comfortable';showAll(state);refreshAll(state);window.showToast?.('ToolVerse preferences reset','success');
}
function showAll(state){
  const all=document.querySelector('.arcade-filter[data-filter="all"]');all?.click();state.lastFilter='all';write('filter','all');
}
function restoreFilter(state){
  const button=document.querySelector(`.arcade-filter[data-filter="${CSS.escape(state.lastFilter)}"]`);if(button&&state.lastFilter!=='all')setTimeout(()=>button.click(),0);
}
function syncFilterCounts(){
  document.querySelectorAll('.arcade-filter').forEach(button=>{const filter=button.dataset.filter;const count=filter==='all'?toolCards().length:toolCards().filter(card=>card.dataset.category===filter).length;const node=button.querySelector('.arcade-filter-count');if(node)node.textContent=String(count)});
}
function updateEmptyState(){
  const empty=document.querySelector('.tv-empty-state');if(!empty)return;empty.hidden=toolCards().some(card=>!card.hidden);
}

function installGlobalShortcuts(state){
  document.addEventListener('keydown',event=>{
    const typing=/input|textarea|select/i.test(event.target.tagName)||event.target.isContentEditable;
    if((event.key==='/'&&!typing)||(event.ctrlKey&&event.key.toLowerCase()==='k')){event.preventDefault();const search=document.getElementById('hero-search');search?search.focus():openCommandPalette(state);}
    if(event.key==='Escape')document.querySelector('[data-tv-command-dialog]')?.remove();
  });
}
function openCommandPalette(state){
  document.querySelector('[data-tv-command-dialog]')?.remove();
  const dialog=document.createElement('div');dialog.className='tv-command-backdrop';dialog.dataset.tvCommandDialog='';
  dialog.innerHTML=`<section class="tv-command" role="dialog" aria-modal="true" aria-label="Tool command search"><div class="tv-command-head"><strong>Find any ToolVerse utility</strong><button type="button" data-tv-command-close>×</button></div><input type="search" data-tv-command-input placeholder="Search by name, category, or task…" autocomplete="off"><div class="tv-command-results" data-tv-command-results></div><footer><span>↑↓ Navigate</span><span>Enter Open</span><span>Esc Close</span></footer></section>`;
  document.body.appendChild(dialog);const input=dialog.querySelector('[data-tv-command-input]');const results=dialog.querySelector('[data-tv-command-results]');let active=0;
  const render=()=>{const query=input.value.trim().toLowerCase();const cards=toolCards().filter(card=>!query||card.dataset.toolSearch.includes(query)).slice(0,10);results.innerHTML=cards.length?cards.map((card,index)=>{const meta=toolMeta(card);return `<a class="${index===active?'active':''}" href="${escapeHtml(meta.href)}"><span>${escapeHtml(meta.category)}</span><strong>${escapeHtml(meta.name)}</strong><small>${escapeHtml(meta.description)}</small></a>`}).join(''):'<p>No matching tool found.</p>';};
  input.addEventListener('input',()=>{active=0;render()});input.addEventListener('keydown',event=>{const links=[...results.querySelectorAll('a')];if(event.key==='ArrowDown'){event.preventDefault();active=(active+1)%Math.max(links.length,1);render()}if(event.key==='ArrowUp'){event.preventDefault();active=(active-1+Math.max(links.length,1))%Math.max(links.length,1);render()}if(event.key==='Enter'&&links[active]){event.preventDefault();links[active].click()}});
  dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.closest('[data-tv-command-close]'))dialog.remove()});render();input.focus();
}
function installNetworkStatus(){
  let node=document.querySelector('[data-tv-network]');if(!node){node=document.createElement('div');node.className='tv-network-status';node.dataset.tvNetwork='';document.body.appendChild(node)}
  const update=()=>{node.textContent=navigator.onLine?'ONLINE · LOCAL TOOLS READY':'OFFLINE · BROWSER TOOLS STILL AVAILABLE';node.classList.toggle('is-offline',!navigator.onLine)};window.addEventListener('online',update);window.addEventListener('offline',update);update();
}
