import { initAdaptiveHost } from './shared/adaptive/adaptive-host.js';
import { initToolVerseExperience } from './toolverse-experience.js';

const start = () => {
  initAdaptiveHost({
    moduleId: 'toolverse',
    projectSelector: '.arcade-tool-card,[data-tool-id]',
    searchSelector: '#hero-search',
    fabricContainer: '#arcade-fabric'
  });
  initToolVerseExperience();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
else start();
