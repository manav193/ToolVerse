module.exports = [
{
  "slug": "attendance-calculator",
  "name": "Attendance Calculator",
  "category": "student",
  "categoryName": "Student Tools",
  "icon": "🎓",
  "shortDesc": "Calculate how many classes you need to attend or can skip",
  "metaTitle": "Attendance Calculator - Check How Many Classes to Attend | ToolVerse",
  "metaDescription": "Free attendance calculator for students. Enter your total classes and attended classes to see how many more you need to attend to reach your target percentage.",
  "keywords": "attendance calculator, calculate attendance, college attendance, school attendance target",
  "toolHTML": "\n        <div class=\"grid-2\">\n          <div class=\"tool-input-area\">\n            <div class=\"form-group\" style=\"margin-bottom: 1rem;\">\n              <label class=\"form-label\" for=\"att-total\">Total Classes Held:</label>\n              <input type=\"number\" id=\"att-total\" class=\"form-input\" min=\"0\" placeholder=\"e.g., 50\">\n            </div>\n            <div class=\"form-group\" style=\"margin-bottom: 1rem;\">\n              <label class=\"form-label\" for=\"att-attended\">Classes Attended:</label>\n              <input type=\"number\" id=\"att-attended\" class=\"form-input\" min=\"0\" placeholder=\"e.g., 35\">\n            </div>\n            <div class=\"form-group\" style=\"margin-bottom: 1.5rem;\">\n              <label class=\"form-label\" for=\"att-target\">Target Percentage (%):</label>\n              <input type=\"number\" id=\"att-target\" class=\"form-input\" min=\"1\" max=\"100\" value=\"75\">\n            </div>\n            <button id=\"att-calc\" class=\"btn btn-primary\" style=\"width: 100%;\">Calculate Attendance</button>\n          </div>\n          <div class=\"result-card\" style=\"background: var(--bg-secondary); padding: 2rem; border-radius: 12px; text-align: center;\">\n            <h3 style=\"margin-bottom: 1rem; color: var(--text-secondary);\">Current Attendance</h3>\n            <div id=\"att-current\" style=\"font-size: 3rem; font-weight: 800; margin-bottom: 1rem;\">0%</div>\n            <p id=\"att-message\" style=\"font-size: 1.1rem; font-weight: 500;\"></p>\n          </div>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const inTotal = document.getElementById('att-total');\n          const inAttended = document.getElementById('att-attended');\n          const inTarget = document.getElementById('att-target');\n          const btnCalc = document.getElementById('att-calc');\n          \n          const elCurrent = document.getElementById('att-current');\n          const elMessage = document.getElementById('att-message');\n\n          btnCalc.addEventListener('click', () => {\n            const total = parseInt(inTotal.value);\n            const attended = parseInt(inAttended.value);\n            const target = parseInt(inTarget.value);\n\n            if (isNaN(total) || isNaN(attended) || isNaN(target)) {\n              if (window.showToast) window.showToast('Please fill all fields', 'error');\n              return;\n            }\n\n            if (attended > total) {\n              if (window.showToast) window.showToast('Attended classes cannot be more than total classes', 'error');\n              return;\n            }\n\n            const currentPercent = ((attended / total) * 100).toFixed(2);\n            elCurrent.textContent = currentPercent + '%';\n\n            if (currentPercent < target) {\n              elCurrent.style.color = 'var(--error, #ef4444)';\n              // Formula: (attended + req) / (total + req) = target / 100\n              // attended*100 + req*100 = target*total + target*req\n              // req*(100 - target) = target*total - attended*100\n              // req = (target*total - attended*100) / (100 - target)\n              const req = Math.ceil((target * total - attended * 100) / (100 - target));\n              elMessage.textContent = `You need to attend ${req} more consecutive class(es) to reach ${target}%.`;\n              elMessage.style.color = 'var(--error, #ef4444)';\n            } else {\n              elCurrent.style.color = 'var(--success, #10b981)';\n              // Formula: attended / (total + skip) = target / 100\n              // skip = (attended*100 / target) - total\n              const skip = Math.floor((attended * 100 / target) - total);\n              if (skip === 0) {\n                elMessage.textContent = `You are exactly on track! Do not miss the next class.`;\n                elMessage.style.color = 'var(--accent)';\n              } else {\n                elMessage.textContent = `You can safely skip the next ${skip} class(es) and remain above ${target}%.`;\n                elMessage.style.color = 'var(--success, #10b981)';\n              }\n            }\n          });\n        })();\n      ",
  "howToUse": [
    "Enter the total number of classes held so far.",
    "Enter the number of classes you have attended.",
    "Set your target attendance percentage (e.g., 75%).",
    "Click \"Calculate\" to see your current percentage and how many classes you must attend (or can skip) to meet your target."
  ],
  "faqs": [
    {
      "q": "How is the required classes calculated?",
      "a": "It mathematically determines the exact number of consecutive classes you must attend to make the ratio (Attended/Total) hit your target percentage."
    }
  ],
  "relatedSlugs": [
    "percentage-calculator",
    "cgpa-calculator"
  ],
  "features": [
    "Calculates classes needed to attend",
    "Calculates classes safe to skip",
    "Color-coded visual feedback"
  ],
  "hasDownload": false,
  "hasCopy": false,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Helps students track attendance effortlessly",
    "Calculates safe skips",
    "Prevents falling below target percentages"
  ]
},
{
  "slug": "percentage-calculator",
  "name": "Percentage Calculator",
  "category": "student",
  "categoryName": "Student Tools",
  "icon": "🎓",
  "shortDesc": "Solve percentage problems, find percent change, increase and decrease",
  "metaTitle": "Percentage Calculator - Easy Percent Change & Increase | ToolVerse",
  "metaDescription": "Free online percentage calculator. Find what X% of Y is, calculate percentage increase or decrease, and solve percent differences easily.",
  "keywords": "percentage calculator, percent change, what is x percent of y, calculate percentage",
  "toolHTML": "\n        <div class=\"grid-2\" style=\"gap: 2rem;\">\n          <!-- Mode 1: What is X% of Y -->\n          <div class=\"result-card\" style=\"padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px;\">\n            <h3 style=\"margin-bottom: 1rem;\">What is X% of Y?</h3>\n            <div style=\"display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;\">\n              <input type=\"number\" id=\"p1-x\" class=\"form-input\" style=\"width: 80px;\" placeholder=\"X\"> % of \n              <input type=\"number\" id=\"p1-y\" class=\"form-input\" style=\"width: 100px;\" placeholder=\"Y\">\n              <button id=\"p1-btn\" class=\"btn btn-primary btn-sm\">Calc</button>\n            </div>\n            <div style=\"font-weight: bold;\">Result: <span id=\"p1-res\" style=\"color: var(--accent); font-size: 1.2rem;\">-</span></div>\n          </div>\n          \n          <!-- Mode 2: X is what % of Y -->\n          <div class=\"result-card\" style=\"padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px;\">\n            <h3 style=\"margin-bottom: 1rem;\">X is what % of Y?</h3>\n            <div style=\"display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;\">\n              <input type=\"number\" id=\"p2-x\" class=\"form-input\" style=\"width: 80px;\" placeholder=\"X\"> is what % of \n              <input type=\"number\" id=\"p2-y\" class=\"form-input\" style=\"width: 100px;\" placeholder=\"Y\">\n              <button id=\"p2-btn\" class=\"btn btn-primary btn-sm\">Calc</button>\n            </div>\n            <div style=\"font-weight: bold;\">Result: <span id=\"p2-res\" style=\"color: var(--accent); font-size: 1.2rem;\">-</span></div>\n          </div>\n\n          <!-- Mode 3: Percentage Change -->\n          <div class=\"result-card\" style=\"padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px;\">\n            <h3 style=\"margin-bottom: 1rem;\">Percentage Change</h3>\n            <div style=\"display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;\">\n              From <input type=\"number\" id=\"p3-x\" class=\"form-input\" style=\"width: 80px;\" placeholder=\"Val 1\"> \n              to <input type=\"number\" id=\"p3-y\" class=\"form-input\" style=\"width: 80px;\" placeholder=\"Val 2\">\n              <button id=\"p3-btn\" class=\"btn btn-primary btn-sm\">Calc</button>\n            </div>\n            <div style=\"font-weight: bold;\">Result: <span id=\"p3-res\" style=\"color: var(--accent); font-size: 1.2rem;\">-</span></div>\n          </div>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          document.getElementById('p1-btn').addEventListener('click', () => {\n            const x = parseFloat(document.getElementById('p1-x').value);\n            const y = parseFloat(document.getElementById('p1-y').value);\n            if(isNaN(x) || isNaN(y)) return;\n            const res = (x / 100) * y;\n            document.getElementById('p1-res').textContent = res;\n          });\n\n          document.getElementById('p2-btn').addEventListener('click', () => {\n            const x = parseFloat(document.getElementById('p2-x').value);\n            const y = parseFloat(document.getElementById('p2-y').value);\n            if(isNaN(x) || isNaN(y) || y === 0) return;\n            const res = (x / y) * 100;\n            document.getElementById('p2-res').textContent = res.toFixed(2) + '%';\n          });\n\n          document.getElementById('p3-btn').addEventListener('click', () => {\n            const x = parseFloat(document.getElementById('p3-x').value);\n            const y = parseFloat(document.getElementById('p3-y').value);\n            if(isNaN(x) || isNaN(y) || x === 0) return;\n            const res = ((y - x) / Math.abs(x)) * 100;\n            const type = res >= 0 ? 'Increase' : 'Decrease';\n            document.getElementById('p3-res').textContent = `${Math.abs(res).toFixed(2)}% ${type}`;\n          });\n        })();\n      ",
  "howToUse": [
    "Choose the type of calculation you need from the available cards.",
    "Enter the values into the respective input fields.",
    "Click the \"Calc\" button next to your inputs.",
    "The calculated percentage or value will appear immediately below."
  ],
  "faqs": [
    {
      "q": "Can I use decimals?",
      "a": "Yes, you can input decimal numbers for precise calculations."
    }
  ],
  "relatedSlugs": [
    "attendance-calculator"
  ],
  "features": [
    "Find X% of Y",
    "Find what % X is of Y",
    "Calculate percentage change/difference"
  ],
  "hasDownload": false,
  "hasCopy": false,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Simplifies complex percentage math",
    "Quickly calculates increases/decreases",
    "Useful for everyday finance and study"
  ]
},
{
  "slug": "age-calculator",
  "name": "Age Calculator",
  "category": "student",
  "categoryName": "Student Tools",
  "icon": "🎓",
  "shortDesc": "Calculate your exact age in years, months, and days",
  "metaTitle": "Age Calculator - Calculate Age in Years, Months, Days | ToolVerse",
  "metaDescription": "Find out your exact age down to the day. Calculate time between two dates in years, months, weeks, and days for free.",
  "keywords": "age calculator, exact age, calculate age from date of birth, date difference calculator",
  "toolHTML": "\n        <div class=\"grid-2\">\n          <div class=\"tool-input-area\">\n            <div class=\"form-group\" style=\"margin-bottom: 1rem;\">\n              <label class=\"form-label\" for=\"age-dob\">Date of Birth:</label>\n              <input type=\"date\" id=\"age-dob\" class=\"form-input\">\n            </div>\n            <div class=\"form-group\" style=\"margin-bottom: 1.5rem;\">\n              <label class=\"form-label\" for=\"age-target\">Calculate age at this date:</label>\n              <input type=\"date\" id=\"age-target\" class=\"form-input\">\n            </div>\n            <button id=\"age-calc\" class=\"btn btn-primary\" style=\"width: 100%;\">Calculate Age</button>\n          </div>\n          <div class=\"result-card\" style=\"background: var(--bg-secondary); padding: 2rem; border-radius: 12px; text-align: center;\">\n            <h3 style=\"margin-bottom: 1rem; color: var(--text-secondary);\">Your Exact Age is</h3>\n            <div id=\"age-result-main\" style=\"font-size: 1.5rem; font-weight: 700; color: var(--accent); margin-bottom: 1rem;\">-</div>\n            <hr style=\"border-color: var(--border); margin: 1rem 0;\">\n            <div style=\"font-size: 0.9rem; color: var(--text-secondary);\">\n              Total Months: <span id=\"age-m\" style=\"color: var(--text); font-weight:bold;\">-</span><br>\n              Total Weeks: <span id=\"age-w\" style=\"color: var(--text); font-weight:bold;\">-</span><br>\n              Total Days: <span id=\"age-d\" style=\"color: var(--text); font-weight:bold;\">-</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const inDob = document.getElementById('age-dob');\n          const inTarget = document.getElementById('age-target');\n          const btnCalc = document.getElementById('age-calc');\n          \n          // Set target to today\n          const today = new Date().toISOString().split('T')[0];\n          inTarget.value = today;\n\n          btnCalc.addEventListener('click', () => {\n            if(!inDob.value || !inTarget.value) return;\n            \n            const dob = new Date(inDob.value);\n            const target = new Date(inTarget.value);\n            \n            if (dob > target) {\n              if(window.showToast) window.showToast('Date of birth cannot be after the target date', 'error');\n              return;\n            }\n\n            let years = target.getFullYear() - dob.getFullYear();\n            let months = target.getMonth() - dob.getMonth();\n            let days = target.getDate() - dob.getDate();\n\n            if (days < 0) {\n              months--;\n              const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);\n              days += prevMonth.getDate();\n            }\n            if (months < 0) {\n              years--;\n              months += 12;\n            }\n\n            document.getElementById('age-result-main').innerHTML = `${years} <small>years</small> ${months} <small>months</small> ${days} <small>days</small>`;\n\n            const diffTime = Math.abs(target - dob);\n            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));\n            \n            document.getElementById('age-m').textContent = (years * 12) + months;\n            document.getElementById('age-w').textContent = Math.floor(diffDays / 7);\n            document.getElementById('age-d').textContent = diffDays;\n          });\n        })();\n      ",
  "howToUse": [
    "Select your Date of Birth.",
    "The target date defaults to today, but you can change it to calculate age at a specific future or past date.",
    "Click \"Calculate Age\".",
    "View your exact age in years, months, and days, along with total counts."
  ],
  "faqs": [
    {
      "q": "Is this calculator accurate for leap years?",
      "a": "Yes, it automatically accounts for leap years when calculating the exact number of days."
    }
  ],
  "relatedSlugs": [
    "percentage-calculator"
  ],
  "features": [
    "Exact years, months, and days",
    "Total months breakdown",
    "Total weeks and days calculations"
  ],
  "hasDownload": false,
  "hasCopy": false,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Provides exact age down to the day",
    "Useful for precise form filling",
    "Accounts for leap years automatically"
  ]
},
{
  "slug": "bmi-calculator",
  "name": "BMI Calculator",
  "category": "student",
  "categoryName": "Student Tools",
  "icon": "🎓",
  "shortDesc": "Check your Body Mass Index (BMI) easily with standard metrics",
  "metaTitle": "BMI Calculator - Check Your Body Mass Index | ToolVerse",
  "metaDescription": "Free BMI calculator to check your Body Mass Index. Supports metric (kg/cm) and imperial (lbs/inches) units with visual health status indicators.",
  "keywords": "bmi calculator, body mass index, check bmi, ideal weight calculator",
  "toolHTML": "\n        <div class=\"grid-2\">\n          <div class=\"tool-input-area\">\n            <div class=\"form-group\" style=\"margin-bottom: 1rem;\">\n              <label class=\"form-label\">Units:</label>\n              <select id=\"bmi-units\" class=\"form-input\">\n                <option value=\"metric\">Metric (kg, cm)</option>\n                <option value=\"imperial\">Imperial (lbs, inches)</option>\n              </select>\n            </div>\n            <div class=\"form-group\" style=\"margin-bottom: 1rem;\">\n              <label class=\"form-label\" id=\"lbl-height\">Height (cm):</label>\n              <input type=\"number\" id=\"bmi-height\" class=\"form-input\" placeholder=\"e.g. 175\">\n            </div>\n            <div class=\"form-group\" style=\"margin-bottom: 1.5rem;\">\n              <label class=\"form-label\" id=\"lbl-weight\">Weight (kg):</label>\n              <input type=\"number\" id=\"bmi-weight\" class=\"form-input\" placeholder=\"e.g. 70\">\n            </div>\n            <button id=\"bmi-calc\" class=\"btn btn-primary\" style=\"width: 100%;\">Calculate BMI</button>\n          </div>\n          <div class=\"result-card\" style=\"background: var(--bg-secondary); padding: 2rem; border-radius: 12px; text-align: center;\">\n            <h3 style=\"margin-bottom: 1rem; color: var(--text-secondary);\">Your BMI</h3>\n            <div id=\"bmi-val\" style=\"font-size: 3.5rem; font-weight: 800; margin-bottom: 0.5rem;\">-</div>\n            <div id=\"bmi-status\" style=\"font-size: 1.2rem; font-weight: bold; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block;\">-</div>\n          </div>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const selUnits = document.getElementById('bmi-units');\n          const lblHeight = document.getElementById('lbl-height');\n          const lblWeight = document.getElementById('lbl-weight');\n          const inHeight = document.getElementById('bmi-height');\n          const inWeight = document.getElementById('bmi-weight');\n          const btnCalc = document.getElementById('bmi-calc');\n          \n          const elVal = document.getElementById('bmi-val');\n          const elStatus = document.getElementById('bmi-status');\n\n          selUnits.addEventListener('change', () => {\n            if (selUnits.value === 'metric') {\n              lblHeight.textContent = 'Height (cm):';\n              lblWeight.textContent = 'Weight (kg):';\n            } else {\n              lblHeight.textContent = 'Height (inches):';\n              lblWeight.textContent = 'Weight (lbs):';\n            }\n            inHeight.value = '';\n            inWeight.value = '';\n          });\n\n          btnCalc.addEventListener('click', () => {\n            const h = parseFloat(inHeight.value);\n            const w = parseFloat(inWeight.value);\n            \n            if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;\n\n            let bmi = 0;\n            if (selUnits.value === 'metric') {\n              const hMeters = h / 100;\n              bmi = w / (hMeters * hMeters);\n            } else {\n              bmi = (w / (h * h)) * 703;\n            }\n\n            elVal.textContent = bmi.toFixed(1);\n\n            let status = '';\n            let color = '';\n            let bgColor = '';\n            \n            if (bmi < 18.5) {\n              status = 'Underweight';\n              color = '#eab308'; // yellow\n              bgColor = 'rgba(234, 179, 8, 0.1)';\n            } else if (bmi < 25) {\n              status = 'Normal Weight';\n              color = '#10b981'; // green\n              bgColor = 'rgba(16, 185, 129, 0.1)';\n            } else if (bmi < 30) {\n              status = 'Overweight';\n              color = '#f97316'; // orange\n              bgColor = 'rgba(249, 115, 22, 0.1)';\n            } else {\n              status = 'Obese';\n              color = '#ef4444'; // red\n              bgColor = 'rgba(239, 68, 68, 0.1)';\n            }\n\n            elStatus.textContent = status;\n            elStatus.style.color = color;\n            elStatus.style.backgroundColor = bgColor;\n            elVal.style.color = color;\n          });\n        })();\n      ",
  "howToUse": [
    "Select your preferred measurement units (Metric or Imperial).",
    "Enter your height in the specified unit.",
    "Enter your weight in the specified unit.",
    "Click \"Calculate BMI\".",
    "View your BMI score and the corresponding health category."
  ],
  "faqs": [
    {
      "q": "What is a normal BMI?",
      "a": "A normal, healthy BMI is generally considered to be between 18.5 and 24.9."
    },
    {
      "q": "Is BMI accurate for everyone?",
      "a": "BMI is a general guideline. It may not be accurate for athletes with high muscle mass, pregnant women, or the elderly."
    }
  ],
  "relatedSlugs": [
    "age-calculator"
  ],
  "features": [
    "Metric and Imperial support",
    "Instant calculation",
    "Color-coded health status category"
  ],
  "hasDownload": false,
  "hasCopy": false,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Instant health check metric",
    "Supports both metric and imperial units",
    "Visual color indicators for easy reading"
  ]
},
];
