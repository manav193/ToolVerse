const tools = [
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    shortDesc: 'Calculate your Equated Monthly Installment (EMI) with visual breakdowns.',
    metaTitle: 'Free EMI Calculator Online | ToolVerse',
    metaDescription: 'Calculate EMI for home, car, or personal loans easily. View principal vs interest visual breakdowns.',
    keywords: ['emi calculator', 'loan calculator', 'home loan', 'personal loan', 'finance'],
    benefits: [
      'Visual breakdown of principal vs interest',
      'Instant calculation',
      'Copy results instantly'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Visual bar chart for amounts',
      'Detailed result table',
      'Math formula explanation'
    ],
    howToUse: [
      'Enter the loan principal amount.',
      'Enter the annual interest rate.',
      'Enter the loan tenure.',
      'Click calculate to get the EMI amount.'
    ],
    faqs: [
      {
        q: 'What is EMI?',
        a: 'Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.'
      }
    ],
    relatedSlugs: ['loan-calculator', 'simple-interest-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Principal Amount (₹ or $)</label>
                <input type="number" id="emi-principal" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 100000">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Annual Interest Rate (%)</label>
                <input type="number" id="emi-rate" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0.1" step="0.1" placeholder="e.g. 8.5">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Tenure (in years)</label>
                <input type="number" id="emi-tenure" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 5">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="emi-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="emi-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="emi-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Result Breakdown</h3>
                <p style="font-size: 1.5rem; font-weight: bold; color: #0f172a; margin-bottom: 1rem;">Monthly EMI: <span id="emi-monthly-output">0</span></p>
                
                <div style="width: 100%; height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; margin: 1.5rem 0;">
                    <div id="emi-bar-principal" style="background: #3b82f6; height: 100%; width: 50%; transition: width 0.3s ease;" title="Principal"></div>
                    <div id="emi-bar-interest" style="background: #ef4444; height: 100%; width: 50%; transition: width 0.3s ease;" title="Interest"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 1.5rem;">
                    <span style="color: #3b82f6; font-weight: 500;">■ Principal (<span id="emi-perc-principal">50</span>%)</span>
                    <span style="color: #ef4444; font-weight: 500;">■ Interest (<span id="emi-perc-interest">50</span>%)</span>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Total Principal</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="emi-table-principal">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Total Interest</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="emi-table-interest">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Total Amount</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="emi-table-total">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="emi-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formula:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)</code>
                <p style="font-size: 0.8rem; margin: 0.5rem 0 0 0; color: #64748b;">Where P = Principal, r = monthly interest rate (annual / 12 / 100), n = tenure in months.</p>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/emi-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/emi-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/emi-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const principalEl = document.getElementById('emi-principal');
        const rateEl = document.getElementById('emi-rate');
        const tenureEl = document.getElementById('emi-tenure');
        const calcBtn = document.getElementById('emi-calc-btn');
        const resetBtn = document.getElementById('emi-reset-btn');
        const copyBtn = document.getElementById('emi-copy-btn');
        const resultBox = document.getElementById('emi-result-box');

        function calculateEMI() {
            const P = parseFloat(principalEl.value);
            const rate = parseFloat(rateEl.value);
            const years = parseFloat(tenureEl.value);

            if (isNaN(P) || P <= 0 || isNaN(rate) || rate < 0 || isNaN(years) || years <= 0) {
                alert("Please enter valid positive numbers for all fields. Rate can be 0.");
                return;
            }

            const r = rate / 12 / 100;
            const n = years * 12;
            const emi = r === 0 ? (P / n) : (P * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
            
            const totalAmount = emi * n;
            const totalInterest = totalAmount - P;

            const formatCurrency = (val) => val.toFixed(2);

            document.getElementById('emi-monthly-output').innerText = formatCurrency(emi);
            document.getElementById('emi-table-principal').innerText = formatCurrency(P);
            document.getElementById('emi-table-interest').innerText = formatCurrency(totalInterest);
            document.getElementById('emi-table-total').innerText = formatCurrency(totalAmount);

            const principalPerc = (P / totalAmount) * 100;
            const interestPerc = (totalInterest / totalAmount) * 100;

            document.getElementById('emi-bar-principal').style.width = principalPerc + '%';
            document.getElementById('emi-bar-interest').style.width = interestPerc + '%';
            document.getElementById('emi-perc-principal').innerText = principalPerc.toFixed(1);
            document.getElementById('emi-perc-interest').innerText = interestPerc.toFixed(1);

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calculateEMI);
        
        resetBtn.addEventListener('click', () => {
            principalEl.value = '';
            rateEl.value = '';
            tenureEl.value = '';
            resultBox.style.display = 'none';
        });

        copyBtn.addEventListener('click', () => {
            const res = \`EMI: \${document.getElementById('emi-monthly-output').innerText}\\nTotal Principal: \${document.getElementById('emi-table-principal').innerText}\\nTotal Interest: \${document.getElementById('emi-table-interest').innerText}\\nTotal Amount: \${document.getElementById('emi-table-total').innerText}\`;
            navigator.clipboard.writeText(res).then(() => {
                if(window.showToast) window.showToast("Result copied!", "success");
                else alert("Result copied!");
            });
        });
    })();`
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    shortDesc: 'Calculate mutual fund returns on your Systematic Investment Plan.',
    metaTitle: 'Free SIP Calculator | Mutual Fund Returns | ToolVerse',
    metaDescription: 'Calculate the future value of your monthly SIP investments. View a visual breakdown of invested amount vs wealth gained.',
    keywords: ['sip calculator', 'mutual fund returns', 'investment calculator', 'finance'],
    benefits: [
      'Visual breakdown of investment vs returns',
      'Accurate compounding formula',
      'Completely free and private'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Visual ratio bar',
      'Detailed output table',
      'Copy results feature'
    ],
    howToUse: [
      'Enter your monthly investment amount.',
      'Enter the expected return rate (%).',
      'Enter the investment period in years.',
      'Click calculate.'
    ],
    faqs: [
      {
        q: 'What is SIP?',
        a: 'Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds.'
      }
    ],
    relatedSlugs: ['compound-interest-calculator', 'emi-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Monthly Investment</label>
                <input type="number" id="sip-amount" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 5000">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Expected Return Rate (% p.a.)</label>
                <input type="number" id="sip-rate" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0.1" step="0.1" placeholder="e.g. 12">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Time Period (years)</label>
                <input type="number" id="sip-years" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 10">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="sip-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="sip-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="sip-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Wealth Breakdown</h3>
                <p style="font-size: 1.5rem; font-weight: bold; color: #0f172a; margin-bottom: 1rem;">Total Value: <span id="sip-total-output">0</span></p>
                
                <div style="width: 100%; height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; margin: 1.5rem 0;">
                    <div id="sip-bar-invested" style="background: #3b82f6; height: 100%; width: 50%; transition: width 0.3s ease;" title="Invested Amount"></div>
                    <div id="sip-bar-returns" style="background: #10b981; height: 100%; width: 50%; transition: width 0.3s ease;" title="Est. Returns"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 1.5rem;">
                    <span style="color: #3b82f6; font-weight: 500;">■ Invested (<span id="sip-perc-invested">50</span>%)</span>
                    <span style="color: #10b981; font-weight: 500;">■ Returns (<span id="sip-perc-returns">50</span>%)</span>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Invested Amount</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="sip-table-invested">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Est. Returns</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="sip-table-returns">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="sip-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formula:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">M = P × [ ( (1 + i)^n - 1 ) / i ] × (1 + i)</code>
                <p style="font-size: 0.8rem; margin: 0.5rem 0 0 0; color: #64748b;">Where M = Amount, P = SIP amount, i = periodic interest rate (annual rate/12/100), n = number of months.</p>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/sip-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/sip-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/sip-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const amtEl = document.getElementById('sip-amount');
        const rateEl = document.getElementById('sip-rate');
        const yearsEl = document.getElementById('sip-years');
        const calcBtn = document.getElementById('sip-calc-btn');
        const resetBtn = document.getElementById('sip-reset-btn');
        const copyBtn = document.getElementById('sip-copy-btn');
        const resultBox = document.getElementById('sip-result-box');

        function calculateSIP() {
            const P = parseFloat(amtEl.value);
            const rate = parseFloat(rateEl.value);
            const years = parseFloat(yearsEl.value);

            if (isNaN(P) || P <= 0 || isNaN(rate) || rate < 0 || isNaN(years) || years <= 0) {
                alert("Please enter valid positive numbers. Rate can be 0.");
                return;
            }

            const i = rate / 12 / 100;
            const n = years * 12;
            const M = i === 0 ? (P * n) : (P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
            
            const invested = P * n;
            const returns = M - invested;

            const formatCurrency = (val) => val.toFixed(2);

            document.getElementById('sip-total-output').innerText = formatCurrency(M);
            document.getElementById('sip-table-invested').innerText = formatCurrency(invested);
            document.getElementById('sip-table-returns').innerText = formatCurrency(returns);

            const invPerc = (invested / M) * 100;
            const retPerc = (returns / M) * 100;

            document.getElementById('sip-bar-invested').style.width = invPerc + '%';
            document.getElementById('sip-bar-returns').style.width = retPerc + '%';
            document.getElementById('sip-perc-invested').innerText = invPerc.toFixed(1);
            document.getElementById('sip-perc-returns').innerText = retPerc.toFixed(1);

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calculateSIP);
        
        resetBtn.addEventListener('click', () => {
            amtEl.value = '';
            rateEl.value = '';
            yearsEl.value = '';
            resultBox.style.display = 'none';
        });

        copyBtn.addEventListener('click', () => {
            const res = \`Total Value: \${document.getElementById('sip-total-output').innerText}\\nInvested: \${document.getElementById('sip-table-invested').innerText}\\nReturns: \${document.getElementById('sip-table-returns').innerText}\`;
            navigator.clipboard.writeText(res).then(() => {
                if(window.showToast) window.showToast("Result copied!", "success");
                else alert("Result copied!");
            });
        });
    })();`
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    shortDesc: 'Determine your monthly payments and interest costs for any loan.',
    metaTitle: 'Free Loan Calculator Online | ToolVerse',
    metaDescription: 'Calculate loan payments, total interest, and amortization schedule summary. Completely free and secure.',
    keywords: ['loan calculator', 'mortgage calculator', 'finance calculator'],
    benefits: [
      'Works for any type of loan',
      'Provides interest summary',
      'Simple, fast, and free'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Visual breakdown',
      'Input validation',
      'Click to copy output'
    ],
    howToUse: [
      'Enter the total loan amount.',
      'Enter the interest rate.',
      'Enter the loan term in months.',
      'Click Calculate.'
    ],
    faqs: [
      {
        q: 'Can I use this for mortgages?',
        a: 'Yes, as long as it is a fixed-rate loan, this calculator will provide accurate monthly payments.'
      }
    ],
    relatedSlugs: ['emi-calculator', 'simple-interest-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Loan Amount</label>
                <input type="number" id="loan-amount" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 50000">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Interest Rate (% p.a.)</label>
                <input type="number" id="loan-rate" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0.1" step="0.1" placeholder="e.g. 7.5">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Loan Term (Months)</label>
                <input type="number" id="loan-months" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 60">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="loan-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="loan-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="loan-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Payment Summary</h3>
                <p style="font-size: 1.5rem; font-weight: bold; color: #0f172a; margin-bottom: 1rem;">Monthly Payment: <span id="loan-monthly-output">0</span></p>
                
                <div style="width: 100%; height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; margin: 1.5rem 0;">
                    <div id="loan-bar-principal" style="background: #3b82f6; height: 100%; width: 50%; transition: width 0.3s ease;"></div>
                    <div id="loan-bar-interest" style="background: #ef4444; height: 100%; width: 50%; transition: width 0.3s ease;"></div>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Total Principal</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="loan-table-principal">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Total Interest</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="loan-table-interest">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="loan-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/loan-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/loan-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/loan-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const amtEl = document.getElementById('loan-amount');
        const rateEl = document.getElementById('loan-rate');
        const monthsEl = document.getElementById('loan-months');
        const calcBtn = document.getElementById('loan-calc-btn');
        const resetBtn = document.getElementById('loan-reset-btn');
        const copyBtn = document.getElementById('loan-copy-btn');
        const resultBox = document.getElementById('loan-result-box');

        function calculateLoan() {
            const P = parseFloat(amtEl.value);
            const rate = parseFloat(rateEl.value);
            const n = parseFloat(monthsEl.value);

            if (isNaN(P) || P <= 0 || isNaN(rate) || rate < 0 || isNaN(n) || n <= 0) {
                alert("Please enter valid positive numbers. Rate can be 0.");
                return;
            }

            const r = rate / 12 / 100;
            const pmt = r === 0 ? (P / n) : (P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
            
            const totalAmount = pmt * n;
            const totalInterest = totalAmount - P;

            document.getElementById('loan-monthly-output').innerText = pmt.toFixed(2);
            document.getElementById('loan-table-principal').innerText = P.toFixed(2);
            document.getElementById('loan-table-interest').innerText = totalInterest.toFixed(2);

            const pPerc = (P / totalAmount) * 100;
            const iPerc = (totalInterest / totalAmount) * 100;
            document.getElementById('loan-bar-principal').style.width = pPerc + '%';
            document.getElementById('loan-bar-interest').style.width = iPerc + '%';

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calculateLoan);
        resetBtn.addEventListener('click', () => {
            amtEl.value = ''; rateEl.value = ''; monthsEl.value = '';
            resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Monthly Payment: \${document.getElementById('loan-monthly-output').innerText}\\nPrincipal: \${document.getElementById('loan-table-principal').innerText}\\nInterest: \${document.getElementById('loan-table-interest').innerText}\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  },
  {
    slug: 'gst-calculator',
    name: 'GST Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 8h20"></path><path d="M6 16v-4"></path><path d="M10 16v-4"></path><path d="M14 16v-4"></path><path d="M18 16v-4"></path></svg>',
    shortDesc: 'Quickly add or remove GST from any amount.',
    metaTitle: 'Free GST Calculator Online | ToolVerse',
    metaDescription: 'Easily calculate Goods and Services Tax (GST). Add or remove GST from base amounts with accurate breakdowns.',
    keywords: ['gst calculator', 'tax calculator', 'add gst', 'remove gst'],
    benefits: [
      'Add or remove tax in one click',
      'Supports all custom GST rates',
      'Clear breakdown of tax components'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Toggle between Add/Remove',
      'Instant calculations',
      'Shows CGST & SGST breakdown'
    ],
    howToUse: [
      'Enter the initial amount.',
      'Select or type the GST rate.',
      'Choose whether to Add GST or Remove GST.',
      'View the detailed breakdown.'
    ],
    faqs: [
      {
        q: 'How is removing GST calculated?',
        a: 'To remove GST, the formula is: Base Amount = Total Amount / (1 + (Rate / 100)).'
      }
    ],
    relatedSlugs: ['discount-calculator', 'margin-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Amount</label>
                <input type="number" id="gst-amount" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" placeholder="e.g. 1000">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">GST Rate (%)</label>
                <select id="gst-rate" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;">
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18" selected>18%</option>
                    <option value="28">28%</option>
                </select>
            </div>
            <div style="margin-bottom: 1.5rem; display: flex; gap: 1rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="radio" name="gst_type" value="add" checked> Add GST
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="radio" name="gst_type" value="remove"> Remove GST
                </label>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="gst-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="gst-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="gst-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">GST Breakdown</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Base Amount</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="gst-table-base">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Total GST Amount</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #ef4444;" id="gst-table-tax">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; padding-left: 1rem; font-size: 0.9em; color: #64748b;">CGST (50%)</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 0.9em; color: #64748b;" id="gst-table-cgst">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; padding-left: 1rem; font-size: 0.9em; color: #64748b;">SGST (50%)</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 0.9em; color: #64748b;" id="gst-table-sgst">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem 0; border-bottom: 2px solid #e2e8f0; font-weight: bold; font-size: 1.1rem;">Net Final Amount</td>
                        <td style="padding: 0.75rem 0; border-bottom: 2px solid #e2e8f0; text-align: right; font-weight: bold; font-size: 1.1rem; color: #10b981;" id="gst-table-final">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="gst-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formulas:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">Add GST: Total = Amount + (Amount × Rate / 100)</code>
                <code style="display: block; margin-top: 0.25rem; font-size: 0.85rem; color: #475569;">Remove GST: Base = Total / (1 + Rate / 100)</code>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/gst-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/gst-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/gst-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const amtEl = document.getElementById('gst-amount');
        const rateEl = document.getElementById('gst-rate');
        const calcBtn = document.getElementById('gst-calc-btn');
        const resetBtn = document.getElementById('gst-reset-btn');
        const copyBtn = document.getElementById('gst-copy-btn');
        const resultBox = document.getElementById('gst-result-box');

        function calculateGST() {
            const amount = parseFloat(amtEl.value);
            const rate = parseFloat(rateEl.value);
            const type = document.querySelector('input[name="gst_type"]:checked').value;

            if (!amount || amount < 0 || !rate || rate < 0) {
                alert("Please enter valid positive numbers.");
                return;
            }

            let base, tax, final;

            if (type === 'add') {
                base = amount;
                tax = base * (rate / 100);
                final = base + tax;
            } else {
                final = amount;
                base = final / (1 + (rate / 100));
                tax = final - base;
            }

            document.getElementById('gst-table-base').innerText = base.toFixed(2);
            document.getElementById('gst-table-tax').innerText = tax.toFixed(2);
            document.getElementById('gst-table-cgst').innerText = (tax / 2).toFixed(2);
            document.getElementById('gst-table-sgst').innerText = (tax / 2).toFixed(2);
            document.getElementById('gst-table-final').innerText = final.toFixed(2);

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calculateGST);
        resetBtn.addEventListener('click', () => {
            amtEl.value = ''; resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Base: \${document.getElementById('gst-table-base').innerText}\\nGST: \${document.getElementById('gst-table-tax').innerText}\\nNet Total: \${document.getElementById('gst-table-final').innerText}\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
    shortDesc: 'Find out the final price after a percentage discount.',
    metaTitle: 'Free Discount Calculator | Sale Price | ToolVerse',
    metaDescription: 'Calculate the final price and money saved after applying a discount. Simple and fast tool.',
    keywords: ['discount calculator', 'sale calculator', 'percentage off'],
    benefits: [
      'Quick final price calculation',
      'Shows exact amount saved',
      'Supports multiple inputs'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Visual summary',
      'Money saved breakdown',
      'One click copy'
    ],
    howToUse: [
      'Enter the original price.',
      'Enter the discount percentage.',
      'Click Calculate to see the final price and savings.'
    ],
    faqs: [
      {
        q: 'How do you calculate a discount?',
        a: 'The formula is: Savings = Original Price × (Discount % / 100). Final Price = Original Price - Savings.'
      }
    ],
    relatedSlugs: ['percentage-difference-calculator', 'profit-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Original Price</label>
                <input type="number" id="disc-price" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" placeholder="e.g. 100">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Discount (%)</label>
                <input type="number" id="disc-percent" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" max="100" placeholder="e.g. 20">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="disc-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="disc-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="disc-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Final Price</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #10b981; margin-bottom: 0.5rem;"><span id="disc-final-output">0</span></p>
                <p style="color: #64748b; margin-top: 0; margin-bottom: 1.5rem;">You save: <span id="disc-saved-output" style="color: #ef4444; font-weight: bold;">0</span></p>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Original Price</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="disc-table-original">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Discount Amount</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #ef4444;" id="disc-table-saved">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="disc-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/discount-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/discount-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/discount-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const priceEl = document.getElementById('disc-price');
        const pctEl = document.getElementById('disc-percent');
        const calcBtn = document.getElementById('disc-calc-btn');
        const resetBtn = document.getElementById('disc-reset-btn');
        const copyBtn = document.getElementById('disc-copy-btn');
        const resultBox = document.getElementById('disc-result-box');

        function calc() {
            const price = parseFloat(priceEl.value);
            const pct = parseFloat(pctEl.value);

            if (!price || price < 0 || pct < 0 || pct > 100) {
                alert("Please enter valid numbers (Discount between 0 and 100).");
                return;
            }

            const saved = price * (pct / 100);
            const final = price - saved;

            document.getElementById('disc-final-output').innerText = final.toFixed(2);
            document.getElementById('disc-saved-output').innerText = saved.toFixed(2);
            document.getElementById('disc-table-original').innerText = price.toFixed(2);
            document.getElementById('disc-table-saved').innerText = saved.toFixed(2);

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calc);
        resetBtn.addEventListener('click', () => {
            priceEl.value = ''; pctEl.value = ''; resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Final Price: \${document.getElementById('disc-final-output').innerText}\\nYou Save: \${document.getElementById('disc-saved-output').innerText}\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  },
  {
    slug: 'profit-calculator',
    name: 'Profit Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
    shortDesc: 'Calculate gross profit, margin, and markup percentages.',
    metaTitle: 'Free Profit & Margin Calculator Online | ToolVerse',
    metaDescription: 'Calculate gross profit, margin, and markup from cost and selling price. Essential tool for sellers.',
    keywords: ['profit calculator', 'margin calculator', 'markup calculator', 'business calculator'],
    benefits: [
      'Instant margin vs markup insights',
      'Easy to use interface',
      'Perfect for e-commerce sellers'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Profit value display',
      'Margin percentage',
      'Markup percentage'
    ],
    howToUse: [
      'Enter the Cost Price of the item.',
      'Enter the Selling Price.',
      'View the calculated profit, margin, and markup.'
    ],
    faqs: [
      {
        q: 'What is the difference between Margin and Markup?',
        a: 'Margin is profit as a percentage of the selling price. Markup is profit as a percentage of the cost price.'
      }
    ],
    relatedSlugs: ['margin-calculator', 'percentage-difference-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Cost Price</label>
                <input type="number" id="prof-cost" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" placeholder="e.g. 50">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Selling Price</label>
                <input type="number" id="prof-sell" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" placeholder="e.g. 75">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="prof-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="prof-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="prof-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Profit Summary</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #10b981; margin-bottom: 1rem;">Profit: <span id="prof-amount-output">0</span></p>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Gross Margin</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #3b82f6;"><span id="prof-margin-output">0</span>%</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Markup</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #8b5cf6;"><span id="prof-markup-output">0</span>%</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="prof-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formulas:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">Profit = Selling Price - Cost Price</code>
                <code style="display: block; margin-top: 0.25rem; font-size: 0.85rem; color: #475569;">Margin = (Profit / Selling Price) × 100</code>
                <code style="display: block; margin-top: 0.25rem; font-size: 0.85rem; color: #475569;">Markup = (Profit / Cost Price) × 100</code>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/profit-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/profit-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/profit-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const costEl = document.getElementById('prof-cost');
        const sellEl = document.getElementById('prof-sell');
        const calcBtn = document.getElementById('prof-calc-btn');
        const resetBtn = document.getElementById('prof-reset-btn');
        const copyBtn = document.getElementById('prof-copy-btn');
        const resultBox = document.getElementById('prof-result-box');

        function calc() {
            const cost = parseFloat(costEl.value);
            const sell = parseFloat(sellEl.value);

            if (isNaN(cost) || isNaN(sell) || cost < 0 || sell < 0) {
                alert("Please enter valid positive numbers.");
                return;
            }

            const profit = sell - cost;
            const margin = sell > 0 ? (profit / sell) * 100 : 0;
            const markup = cost > 0 ? (profit / cost) * 100 : 0;

            document.getElementById('prof-amount-output').innerText = profit.toFixed(2);
            document.getElementById('prof-amount-output').style.color = profit >= 0 ? '#10b981' : '#ef4444';
            
            document.getElementById('prof-margin-output').innerText = margin.toFixed(2);
            document.getElementById('prof-markup-output').innerText = markup.toFixed(2);

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calc);
        resetBtn.addEventListener('click', () => {
            costEl.value = ''; sellEl.value = ''; resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Profit: \${document.getElementById('prof-amount-output').innerText}\\nMargin: \${document.getElementById('prof-margin-output').innerText}%\\nMarkup: \${document.getElementById('prof-markup-output').innerText}%\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  },
  {
    slug: 'margin-calculator',
    name: 'Margin Calculator',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    shortDesc: 'Determine the selling price based on desired margin.',
    metaTitle: 'Free Margin Calculator Online | ToolVerse',
    metaDescription: 'Calculate the required selling price to achieve your desired gross margin. Perfect for retail pricing.',
    keywords: ['margin calculator', 'pricing calculator', 'selling price calculator'],
    benefits: [
      'Helps set retail prices accurately',
      'Shows actual profit amount',
      'Simple and reliable'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Selling price calculation',
      'Gross profit calculation',
      'Markup reference'
    ],
    howToUse: [
      'Enter your item Cost.',
      'Enter your desired Gross Margin percentage.',
      'Click Calculate to see the required Selling Price.'
    ],
    faqs: [
      {
        q: 'How is Selling Price calculated from Margin?',
        a: 'The formula is: Selling Price = Cost / (1 - (Margin / 100)).'
      }
    ],
    relatedSlugs: ['profit-calculator', 'discount-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Cost of Item</label>
                <input type="number" id="marg-cost" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" placeholder="e.g. 100">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Desired Margin (%)</label>
                <input type="number" id="marg-percent" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" max="99.9" placeholder="e.g. 20">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="marg-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="marg-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="marg-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Required Selling Price</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #10b981; margin-bottom: 1rem;"><span id="marg-sell-output">0</span></p>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Gross Profit</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #3b82f6;" id="marg-profit-output">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Equivalent Markup</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #8b5cf6;"><span id="marg-markup-output">0</span>%</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="marg-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formula:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">Revenue = Cost / (1 - (Margin / 100))</code>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/margin-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/margin-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/margin-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const costEl = document.getElementById('marg-cost');
        const pctEl = document.getElementById('marg-percent');
        const calcBtn = document.getElementById('marg-calc-btn');
        const resetBtn = document.getElementById('marg-reset-btn');
        const copyBtn = document.getElementById('marg-copy-btn');
        const resultBox = document.getElementById('marg-result-box');

        function calc() {
            const cost = parseFloat(costEl.value);
            const marginPct = parseFloat(pctEl.value);

            if (isNaN(cost) || isNaN(marginPct) || cost < 0 || marginPct < 0 || marginPct >= 100) {
                alert("Please enter valid positive numbers. Margin must be less than 100.");
                return;
            }

            const revenue = cost / (1 - (marginPct / 100));
            const profit = revenue - cost;
            const markup = cost > 0 ? (profit / cost) * 100 : 0;

            document.getElementById('marg-sell-output').innerText = revenue.toFixed(2);
            document.getElementById('marg-profit-output').innerText = profit.toFixed(2);
            document.getElementById('marg-markup-output').innerText = markup.toFixed(2);

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calc);
        resetBtn.addEventListener('click', () => {
            costEl.value = ''; pctEl.value = ''; resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Selling Price: \${document.getElementById('marg-sell-output').innerText}\\nProfit: \${document.getElementById('marg-profit-output').innerText}\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  },
  {
    slug: 'percentage-difference-calculator',
    name: 'Percentage Difference',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>',
    shortDesc: 'Calculate the percentage difference between two numbers.',
    metaTitle: 'Percentage Difference Calculator Online | ToolVerse',
    metaDescription: 'Find the absolute percentage difference between two numerical values instantly. Accurate and free.',
    keywords: ['percentage difference', 'percentage change', 'math calculator'],
    benefits: [
      'Instant math calculations',
      'Clear step-by-step formula',
      'No data saved remotely'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Calculates both Difference and Change',
      'Formula display',
      'Easy clipboard copy'
    ],
    howToUse: [
      'Enter Value 1.',
      'Enter Value 2.',
      'Click Calculate.'
    ],
    faqs: [
      {
        q: 'What is the percentage difference formula?',
        a: 'Difference = |V1 - V2| / ((V1 + V2) / 2) × 100.'
      }
    ],
    relatedSlugs: ['discount-calculator', 'margin-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Value 1</label>
                <input type="number" id="pd-v1" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" placeholder="e.g. 50">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Value 2</label>
                <input type="number" id="pd-v2" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" placeholder="e.g. 75">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="pd-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="pd-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="pd-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Result</h3>
                <p style="font-size: 1.2rem; color: #334155; margin-bottom: 0.5rem;">Percentage Difference:</p>
                <p style="font-size: 2rem; font-weight: bold; color: #3b82f6; margin-top: 0; margin-bottom: 1rem;"><span id="pd-diff-output">0</span>%</p>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Absolute Difference</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="pd-abs-output">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Average of Values</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;" id="pd-avg-output">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">% Change (V1 to V2)</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #10b981;" id="pd-change-output">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="pd-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formulas:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">Diff = |V1 - V2| / ((V1 + V2) / 2) × 100</code>
                <code style="display: block; margin-top: 0.25rem; font-size: 0.85rem; color: #475569;">Change = ((V2 - V1) / |V1|) × 100</code>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/percentage-difference-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/percentage-difference-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/percentage-difference-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const v1El = document.getElementById('pd-v1');
        const v2El = document.getElementById('pd-v2');
        const calcBtn = document.getElementById('pd-calc-btn');
        const resetBtn = document.getElementById('pd-reset-btn');
        const copyBtn = document.getElementById('pd-copy-btn');
        const resultBox = document.getElementById('pd-result-box');

        function calc() {
            const v1 = parseFloat(v1El.value);
            const v2 = parseFloat(v2El.value);

            if (isNaN(v1) || isNaN(v2)) {
                alert("Please enter valid numbers.");
                return;
            }

            const absDiff = Math.abs(v1 - v2);
            const avg = (v1 + v2) / 2;
            
            let diffPct = 0;
            if (avg !== 0) {
                diffPct = (absDiff / Math.abs(avg)) * 100;
            }

            let changePct = 0;
            if (v1 !== 0) {
                changePct = ((v2 - v1) / Math.abs(v1)) * 100;
            }

            document.getElementById('pd-diff-output').innerText = diffPct.toFixed(2);
            document.getElementById('pd-abs-output').innerText = absDiff.toString();
            document.getElementById('pd-avg-output').innerText = avg.toString();
            
            const changeStr = changePct > 0 ? '+' + changePct.toFixed(2) + '%' : changePct.toFixed(2) + '%';
            document.getElementById('pd-change-output').innerText = changeStr;
            document.getElementById('pd-change-output').style.color = changePct >= 0 ? '#10b981' : '#ef4444';

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calc);
        resetBtn.addEventListener('click', () => {
            v1El.value = ''; v2El.value = ''; resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Percentage Difference: \${document.getElementById('pd-diff-output').innerText}%\\nPercentage Change: \${document.getElementById('pd-change-output').innerText}\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    shortDesc: 'Calculate wealth growth via compound interest over time.',
    metaTitle: 'Compound Interest Calculator Online | ToolVerse',
    metaDescription: 'Calculate compound interest on your investments. Visualize principal vs total interest over years.',
    keywords: ['compound interest', 'investment calculator', 'APY calculator'],
    benefits: [
      'Visual compounding growth bar',
      'Supports multiple compounding frequencies',
      'Detailed interest breakdown'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Daily/Monthly/Yearly compounding',
      'Instant updates',
      'Clear math formula view'
    ],
    howToUse: [
      'Enter Principal amount.',
      'Enter Interest Rate (% p.a.).',
      'Enter Time in years.',
      'Select Compounding Frequency and Calculate.'
    ],
    faqs: [
      {
        q: 'What is the compound interest formula?',
        a: 'A = P(1 + r/n)^(nt) where P is principal, r is rate, n is compounding frequency, t is time.'
      }
    ],
    relatedSlugs: ['sip-calculator', 'simple-interest-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Principal Amount</label>
                <input type="number" id="ci-prin" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 10000">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Annual Rate (%)</label>
                <input type="number" id="ci-rate" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" step="0.1" placeholder="e.g. 5">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Time (Years)</label>
                <input type="number" id="ci-time" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 10">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Compounding Frequency</label>
                <select id="ci-freq" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;">
                    <option value="1">Annually (1/yr)</option>
                    <option value="2">Semi-Annually (2/yr)</option>
                    <option value="4">Quarterly (4/yr)</option>
                    <option value="12" selected>Monthly (12/yr)</option>
                    <option value="365">Daily (365/yr)</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="ci-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="ci-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="ci-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Total Value</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #10b981; margin-bottom: 1rem;"><span id="ci-total-output">0</span></p>
                
                <div style="width: 100%; height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; margin: 1.5rem 0;">
                    <div id="ci-bar-prin" style="background: #3b82f6; height: 100%; width: 50%; transition: width 0.3s ease;"></div>
                    <div id="ci-bar-int" style="background: #10b981; height: 100%; width: 50%; transition: width 0.3s ease;"></div>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Principal Amount</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #3b82f6;" id="ci-table-prin">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Total Interest Earned</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #10b981;" id="ci-table-int">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="ci-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formula:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">A = P × (1 + r/n)^(n×t)</code>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/compound-interest-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/compound-interest-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/compound-interest-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const pEl = document.getElementById('ci-prin');
        const rEl = document.getElementById('ci-rate');
        const tEl = document.getElementById('ci-time');
        const fEl = document.getElementById('ci-freq');
        const calcBtn = document.getElementById('ci-calc-btn');
        const resetBtn = document.getElementById('ci-reset-btn');
        const copyBtn = document.getElementById('ci-copy-btn');
        const resultBox = document.getElementById('ci-result-box');

        function calc() {
            const P = parseFloat(pEl.value);
            const R = parseFloat(rEl.value);
            const T = parseFloat(tEl.value);
            const N = parseFloat(fEl.value);

            if (!P || P <= 0 || !R || R < 0 || !T || T <= 0) {
                alert("Please enter valid positive numbers.");
                return;
            }

            const r = R / 100;
            const A = P * Math.pow((1 + r / N), N * T);
            const interest = A - P;

            document.getElementById('ci-total-output').innerText = A.toFixed(2);
            document.getElementById('ci-table-prin').innerText = P.toFixed(2);
            document.getElementById('ci-table-int').innerText = interest.toFixed(2);

            const pPct = (P / A) * 100;
            const iPct = (interest / A) * 100;
            
            document.getElementById('ci-bar-prin').style.width = pPct + '%';
            document.getElementById('ci-bar-int').style.width = iPct + '%';

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calc);
        resetBtn.addEventListener('click', () => {
            pEl.value = ''; rEl.value = ''; tEl.value = ''; fEl.value = '12';
            resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Total Value: \${document.getElementById('ci-total-output').innerText}\\nInterest Earned: \${document.getElementById('ci-table-int').innerText}\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest',
    category: 'calculator',
    categoryName: 'Calculator Tools',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    shortDesc: 'Calculate basic simple interest for loans and savings.',
    metaTitle: 'Free Simple Interest Calculator Online | ToolVerse',
    metaDescription: 'Calculate simple interest without compounding. View your total principal + interest effortlessly.',
    keywords: ['simple interest', 'interest calculator', 'finance calculator'],
    benefits: [
      'Very fast linear calculations',
      'Good for basic loans',
      'No hidden math'
    ],
    lastUpdated: '2026-07-06',
    features: [
      'Visual breakdown',
      'Total Amount formula',
      'Quick copy outputs'
    ],
    howToUse: [
      'Enter the Principal Amount.',
      'Enter the Annual Interest Rate.',
      'Enter Time in years.',
      'Click Calculate.'
    ],
    faqs: [
      {
        q: 'What is the simple interest formula?',
        a: 'I = P × R × T / 100. Where P is Principal, R is Rate, and T is Time in years.'
      }
    ],
    relatedSlugs: ['compound-interest-calculator', 'emi-calculator'],
    hasDownload: false,
    hasCopy: true,
    toolHTML: `
<div class="tool-content">
    <div class="grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div class="input-section">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Principal Amount</label>
                <input type="number" id="si-prin" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 5000">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Annual Rate (%)</label>
                <input type="number" id="si-rate" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="0" step="0.1" placeholder="e.g. 6">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Time (Years)</label>
                <input type="number" id="si-time" class="form-input" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;" min="1" placeholder="e.g. 5">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="si-calc-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem; border-radius: 6px; flex: 1;">Calculate</button>
                <button id="si-reset-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; border-radius: 6px;">Reset</button>
            </div>
        </div>
        
        <div class="output-section">
            <div id="si-result-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; display: none;">
                <h3 style="margin-top: 0; font-size: 1.25rem;">Total Amount</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #10b981; margin-bottom: 1rem;"><span id="si-total-output">0</span></p>
                
                <div style="width: 100%; height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; margin: 1.5rem 0;">
                    <div id="si-bar-prin" style="background: #3b82f6; height: 100%; width: 50%; transition: width 0.3s ease;"></div>
                    <div id="si-bar-int" style="background: #ef4444; height: 100%; width: 50%; transition: width 0.3s ease;"></div>
                </div>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Principal Amount</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #3b82f6;" id="si-table-prin">0</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">Simple Interest</td>
                        <td style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500; color: #ef4444;" id="si-table-int">0</td>
                    </tr>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <button id="si-copy-btn" class="btn btn-secondary btn-sm" style="padding: 0.5rem 1rem; border-radius: 4px;">📋 Copy Result</button>
                </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">Formula:</p>
                <code style="display: block; margin-top: 0.5rem; font-size: 0.85rem; color: #475569;">Interest (I) = P × R × T / 100</code>
                <code style="display: block; margin-top: 0.25rem; font-size: 0.85rem; color: #475569;">Total Amount = P + I</code>
            </div>
        </div>
    </div>
    <div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/simple-interest-calculator.html')">🔗 Copy URL</button>
        <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/simple-interest-calculator.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/simple-interest-calculator.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
        <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
    </div>
</div>
    `,
    toolScript: `(function() {
        const pEl = document.getElementById('si-prin');
        const rEl = document.getElementById('si-rate');
        const tEl = document.getElementById('si-time');
        const calcBtn = document.getElementById('si-calc-btn');
        const resetBtn = document.getElementById('si-reset-btn');
        const copyBtn = document.getElementById('si-copy-btn');
        const resultBox = document.getElementById('si-result-box');

        function calc() {
            const P = parseFloat(pEl.value);
            const R = parseFloat(rEl.value);
            const T = parseFloat(tEl.value);

            if (!P || P <= 0 || !R || R < 0 || !T || T <= 0) {
                alert("Please enter valid positive numbers.");
                return;
            }

            const interest = (P * R * T) / 100;
            const total = P + interest;

            document.getElementById('si-total-output').innerText = total.toFixed(2);
            document.getElementById('si-table-prin').innerText = P.toFixed(2);
            document.getElementById('si-table-int').innerText = interest.toFixed(2);

            const pPct = (P / total) * 100;
            const iPct = (interest / total) * 100;
            
            document.getElementById('si-bar-prin').style.width = pPct + '%';
            document.getElementById('si-bar-int').style.width = iPct + '%';

            resultBox.style.display = 'block';
        }

        calcBtn.addEventListener('click', calc);
        resetBtn.addEventListener('click', () => {
            pEl.value = ''; rEl.value = ''; tEl.value = ''; resultBox.style.display = 'none';
        });
        copyBtn.addEventListener('click', () => {
            const res = \`Total Amount: \${document.getElementById('si-total-output').innerText}\\nInterest: \${document.getElementById('si-table-int').innerText}\`;
            navigator.clipboard.writeText(res).then(() => { if(window.showToast) window.showToast("Copied!", "success"); else alert("Copied!"); });
        });
    })();`
  }
];

module.exports = tools;
