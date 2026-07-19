import json
import os

tools_data = [
    {
        "slug": "compress-image",
        "title": "Compress Image",
        "description": "Reduce image file size instantly with an adjustable quality slider. Great for optimizing web performance and saving storage space.",
        "category": "Image Tools",
        "keywords": ["compress image", "image optimizer", "reduce image size", "jpeg compressor"],
        "features": ["Adjustable quality slider", "Real-time preview", "Before/After size comparison", "Fast local processing"],
        "benefits": ["Save bandwidth", "Improve SEO with faster images", "Free and unlimited", "Works offline"],
        "faqs": [{"question": "Does this reduce quality?", "answer": "Yes, compression inherently reduces quality. You can adjust the slider to find the perfect balance between quality and file size."}],
        "relatedSlugs": ["png-to-jpg", "webp-converter"],
        "html_controls": '<label class="form-label">Quality (1-100): <span id="qualityVal_{tid}">80</span></label><input type="range" id="quality_{tid}" class="form-input" min="1" max="100" value="80" style="width:100%;">',
        "js_logic": """const qSlider = document.getElementById('quality_' + tid);
const qVal = document.getElementById('qualityVal_' + tid);
qSlider.addEventListener('input', () => { qVal.textContent = qSlider.value; processImage(); });
initTool = function() { processImage(); }
function processImage() {
    const canvas = document.createElement('canvas');
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImage, 0, 0);
    const q = parseInt(qSlider.value) / 100;
    canvas.toBlob((b) => updateResult(b, 'jpg', 'image/jpeg'), 'image/jpeg', q);
}"""
    },
    {
        "slug": "crop-image",
        "title": "Crop Image",
        "description": "Crop your images online for free. Adjust aspect ratios or crop freely to get the perfect frame.",
        "category": "Image Tools",
        "keywords": ["crop image", "image cropper", "photo cutter", "trim image"],
        "features": ["Free-form cropping", "Lock aspect ratio (1:1)", "Intuitive drag interface", "Instant preview"],
        "benefits": ["Remove unwanted edges", "Create perfect profile pictures", "No upload to server required"],
        "faqs": [{"question": "Can I lock the aspect ratio?", "answer": "Yes, use the 'Lock Aspect Ratio' button to keep it perfectly square."}],
        "relatedSlugs": ["rotate-image", "flip-image"],
        "html_controls": '<button class="btn btn-primary" id="btnCrop_{tid}">Apply Crop</button> <button class="btn btn-secondary" id="btnLock_{tid}">Lock Aspect Ratio (1:1)</button>',
        "js_logic": """let cropper = null;
initTool = function() {
    if(!window.Cropper) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js';
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css';
        document.head.appendChild(link);
        document.head.appendChild(script);
        script.onload = startCropper;
    } else {
        startCropper();
    }
}
function startCropper() {
    if(cropper) cropper.destroy();
    cropper = new Cropper(imgBefore, { viewMode: 1, autoCropArea: 1 });
}
resetTool = function() {
    if(cropper) { cropper.destroy(); cropper = null; }
}
document.getElementById('btnCrop_' + tid).addEventListener('click', () => {
    if(!cropper) return;
    cropper.getCroppedCanvas().toBlob(b => updateResult(b, 'png', 'image/png'), 'image/png');
});
let locked = false;
document.getElementById('btnLock_' + tid).addEventListener('click', (e) => {
    locked = !locked;
    if(cropper) cropper.setAspectRatio(locked ? 1 : NaN);
    e.target.textContent = locked ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio (1:1)';
});"""
    },
    {
        "slug": "png-to-jpg",
        "title": "PNG to JPG Converter",
        "description": "Convert PNG images to JPG format instantly. Transparent backgrounds will be automatically converted to white.",
        "category": "Image Tools",
        "keywords": ["png to jpg", "convert png", "image converter", "transparent to white"],
        "features": ["Instant conversion", "Fills transparency with white", "High quality export"],
        "benefits": ["Reduce file size", "Make images compatible with older software", "Fast processing"],
        "faqs": [{"question": "What happens to the transparent background?", "answer": "It is automatically converted to a solid white background before saving as JPG."}],
        "relatedSlugs": ["webp-converter", "compress-image"],
        "html_controls": '<p>Converting to JPG with white background...</p>',
        "js_logic": """initTool = function() { processImage(); }
function processImage() {
    const canvas = document.createElement('canvas');
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0);
    canvas.toBlob(b => updateResult(b, 'jpg', 'image/jpeg'), 'image/jpeg', 1.0);
}"""
    },
    {
        "slug": "webp-converter",
        "title": "WebP Converter",
        "description": "Convert images to the modern WebP format for superior compression and web performance.",
        "category": "Image Tools",
        "keywords": ["webp converter", "convert to webp", "image to webp", "modern image format"],
        "features": ["High-efficiency WebP export", "Works entirely in your browser", "Fast processing"],
        "benefits": ["Better SEO performance", "Significantly smaller file sizes", "Maintain high quality"],
        "faqs": [{"question": "Why use WebP?", "answer": "WebP provides superior lossless and lossy compression for images on the web compared to PNG and JPEG."}],
        "relatedSlugs": ["png-to-jpg", "compress-image"],
        "html_controls": '<p>Converting to WebP format...</p>',
        "js_logic": """initTool = function() { processImage(); }
function processImage() {
    const canvas = document.createElement('canvas');
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImage, 0, 0);
    canvas.toBlob(b => updateResult(b, 'webp', 'image/webp'), 'image/webp', 0.9);
}"""
    },
    {
        "slug": "rotate-image",
        "title": "Rotate Image",
        "description": "Rotate your images left or right by 90 degrees instantly.",
        "category": "Image Tools",
        "keywords": ["rotate image", "turn photo", "image rotator", "90 degrees"],
        "features": ["90-degree clockwise & counter-clockwise rotation", "Instant preview", "No quality loss"],
        "benefits": ["Fix sideways photos", "Quick and easy to use", "Privacy focused local processing"],
        "faqs": [{"question": "Can I rotate by custom angles?", "answer": "Currently, this tool supports 90-degree increments."}],
        "relatedSlugs": ["flip-image", "crop-image"],
        "html_controls": '<button class="btn btn-secondary" id="rotLeft_{tid}">Rotate Left 90°</button> <button class="btn btn-secondary" id="rotRight_{tid}">Rotate Right 90°</button>',
        "js_logic": """let rot = 0;
initTool = function() { rot = 0; processImage(); }
document.getElementById('rotLeft_' + tid).addEventListener('click', () => { rot -= 90; processImage(); });
document.getElementById('rotRight_' + tid).addEventListener('click', () => { rot += 90; processImage(); });
function processImage() {
    const canvas = document.createElement('canvas');
    const r = (rot % 360 + 360) % 360;
    if (r === 90 || r === 270) {
        canvas.width = currentImage.height;
        canvas.height = currentImage.width;
    } else {
        canvas.width = currentImage.width;
        canvas.height = currentImage.height;
    }
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(r * Math.PI / 180);
    ctx.drawImage(currentImage, -currentImage.width/2, -currentImage.height/2);
    canvas.toBlob(b => updateResult(b, 'png', 'image/png'), 'image/png');
}"""
    },
    {
        "slug": "flip-image",
        "title": "Flip Image",
        "description": "Mirror your images horizontally or vertically with a single click.",
        "category": "Image Tools",
        "keywords": ["flip image", "mirror image", "horizontal flip", "vertical flip"],
        "features": ["Horizontal flipping", "Vertical flipping", "Instant preview"],
        "benefits": ["Fix mirrored selfies", "Create symmetric designs", "Works instantly"],
        "faqs": [{"question": "Is there quality loss?", "answer": "No, flipping preserves 100% of the original image quality."}],
        "relatedSlugs": ["rotate-image", "crop-image"],
        "html_controls": '<button class="btn btn-secondary" id="flipH_{tid}">Flip Horizontal</button> <button class="btn btn-secondary" id="flipV_{tid}">Flip Vertical</button>',
        "js_logic": """let scaleX = 1, scaleY = 1;
initTool = function() { scaleX = 1; scaleY = 1; processImage(); }
document.getElementById('flipH_' + tid).addEventListener('click', () => { scaleX *= -1; processImage(); });
document.getElementById('flipV_' + tid).addEventListener('click', () => { scaleY *= -1; processImage(); });
function processImage() {
    const canvas = document.createElement('canvas');
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext('2d');
    ctx.translate(scaleX < 0 ? canvas.width : 0, scaleY < 0 ? canvas.height : 0);
    ctx.scale(scaleX, scaleY);
    ctx.drawImage(currentImage, 0, 0);
    canvas.toBlob(b => updateResult(b, 'png', 'image/png'), 'image/png');
}"""
    },
    {
        "slug": "blur-image",
        "title": "Blur Image",
        "description": "Apply a customizable blur effect to your images for creative purposes or to hide sensitive information.",
        "category": "Image Tools",
        "keywords": ["blur image", "censor image", "gaussian blur", "blur photo"],
        "features": ["Adjustable blur intensity (0-50px)", "Real-time preview", "Smooth Gaussian blur"],
        "benefits": ["Hide sensitive details", "Create aesthetic backgrounds", "Easy to use slider"],
        "faqs": [{"question": "Can I blur only a part of the image?", "answer": "This tool blurs the entire image. To blur specific parts, you would need an advanced editor."}],
        "relatedSlugs": ["image-watermark", "bg-color-changer"],
        "html_controls": '<label class="form-label">Blur Intensity (<span id="blurVal_{tid}">5</span>px)</label><input type="range" id="blur_{tid}" class="form-input" min="0" max="50" value="5" style="width:100%;">',
        "js_logic": """const blurSlider = document.getElementById('blur_' + tid);
const blurVal = document.getElementById('blurVal_' + tid);
blurSlider.addEventListener('input', () => { blurVal.textContent = blurSlider.value; processImage(); });
initTool = function() { processImage(); }
function processImage() {
    const canvas = document.createElement('canvas');
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext('2d');
    ctx.filter = `blur(${blurSlider.value}px)`;
    ctx.drawImage(currentImage, 0, 0);
    canvas.toBlob(b => updateResult(b, 'png', 'image/png'), 'image/png');
}"""
    },
    {
        "slug": "bg-color-changer",
        "title": "Background Color Changer",
        "description": "Replace transparent backgrounds in PNG images with solid colors or beautiful gradients.",
        "category": "Image Tools",
        "keywords": ["background color changer", "add background to png", "transparent to color"],
        "features": ["Solid color picker", "Linear gradient creator", "Preserves foreground image"],
        "benefits": ["Make logos pop", "Create social media posts", "Instant processing"],
        "faqs": [{"question": "Does this remove backgrounds?", "answer": "No, it replaces existing transparent backgrounds with a color or gradient."}],
        "relatedSlugs": ["png-to-jpg", "image-watermark"],
        "html_controls": """<div style="display:flex; gap:1rem; align-items:center; flex-wrap: wrap;">
    <label class="form-label" style="margin:0;">Type:</label>
    <select id="bgType_{tid}" class="form-input" style="width:auto;">
        <option value="color">Solid Color</option>
        <option value="gradient">Gradient</option>
    </select>
    <div id="colWrap_{tid}">
        <input type="color" id="bgColor_{tid}" value="#ff0000" class="form-input" style="width:60px;height:40px;padding:0;">
    </div>
    <div id="gradWrap_{tid}" style="display:none; gap:0.5rem; align-items:center;">
        <input type="color" id="gradC1_{tid}" value="#ff0000" class="form-input" style="width:60px;height:40px;padding:0;">
        <span>to</span>
        <input type="color" id="gradC2_{tid}" value="#0000ff" class="form-input" style="width:60px;height:40px;padding:0;">
    </div>
</div>""",
        "js_logic": """const bgType = document.getElementById('bgType_' + tid);
const colWrap = document.getElementById('colWrap_' + tid);
const gradWrap = document.getElementById('gradWrap_' + tid);
const bgColor = document.getElementById('bgColor_' + tid);
const gradC1 = document.getElementById('gradC1_' + tid);
const gradC2 = document.getElementById('gradC2_' + tid);

[bgType, bgColor, gradC1, gradC2].forEach(el => el.addEventListener('input', () => {
    if(bgType.value === 'gradient') { colWrap.style.display='none'; gradWrap.style.display='flex'; }
    else { colWrap.style.display='block'; gradWrap.style.display='none'; }
    processImage();
}));
initTool = function() { processImage(); }
function processImage() {
    const canvas = document.createElement('canvas');
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext('2d');
    
    if(bgType.value === 'color') {
        ctx.fillStyle = bgColor.value;
    } else {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, gradC1.value);
        grad.addColorStop(1, gradC2.value);
        ctx.fillStyle = grad;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0);
    canvas.toBlob(b => updateResult(b, 'jpg', 'image/jpeg'), 'image/jpeg', 0.95);
}"""
    },
    {
        "slug": "image-watermark",
        "title": "Image Watermark",
        "description": "Add a custom text watermark to your images to protect your copyright and brand.",
        "category": "Image Tools",
        "keywords": ["image watermark", "add watermark", "copyright photo", "text on image"],
        "features": ["Customizable text", "Adjustable color and opacity", "5 positioning options"],
        "benefits": ["Protect your intellectual property", "Brand your content", "Free to use"],
        "faqs": [{"question": "Can I use an image as a watermark?", "answer": "Currently, this tool supports text watermarks."}],
        "relatedSlugs": ["blur-image", "crop-image"],
        "html_controls": """<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
    <div><label class="form-label">Text:</label><input type="text" id="wmText_{tid}" value="Copyright" class="form-input"></div>
    <div><label class="form-label">Color:</label><input type="color" id="wmColor_{tid}" value="#ffffff" class="form-input" style="height:40px;padding:0;width:100%;"></div>
    <div><label class="form-label">Opacity (<span id="wmOpVal_{tid}">0.5</span>):</label><input type="range" id="wmOp_{tid}" min="0" max="1" step="0.1" value="0.5" class="form-input" style="width:100%;"></div>
    <div><label class="form-label">Position:</label><select id="wmPos_{tid}" class="form-input" style="width:100%;"><option value="bottom-right">Bottom Right</option><option value="bottom-left">Bottom Left</option><option value="top-right">Top Right</option><option value="top-left">Top Left</option><option value="center">Center</option></select></div>
</div>""",
        "js_logic": """const wmT = document.getElementById('wmText_' + tid);
const wmC = document.getElementById('wmColor_' + tid);
const wmO = document.getElementById('wmOp_' + tid);
const wmOV = document.getElementById('wmOpVal_' + tid);
const wmP = document.getElementById('wmPos_' + tid);

[wmT, wmC, wmO, wmP].forEach(el => el.addEventListener('input', () => {
    wmOV.textContent = wmO.value;
    processImage();
}));
initTool = function() { processImage(); }
function processImage() {
    const canvas = document.createElement('canvas');
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(currentImage, 0, 0);
    ctx.globalAlpha = parseFloat(wmO.value);
    ctx.fillStyle = wmC.value;
    
    const fontSize = Math.max(20, canvas.width / 20);
    ctx.font = `bold ${fontSize}px Arial`;
    
    const text = wmT.value;
    const metrics = ctx.measureText(text);
    const txtW = metrics.width;
    const txtH = fontSize;
    const padding = fontSize / 2;
    
    let x = 0, y = 0;
    const pos = wmP.value;
    if(pos.includes('left')) x = padding;
    else if(pos.includes('right')) x = canvas.width - txtW - padding;
    else x = canvas.width/2 - txtW/2;
    
    if(pos.includes('top')) y = padding + txtH;
    else if(pos.includes('bottom')) y = canvas.height - padding;
    else y = canvas.height/2 + txtH/2;
    
    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1.0;
    
    canvas.toBlob(b => updateResult(b, 'png', 'image/png'), 'image/png');
}"""
    },
    {
        "slug": "ico-generator",
        "title": "ICO Generator",
        "description": "Create standard .ICO favicon files from your images, or download a ZIP of standard PNG sizes.",
        "category": "Image Tools",
        "keywords": ["ico generator", "favicon creator", "generate ico", "png to ico"],
        "features": ["Generates standard sizes: 16, 32, 48, 64, 128, 256", "Outputs true .ICO binary file", "Option to download as PNG ZIP package"],
        "benefits": ["Perfect for web developers", "All-in-one favicon solution", "Completely local processing"],
        "faqs": [{"question": "What sizes are included?", "answer": "The generated files include 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256 pixel dimensions."}],
        "relatedSlugs": ["webp-converter", "compress-image"],
        "html_controls": '<p>Generates 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256 sizes.</p>',
        "js_logic": """
document.getElementById('btnDownload_' + tid).style.display = 'none';

const extra = document.getElementById('extraActions_' + tid);
extra.innerHTML = `<button class="btn btn-primary" id="btnIco_${tid}">⬇️ Generate .ICO File</button> <button class="btn btn-secondary" id="btnZip_${tid}">📦 Generate ZIP (PNGs)</button>`;

async function createICO(canvases) {
    const images = [];
    for(let c of canvases) {
        const blob = await new Promise(r => c.canvas.toBlob(r, 'image/png'));
        const arrayBuffer = await blob.arrayBuffer();
        images.push({ width: c.width, height: c.height, size: blob.size, buffer: arrayBuffer });
    }
    const totalSize = 6 + (images.length * 16) + images.reduce((sum, img) => sum + img.size, 0);
    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);
    const u8 = new Uint8Array(buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, images.length, true);
    let offset = 6 + (images.length * 16);
    images.forEach((img, i) => {
        const dir = 6 + (i * 16);
        view.setUint8(dir, img.width >= 256 ? 0 : img.width);
        view.setUint8(dir + 1, img.height >= 256 ? 0 : img.height);
        view.setUint8(dir + 2, 0); view.setUint8(dir + 3, 0);
        view.setUint16(dir + 4, 1, true); view.setUint16(dir + 6, 32, true);
        view.setUint32(dir + 8, img.size, true); view.setUint32(dir + 12, offset, true);
        u8.set(new Uint8Array(img.buffer), offset);
        offset += img.size;
    });
    return new Blob([buffer], { type: 'image/x-icon' });
}

function getSizedCanvases() {
    const sizes = [16, 32, 48, 64, 128, 256];
    return sizes.map(size => {
        const cvs = document.createElement('canvas');
        cvs.width = size; cvs.height = size;
        const ctx = cvs.getContext('2d');
        const dim = Math.min(currentImage.width, currentImage.height);
        const sx = (currentImage.width - dim) / 2;
        const sy = (currentImage.height - dim) / 2;
        ctx.drawImage(currentImage, sx, sy, dim, dim, 0, 0, size, size);
        return { width: size, height: size, canvas: cvs };
    });
}

initTool = function() { processImage(); }

function processImage() {
    const cvs = getSizedCanvases().pop().canvas;
    cvs.toBlob(b => updateResult(b, 'png', 'image/png'), 'image/png');
}

document.getElementById('btnIco_' + tid).addEventListener('click', async () => {
    if(!currentImage.src) return;
    const btn = document.getElementById('btnIco_' + tid);
    const orig = btn.innerHTML;
    btn.innerHTML = 'Generating...';
    btn.disabled = true;
    try {
        const icoBlob = await createICO(getSizedCanvases());
        const url = URL.createObjectURL(icoBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'favicon.ico';
        a.click();
        URL.revokeObjectURL(url);
    } finally {
        btn.innerHTML = orig;
        btn.disabled = false;
    }
});

document.getElementById('btnZip_' + tid).addEventListener('click', async () => {
    if(!currentImage.src) return;
    const btn = document.getElementById('btnZip_' + tid);
    const orig = btn.innerHTML;
    btn.innerHTML = 'Generating...';
    btn.disabled = true;
    
    if(typeof JSZip === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        document.head.appendChild(script);
        script.onload = () => createZip(btn, orig);
    } else {
        createZip(btn, orig);
    }
});

async function createZip(btn, orig) {
    try {
        const zip = new JSZip();
        const canvases = getSizedCanvases();
        for(let c of canvases) {
            const blob = await new Promise(r => c.canvas.toBlob(r, 'image/png'));
            zip.file(`icon-${c.width}x${c.height}.png`, blob);
        }
        const content = await zip.generateAsync({type:'blob'});
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'icons.zip';
        a.click();
        URL.revokeObjectURL(url);
    } finally {
        btn.innerHTML = orig;
        btn.disabled = false;
    }
}"""
    }
]

out = []
for t in tools_data:
    tid = t["slug"].replace("-", "_")
    
    html = f'''<div class="tool-container">
    <div class="drop-zone" id="dropZone_{tid}" style="border: 2px dashed var(--border); padding: 2rem; text-align: center; cursor: pointer; border-radius: 8px;">
        <p>Drag & Drop image here, paste from clipboard (Ctrl+V), or click to upload</p>
        <input type="file" id="fileInput_{tid}" accept="image/*" style="display: none;">
    </div>
    <div class="controls-section" id="controls_{tid}" style="display: none; margin: 1.5rem 0; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
       {t["html_controls"]}
    </div>
    <div class="preview-section" id="preview_{tid}" style="display: none; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
        <div class="before-img" style="flex: 1; min-width: 300px;">
            <h4>Original (<span id="beforeSize_{tid}"></span>)</h4>
            <img id="imgBefore_{tid}" style="max-width: 100%; border: 1px solid var(--border); border-radius: 4px;">
        </div>
        <div class="after-img" style="flex: 1; min-width: 300px;">
            <h4>Processed (<span id="afterSize_{tid}"></span>)</h4>
            <img id="imgAfter_{tid}" style="max-width: 100%; border: 1px solid var(--border); border-radius: 4px;">
        </div>
    </div>
    <div class="actions-section" id="actions_{tid}" style="display: none; margin-top: 1.5rem; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <button class="btn btn-primary" id="btnDownload_{tid}">⬇️ Download</button>
        <button class="btn btn-secondary" id="btnCopy_{tid}">📋 Copy Image</button>
        <button class="btn btn-secondary" id="btnReset_{tid}">🔄 Reset</button>
        <div id="extraActions_{tid}" style="display:flex; gap:1rem; align-items:center;"></div>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://manav193.github.io/ToolVerse/tools/{t["slug"]}.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://manav193.github.io/ToolVerse/tools/{t["slug"]}.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://manav193.github.io/ToolVerse/tools/{t["slug"]}.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>'''

    js = f'''(function() {{
    const tid = '{tid}';
    const dropZone = document.getElementById('dropZone_' + tid);
    const fileInput = document.getElementById('fileInput_' + tid);
    const controls = document.getElementById('controls_' + tid);
    const preview = document.getElementById('preview_' + tid);
    const actions = document.getElementById('actions_' + tid);
    const imgBefore = document.getElementById('imgBefore_' + tid);
    const imgAfter = document.getElementById('imgAfter_' + tid);
    const beforeSize = document.getElementById('beforeSize_' + tid);
    const afterSize = document.getElementById('afterSize_' + tid);
    
    let currentFile = null;
    let currentImage = new Image();
    let processedBlob = null;
    let processedExt = 'png';
    let processedMime = 'image/png';
    let initTool = null;
    let resetTool = null;

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {{ e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; }});
    dropZone.addEventListener('dragleave', (e) => {{ e.preventDefault(); dropZone.style.borderColor = ''; }});
    dropZone.addEventListener('drop', (e) => {{
        e.preventDefault();
        dropZone.style.borderColor = '';
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    }});
    
    window.addEventListener('paste', (e) => {{
        if (!dropZone.closest('body') || dropZone.offsetWidth === 0) return; 
        const items = e.clipboardData.items;
        for (let item of items) {{
            if (item.type.indexOf('image') !== -1) {{
                handleFile(item.getAsFile());
                break;
            }}
        }}
    }});
    
    fileInput.addEventListener('change', (e) => {{
        if (e.target.files.length) handleFile(e.target.files[0]);
    }});

    function formatBytes(bytes) {{
        if (bytes === 0) return '0 Bytes';
        const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }}

    function handleFile(file) {{
        if (!file.type.startsWith('image/')) return alert('Please select an image file');
        currentFile = file;
        beforeSize.textContent = formatBytes(file.size);
        const reader = new FileReader();
        reader.onload = (e) => {{
            imgBefore.src = e.target.result;
            currentImage.src = e.target.result;
            currentImage.onload = () => {{
                controls.style.display = 'block';
                preview.style.display = 'flex';
                actions.style.display = 'flex';
                if(typeof initTool === 'function') initTool();
            }};
        }};
        reader.readAsDataURL(file);
    }}

    document.getElementById('btnReset_' + tid).addEventListener('click', () => {{
        fileInput.value = '';
        currentFile = null;
        processedBlob = null;
        controls.style.display = 'none';
        preview.style.display = 'none';
        actions.style.display = 'none';
        if(typeof resetTool === 'function') resetTool();
    }});

    document.getElementById('btnDownload_' + tid).addEventListener('click', () => {{
        if (!processedBlob) return;
        const url = URL.createObjectURL(processedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '{t["slug"]}_result.' + processedExt;
        a.click();
        URL.revokeObjectURL(url);
    }});

    document.getElementById('btnCopy_' + tid).addEventListener('click', async () => {{
        if (!processedBlob) return;
        try {{
            let blobToCopy = processedBlob;
            if(processedBlob.type !== 'image/png') {{
                const bmp = await createImageBitmap(processedBlob);
                const cvs = document.createElement('canvas');
                cvs.width = bmp.width; cvs.height = bmp.height;
                cvs.getContext('2d').drawImage(bmp, 0, 0);
                blobToCopy = await new Promise(r => cvs.toBlob(r, 'image/png'));
            }}
            await navigator.clipboard.write([new ClipboardItem({{[blobToCopy.type]: blobToCopy}})]);
            alert('Image copied to clipboard!');
        }} catch (err) {{
            alert('Failed to copy image: ' + err);
        }}
    }});

    function updateResult(blob, ext, mime) {{
        processedBlob = blob;
        processedExt = ext || 'png';
        processedMime = mime || 'image/png';
        afterSize.textContent = formatBytes(blob.size);
        const url = URL.createObjectURL(blob);
        imgAfter.onload = () => URL.revokeObjectURL(url);
        imgAfter.src = url;
    }}

    {t["js_logic"]}
}})();'''

    out.append({
        "slug": t["slug"],
        "title": t["title"],
        "description": t["description"],
        "category": t["category"],
        "keywords": t["keywords"],
        "toolHTML": html,
        "toolScript": js,
        "features": t["features"],
        "benefits": t["benefits"],
        "faqs": t["faqs"],
        "relatedSlugs": t["relatedSlugs"],
        "lastUpdated": "2026-07-06"
    })

js_file_content = "module.exports = " + json.dumps(out, indent=4) + ";"

with open(r"c:\Users\manav\OneDrive\tool verse\src\tools\image-tools2.js", "w", encoding="utf-8") as f:
    f.write(js_file_content)

print("Generated src/tools/image-tools2.js successfully!")
