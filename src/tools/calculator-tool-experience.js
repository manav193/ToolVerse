const calculatorSlugs = new Set([
  'emi-calculator', 'sip-calculator', 'loan-calculator', 'gst-calculator',
  'discount-calculator', 'profit-calculator', 'margin-calculator',
  'percentage-difference-calculator', 'compound-interest-calculator',
  'simple-interest-calculator', 'salary-calculator', 'tax-calculator',
  'fuel-cost-calculator', 'time-duration-calculator', 'date-difference-calculator',
  'gpa-calculator', 'grade-calculator', 'marks-percentage-calculator',
  'calorie-calculator', 'bmr-calculator', 'attendance-calculator',
  'percentage-calculator', 'age-calculator', 'bmi-calculator'
]);

const financeSlugs = new Set([
  'emi-calculator', 'sip-calculator', 'loan-calculator', 'gst-calculator',
  'discount-calculator', 'profit-calculator', 'margin-calculator',
  'compound-interest-calculator', 'simple-interest-calculator',
  'salary-calculator', 'tax-calculator', 'fuel-cost-calculator'
]);

const healthSlugs = new Set(['calorie-calculator', 'bmr-calculator', 'bmi-calculator']);

const calendarHelpers = `
  const parseDateOnly = (value) => {
    const match = /^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(value || '');
    if (!match) return null;
    return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
  };
  const ordinal = ({ year, month, day }) => Date.UTC(year, month - 1, day) / 86400000;
  const daysInMonth = (year, month) => new Date(Date.UTC(year, month, 0)).getUTCDate();
  const addYearsClamped = (date, years) => ({
    year: date.year + years,
    month: date.month,
    day: Math.min(date.day, daysInMonth(date.year + years, date.month))
  });
  const addMonthsClamped = (date, months) => {
    const monthIndex = date.year * 12 + date.month - 1 + months;
    const year = Math.floor(monthIndex / 12);
    const month = monthIndex - year * 12 + 1;
    return { year, month, day: Math.min(date.day, daysInMonth(year, month)) };
  };
  const calendarDifference = (start, end) => {
    let years = Math.max(0, end.year - start.year);
    while (years && ordinal(addYearsClamped(start, years)) > ordinal(end)) years--;
    const afterYears = addYearsClamped(start, years);
    let months = Math.max(0, (end.year - afterYears.year) * 12 + end.month - afterYears.month);
    while (months && ordinal(addMonthsClamped(afterYears, months)) > ordinal(end)) months--;
    const afterMonths = addMonthsClamped(afterYears, months);
    return { years, months, days: ordinal(end) - ordinal(afterMonths) };
  };
`;

const dateDifferenceScript = `(function() {
  const startInput = document.getElementById('date-start');
  const endInput = document.getElementById('date-end');
  const result = document.getElementById('date-result-section');
  let currentResults = null;
  ${calendarHelpers}

  document.getElementById('calc-date-btn').addEventListener('click', () => {
    let start = parseDateOnly(startInput.value);
    let end = parseDateOnly(endInput.value);
    if (!start || !end) return window.calculatorFeedback('Select both a start date and an end date.', 'error');
    const reversed = ordinal(start) > ordinal(end);
    if (reversed) [start, end] = [end, start];
    const totalDays = ordinal(end) - ordinal(start);
    const exact = calendarDifference(start, end);
    currentResults = {
      totalDays,
      calendar: \`${'${exact.years}'} years, ${'${exact.months}'} months, ${'${exact.days}'} days\`,
      weeks: (totalDays / 7).toFixed(2),
      months: (totalDays / 30.436875).toFixed(2),
      years: (totalDays / 365.2425).toFixed(2)
    };
    document.getElementById('res-date-days').textContent = \`${'${totalDays}'} days\`;
    document.getElementById('res-date-calendar').textContent = currentResults.calendar;
    document.getElementById('res-date-weeks').textContent = \`${'${currentResults.weeks}'} weeks\`;
    document.getElementById('res-date-months').textContent = \`${'${currentResults.months}'} months\`;
    document.getElementById('res-date-years').textContent = \`${'${currentResults.years}'} years\`;
    result.style.display = 'block';
    window.calculatorFeedback(reversed ? 'Dates were reordered. Calculation complete.' : 'Calculation complete.', 'success');
  });
  document.getElementById('reset-date-btn').addEventListener('click', () => {
    startInput.value = ''; endInput.value = ''; result.style.display = 'none'; currentResults = null;
    window.calculatorFeedback('', 'neutral');
  });
  document.getElementById('copy-date-btn').addEventListener('click', () => {
    if (!currentResults) return window.calculatorFeedback('Calculate a date difference before copying.', 'error');
    window.copyToClipboard(\`Date Difference:\nTotal Days: ${'${currentResults.totalDays}'}\nCalendar: ${'${currentResults.calendar}'}\nWeeks: ${'${currentResults.weeks}'}\nMonths: ${'${currentResults.months}'}\nYears: ${'${currentResults.years}'}\`);
  });
})();`;

const ageScript = `(function() {
  const dobInput = document.getElementById('age-dob');
  const targetInput = document.getElementById('age-target');
  const now = new Date();
  targetInput.value = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  ${calendarHelpers}
  document.getElementById('age-calc').addEventListener('click', () => {
    const dob = parseDateOnly(dobInput.value);
    const target = parseDateOnly(targetInput.value);
    if (!dob || !target) return window.calculatorFeedback('Select both dates to calculate an age.', 'error');
    if (ordinal(dob) > ordinal(target)) return window.calculatorFeedback('Date of birth cannot be after the target date.', 'error');
    const exact = calendarDifference(dob, target);
    const totalDays = ordinal(target) - ordinal(dob);
    document.getElementById('age-result-main').innerHTML = \`${'${exact.years}'} <small>years</small> ${'${exact.months}'} <small>months</small> ${'${exact.days}'} <small>days</small>\`;
    document.getElementById('age-m').textContent = exact.years * 12 + exact.months;
    document.getElementById('age-w').textContent = Math.floor(totalDays / 7);
    document.getElementById('age-d').textContent = totalDays;
    window.calculatorFeedback('Age calculation complete.', 'success');
  });
})();`;

const percentageScript = `(function() {
  const number = (id) => parseFloat(document.getElementById(id).value);
  const format = (value) => Number(value.toFixed(6)).toLocaleString(undefined, { maximumFractionDigits: 6 });
  const run = (ids, outputId, calculate) => {
    const values = ids.map(number);
    if (values.some(Number.isNaN)) return window.calculatorFeedback('Enter a number in every field for this calculation.', 'error');
    const result = calculate(...values);
    if (result === null || !Number.isFinite(result.value)) return window.calculatorFeedback(result && result.message ? result.message : 'This calculation is undefined for the values entered.', 'error');
    document.getElementById(outputId).textContent = result.text || format(result.value);
    window.calculatorFeedback('Calculation complete.', 'success');
  };
  document.getElementById('p1-btn').addEventListener('click', () => run(['p1-x', 'p1-y'], 'p1-res', (x, y) => ({ value: x / 100 * y })));
  document.getElementById('p2-btn').addEventListener('click', () => run(['p2-x', 'p2-y'], 'p2-res', (x, y) => y === 0 ? { value: NaN, message: 'The reference value cannot be zero.' } : { value: x / y * 100, text: format(x / y * 100) + '%' }));
  document.getElementById('p3-btn').addEventListener('click', () => run(['p3-x', 'p3-y'], 'p3-res', (x, y) => x === 0 ? { value: NaN, message: 'The starting value cannot be zero for percentage change.' } : { value: (y - x) / Math.abs(x) * 100, text: format(Math.abs((y - x) / Math.abs(x) * 100)) + '% ' + (y >= x ? 'Increase' : 'Decrease') }));
})();`;

const bmiScript = `(function() {
  const units = document.getElementById('bmi-units');
  const height = document.getElementById('bmi-height');
  const weight = document.getElementById('bmi-weight');
  const value = document.getElementById('bmi-val');
  const status = document.getElementById('bmi-status');
  const updateUnits = () => {
    const metric = units.value === 'metric';
    document.getElementById('lbl-height').textContent = metric ? 'Height (cm):' : 'Height (inches):';
    document.getElementById('lbl-weight').textContent = metric ? 'Weight (kg):' : 'Weight (lbs):';
    height.value = ''; weight.value = ''; value.textContent = '-'; status.textContent = '-';
    window.calculatorFeedback(metric ? 'Metric units selected.' : 'Imperial units selected.', 'neutral');
  };
  units.addEventListener('change', updateUnits);
  document.getElementById('bmi-calc').addEventListener('click', () => {
    const h = parseFloat(height.value); const w = parseFloat(weight.value);
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return window.calculatorFeedback('Enter a height and weight greater than zero.', 'error');
    const bmi = units.value === 'metric' ? w / Math.pow(h / 100, 2) : w / Math.pow(h, 2) * 703;
    const category = bmi < 18.5 ? ['Underweight', '#b7791f'] : bmi < 25 ? ['Normal Weight', '#15803d'] : bmi < 30 ? ['Overweight', '#c2410c'] : ['Obese', '#b91c1c'];
    value.textContent = bmi.toFixed(1); value.style.color = category[1];
    status.textContent = category[0]; status.style.color = category[1]; status.style.backgroundColor = 'color-mix(in srgb, ' + category[1] + ' 12%, transparent)';
    window.calculatorFeedback('BMI calculation complete.', 'success');
  });
})();`;

const attendanceScript = `(function() {
  const totalInput = document.getElementById('att-total');
  const attendedInput = document.getElementById('att-attended');
  const targetInput = document.getElementById('att-target');
  const current = document.getElementById('att-current');
  const message = document.getElementById('att-message');
  document.getElementById('att-calc').addEventListener('click', () => {
    const total = Number(totalInput.value); const attended = Number(attendedInput.value); const target = Number(targetInput.value);
    if (![total, attended, target].every(Number.isFinite) || total <= 0 || attended < 0 || target <= 0 || target > 100) return window.calculatorFeedback('Enter valid values: total classes above zero and a target from 1 to 100.', 'error');
    if (attended > total) return window.calculatorFeedback('Attended classes cannot exceed total classes.', 'error');
    const percent = attended / total * 100;
    current.textContent = percent.toFixed(2) + '%';
    if (percent < target) {
      current.style.color = 'var(--error, #ef4444)'; message.style.color = 'var(--error, #ef4444)';
      message.textContent = target === 100 ? 'A 100% target cannot be reached after a missed class.' : \`Attend ${'${Math.ceil((target * total - attended * 100) / (100 - target))}'} more consecutive class(es) to reach ${'${target}'}%.\`;
    } else {
      const skip = Math.max(0, Math.floor(attended * 100 / target - total));
      current.style.color = 'var(--success, #10b981)'; message.style.color = 'var(--success, #10b981)';
      message.textContent = skip ? \`You can skip ${'${skip}'} class(es) and remain at or above ${'${target}'}%.\` : 'You are on target; attend the next class to maintain it.';
    }
    window.calculatorFeedback('Attendance calculation complete.', 'success');
  });
})();`;

const scriptOverrides = {
  'date-difference-calculator': dateDifferenceScript,
  'age-calculator': ageScript,
  'percentage-calculator': percentageScript,
  'bmi-calculator': bmiScript,
  'attendance-calculator': attendanceScript
};

const runtime = (slug) => `
(function() {
  const root = document.querySelector('[data-calculator-slug="${slug}"]');
  if (!root) return;
  const status = root.querySelector('.calculator-workspace-status');
  const resultRegions = Array.from(root.querySelectorAll('[data-calculator-result]'));
  window.calculatorFeedback = (message, tone = 'error') => {
    status.textContent = message || '';
    status.dataset.tone = tone;
    if (tone === 'error') {
      resultRegions.forEach(region => region.dataset.stale = 'true');
      status.focus({ preventScroll: true });
    }
  };
  root.querySelectorAll('input, select').forEach(control => {
    const describedBy = new Set((control.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    describedBy.add(status.id);
    control.setAttribute('aria-describedby', Array.from(describedBy).join(' '));
    control.addEventListener('input', () => {
      if (status.dataset.tone === 'error') window.calculatorFeedback('', 'neutral');
      resultRegions.forEach(region => {
        region.dataset.stale = 'true';
        if (region.contains(control)) region.querySelectorAll('[id$="-res"]').forEach(output => { output.textContent = '-'; });
      });
    });
    control.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      const primary = root.querySelector('.btn-primary');
      if (primary && primary !== event.target) { event.preventDefault(); primary.click(); }
    });
  });
  root.addEventListener('click', event => {
    if (event.target.closest('.btn-primary')) requestAnimationFrame(() => resultRegions.forEach(region => delete region.dataset.stale));
  });
})();`;

const enhanceHtml = (html, slug) => {
  let enhanced = html
    .replace(/<button(?![^>]*\btype=)([^>]*)>/gi, '<button type="button"$1>')
    .replace(/<input([^>]*type=["']number["'][^>]*)>/gi, (match, attrs) => `<input${attrs}${/inputmode=/i.test(attrs) ? '' : ' inputmode="decimal"'}${/autocomplete=/i.test(attrs) ? '' : ' autocomplete="off"'}>`)
    .replace(/class=(["'])([^"']*\bgrid-2\b[^"']*)\1/gi, 'class=$1$2 calculator-grid$1')
    .replace(/class=(["'])([^"']*\b(?:input-section|tool-input-area)\b[^"']*)\1/gi, 'class=$1$2 calculator-input-panel$1')
    .replace(/class=(["'])([^"']*\b(?:output-section|result-card)\b[^"']*)\1/gi, 'class=$1$2 calculator-result-panel$1 data-calculator-result')
    .replace(/<div([^>]*\bid=["'][^"']*(?:result-box|result-section)[^"']*["'][^>]*)>/gi, (match, attrs) => /data-calculator-result/i.test(attrs) ? match : `<div${attrs} data-calculator-result>`)
    .replace(/window\.showToast\(/g, 'window.calculatorFeedback(')
    .replace(/\balert\(/g, 'window.calculatorFeedback(');

  enhanced = enhanced
    .replace(/class=(["'])([^"']*\bgpa-credits\b[^"']*)\1/gi, 'class=$1$2$1 aria-label="Course credits"')
    .replace(/class=(["'])([^"']*\bgpa-grade\b[^"']*)\1/gi, 'class=$1$2$1 aria-label="Course grade"');

  const note = financeSlugs.has(slug)
    ? '<p class="calculator-disclaimer">Estimate only. Rates, taxes, fees, and lender terms can change the actual amount.</p>'
    : healthSlugs.has(slug)
      ? '<p class="calculator-disclaimer">General informational estimate only; it is not medical advice.</p>'
      : '';
  return `<div class="calculator-tool" data-calculator-slug="${slug}"><p id="calculator-status-${slug}" class="calculator-workspace-status" role="status" aria-live="polite" tabindex="-1"></p>${enhanced}${note}</div>`;
};

module.exports = function enhanceCalculatorTool(tool) {
  if (!calculatorSlugs.has(tool.slug)) return tool;
  let script = scriptOverrides[tool.slug] || tool.toolScript || '';
  script = script
    .replace(/window\.showToast\(/g, 'window.calculatorFeedback(')
    .replace(/\balert\(/g, 'window.calculatorFeedback(');

  if (tool.slug === 'gpa-calculator') {
    script = script
      .replace(/class="form-input gpa-credits"/g, 'class="form-input gpa-credits" aria-label="Course credits"')
      .replace(/class="form-input gpa-grade"/g, 'class="form-input gpa-grade" aria-label="Course grade"');
  }

  if (tool.slug === 'compound-interest-calculator') {
    script = script.replace('if (!P || P <= 0 || !R || R < 0 || !T || T <= 0)', 'if (!Number.isFinite(P) || P <= 0 || !Number.isFinite(R) || R < 0 || !Number.isFinite(T) || T <= 0 || !Number.isFinite(N) || N <= 0)');
  }
  if (tool.slug === 'discount-calculator') {
    script = script.replace('if (!price || price < 0 || pct < 0 || pct > 100)', 'if (!Number.isFinite(price) || price < 0 || !Number.isFinite(pct) || pct < 0 || pct > 100)');
  }

  return {
    ...tool,
    toolHTML: enhanceHtml(tool.toolHTML || '', tool.slug),
    toolScript: `${script}\n${runtime(tool.slug)}`
  };
};

module.exports.supports = (slug) => calculatorSlugs.has(slug);
