module.exports = [
{
  "slug": "resize-image",
  "name": "Image Resizer",
  "category": "image",
  "categoryName": "Image Tools",
  "icon": "🖼️",
  "shortDesc": "Resize images to exact pixel dimensions securely in your browser",
  "metaTitle": "Image Resizer - Resize Images Online for Free | ToolVerse",
  "metaDescription": "Free online image resizer. Change image dimensions quickly and securely right in your browser. No upload to server required.",
  "keywords": "image resizer, resize image online, change image dimensions, photo resizer, client-side image editor",
  "toolHTML": "\n        <div class=\"tool-input-area\" style=\"margin-bottom: 2rem;\">\n          <div id=\"img-dropzone\" class=\"drop-zone\" style=\"border: 2px dashed var(--border); padding: 3rem; text-align: center; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;\">\n            <div style=\"font-size: 2rem; margin-bottom: 1rem;\">📁</div>\n            <p style=\"margin-bottom: 0.5rem; font-weight: 500;\">Drag & Drop Image Here</p>\n            <p style=\"font-size: 0.9rem; color: var(--text-secondary);\">or click to browse (JPG, PNG, WebP)</p>\n            <input type=\"file\" id=\"img-input\" accept=\"image/png, image/jpeg, image/webp\" style=\"display: none;\">\n          </div>\n        </div>\n\n        <div id=\"img-workspace\" style=\"display: none;\">\n          <div class=\"grid-2\" style=\"gap: 2rem; margin-bottom: 2rem;\">\n            <div>\n              <h3 style=\"margin-bottom: 1rem;\">Preview</h3>\n              <div style=\"background: var(--bg-secondary); border-radius: 8px; padding: 1rem; text-align: center;\">\n                <img id=\"img-preview\" style=\"max-width: 100%; max-height: 300px; border-radius: 4px; object-fit: contain;\">\n                <p style=\"margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);\">Original: <span id=\"img-orig-dim\">-</span></p>\n              </div>\n            </div>\n            \n            <div>\n              <h3 style=\"margin-bottom: 1rem;\">Settings</h3>\n              <div class=\"form-group\" style=\"margin-bottom: 1rem;\">\n                <label class=\"form-label\" for=\"img-w\">Width (px):</label>\n                <input type=\"number\" id=\"img-w\" class=\"form-input\">\n              </div>\n              <div class=\"form-group\" style=\"margin-bottom: 1rem;\">\n                <label class=\"form-label\" for=\"img-h\">Height (px):</label>\n                <input type=\"number\" id=\"img-h\" class=\"form-input\">\n              </div>\n              <div class=\"form-group\" style=\"margin-bottom: 1.5rem;\">\n                <label style=\"display: flex; align-items: center; gap: 0.5rem; cursor: pointer;\">\n                  <input type=\"checkbox\" id=\"img-lock\" checked> Lock Aspect Ratio\n                </label>\n              </div>\n              <button id=\"img-download\" class=\"btn btn-primary\" style=\"width: 100%;\">Resize & Download</button>\n            </div>\n          </div>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const dropzone = document.getElementById('img-dropzone');\n          const fileInput = document.getElementById('img-input');\n          const workspace = document.getElementById('img-workspace');\n          const preview = document.getElementById('img-preview');\n          const origDim = document.getElementById('img-orig-dim');\n          \n          const inW = document.getElementById('img-w');\n          const inH = document.getElementById('img-h');\n          const chkLock = document.getElementById('img-lock');\n          const btnDownload = document.getElementById('img-download');\n          \n          let currentImage = null;\n          let origAspect = 1;\n          let originalFileName = 'image';\n          let originalFileType = 'image/jpeg';\n\n          dropzone.addEventListener('click', () => fileInput.click());\n          \n          dropzone.addEventListener('dragover', (e) => {\n            e.preventDefault();\n            dropzone.style.borderColor = 'var(--accent)';\n            dropzone.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';\n          });\n          dropzone.addEventListener('dragleave', (e) => {\n            e.preventDefault();\n            dropzone.style.borderColor = 'var(--border)';\n            dropzone.style.backgroundColor = 'transparent';\n          });\n          dropzone.addEventListener('drop', (e) => {\n            e.preventDefault();\n            dropzone.style.borderColor = 'var(--border)';\n            dropzone.style.backgroundColor = 'transparent';\n            if (e.dataTransfer.files && e.dataTransfer.files[0]) {\n              handleFile(e.dataTransfer.files[0]);\n            }\n          });\n          \n          fileInput.addEventListener('change', (e) => {\n            if (e.target.files && e.target.files[0]) {\n              handleFile(e.target.files[0]);\n            }\n          });\n\n          function handleFile(file) {\n            if (!file.type.startsWith('image/')) {\n              if (window.showToast) window.showToast('Please select an image file', 'error');\n              return;\n            }\n            \n            originalFileName = file.name.split('.')[0];\n            originalFileType = file.type;\n\n            const reader = new FileReader();\n            reader.onload = (e) => {\n              const img = new Image();\n              img.onload = () => {\n                currentImage = img;\n                origAspect = img.width / img.height;\n                \n                preview.src = img.src;\n                origDim.textContent = `${img.width}x${img.height}px`;\n                \n                inW.value = img.width;\n                inH.value = img.height;\n                \n                workspace.style.display = 'block';\n                dropzone.style.display = 'none';\n              };\n              img.src = e.target.result;\n            };\n            reader.readAsDataURL(file);\n          }\n\n          inW.addEventListener('input', () => {\n            if (chkLock.checked && inW.value) {\n              inH.value = Math.round(inW.value / origAspect);\n            }\n          });\n\n          inH.addEventListener('input', () => {\n            if (chkLock.checked && inH.value) {\n              inW.value = Math.round(inH.value * origAspect);\n            }\n          });\n\n          btnDownload.addEventListener('click', () => {\n            if (!currentImage) return;\n            \n            const w = parseInt(inW.value);\n            const h = parseInt(inH.value);\n            \n            if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {\n              if (window.showToast) window.showToast('Invalid dimensions', 'error');\n              return;\n            }\n\n            const canvas = document.createElement('canvas');\n            canvas.width = w;\n            canvas.height = h;\n            const ctx = canvas.getContext('2d');\n            \n            // Draw image resized\n            ctx.drawImage(currentImage, 0, 0, w, h);\n            \n            canvas.toBlob((blob) => {\n              const url = URL.createObjectURL(blob);\n              const a = document.createElement('a');\n              a.href = url;\n              // Determine extension\n              let ext = '.jpg';\n              if (originalFileType === 'image/png') ext = '.png';\n              else if (originalFileType === 'image/webp') ext = '.webp';\n              \n              a.download = `${originalFileName}_resized${ext}`;\n              document.body.appendChild(a);\n              a.click();\n              document.body.removeChild(a);\n              URL.revokeObjectURL(url);\n            }, originalFileType, 0.9);\n          });\n        })();\n      ",
  "howToUse": [
    "Drag and drop an image into the dashed upload area, or click to browse files.",
    "View the original dimensions of your uploaded image.",
    "Enter the new Width or Height. Keep \"Lock Aspect Ratio\" checked to avoid distortion.",
    "Click \"Resize & Download\" to save the resized image."
  ],
  "faqs": [
    {
      "q": "Is my image uploaded to your server?",
      "a": "No, all image processing happens securely inside your browser. We never see or store your files."
    },
    {
      "q": "Does this tool maintain image quality?",
      "a": "Yes, it uses native browser Canvas APIs which preserve high quality while changing dimensions."
    }
  ],
  "relatedSlugs": [
    "jpg-to-png"
  ],
  "features": [
    "Client-side processing (100% Private)",
    "Aspect ratio locking",
    "Drag & drop support"
  ],
  "hasDownload": true,
  "hasCopy": false,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Fast client-side processing without uploads",
    "Maintains original aspect ratio easily",
    "Perfect for meeting image size requirements"
  ]
},
{
  "slug": "jpg-to-png",
  "name": "JPG to PNG Converter",
  "category": "image",
  "categoryName": "Image Tools",
  "icon": "🖼️",
  "shortDesc": "Convert JPEG images to transparent PNG format quickly",
  "metaTitle": "JPG to PNG Converter - Free Image Format Tool | ToolVerse",
  "metaDescription": "Convert JPG/JPEG files to PNG format instantly. Secure, browser-based conversion with no limits and no data uploads.",
  "keywords": "jpg to png, convert jpeg to png, image format converter, free image converter",
  "toolHTML": "\n        <div class=\"tool-input-area\" style=\"margin-bottom: 2rem;\">\n          <div id=\"jp-dropzone\" class=\"drop-zone\" style=\"border: 2px dashed var(--border); padding: 3rem; text-align: center; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;\">\n            <div style=\"font-size: 2rem; margin-bottom: 1rem;\">🔄</div>\n            <p style=\"margin-bottom: 0.5rem; font-weight: 500;\">Upload JPG/JPEG File</p>\n            <p style=\"font-size: 0.9rem; color: var(--text-secondary);\">Drag & Drop or Click (No Upload - Processed Locally)</p>\n            <input type=\"file\" id=\"jp-input\" accept=\"image/jpeg, .jpg, .jpeg\" style=\"display: none;\">\n          </div>\n        </div>\n        <div id=\"jp-workspace\" style=\"display: none; text-align: center; padding: 2rem; background: var(--bg-secondary); border-radius: 12px;\">\n          <img id=\"jp-preview\" style=\"max-width: 100%; max-height: 300px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 1.5rem;\">\n          <h3 id=\"jp-filename\" style=\"margin-bottom: 1rem;\">image.jpg</h3>\n          <button id=\"jp-convert\" class=\"btn btn-primary btn-lg\">Convert to PNG & Download</button>\n          <button id=\"jp-reset\" class=\"btn btn-ghost\" style=\"margin-left: 1rem;\">Convert Another</button>\n        </div>\n        <div class=\"tool-footer\" style=\"margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;\">\n          <button class=\"btn btn-secondary btn-sm\" onclick=\"alert('Share feature coming soon!')\">🔗 Share</button>\n          <button class=\"btn btn-ghost btn-sm\" onclick=\"alert('Report Issue feature coming soon!')\">🚩 Report Issue</button>\n        </div>\n      ",
  "toolScript": "\n        (function(){\n          const dropzone = document.getElementById('jp-dropzone');\n          const fileInput = document.getElementById('jp-input');\n          const workspace = document.getElementById('jp-workspace');\n          const preview = document.getElementById('jp-preview');\n          const filename = document.getElementById('jp-filename');\n          const btnConvert = document.getElementById('jp-convert');\n          const btnReset = document.getElementById('jp-reset');\n          \n          let currentImage = null;\n          let originalName = '';\n\n          dropzone.addEventListener('click', () => fileInput.click());\n          \n          dropzone.addEventListener('dragover', (e) => {\n            e.preventDefault();\n            dropzone.style.borderColor = 'var(--accent)';\n          });\n          dropzone.addEventListener('dragleave', (e) => {\n            e.preventDefault();\n            dropzone.style.borderColor = 'var(--border)';\n          });\n          dropzone.addEventListener('drop', (e) => {\n            e.preventDefault();\n            dropzone.style.borderColor = 'var(--border)';\n            if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);\n          });\n          \n          fileInput.addEventListener('change', (e) => {\n            if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);\n          });\n\n          function handleFile(file) {\n            if (file.type !== 'image/jpeg') {\n              if (window.showToast) window.showToast('Please select a JPG/JPEG file', 'error');\n              return;\n            }\n            \n            originalName = file.name.split('.')[0];\n            filename.textContent = file.name;\n\n            const reader = new FileReader();\n            reader.onload = (e) => {\n              const img = new Image();\n              img.onload = () => {\n                currentImage = img;\n                preview.src = img.src;\n                workspace.style.display = 'block';\n                dropzone.style.display = 'none';\n              };\n              img.src = e.target.result;\n            };\n            reader.readAsDataURL(file);\n          }\n\n          btnConvert.addEventListener('click', () => {\n            if (!currentImage) return;\n            \n            const canvas = document.createElement('canvas');\n            canvas.width = currentImage.width;\n            canvas.height = currentImage.height;\n            const ctx = canvas.getContext('2d');\n            ctx.drawImage(currentImage, 0, 0);\n            \n            canvas.toBlob((blob) => {\n              const url = URL.createObjectURL(blob);\n              const a = document.createElement('a');\n              a.href = url;\n              a.download = `${originalName}.png`;\n              document.body.appendChild(a);\n              a.click();\n              document.body.removeChild(a);\n              URL.revokeObjectURL(url);\n              \n              if (window.showToast) window.showToast('Successfully converted to PNG', 'success');\n            }, 'image/png');\n          });\n\n          btnReset.addEventListener('click', () => {\n            currentImage = null;\n            fileInput.value = '';\n            workspace.style.display = 'none';\n            dropzone.style.display = 'block';\n          });\n        })();\n      ",
  "howToUse": [
    "Click the upload area or drag and drop a JPG or JPEG file.",
    "Preview the uploaded image to verify it is correct.",
    "Click the \"Convert to PNG & Download\" button.",
    "The converted file will automatically download to your device."
  ],
  "faqs": [
    {
      "q": "Is there a file size limit?",
      "a": "Since processing is done inside your browser, the limit depends on your device's memory, but generally up to 50MB works perfectly."
    },
    {
      "q": "Does it upload to a server?",
      "a": "No, all format conversion uses native browser technologies, ensuring complete privacy."
    }
  ],
  "relatedSlugs": [
    "resize-image"
  ],
  "features": [
    "Browser-based instant conversion",
    "No upload needed",
    "Preserves original resolution"
  ],
  "hasDownload": true,
  "hasCopy": false,
  "lastUpdated": "2023-10-01",
  "benefits": [
    "Converts formats securely in-browser",
    "Requires no software installation",
    "Preserves image quality perfectly"
  ]
},
];
