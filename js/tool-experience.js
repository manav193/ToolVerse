(() => {
  'use strict';

  const KEYS = {
    recent: 'toolverse.recentTools.v1',
    favorites: 'toolverse.favoriteTools.v1'
  };
  const MAX_RECENT = 8;
  const MAX_FILE_BYTES = 50 * 1024 * 1024;
  const stableSlugs = new Set(['word-counter','case-converter','emi-calculator','percentage-calculator','attendance-calculator','jpg-to-png','png-to-jpg','resize-image','compress-image','json-formatter','base64-encoder-decoder','qr-code-generator']);
  const experimentalSlugs = new Set(['background-remover','ocr-image-to-text','pdf-to-jpg','javascript-minifier','barcode-generator']);
  const taskAliases = {
    'compress photo': 'compress-image', 'compress image': 'compress-image', 'reduce image size': 'compress-image',
    'change photo size': 'resize-image', 'resize photo': 'resize-image', 'resize picture': 'resize-image',
    'convert jpg png': 'jpg-to-png', 'jpg into png': 'jpg-to-png', 'png into jpg': 'png-to-jpg',
    'count words': 'word-counter', 'word count': 'word-counter', 'change text case': 'case-converter',
    'calculate emi': 'emi-calculator', 'loan payment': 'emi-calculator', 'attendance percent': 'attendance-calculator',
    'format json': 'json-formatter', 'make qr': 'qr-code-generator', 'create qr': 'qr-code-generator'
  };

  const safeRead = (key, fallback = []) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return Array.isArray(value) ? value : fallback;
    } catch { return fallback; }
  };
  const safeWrite = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  };
  const slugFromHref = href => {
    try {
      const path = new URL(href, location.href).pathname;
      const match = path.match(/\/tools\/([^/]+)\.html$/);
      return match ? match[1] : '';
    } catch { return ''; }
  };
  const titleFromCard = card => card?.querySelector('h3,h2,strong')?.textContent?.trim() || '';
  const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const distance = (a, b) => {
    a = normalize(a); b = normalize(b);
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    matrix[0] = Array.from({ length: a.length + 1 }, (_, i) => i);
    for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1] ? matrix[i - 1][j - 1] : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
    return matrix[b.length][a.length];
  };
  const tierFor = slug => stableSlugs.has(slug) ? 'Stable' : experimentalSlugs.has(slug) ? 'Experimental' : 'Beta';

  function showRecovery(title, message, steps = []) {
    let panel = document.querySelector('[data-tool-recovery]');
    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'tool-recovery';
      panel.dataset.toolRecovery = '';
      panel.setAttribute('role', 'alert');
      document.body.appendChild(panel);
    }
    panel.innerHTML = `<button type="button" class="tool-recovery__close" aria-label="Dismiss error">×</button><strong>${title}</strong><p>${message}</p>${steps.length ? `<ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol>` : ''}`;
    panel.querySelector('button').onclick = () => panel.remove();
  }

  function decorateCards() {
    let decorated = false;
    document.querySelectorAll('a.arcade-tool-card, a.tool-card').forEach(card => {
      const slug = slugFromHref(card.href);
      if (!slug || card.dataset.experienceReady) return;
      card.dataset.experienceReady = 'true';
      decorated = true;
      const tier = tierFor(slug);
      card.dataset.qualityTier = tier.toLowerCase();
      const badge = document.createElement('span');
      badge.className = `tool-quality tool-quality--${tier.toLowerCase()}`;
      badge.textContent = tier;
      badge.title = tier === 'Stable' ? 'Frequently used and broadly supported' : tier === 'Beta' ? 'Working tool with active refinement' : 'Depends on newer or less consistent browser capabilities';
      card.appendChild(badge);

      const favorite = document.createElement('button');
      favorite.type = 'button';
      favorite.className = 'tool-favorite';
      favorite.dataset.favoriteSlug = slug;
      favorite.setAttribute('aria-label', `Favorite ${titleFromCard(card) || slug}`);
      favorite.title = 'Save locally — no account needed';
      favorite.textContent = '☆';
      favorite.addEventListener('click', event => {
        event.preventDefault(); event.stopPropagation();
        const favorites = new Set(safeRead(KEYS.favorites));
        favorites.has(slug) ? favorites.delete(slug) : favorites.add(slug);
        safeWrite(KEYS.favorites, [...favorites]);
        refreshFavoriteButtons(); renderPersonalShelves();
      });
      card.appendChild(favorite);
      card.addEventListener('click', () => recordRecent(slug, titleFromCard(card), card.href));
    });
    if (decorated) refreshFavoriteButtons();
  }

  function refreshFavoriteButtons() {
    const favorites = new Set(safeRead(KEYS.favorites));
    document.querySelectorAll('[data-favorite-slug]').forEach(button => {
      const active = favorites.has(button.dataset.favoriteSlug);
      button.classList.toggle('is-active', active);
      button.textContent = active ? '★' : '☆';
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function recordRecent(slug, name, href) {
    if (!slug) return;
    const recent = safeRead(KEYS.recent).filter(item => item.slug !== slug);
    recent.unshift({ slug, name: name || slug.replace(/-/g, ' '), href, usedAt: Date.now() });
    safeWrite(KEYS.recent, recent.slice(0, MAX_RECENT));
  }

  function currentToolRecord() {
    const slug = slugFromHref(location.href);
    if (!slug) return;
    const name = document.querySelector('.tool-hero h1, h1')?.textContent?.trim();
    recordRecent(slug, name, location.href);
    const hero = document.querySelector('.tool-hero .container, .tool-hero');
    if (hero && !hero.querySelector('.tool-page-tier')) {
      const tier = tierFor(slug);
      const pill = document.createElement('span');
      pill.className = `tool-page-tier tool-quality--${tier.toLowerCase()}`;
      pill.textContent = `${tier} · browser tool`;
      hero.appendChild(pill);
    }
  }

  function ensureShelfRoot() {
    const anchor = document.querySelector('#tools-arcade, .tools-arcade');
    if (!anchor) return null;
    let root = document.querySelector('[data-personal-tools]');
    if (!root) {
      root = document.createElement('section');
      root.className = 'personal-tools container';
      root.dataset.personalTools = '';
      anchor.parentNode.insertBefore(root, anchor);
    }
    return root;
  }

  function renderPersonalShelves() {
    const root = ensureShelfRoot();
    if (!root) return;
    const catalog = new Map(Array.from(document.querySelectorAll('a.arcade-tool-card')).map(card => {
      const slug = slugFromHref(card.href);
      return [slug, { slug, name: titleFromCard(card), href: card.getAttribute('href'), tier: tierFor(slug) }];
    }));
    const favorites = safeRead(KEYS.favorites).map(slug => catalog.get(slug)).filter(Boolean);
    const recent = safeRead(KEYS.recent).map(item => catalog.get(item.slug) || item).filter(Boolean);
    const shelf = (title, label, items, empty) => `<article class="personal-shelf"><div><p>${label}</p><h2>${title}</h2></div>${items.length ? `<div class="personal-shelf__items">${items.slice(0, 6).map(item => `<a href="${item.href}" data-personal-tool="${item.slug}"><strong>${item.name}</strong><span>${item.tier || tierFor(item.slug)}</span></a>`).join('')}</div>` : `<p class="personal-shelf__empty">${empty}</p>`}</article>`;
    root.innerHTML = shelf('Recently used', 'LOCAL HISTORY', recent, 'Open a tool and it will appear here. Stored only in this browser.') + shelf('Favorites', 'YOUR TOOLKIT', favorites, 'Star tools to build a local-only list. No account needed.');
    root.querySelectorAll('[data-personal-tool]').forEach(link => link.addEventListener('click', () => recordRecent(link.dataset.personalTool, link.querySelector('strong')?.textContent, link.href)));
  }

  function improveSearch() {
    const oldInput = document.getElementById('hero-search');
    const results = document.getElementById('hero-search-results');
    if (!oldInput || !results || !window.TOOLVERSE_TOOLS) return;
    const input = oldInput;
    const tools = window.TOOLVERSE_TOOLS;
    const score = (tool, raw) => {
      const q = normalize(raw); const name = normalize(tool.name); const category = normalize(tool.category); const slug = normalize(tool.slug);
      const aliasSlug = taskAliases[q];
      if (aliasSlug === tool.slug) return 1000;
      if (name === q || slug === q) return 900;
      if (name.startsWith(q)) return 750;
      if (name.includes(q) || slug.includes(q)) return 600;
      if (category.includes(q)) return 350;
      const words = q.split(' ').filter(Boolean);
      const tokenScore = words.reduce((sum, word) => sum + (name.includes(word) || slug.includes(word) ? 90 : 0), 0);
      const typo = Math.min(distance(q, name), distance(q, slug));
      return tokenScore + (typo <= 2 ? 260 - typo * 70 : 0);
    };
    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (!q) { results.style.display = 'none'; input.setAttribute('aria-expanded', 'false'); return; }
      const matches = tools.map(tool => ({ tool, score: score(tool, q) })).filter(x => x.score > 0).sort((a,b) => b.score - a.score).slice(0, 7);
      results.innerHTML = matches.length ? matches.map(({tool}) => `<a href="tools/${tool.slug}.html" class="search-result-item" role="option"><span class="search-result-icon">${tool.icon || '🛠️'}</span><strong>${tool.name}</strong><span class="search-result-category">${tool.category || 'Tool'} · ${tierFor(tool.slug)}</span></a>`).join('') : '<div class="search-result-item" role="option">No close match. Try the task, for example “compress photo” or “count words”.</div>';
      results.style.display = 'block'; input.setAttribute('aria-expanded', 'true');
    });
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape') { results.style.display = 'none'; input.setAttribute('aria-expanded', 'false'); }
      if (event.key === 'Enter') { const first = results.querySelector('a'); if (first) { event.preventDefault(); first.click(); } }
    });
  }

  function installErrorHandling() {
    document.addEventListener('change', event => {
      const input = event.target.closest('input[type="file"]');
      if (!input || !input.files?.length) return;
      // Purpose-built image and PDF workspaces provide more precise inline
      // validation and must receive the original FileList unchanged.
      if (input.closest('.image-tool, .pdf-tool')) return;
      const file = input.files[0];
      const accept = (input.accept || '').split(',').map(x => x.trim()).filter(Boolean);
      const extension = `.${file.name.split('.').pop().toLowerCase()}`;
      const supported = !accept.length || accept.some(rule => rule === file.type || rule === extension || (rule.endsWith('/*') && file.type.startsWith(rule.slice(0,-1))));
      if (!supported) {
        input.value = '';
        showRecovery('Unsupported file type', `${file.name} is not supported by this tool.`, ['Check the formats listed beside the upload control.', 'Convert the file to a supported format.', 'Choose the converted file and try again.']);
      } else if (file.size > MAX_FILE_BYTES) {
        input.value = '';
        showRecovery('File is too large', `This ${Math.ceil(file.size / 1024 / 1024)} MB file may exceed safe browser memory limits.`, ['Use a smaller file or split it into parts.', 'Close memory-heavy tabs.', 'Retry on a desktop browser with more available memory.']);
      }
    }, true);

    window.addEventListener('error', event => {
      if (!/\/tools\//.test(location.pathname)) return;
      showRecovery('Tool could not complete the action', event.message || 'A browser-side error occurred.', ['Keep the original file unchanged.', 'Reload the page and retry once.', 'Try a current Chrome, Edge, Firefox, or Safari version.']);
    });
    window.addEventListener('unhandledrejection', event => {
      if (!/\/tools\//.test(location.pathname)) return;
      const text = String(event.reason?.message || event.reason || 'The browser rejected the operation.');
      const unavailable = /not supported|undefined|not available|permission/i.test(text);
      showRecovery(unavailable ? 'Browser capability unavailable' : 'Tool operation failed', text, unavailable ? ['Update the browser.', 'Check required permissions.', 'Try another supported browser or device.'] : ['Verify the input file.', 'Retry with a smaller file.', 'Reload the tool before trying again.']);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    decorateCards();
    currentToolRecord();
    renderPersonalShelves();
    improveSearch();
    installErrorHandling();
    new MutationObserver(() => decorateCards()).observe(document.body, { childList: true, subtree: true });
  });
})();
