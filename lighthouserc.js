module.exports = {
  ci: {
    collect: {
      staticDistDir: './', // Or '.' to scan the root folder
      url: [
        'http://localhost/index.html',
        'http://localhost/tools/word-counter.html',
        'http://localhost/tools/json-formatter.html',
        'http://localhost/tools/emi-calculator.html'
      ],
      numberOfRuns: 1
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
