const fs = require('fs');
const data = require('./src/tools-data.js');

if (!fs.existsSync('./src/tools')) {
    fs.mkdirSync('./src/tools');
}

// 1. Write categories.js
fs.writeFileSync('./src/tools/categories.js', `module.exports = ${JSON.stringify(data.categories, null, 2)};`);

// 2. Group tools by category
const grouped = {};
data.tools.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
});

// 3. Write each category to a file
for (const cat in grouped) {
    let content = `module.exports = [\n`;
    grouped[cat].forEach(t => {
        // stringify it, but we can replace the HTML/Script strings with backticks if we want,
        // but simple JSON.stringify is safest.
        content += JSON.stringify(t, null, 2) + `,\n`;
    });
    content += `];\n`;
    fs.writeFileSync(`./src/tools/${cat}-tools.js`, content);
}

console.log('Tools split successfully into src/tools/');
