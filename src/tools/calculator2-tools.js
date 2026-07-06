module.exports = [
  {
    slug: 'salary-calculator',
    name: 'Salary Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-money-bill-wave',
    shortDesc: 'Convert salary between hourly, weekly, monthly, and annual amounts.',
    metaTitle: 'Salary Calculator - Convert Hourly, Monthly, Annual Wage',
    metaDescription: 'Use this free salary calculator to convert between hourly, daily, weekly, monthly, and yearly wage equivalents.',
    keywords: ['salary calculator', 'hourly to annual', 'wage calculator', 'paycheck calculator'],
    benefits: ['Quickly convert wage periods', 'Understand gross income', 'Plan your finances'],
    lastUpdated: '2026-07-06',
    features: ['Supports multiple pay periods', 'Detailed breakdown', 'No signup required'],
    howToUse: ['Enter your current salary/wage.', 'Select the pay period.', 'Enter working hours per week.', 'Click Calculate.'],
    faqs: [
      { question: 'Is this gross or net pay?', answer: 'This calculator computes gross pay (before taxes).' }
    ],
    relatedSlugs: ['tax-calculator', 'time-duration-calculator'],
    hasDownload: true,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Amount ($)</label>
      <input type="number" id="salary-amount" class="form-input" placeholder="e.g., 50000" min="0">
    </div>
    <div>
      <label>Pay Period</label>
      <select id="salary-period" class="form-input">
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly" selected>Yearly</option>
      </select>
    </div>
    <div>
      <label>Hours per Week</label>
      <input type="number" id="salary-hours" class="form-input" value="40" min="1" max="168">
    </div>
    <div>
      <label>Days per Week</label>
      <input type="number" id="salary-days" class="form-input" value="5" min="1" max="7">
    </div>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-salary-btn" class="btn btn-primary">Calculate</button>
    <button id="reset-salary-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="salary-result-section" style="display: none; margin-top: 2rem;">
    <h3>Salary Breakdown</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <thead>
        <tr style="border-bottom: 2px solid var(--border);">
          <th style="padding: 0.5rem;">Period</th>
          <th style="padding: 0.5rem;">Gross Income</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 0.5rem;">Hourly</td><td style="padding: 0.5rem;" id="res-hourly"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 0.5rem;">Daily</td><td style="padding: 0.5rem;" id="res-daily"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 0.5rem;">Weekly</td><td style="padding: 0.5rem;" id="res-weekly"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 0.5rem;">Bi-Weekly</td><td style="padding: 0.5rem;" id="res-biweekly"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 0.5rem;">Monthly</td><td style="padding: 0.5rem;" id="res-monthly"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><td style="padding: 0.5rem;">Yearly</td><td style="padding: 0.5rem;" id="res-yearly"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Formula:</strong> Yearly = Weekly × 52 | Monthly = Yearly ÷ 12</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-salary-btn" class="btn btn-secondary btn-sm">Copy Result</button>
      <button id="download-salary-btn" class="btn btn-secondary btn-sm">Download CSV</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/salary-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/salary-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/salary-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-salary-btn');
  const resetBtn = document.getElementById('reset-salary-btn');
  const copyBtn = document.getElementById('copy-salary-btn');
  const downloadBtn = document.getElementById('download-salary-btn');
  const resultSection = document.getElementById('salary-result-section');
  let currentResults = {};

  const formatC = (val) => '$' + val.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

  calcBtn.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('salary-amount').value);
    const period = document.getElementById('salary-period').value;
    const hours = parseFloat(document.getElementById('salary-hours').value);
    const days = parseFloat(document.getElementById('salary-days').value);

    if(isNaN(amount) || amount < 0 || isNaN(hours) || hours <= 0 || isNaN(days) || days <= 0) {
      if(window.showToast) window.showToast('Please enter valid positive numbers.', 'error');
      else alert('Please enter valid positive numbers.');
      return;
    }

    let yearly = 0;
    if(period === 'hourly') yearly = amount * hours * 52;
    else if(period === 'daily') yearly = (amount / hours * hours) * days * 52; 
    // ^ simpler: amount * days * 52 if amount is daily
    else if(period === 'weekly') yearly = amount * 52;
    else if(period === 'monthly') yearly = amount * 12;
    else if(period === 'yearly') yearly = amount;

    if (period === 'daily') yearly = amount * days * 52;

    const weekly = yearly / 52;
    const hourly = weekly / hours;
    const daily = weekly / days;
    const monthly = yearly / 12;
    const biweekly = weekly * 2;

    currentResults = { hourly, daily, weekly, biweekly, monthly, yearly };

    document.getElementById('res-hourly').innerText = formatC(hourly);
    document.getElementById('res-daily').innerText = formatC(daily);
    document.getElementById('res-weekly').innerText = formatC(weekly);
    document.getElementById('res-biweekly').innerText = formatC(biweekly);
    document.getElementById('res-monthly').innerText = formatC(monthly);
    document.getElementById('res-yearly').innerText = formatC(yearly);

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('salary-amount').value = '';
    document.getElementById('salary-period').value = 'yearly';
    document.getElementById('salary-hours').value = '40';
    document.getElementById('salary-days').value = '5';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`Salary Breakdown:
Hourly: \${formatC(currentResults.hourly)}
Daily: \${formatC(currentResults.daily)}
Weekly: \${formatC(currentResults.weekly)}
Bi-Weekly: \${formatC(currentResults.biweekly)}
Monthly: \${formatC(currentResults.monthly)}
Yearly: \${formatC(currentResults.yearly)}\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });

  downloadBtn.addEventListener('click', () => {
    const csv = \`Period,Gross Income
Hourly,\${currentResults.hourly}
Daily,\${currentResults.daily}
Weekly,\${currentResults.weekly}
Bi-Weekly,\${currentResults.biweekly}
Monthly,\${currentResults.monthly}
Yearly,\${currentResults.yearly}\`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salary_breakdown.csv';
    a.click();
    URL.revokeObjectURL(url);
  });
})();
    `
  },
  {
    slug: 'tax-calculator',
    name: 'Tax Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-file-invoice-dollar',
    shortDesc: 'Calculate generic flat-rate taxes, deductions, and net income.',
    metaTitle: 'Tax Calculator - Estimate Net Income & Taxes',
    metaDescription: 'Calculate your taxable income, estimated tax amount, and net income using this simple tax calculator.',
    keywords: ['tax calculator', 'net income', 'tax bracket', 'deductions'],
    benefits: ['Estimate your tax liability', 'Calculate net income instantly', 'Factor in deductions'],
    lastUpdated: '2026-07-06',
    features: ['Flat tax rate calculation', 'Deduction subtraction', 'Net income breakdown'],
    howToUse: ['Enter your gross income.', 'Enter total deductions.', 'Enter the tax rate percentage.', 'Click Calculate.'],
    faqs: [
      { question: 'Is this for a specific country?', answer: 'This is a generic flat-rate calculator and does not apply progressive tax brackets specific to a country.' }
    ],
    relatedSlugs: ['salary-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Gross Income ($)</label>
      <input type="number" id="tax-income" class="form-input" placeholder="e.g., 60000" min="0">
    </div>
    <div>
      <label>Total Deductions ($)</label>
      <input type="number" id="tax-deductions" class="form-input" placeholder="e.g., 5000" min="0" value="0">
    </div>
    <div>
      <label>Tax Rate (%)</label>
      <input type="number" id="tax-rate" class="form-input" placeholder="e.g., 20" min="0" max="100">
    </div>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-tax-btn" class="btn btn-primary">Calculate Tax</button>
    <button id="reset-tax-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="tax-result-section" style="display: none; margin-top: 2rem;">
    <h3>Tax Breakdown</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 50%;">Gross Income</th><td style="padding: 0.5rem;" id="res-tax-gross"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Deductions</th><td style="padding: 0.5rem;" id="res-tax-deductions"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Taxable Income</th><td style="padding: 0.5rem;" id="res-tax-taxable"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Tax Amount</th><td style="padding: 0.5rem; color: #dc2626;" id="res-tax-amount"></td></tr>
        <tr style="border-bottom: 2px solid var(--border);"><th style="padding: 0.5rem; font-size: 1.1rem;">Net Income</th><td style="padding: 0.5rem; font-size: 1.1rem; color: #16a34a; font-weight: bold;" id="res-tax-net"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Formula:</strong> Taxable Income = Gross Income - Deductions. Tax Amount = Taxable Income × (Tax Rate / 100). Net Income = Gross Income - Tax Amount.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-tax-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/tax-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/tax-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/tax-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-tax-btn');
  const resetBtn = document.getElementById('reset-tax-btn');
  const copyBtn = document.getElementById('copy-tax-btn');
  const resultSection = document.getElementById('tax-result-section');
  let currentResults = {};

  const formatC = (val) => '$' + val.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

  calcBtn.addEventListener('click', () => {
    const gross = parseFloat(document.getElementById('tax-income').value);
    const deductions = parseFloat(document.getElementById('tax-deductions').value) || 0;
    const rate = parseFloat(document.getElementById('tax-rate').value);

    if(isNaN(gross) || gross < 0 || isNaN(deductions) || deductions < 0 || isNaN(rate) || rate < 0) {
      if(window.showToast) window.showToast('Please enter valid positive numbers.', 'error');
      else alert('Please enter valid positive numbers.');
      return;
    }

    const taxable = Math.max(0, gross - deductions);
    const taxAmount = taxable * (rate / 100);
    const net = gross - taxAmount;

    currentResults = { gross, deductions, taxable, taxAmount, net };

    document.getElementById('res-tax-gross').innerText = formatC(gross);
    document.getElementById('res-tax-deductions').innerText = '- ' + formatC(deductions);
    document.getElementById('res-tax-taxable').innerText = formatC(taxable);
    document.getElementById('res-tax-amount').innerText = '- ' + formatC(taxAmount);
    document.getElementById('res-tax-net').innerText = formatC(net);

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('tax-income').value = '';
    document.getElementById('tax-deductions').value = '0';
    document.getElementById('tax-rate').value = '';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`Tax Breakdown:
Gross Income: \${formatC(currentResults.gross)}
Deductions: \${formatC(currentResults.deductions)}
Taxable Income: \${formatC(currentResults.taxable)}
Tax Amount: \${formatC(currentResults.taxAmount)}
Net Income: \${formatC(currentResults.net)}\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-gas-pump',
    shortDesc: 'Calculate the total fuel cost and amount needed for a trip.',
    metaTitle: 'Fuel Cost Calculator - Gas Trip Estimator',
    metaDescription: 'Estimate your trip fuel costs based on distance, fuel efficiency, and gas prices.',
    keywords: ['fuel cost calculator', 'gas calculator', 'trip cost', 'mpg calculator'],
    benefits: ['Plan trip budgets', 'Compare vehicle efficiency costs', 'Save money on gas'],
    lastUpdated: '2026-07-06',
    features: ['Supports MPG and Km/L', 'Calculates total fuel needed', 'Cost breakdown'],
    howToUse: ['Enter trip distance.', 'Enter your vehicle fuel efficiency.', 'Enter the price of fuel per gallon/liter.', 'Click Calculate.'],
    faqs: [
      { question: 'What units should I use?', answer: 'You can use miles and MPG or kilometers and Km/L. Ensure your fuel price unit matches.' }
    ],
    relatedSlugs: [],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Distance</label>
      <input type="number" id="fuel-dist" class="form-input" placeholder="e.g., 300" min="0">
    </div>
    <div>
      <label>Fuel Efficiency (MPG or Km/L)</label>
      <input type="number" id="fuel-eff" class="form-input" placeholder="e.g., 25" min="0.1">
    </div>
    <div>
      <label>Fuel Price (per Gal/L)</label>
      <input type="number" id="fuel-price" class="form-input" placeholder="e.g., 3.50" min="0">
    </div>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-fuel-btn" class="btn btn-primary">Calculate Fuel Cost</button>
    <button id="reset-fuel-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="fuel-result-section" style="display: none; margin-top: 2rem;">
    <h3>Trip Fuel Estimate</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 50%;">Distance</th><td style="padding: 0.5rem;" id="res-fuel-dist"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Fuel Needed</th><td style="padding: 0.5rem;" id="res-fuel-needed"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Cost per Unit Distance</th><td style="padding: 0.5rem;" id="res-fuel-unit-cost"></td></tr>
        <tr style="border-bottom: 2px solid var(--border);"><th style="padding: 0.5rem; font-size: 1.1rem;">Total Cost</th><td style="padding: 0.5rem; font-size: 1.1rem; color: #16a34a; font-weight: bold;" id="res-fuel-total"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Formula:</strong> Fuel Needed = Distance ÷ Efficiency. Total Cost = Fuel Needed × Fuel Price.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-fuel-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/fuel-cost-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/fuel-cost-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/fuel-cost-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-fuel-btn');
  const resetBtn = document.getElementById('reset-fuel-btn');
  const copyBtn = document.getElementById('copy-fuel-btn');
  const resultSection = document.getElementById('fuel-result-section');
  let currentResults = {};

  const formatC = (val) => '$' + val.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

  calcBtn.addEventListener('click', () => {
    const dist = parseFloat(document.getElementById('fuel-dist').value);
    const eff = parseFloat(document.getElementById('fuel-eff').value);
    const price = parseFloat(document.getElementById('fuel-price').value);

    if(isNaN(dist) || dist < 0 || isNaN(eff) || eff <= 0 || isNaN(price) || price < 0) {
      if(window.showToast) window.showToast('Please enter valid numbers.', 'error');
      else alert('Please enter valid numbers.');
      return;
    }

    const needed = dist / eff;
    const totalCost = needed * price;
    const unitCost = totalCost / (dist || 1);

    currentResults = { dist, needed, unitCost, totalCost };

    document.getElementById('res-fuel-dist').innerText = dist.toFixed(2);
    document.getElementById('res-fuel-needed').innerText = needed.toFixed(2) + ' units';
    document.getElementById('res-fuel-unit-cost').innerText = formatC(unitCost);
    document.getElementById('res-fuel-total').innerText = formatC(totalCost);

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('fuel-dist').value = '';
    document.getElementById('fuel-eff').value = '';
    document.getElementById('fuel-price').value = '';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`Fuel Trip Estimate:
Distance: \${currentResults.dist.toFixed(2)}
Fuel Needed: \${currentResults.needed.toFixed(2)} units
Cost per unit distance: \${formatC(currentResults.unitCost)}
Total Cost: \${formatC(currentResults.totalCost)}\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'time-duration-calculator',
    name: 'Time Duration Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-regular fa-clock',
    shortDesc: 'Calculate the hours and minutes between two times.',
    metaTitle: 'Time Duration Calculator - Calculate Time Difference',
    metaDescription: 'Find out exactly how many hours and minutes have passed between a start time and an end time.',
    keywords: ['time calculator', 'duration calculator', 'time difference', 'hours passed'],
    benefits: ['Track work hours', 'Calculate event durations', 'Manage your time better'],
    lastUpdated: '2026-07-06',
    features: ['Supports 24-hour time', 'Handles overnight shifts', 'Precise minute calculation'],
    howToUse: ['Select a start time.', 'Select an end time.', 'Click Calculate.'],
    faqs: [
      { question: 'Does it handle overnight times?', answer: 'Yes, if the end time is earlier than the start time, it assumes the end time is on the next day.' }
    ],
    relatedSlugs: ['date-difference-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Start Time</label>
      <input type="time" id="time-start" class="form-input">
    </div>
    <div>
      <label>End Time</label>
      <input type="time" id="time-end" class="form-input">
    </div>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-time-btn" class="btn btn-primary">Calculate Duration</button>
    <button id="reset-time-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="time-result-section" style="display: none; margin-top: 2rem;">
    <h3>Duration Breakdown</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 50%;">Hours & Minutes</th><td style="padding: 0.5rem; font-weight: bold;" id="res-time-hm"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Total Minutes</th><td style="padding: 0.5rem;" id="res-time-m"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Total Hours (Decimal)</th><td style="padding: 0.5rem;" id="res-time-dec"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Note:</strong> If End Time is earlier than Start Time, it assumes the end is on the following day.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-time-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/time-duration-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/time-duration-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/time-duration-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-time-btn');
  const resetBtn = document.getElementById('reset-time-btn');
  const copyBtn = document.getElementById('copy-time-btn');
  const resultSection = document.getElementById('time-result-section');
  let currentResults = {};

  calcBtn.addEventListener('click', () => {
    const start = document.getElementById('time-start').value;
    const end = document.getElementById('time-end').value;

    if(!start || !end) {
      if(window.showToast) window.showToast('Please select both start and end times.', 'error');
      else alert('Please select both start and end times.');
      return;
    }

    const startParts = start.split(':').map(Number);
    const endParts = end.split(':').map(Number);

    let startMins = startParts[0] * 60 + startParts[1];
    let endMins = endParts[0] * 60 + endParts[1];

    if(endMins < startMins) {
      endMins += 24 * 60; // Next day
    }

    const totalMins = endMins - startMins;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    const decHours = (totalMins / 60).toFixed(2);

    currentResults = { h, m, totalMins, decHours };

    document.getElementById('res-time-hm').innerText = \`\${h} hours \${m} minutes\`;
    document.getElementById('res-time-m').innerText = \`\${totalMins} minutes\`;
    document.getElementById('res-time-dec').innerText = \`\${decHours} hours\`;

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('time-start').value = '';
    document.getElementById('time-end').value = '';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`Time Duration:
\${currentResults.h} hours \${currentResults.m} minutes
Total Minutes: \${currentResults.totalMins}
Decimal Hours: \${currentResults.decHours}\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-regular fa-calendar-days',
    shortDesc: 'Calculate the exact number of days, weeks, and years between two dates.',
    metaTitle: 'Date Difference Calculator - Days Between Dates',
    metaDescription: 'Find out the exact duration between two dates in days, weeks, months, and years.',
    keywords: ['date calculator', 'days between dates', 'time difference', 'date difference'],
    benefits: ['Plan project timelines', 'Track milestones', 'Calculate ages accurately'],
    lastUpdated: '2026-07-06',
    features: ['Precise day calculation', 'Week and month breakdowns', 'Handles leap years natively'],
    howToUse: ['Select a start date.', 'Select an end date.', 'Click Calculate.'],
    faqs: [
      { question: 'Does it count the end date?', answer: 'The calculation is the difference (e.g., Jan 1 to Jan 2 is 1 day).' }
    ],
    relatedSlugs: ['time-duration-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Start Date</label>
      <input type="date" id="date-start" class="form-input">
    </div>
    <div>
      <label>End Date</label>
      <input type="date" id="date-end" class="form-input">
    </div>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-date-btn" class="btn btn-primary">Calculate Difference</button>
    <button id="reset-date-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="date-result-section" style="display: none; margin-top: 2rem;">
    <h3>Date Difference Breakdown</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 50%;">Total Days</th><td style="padding: 0.5rem; font-weight: bold; color: var(--primary);" id="res-date-days"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Total Weeks</th><td style="padding: 0.5rem;" id="res-date-weeks"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Approx. Months</th><td style="padding: 0.5rem;" id="res-date-months"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Approx. Years</th><td style="padding: 0.5rem;" id="res-date-years"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Note:</strong> Months are approximated as 30.436875 days and Years as 365.2425 days.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-date-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/date-difference-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/date-difference-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/date-difference-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-date-btn');
  const resetBtn = document.getElementById('reset-date-btn');
  const copyBtn = document.getElementById('copy-date-btn');
  const resultSection = document.getElementById('date-result-section');
  let currentResults = {};

  calcBtn.addEventListener('click', () => {
    const start = document.getElementById('date-start').value;
    const end = document.getElementById('date-end').value;

    if(!start || !end) {
      if(window.showToast) window.showToast('Please select both start and end dates.', 'error');
      else alert('Please select both start and end dates.');
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Set hours to 0 to avoid timezone DST issues
    startDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);

    const diffMs = Math.abs(endDate - startDate);
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = (diffDays / 7).toFixed(2);
    const diffMonths = (diffDays / 30.436875).toFixed(2);
    const diffYears = (diffDays / 365.2425).toFixed(2);

    currentResults = { diffDays, diffWeeks, diffMonths, diffYears };

    document.getElementById('res-date-days').innerText = \`\${diffDays} days\`;
    document.getElementById('res-date-weeks').innerText = \`\${diffWeeks} weeks\`;
    document.getElementById('res-date-months').innerText = \`\${diffMonths} months\`;
    document.getElementById('res-date-years').innerText = \`\${diffYears} years\`;

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('date-start').value = '';
    document.getElementById('date-end').value = '';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`Date Difference:
\${currentResults.diffDays} days
\${currentResults.diffWeeks} weeks
\${currentResults.diffMonths} months
\${currentResults.diffYears} years\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-graduation-cap',
    shortDesc: 'Calculate your Grade Point Average (GPA) based on course credits and grades.',
    metaTitle: 'GPA Calculator - Calculate Semester & Cumulative GPA',
    metaDescription: 'Easily calculate your college or high school GPA by entering your grades and credit hours.',
    keywords: ['gpa calculator', 'college gpa', 'grade point average', 'semester gpa'],
    benefits: ['Monitor academic progress', 'Target desired GPAs', 'Quick and easy to use'],
    lastUpdated: '2026-07-06',
    features: ['Dynamic course rows', 'Standard 4.0 scale', 'Total credits summary'],
    howToUse: ['Click "Add Course" for more rows if needed.', 'Enter course credits and select a grade.', 'Click Calculate GPA.'],
    faqs: [
      { question: 'What scale is used?', answer: 'This calculator uses a standard unweighted 4.0 scale (A=4, B=3, C=2, D=1, F=0).' }
    ],
    relatedSlugs: ['grade-calculator', 'marks-percentage-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div id="gpa-courses">
    <div class="grid-2 gpa-row" style="margin-bottom: 1rem; align-items: end;">
      <div>
        <label>Credits</label>
        <input type="number" class="form-input gpa-credits" placeholder="e.g. 3" min="0">
      </div>
      <div>
        <label>Grade</label>
        <select class="form-input gpa-grade">
          <option value="4">A (4.0)</option>
          <option value="3">B (3.0)</option>
          <option value="2">C (2.0)</option>
          <option value="1">D (1.0)</option>
          <option value="0">F (0.0)</option>
        </select>
      </div>
    </div>
    <div class="grid-2 gpa-row" style="margin-bottom: 1rem; align-items: end;">
      <div><input type="number" class="form-input gpa-credits" placeholder="e.g. 4" min="0"></div>
      <div>
        <select class="form-input gpa-grade">
          <option value="4">A (4.0)</option>
          <option value="3">B (3.0)</option>
          <option value="2" selected>C (2.0)</option>
          <option value="1">D (1.0)</option>
          <option value="0">F (0.0)</option>
        </select>
      </div>
    </div>
  </div>
  
  <div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button id="add-course-btn" class="btn btn-secondary">+ Add Course</button>
    <button id="calc-gpa-btn" class="btn btn-primary">Calculate GPA</button>
    <button id="reset-gpa-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="gpa-result-section" style="display: none; margin-top: 2rem;">
    <h3>GPA Results</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 50%;">Total Credits</th><td style="padding: 0.5rem;" id="res-gpa-credits"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Total Grade Points</th><td style="padding: 0.5rem;" id="res-gpa-points"></td></tr>
        <tr style="border-bottom: 2px solid var(--border);"><th style="padding: 0.5rem; font-size: 1.2rem;">Your GPA</th><td style="padding: 0.5rem; font-size: 1.2rem; font-weight: bold; color: var(--primary);" id="res-gpa-final"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Formula:</strong> GPA = Total Grade Points ÷ Total Credits.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-gpa-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/gpa-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/gpa-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/gpa-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const container = document.getElementById('gpa-courses');
  const addBtn = document.getElementById('add-course-btn');
  const calcBtn = document.getElementById('calc-gpa-btn');
  const resetBtn = document.getElementById('reset-gpa-btn');
  const copyBtn = document.getElementById('copy-gpa-btn');
  const resultSection = document.getElementById('gpa-result-section');
  let currentResults = {};

  addBtn.addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'grid-2 gpa-row';
    row.style = 'margin-bottom: 1rem; align-items: end;';
    row.innerHTML = \`
      <div><input type="number" class="form-input gpa-credits" placeholder="Credits" min="0"></div>
      <div>
        <select class="form-input gpa-grade">
          <option value="4">A (4.0)</option>
          <option value="3">B (3.0)</option>
          <option value="2">C (2.0)</option>
          <option value="1">D (1.0)</option>
          <option value="0">F (0.0)</option>
        </select>
      </div>
    \`;
    container.appendChild(row);
  });

  calcBtn.addEventListener('click', () => {
    const creditInputs = document.querySelectorAll('.gpa-credits');
    const gradeSelects = document.querySelectorAll('.gpa-grade');
    
    let totalCredits = 0;
    let totalPoints = 0;

    for(let i=0; i<creditInputs.length; i++) {
      const credits = parseFloat(creditInputs[i].value);
      if(isNaN(credits) || credits <= 0) continue;
      
      const grade = parseFloat(gradeSelects[i].value);
      totalCredits += credits;
      totalPoints += (credits * grade);
    }

    if(totalCredits === 0) {
      if(window.showToast) window.showToast('Please enter at least one valid course credit amount.', 'error');
      else alert('Please enter at least one valid course credit amount.');
      return;
    }

    const gpa = totalPoints / totalCredits;

    currentResults = { totalCredits, totalPoints, gpa };

    document.getElementById('res-gpa-credits').innerText = totalCredits.toFixed(2);
    document.getElementById('res-gpa-points').innerText = totalPoints.toFixed(2);
    document.getElementById('res-gpa-final').innerText = gpa.toFixed(3);

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    const creditInputs = document.querySelectorAll('.gpa-credits');
    const gradeSelects = document.querySelectorAll('.gpa-grade');
    for(let i=0; i<creditInputs.length; i++) creditInputs[i].value = '';
    for(let i=0; i<gradeSelects.length; i++) gradeSelects[i].value = '4';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`GPA Calculation:
Total Credits: \${currentResults.totalCredits.toFixed(2)}
Total Grade Points: \${currentResults.totalPoints.toFixed(2)}
Final GPA: \${currentResults.gpa.toFixed(3)}\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'grade-calculator',
    name: 'Final Grade Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-marker',
    shortDesc: 'Find out what you need on your final exam to get your desired grade.',
    metaTitle: 'Final Grade Calculator - What do I need on my final?',
    metaDescription: 'Calculate the score you need on your final exam to achieve a target overall grade in your class.',
    keywords: ['final grade calculator', 'exam calculator', 'what do i need on my final', 'grade calculator'],
    benefits: ['Reduce test anxiety', 'Set target goals for finals', 'Easy percentage calculation'],
    lastUpdated: '2026-07-06',
    features: ['Supports percentage grades', 'Clear formula explanation', 'Color-coded results'],
    howToUse: ['Enter your current overall grade.', 'Enter the desired final class grade.', 'Enter the final exam weight as a percentage.', 'Click Calculate.'],
    faqs: [
      { question: 'What if I need over 100%?', answer: 'The calculator will tell you if the target score is mathematically impossible without extra credit.' }
    ],
    relatedSlugs: ['gpa-calculator', 'marks-percentage-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Current Grade (%)</label>
      <input type="number" id="grade-current" class="form-input" placeholder="e.g. 85" min="0">
    </div>
    <div>
      <label>Desired Grade (%)</label>
      <input type="number" id="grade-desired" class="form-input" placeholder="e.g. 90" min="0">
    </div>
    <div style="grid-column: span 2;">
      <label>Final Exam Weight (%)</label>
      <input type="number" id="grade-weight" class="form-input" placeholder="e.g. 20" min="0" max="100">
    </div>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-fgrade-btn" class="btn btn-primary">Calculate Needed Score</button>
    <button id="reset-fgrade-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="fgrade-result-section" style="display: none; margin-top: 2rem;">
    <h3>Grade Result</h3>
    <div style="padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; text-align: center;">
      <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">You will need a</p>
      <div id="res-fgrade-needed" style="font-size: 3rem; font-weight: bold; color: var(--primary);">--%</div>
      <p style="font-size: 1.1rem; margin-top: 0.5rem;">on your final exam.</p>
    </div>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Formula:</strong> Needed = (Desired - Current × (1 - Weight)) / Weight. (Weight expressed as a decimal).</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-fgrade-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/grade-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/grade-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/grade-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-fgrade-btn');
  const resetBtn = document.getElementById('reset-fgrade-btn');
  const copyBtn = document.getElementById('copy-fgrade-btn');
  const resultSection = document.getElementById('fgrade-result-section');
  let currentResults = {};

  calcBtn.addEventListener('click', () => {
    const current = parseFloat(document.getElementById('grade-current').value);
    const desired = parseFloat(document.getElementById('grade-desired').value);
    const weightPerc = parseFloat(document.getElementById('grade-weight').value);

    if(isNaN(current) || isNaN(desired) || isNaN(weightPerc) || weightPerc <= 0 || weightPerc > 100) {
      if(window.showToast) window.showToast('Please enter valid percentages.', 'error');
      else alert('Please enter valid percentages.');
      return;
    }

    const weightDec = weightPerc / 100;
    const currentWeightDec = 1 - weightDec;
    const needed = (desired - (current * currentWeightDec)) / weightDec;

    currentResults = { needed };

    const resEl = document.getElementById('res-fgrade-needed');
    resEl.innerText = needed.toFixed(2) + '%';
    
    if(needed > 100) {
      resEl.style.color = '#dc2626'; // red
    } else {
      resEl.style.color = 'var(--primary)';
    }

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('grade-current').value = '';
    document.getElementById('grade-desired').value = '';
    document.getElementById('grade-weight').value = '';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`To get a \${document.getElementById('grade-desired').value}% in the class, I need a \${currentResults.needed.toFixed(2)}% on the final exam.\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'marks-percentage-calculator',
    name: 'Marks Percentage Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-percent',
    shortDesc: 'Convert test marks and scores into a percentage and letter grade.',
    metaTitle: 'Marks Percentage Calculator - Score to Percentage',
    metaDescription: 'Easily calculate your test score percentage and letter grade by entering marks obtained and total marks.',
    keywords: ['percentage calculator', 'test score calculator', 'marks percentage', 'grade converter'],
    benefits: ['Instantly see test percentage', 'Identify letter grade', 'Great for teachers and students'],
    lastUpdated: '2026-07-06',
    features: ['Accurate decimal calculation', 'Letter grade mapping', 'Simple interface'],
    howToUse: ['Enter the marks you obtained.', 'Enter the total possible marks.', 'Click Calculate Percentage.'],
    faqs: [
      { question: 'What grade scale is used?', answer: 'It uses a generic US scale (A: 90+, B: 80+, C: 70+, D: 60+, F: <60).' }
    ],
    relatedSlugs: ['grade-calculator', 'gpa-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Marks Obtained</label>
      <input type="number" id="mark-obtained" class="form-input" placeholder="e.g. 42" min="0">
    </div>
    <div>
      <label>Total Marks</label>
      <input type="number" id="mark-total" class="form-input" placeholder="e.g. 50" min="1">
    </div>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-mark-btn" class="btn btn-primary">Calculate Percentage</button>
    <button id="reset-mark-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="mark-result-section" style="display: none; margin-top: 2rem;">
    <h3>Score Results</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 50%;">Percentage</th><td style="padding: 0.5rem; font-weight: bold; font-size: 1.2rem;" id="res-mark-perc"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Letter Grade</th><td style="padding: 0.5rem; font-weight: bold; font-size: 1.2rem;" id="res-mark-grade"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Formula:</strong> Percentage = (Obtained ÷ Total) × 100.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-mark-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/marks-percentage-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/marks-percentage-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/marks-percentage-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-mark-btn');
  const resetBtn = document.getElementById('reset-mark-btn');
  const copyBtn = document.getElementById('copy-mark-btn');
  const resultSection = document.getElementById('mark-result-section');
  let currentResults = {};

  calcBtn.addEventListener('click', () => {
    const obtained = parseFloat(document.getElementById('mark-obtained').value);
    const total = parseFloat(document.getElementById('mark-total').value);

    if(isNaN(obtained) || isNaN(total) || total <= 0) {
      if(window.showToast) window.showToast('Please enter valid numeric marks.', 'error');
      else alert('Please enter valid numeric marks.');
      return;
    }

    const perc = (obtained / total) * 100;
    let grade = 'F';
    if(perc >= 90) grade = 'A';
    else if(perc >= 80) grade = 'B';
    else if(perc >= 70) grade = 'C';
    else if(perc >= 60) grade = 'D';

    currentResults = { perc, grade };

    document.getElementById('res-mark-perc').innerText = perc.toFixed(2) + '%';
    document.getElementById('res-mark-grade').innerText = grade;

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('mark-obtained').value = '';
    document.getElementById('mark-total').value = '';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`Score: \${currentResults.perc.toFixed(2)}% | Grade: \${currentResults.grade}\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-utensils',
    shortDesc: 'Calculate your daily calorie needs for weight loss, maintenance, or weight gain.',
    metaTitle: 'Calorie Calculator - Daily TDEE and Diet Planner',
    metaDescription: 'Find out how many calories you should eat per day based on your age, gender, height, weight, and activity level.',
    keywords: ['calorie calculator', 'tdee calculator', 'daily calories', 'macro calculator'],
    benefits: ['Plan diet efficiently', 'Understand your TDEE', 'Set realistic calorie goals'],
    lastUpdated: '2026-07-06',
    features: ['Uses Mifflin-St Jeor formula', 'Activity level multiplier', 'Weight goal adjustments'],
    howToUse: ['Select Gender and enter Age.', 'Enter Height (cm) and Weight (kg).', 'Select Activity Level and Goal.', 'Click Calculate.'],
    faqs: [
      { question: 'What is TDEE?', answer: 'Total Daily Energy Expenditure is the total number of calories you burn per day including exercise.' }
    ],
    relatedSlugs: ['bmr-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Gender</label>
      <select id="cal-gender" class="form-input">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div>
      <label>Age</label>
      <input type="number" id="cal-age" class="form-input" placeholder="e.g. 30" min="15" max="120">
    </div>
    <div>
      <label>Height (cm)</label>
      <input type="number" id="cal-height" class="form-input" placeholder="e.g. 175" min="50">
    </div>
    <div>
      <label>Weight (kg)</label>
      <input type="number" id="cal-weight" class="form-input" placeholder="e.g. 70" min="20">
    </div>
    <div style="grid-column: span 2;">
      <label>Activity Level</label>
      <select id="cal-activity" class="form-input">
        <option value="1.2">Sedentary (little to no exercise)</option>
        <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
        <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
        <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
        <option value="1.9">Extra active (very hard exercise/physical job)</option>
      </select>
    </div>
    <div style="grid-column: span 2;">
      <label>Your Goal</label>
      <select id="cal-goal" class="form-input">
        <option value="-500">Lose 0.5kg / week</option>
        <option value="0" selected>Maintain weight</option>
        <option value="500">Gain 0.5kg / week</option>
      </select>
    </div>
  </div>
  
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-cal-btn" class="btn btn-primary">Calculate Calories</button>
    <button id="reset-cal-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="cal-result-section" style="display: none; margin-top: 2rem;">
    <h3>Calorie Breakdown</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 50%;">BMR (Basal Metabolic Rate)</th><td style="padding: 0.5rem;" id="res-cal-bmr"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">TDEE (Maintenance)</th><td style="padding: 0.5rem;" id="res-cal-tdee"></td></tr>
        <tr style="border-bottom: 2px solid var(--border);"><th style="padding: 0.5rem; font-size: 1.1rem;">Daily Calorie Goal</th><td style="padding: 0.5rem; font-size: 1.2rem; font-weight: bold; color: var(--primary);" id="res-cal-goal"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Formula:</strong> Mifflin-St Jeor equation is used for BMR. TDEE = BMR × Activity Multiplier.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-cal-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/calorie-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/calorie-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/calorie-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-cal-btn');
  const resetBtn = document.getElementById('reset-cal-btn');
  const copyBtn = document.getElementById('copy-cal-btn');
  const resultSection = document.getElementById('cal-result-section');
  let currentResults = {};

  calcBtn.addEventListener('click', () => {
    const gender = document.getElementById('cal-gender').value;
    const age = parseFloat(document.getElementById('cal-age').value);
    const height = parseFloat(document.getElementById('cal-height').value);
    const weight = parseFloat(document.getElementById('cal-weight').value);
    const activity = parseFloat(document.getElementById('cal-activity').value);
    const goalDiff = parseFloat(document.getElementById('cal-goal').value);

    if(isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
      if(window.showToast) window.showToast('Please enter valid inputs.', 'error');
      else alert('Please enter valid inputs.');
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if(gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * activity;
    const goalCal = tdee + goalDiff;

    currentResults = { bmr, tdee, goalCal };

    document.getElementById('res-cal-bmr').innerText = Math.round(bmr) + ' kcal';
    document.getElementById('res-cal-tdee').innerText = Math.round(tdee) + ' kcal';
    document.getElementById('res-cal-goal').innerText = Math.round(goalCal) + ' kcal';

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('cal-age').value = '';
    document.getElementById('cal-height').value = '';
    document.getElementById('cal-weight').value = '';
    document.getElementById('cal-gender').value = 'male';
    document.getElementById('cal-activity').value = '1.2';
    document.getElementById('cal-goal').value = '0';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`Daily Calorie Goals:
BMR: \${Math.round(currentResults.bmr)} kcal
Maintenance (TDEE): \${Math.round(currentResults.tdee)} kcal
Target Goal: \${Math.round(currentResults.goalCal)} kcal\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  },
  {
    slug: 'bmr-calculator',
    name: 'BMR Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: 'fa-solid fa-heart-pulse',
    shortDesc: 'Calculate your Basal Metabolic Rate (BMR).',
    metaTitle: 'BMR Calculator - Basal Metabolic Rate',
    metaDescription: 'Find your BMR to understand how many calories your body burns at rest. Essential for diet planning.',
    keywords: ['bmr calculator', 'basal metabolic rate', 'resting calories', 'metabolism calculator'],
    benefits: ['Understand resting energy expenditure', 'Base metric for diet plans', 'Compare equation models'],
    lastUpdated: '2026-07-06',
    features: ['Calculates using Mifflin-St Jeor', 'Calculates using Harris-Benedict', 'Detailed breakdown'],
    howToUse: ['Select Gender and Age.', 'Enter Height in cm and Weight in kg.', 'Click Calculate BMR.'],
    faqs: [
      { question: 'Which formula is more accurate?', answer: 'The Mifflin-St Jeor equation is widely considered the most accurate for modern lifestyles.' }
    ],
    relatedSlugs: ['calorie-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="calculator-container">
  <div class="grid-2">
    <div>
      <label>Gender</label>
      <select id="bmr-gender" class="form-input">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div>
      <label>Age</label>
      <input type="number" id="bmr-age" class="form-input" placeholder="e.g. 30" min="15" max="120">
    </div>
    <div>
      <label>Height (cm)</label>
      <input type="number" id="bmr-height" class="form-input" placeholder="e.g. 175" min="50">
    </div>
    <div>
      <label>Weight (kg)</label>
      <input type="number" id="bmr-weight" class="form-input" placeholder="e.g. 70" min="20">
    </div>
  </div>
  
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="calc-bmr-btn" class="btn btn-primary">Calculate BMR</button>
    <button id="reset-bmr-btn" class="btn btn-secondary">Reset</button>
  </div>

  <div id="bmr-result-section" style="display: none; margin-top: 2rem;">
    <h3>BMR Results</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
      <tbody>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem; width: 60%;">Mifflin-St Jeor (Recommended)</th><td style="padding: 0.5rem; font-weight: bold; color: var(--primary);" id="res-bmr-mifflin"></td></tr>
        <tr style="border-bottom: 1px solid var(--border);"><th style="padding: 0.5rem;">Harris-Benedict (Original)</th><td style="padding: 0.5rem;" id="res-bmr-harris"></td></tr>
      </tbody>
    </table>
    <div style="margin-top: 1rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Info:</strong> BMR is the amount of energy expended while at rest in a neutrally temperate environment.</p>
    </div>
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button id="copy-bmr-btn" class="btn btn-secondary btn-sm">Copy Result</button>
    </div>
  </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/bmr-calculator')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/bmr-calculator" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/bmr-calculator" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>
    `,
    toolScript: `
(function() {
  const calcBtn = document.getElementById('calc-bmr-btn');
  const resetBtn = document.getElementById('reset-bmr-btn');
  const copyBtn = document.getElementById('copy-bmr-btn');
  const resultSection = document.getElementById('bmr-result-section');
  let currentResults = {};

  calcBtn.addEventListener('click', () => {
    const gender = document.getElementById('bmr-gender').value;
    const age = parseFloat(document.getElementById('bmr-age').value);
    const height = parseFloat(document.getElementById('bmr-height').value);
    const weight = parseFloat(document.getElementById('bmr-weight').value);

    if(isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
      if(window.showToast) window.showToast('Please enter valid inputs.', 'error');
      else alert('Please enter valid inputs.');
      return;
    }

    // Mifflin-St Jeor Equation
    let bmrM = (10 * weight) + (6.25 * height) - (5 * age);
    if(gender === 'male') bmrM += 5;
    else bmrM -= 161;

    // Harris-Benedict (Original)
    let bmrH = 0;
    if(gender === 'male') {
      bmrH = 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age);
    } else {
      bmrH = 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age);
    }

    currentResults = { bmrM, bmrH };

    document.getElementById('res-bmr-mifflin').innerText = Math.round(bmrM) + ' kcal/day';
    document.getElementById('res-bmr-harris').innerText = Math.round(bmrH) + ' kcal/day';

    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    document.getElementById('bmr-age').value = '';
    document.getElementById('bmr-height').value = '';
    document.getElementById('bmr-weight').value = '';
    document.getElementById('bmr-gender').value = 'male';
    resultSection.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = \`My BMR:
Mifflin-St Jeor: \${Math.round(currentResults.bmrM)} kcal/day
Harris-Benedict: \${Math.round(currentResults.bmrH)} kcal/day\`;
    if(window.copyToClipboard) window.copyToClipboard(text);
    else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  });
})();
    `
  }
];
