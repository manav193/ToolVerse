import { initAdaptiveHost } from './shared/adaptive/adaptive-host.js';

const start = () => initAdaptiveHost({
  moduleId: 'toolverse',
  projectSelector: '.arcade-tool-card,[data-tool-id]',
  searchSelector: '#hero-search',
  fabricContainer: '#arcade-fabric'
});

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
else start();
