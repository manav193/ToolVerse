module.exports = [
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '📄',
    shortDesc: 'Combine multiple PDF files into one single document',
    metaTitle: 'Merge PDF - Combine PDF Files Online Free | ToolVerse',
    metaDescription: 'Merge and combine multiple PDF files into one document instantly. 100% free, secure, and processes locally in your browser.',
    keywords: 'merge pdf, combine pdf, join pdf files',
    benefits: ['Combines multiple files', '100% local processing', 'No file size limits'],
    lastUpdated: '2023-11-01',
    features: ['Drag & drop ordering', 'Client-side processing', 'Instant merge'],
    howToUse: ['Select multiple PDF files', 'Click Merge and download'],
    faqs: [{ q: 'Is it secure?', a: 'Yes, everything happens locally.' }],
    relatedSlugs: ['split-pdf', 'optimize-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" multiple style="display:none">
        <p>Drop PDF files here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;"></div>
    <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;" disabled>Merge PDFs</button>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/merge-pdf.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/merge-pdf.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/merge-pdf.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileList = document.getElementById('file-list');
    const actionBtn = document.getElementById('action-btn');
    let files = [];

    const updateFileList = () => {
        fileList.innerHTML = '';
        files.forEach((f, i) => {
            const div = document.createElement('div');
            div.textContent = (i + 1) + '. ' + f.name;
            fileList.appendChild(div);
        });
        actionBtn.disabled = files.length < 2;
    };

    fileInput.addEventListener('change', (e) => {
        files.push(...Array.from(e.target.files));
        updateFileList();
    });

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
        if (droppedFiles.length) {
            files.push(...droppedFiles);
            updateFileList();
        } else {
            if(window.showToast) window.showToast('Please drop PDF files', 'error');
        }
    });

    actionBtn.addEventListener('click', async () => {
        if (!window.PDFLib) {
            if(window.showToast) window.showToast('PDF library not loaded', 'error');
            return;
        }
        try {
            actionBtn.disabled = true;
            actionBtn.textContent = 'Merging...';
            const mergedPdf = await PDFLib.PDFDocument.create();
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged.pdf';
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('PDFs merged successfully', 'success');
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error merging PDFs', 'error');
        } finally {
            actionBtn.disabled = files.length < 2;
            actionBtn.textContent = 'Merge PDFs';
        }
    });
})();`
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '✂️',
    shortDesc: 'Extract pages from your PDF or split into multiple files',
    metaTitle: 'Split PDF - Extract PDF Pages Online Free | ToolVerse',
    metaDescription: 'Split PDF files into individual pages or extract specific pages. 100% free, secure, and processes locally in your browser.',
    keywords: 'split pdf, extract pdf pages, separate pdf',
    benefits: ['Extract specific pages', '100% local processing', 'Secure and fast'],
    lastUpdated: '2023-11-01',
    features: ['Range selection', 'Client-side processing', 'Instant split'],
    howToUse: ['Select a PDF file', 'Enter pages to extract or split all', 'Click Split and download'],
    faqs: [{ q: 'Is it secure?', a: 'Yes, everything happens locally.' }],
    relatedSlugs: ['merge-pdf', 'extract-pdf-pages'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-info" style="margin-top: 1rem; display: none;">
        <p id="file-name"></p>
        <div style="margin-top: 1rem;">
            <label>Pages to extract (e.g. 1, 3-5). Leave blank to split into single pages:</label>
            <input type="text" id="page-ranges" class="form-input" placeholder="1, 3-5" style="width: 100%; margin-top: 0.5rem;">
        </div>
        <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;">Split PDF</button>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/split-pdf.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/split-pdf.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/split-pdf.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const pageRanges = document.getElementById('page-ranges');
    const actionBtn = document.getElementById('action-btn');
    let currentFile = null;
    let pdfDoc = null;

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        currentFile = file;
        fileName.textContent = 'Selected: ' + file.name;
        fileInfo.style.display = 'block';
        try {
            const arrayBuffer = await file.arrayBuffer();
            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            fileName.textContent += ' (' + pdfDoc.getPageCount() + ' pages)';
        } catch (e) {
            console.error(e);
            if(window.showToast) window.showToast('Failed to load PDF', 'error');
            currentFile = null;
            fileInfo.style.display = 'none';
        }
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });

    const parseRanges = (rangeStr, maxPages) => {
        if (!rangeStr.trim()) return Array.from({length: maxPages}, (_, i) => i);
        const pages = new Set();
        const parts = rangeStr.split(',');
        for (const part of parts) {
            const trimmed = part.trim();
            if (!trimmed) continue;
            if (trimmed.includes('-')) {
                const [start, end] = trimmed.split('-');
                const s = parseInt(start), e = parseInt(end);
                if (!isNaN(s) && !isNaN(e) && s >= 1 && e >= s && s <= maxPages && e <= maxPages) {
                    for (let i = s; i <= e; i++) pages.add(i - 1);
                }
            } else {
                const p = parseInt(trimmed);
                if (!isNaN(p) && p >= 1 && p <= maxPages) pages.add(p - 1);
            }
        }
        return Array.from(pages).sort((a, b) => a - b);
    };

    actionBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        try {
            actionBtn.disabled = true;
            actionBtn.textContent = 'Splitting...';
            const pageIndices = parseRanges(pageRanges.value, pdfDoc.getPageCount());
            if (pageIndices.length === 0) {
                if(window.showToast) window.showToast('Invalid page range', 'error');
                return;
            }
            const newPdf = await PDFLib.PDFDocument.create();
            const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
            copiedPages.forEach((page) => newPdf.addPage(page));
            
            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'split_' + currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('PDF split successfully', 'success');
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error splitting PDF', 'error');
        } finally {
            actionBtn.disabled = false;
            actionBtn.textContent = 'Split PDF';
        }
    });
})();`
  },
  {
    slug: 'optimize-pdf',
    name: 'Optimize PDF',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '⚡',
    shortDesc: 'Compress PDF size by stripping metadata and optimizing object streams',
    metaTitle: 'Optimize PDF - Reduce PDF File Size Online | ToolVerse',
    metaDescription: 'Optimize and compress PDF files locally in your browser. Remove metadata to reduce file size without losing quality.',
    keywords: 'optimize pdf, compress pdf, reduce pdf size, remove pdf metadata',
    benefits: ['Reduces file size', 'Strips unnecessary metadata', '100% local processing'],
    lastUpdated: '2023-11-01',
    features: ['Metadata stripping', 'Object stream optimization', 'Client-side processing'],
    howToUse: ['Select a PDF file', 'Click Optimize and download'],
    faqs: [{ q: 'Does this compress images?', a: 'No, heavy image compression is not possible in the browser. This tool optimizes the PDF structure and removes metadata.' }],
    relatedSlugs: ['merge-pdf', 'split-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="alert alert-info" style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
        <strong>Note:</strong> This tool strips metadata and optimizes PDF structure to reduce file size. Heavy image compression is not possible in the browser.
    </div>
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-info" style="margin-top: 1rem; display: none;">
        <p id="file-name"></p>
        <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;">Optimize PDF</button>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/optimize-pdf.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/optimize-pdf.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/optimize-pdf.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const actionBtn = document.getElementById('action-btn');
    let currentFile = null;
    let arrayBuffer = null;

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        currentFile = file;
        fileName.textContent = 'Selected: ' + file.name + ' (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)';
        fileInfo.style.display = 'block';
        try {
            arrayBuffer = await file.arrayBuffer();
        } catch (e) {
            console.error(e);
            if(window.showToast) window.showToast('Failed to read file', 'error');
            currentFile = null;
            fileInfo.style.display = 'none';
        }
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });

    actionBtn.addEventListener('click', async () => {
        if (!arrayBuffer) return;
        try {
            actionBtn.disabled = true;
            actionBtn.textContent = 'Optimizing...';
            const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            pdfDoc.setTitle('');
            pdfDoc.setAuthor('');
            pdfDoc.setSubject('');
            pdfDoc.setKeywords([]);
            pdfDoc.setProducer('');
            pdfDoc.setCreator('');
            
            const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            const optimizedSize = (blob.size / 1024 / 1024).toFixed(2);
            if(window.showToast) window.showToast('Optimized! New size: ' + optimizedSize + ' MB', 'success');

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'optimized_' + currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error optimizing PDF', 'error');
        } finally {
            actionBtn.disabled = false;
            actionBtn.textContent = 'Optimize PDF';
        }
    });
})();`
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '🖼️',
    shortDesc: 'Convert JPG images to PDF document',
    metaTitle: 'JPG to PDF - Convert Images to PDF Online | ToolVerse',
    metaDescription: 'Convert JPG, PNG, and other images to a PDF document locally in your browser. 100% free and secure.',
    keywords: 'jpg to pdf, image to pdf, convert jpg to pdf',
    benefits: ['Combines multiple images', '100% local processing', 'Maintains quality'],
    lastUpdated: '2023-11-01',
    features: ['A4 page creation', 'Drag and drop ordering', 'Multiple image support'],
    howToUse: ['Select multiple images', 'Click Convert and download'],
    faqs: [{ q: 'Are my images uploaded anywhere?', a: 'No, everything is processed directly in your browser.' }],
    relatedSlugs: ['pdf-to-jpg', 'merge-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="image/jpeg, image/png, image/webp" multiple style="display:none">
        <p>Drop images (JPG/PNG) here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;"></div>
    <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;" disabled>Convert to PDF</button>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/jpg-to-pdf.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/jpg-to-pdf.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/jpg-to-pdf.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileList = document.getElementById('file-list');
    const actionBtn = document.getElementById('action-btn');
    let files = [];

    const updateFileList = () => {
        fileList.innerHTML = '';
        files.forEach((f, i) => {
            const div = document.createElement('div');
            div.textContent = (i + 1) + '. ' + f.name;
            fileList.appendChild(div);
        });
        actionBtn.disabled = files.length === 0;
    };

    fileInput.addEventListener('change', (e) => {
        files.push(...Array.from(e.target.files));
        updateFileList();
    });

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if (droppedFiles.length) {
            files.push(...droppedFiles);
            updateFileList();
        } else {
            if(window.showToast) window.showToast('Please drop image files', 'error');
        }
    });

    actionBtn.addEventListener('click', async () => {
        if (!window.PDFLib) {
            if(window.showToast) window.showToast('PDF library not loaded', 'error');
            return;
        }
        try {
            actionBtn.disabled = true;
            actionBtn.textContent = 'Converting...';
            const pdfDoc = await PDFLib.PDFDocument.create();
            
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                let pdfImage;
                if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    pdfImage = await pdfDoc.embedJpg(arrayBuffer);
                } else if (file.type === 'image/png') {
                    pdfImage = await pdfDoc.embedPng(arrayBuffer);
                } else {
                    continue; // Skip unsupported
                }
                
                const page = pdfDoc.addPage(PDFLib.PageSizes.A4);
                const { width, height } = page.getSize();
                
                const imgDims = pdfImage.scaleToFit(width - 40, height - 40);
                page.drawImage(pdfImage, {
                    x: page.getWidth() / 2 - imgDims.width / 2,
                    y: page.getHeight() / 2 - imgDims.height / 2,
                    width: imgDims.width,
                    height: imgDims.height,
                });
            }
            
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'images.pdf';
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('Converted to PDF successfully', 'success');
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error converting to PDF', 'error');
        } finally {
            actionBtn.disabled = files.length === 0;
            actionBtn.textContent = 'Convert to PDF';
        }
    });
})();`
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '📸',
    shortDesc: 'Convert PDF pages to JPG images',
    metaTitle: 'PDF to JPG - Convert PDF Pages to Images | ToolVerse',
    metaDescription: 'Extract images from PDF or convert PDF pages to JPG format locally in your browser.',
    keywords: 'pdf to jpg, pdf to images, extract pdf pages to jpg',
    benefits: ['High quality conversion', '100% local processing', 'Secure'],
    lastUpdated: '2023-11-01',
    features: ['Canvas rendering', 'Download individual pages', 'Client-side processing'],
    howToUse: ['Select a PDF file', 'Wait for processing', 'Download JPG files'],
    faqs: [{ q: 'Do you store my PDF?', a: 'No, all conversions happen locally using PDF.js.' }],
    relatedSlugs: ['jpg-to-pdf', 'split-pdf'],
    hasDownload: false,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="status" style="margin-top: 1rem; display: none;"></div>
    <div id="output-list" style="margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;"></div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/pdf-to-jpg.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/pdf-to-jpg.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/pdf-to-jpg.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const status = document.getElementById('status');
    const outputList = document.getElementById('output-list');
    
    if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const processPDF = async (file) => {
        if (!window.pdfjsLib) {
            if(window.showToast) window.showToast('PDF.js not loaded', 'error');
            return;
        }
        outputList.innerHTML = '';
        status.style.display = 'block';
        status.textContent = 'Processing PDF...';
        
        try {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            const numPages = pdf.numPages;
            
            for (let i = 1; i <= numPages; i++) {
                status.textContent = 'Converting page ' + i + ' of ' + numPages + '...';
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // high res
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                await page.render({ canvasContext: ctx, viewport: viewport }).promise;
                
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                
                const item = document.createElement('div');
                item.style.border = '1px solid var(--border)';
                item.style.padding = '0.5rem';
                item.style.borderRadius = '4px';
                item.style.textAlign = 'center';
                
                const img = document.createElement('img');
                img.src = dataUrl;
                img.style.width = '100%';
                img.style.marginBottom = '0.5rem';
                
                const btn = document.createElement('a');
                btn.href = dataUrl;
                btn.download = 'page_' + i + '.jpg';
                btn.className = 'btn btn-primary btn-sm';
                btn.textContent = 'Download JPG';
                btn.style.display = 'block';
                
                item.appendChild(img);
                item.appendChild(btn);
                outputList.appendChild(item);
            }
            status.textContent = 'Conversion complete!';
            if(window.showToast) window.showToast('Successfully converted to JPGs', 'success');
        } catch (err) {
            console.error(err);
            status.textContent = 'Error processing PDF.';
            if(window.showToast) window.showToast('Failed to convert PDF', 'error');
        }
    };

    const handleFile = (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        processPDF(file);
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });
})();`
  },
  {
    slug: 'rotate-pdf',
    name: 'Rotate PDF',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '🔄',
    shortDesc: 'Rotate PDF pages by 90, 180, or 270 degrees',
    metaTitle: 'Rotate PDF - Rotate PDF Pages Online | ToolVerse',
    metaDescription: 'Easily rotate all pages in your PDF document. Secure, free, and processes entirely in your browser.',
    keywords: 'rotate pdf, change pdf orientation',
    benefits: ['Rotate all pages', '100% local processing', 'Maintains quality'],
    lastUpdated: '2023-11-01',
    features: ['90, 180, 270 degrees', 'Client-side processing', 'Instant result'],
    howToUse: ['Select a PDF file', 'Choose rotation angle', 'Click Rotate and download'],
    faqs: [{ q: 'Is it secure?', a: 'Yes, everything happens locally.' }],
    relatedSlugs: ['split-pdf', 'merge-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-info" style="margin-top: 1rem; display: none;">
        <p id="file-name"></p>
        <div style="margin-top: 1rem;">
            <label>Rotation Angle:</label>
            <select id="angle-select" class="form-input" style="width: 100%; margin-top: 0.5rem;">
                <option value="90">90 Degrees (Clockwise)</option>
                <option value="180">180 Degrees</option>
                <option value="270">270 Degrees (Counter-Clockwise)</option>
            </select>
        </div>
        <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;">Rotate PDF</button>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/rotate-pdf.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/rotate-pdf.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/rotate-pdf.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const angleSelect = document.getElementById('angle-select');
    const actionBtn = document.getElementById('action-btn');
    let currentFile = null;
    let pdfDoc = null;

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        currentFile = file;
        fileName.textContent = 'Selected: ' + file.name;
        fileInfo.style.display = 'block';
        try {
            const arrayBuffer = await file.arrayBuffer();
            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        } catch (e) {
            console.error(e);
            if(window.showToast) window.showToast('Failed to load PDF', 'error');
            currentFile = null;
            fileInfo.style.display = 'none';
        }
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });

    actionBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        try {
            actionBtn.disabled = true;
            actionBtn.textContent = 'Rotating...';
            const degrees = parseInt(angleSelect.value, 10);
            const pages = pdfDoc.getPages();
            pages.forEach((page) => {
                const currentRotation = page.getRotation().angle;
                page.setRotation(PDFLib.degrees(currentRotation + degrees));
            });
            
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rotated_' + currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('PDF rotated successfully', 'success');
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error rotating PDF', 'error');
        } finally {
            actionBtn.disabled = false;
            actionBtn.textContent = 'Rotate PDF';
        }
    });
})();`
  },
  {
    slug: 'delete-pdf-pages',
    name: 'Delete PDF Pages',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '🗑️',
    shortDesc: 'Remove specific pages from your PDF file',
    metaTitle: 'Delete PDF Pages - Remove Pages from PDF | ToolVerse',
    metaDescription: 'Delete and remove specific pages from your PDF file online. 100% free and processes locally in your browser.',
    keywords: 'delete pdf pages, remove pdf pages, delete pages from pdf',
    benefits: ['Remove unwanted pages', '100% local processing', 'Secure and fast'],
    lastUpdated: '2023-11-01',
    features: ['Comma-separated input', 'Client-side processing', 'Instant removal'],
    howToUse: ['Select a PDF file', 'Enter page numbers to remove', 'Click Delete and download'],
    faqs: [{ q: 'Is it secure?', a: 'Yes, everything happens locally.' }],
    relatedSlugs: ['extract-pdf-pages', 'split-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-info" style="margin-top: 1rem; display: none;">
        <p id="file-name"></p>
        <div style="margin-top: 1rem;">
            <label>Pages to delete (comma-separated, e.g. 1, 3, 5):</label>
            <input type="text" id="pages-to-delete" class="form-input" placeholder="1, 3, 5" style="width: 100%; margin-top: 0.5rem;">
        </div>
        <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;">Delete Pages</button>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/delete-pdf-pages.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/delete-pdf-pages.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/delete-pdf-pages.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const pagesInput = document.getElementById('pages-to-delete');
    const actionBtn = document.getElementById('action-btn');
    let currentFile = null;
    let pdfDoc = null;

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        currentFile = file;
        fileName.textContent = 'Selected: ' + file.name;
        fileInfo.style.display = 'block';
        try {
            const arrayBuffer = await file.arrayBuffer();
            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            fileName.textContent += ' (' + pdfDoc.getPageCount() + ' pages)';
        } catch (e) {
            console.error(e);
            if(window.showToast) window.showToast('Failed to load PDF', 'error');
            currentFile = null;
            fileInfo.style.display = 'none';
        }
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });

    actionBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        try {
            const totalPages = pdfDoc.getPageCount();
            const toDelete = pagesInput.value.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p) && p >= 1 && p <= totalPages);
            
            if (toDelete.length === 0) {
                if(window.showToast) window.showToast('Please enter valid page numbers to delete', 'error');
                return;
            }
            if (toDelete.length === totalPages) {
                if(window.showToast) window.showToast('You cannot delete all pages', 'error');
                return;
            }

            actionBtn.disabled = true;
            actionBtn.textContent = 'Deleting...';
            
            // Delete in reverse order to not mess up indices
            const uniqueToDelete = [...new Set(toDelete)].sort((a, b) => b - a);
            uniqueToDelete.forEach(pageNum => {
                pdfDoc.removePage(pageNum - 1);
            });
            
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'deleted_' + currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('Pages deleted successfully', 'success');
            
            // Reload original state so user can do it again if needed
            const arrayBuffer = await currentFile.arrayBuffer();
            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error deleting pages', 'error');
        } finally {
            actionBtn.disabled = false;
            actionBtn.textContent = 'Delete Pages';
        }
    });
})();`
  },
  {
    slug: 'extract-pdf-pages',
    name: 'Extract PDF Pages',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '📑',
    shortDesc: 'Extract specific pages from a PDF to create a new one',
    metaTitle: 'Extract PDF Pages - Keep Specific PDF Pages | ToolVerse',
    metaDescription: 'Extract and keep specific pages from your PDF file. Secure, free, and processes entirely in your browser.',
    keywords: 'extract pdf pages, keep pdf pages, select pdf pages',
    benefits: ['Keep only what you need', '100% local processing', 'Secure and fast'],
    lastUpdated: '2023-11-01',
    features: ['Comma-separated input', 'Client-side processing', 'Instant extraction'],
    howToUse: ['Select a PDF file', 'Enter page numbers to keep', 'Click Extract and download'],
    faqs: [{ q: 'Is it secure?', a: 'Yes, everything happens locally.' }],
    relatedSlugs: ['delete-pdf-pages', 'split-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-info" style="margin-top: 1rem; display: none;">
        <p id="file-name"></p>
        <div style="margin-top: 1rem;">
            <label>Pages to KEEP (comma-separated, e.g. 1, 3, 5):</label>
            <input type="text" id="pages-to-keep" class="form-input" placeholder="1, 3, 5" style="width: 100%; margin-top: 0.5rem;">
        </div>
        <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;">Extract Pages</button>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/extract-pdf-pages.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/extract-pdf-pages.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/extract-pdf-pages.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const pagesInput = document.getElementById('pages-to-keep');
    const actionBtn = document.getElementById('action-btn');
    let currentFile = null;
    let pdfDoc = null;

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        currentFile = file;
        fileName.textContent = 'Selected: ' + file.name;
        fileInfo.style.display = 'block';
        try {
            const arrayBuffer = await file.arrayBuffer();
            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            fileName.textContent += ' (' + pdfDoc.getPageCount() + ' pages)';
        } catch (e) {
            console.error(e);
            if(window.showToast) window.showToast('Failed to load PDF', 'error');
            currentFile = null;
            fileInfo.style.display = 'none';
        }
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });

    actionBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        try {
            const totalPages = pdfDoc.getPageCount();
            const toKeep = pagesInput.value.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p) && p >= 1 && p <= totalPages);
            
            if (toKeep.length === 0) {
                if(window.showToast) window.showToast('Please enter valid page numbers to keep', 'error');
                return;
            }

            actionBtn.disabled = true;
            actionBtn.textContent = 'Extracting...';
            
            const newPdf = await PDFLib.PDFDocument.create();
            const uniqueToKeep = [...new Set(toKeep)].sort((a, b) => a - b);
            
            // map to 0-based indices
            const indices = uniqueToKeep.map(p => p - 1);
            const copiedPages = await newPdf.copyPages(pdfDoc, indices);
            copiedPages.forEach((page) => newPdf.addPage(page));
            
            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'extracted_' + currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('Pages extracted successfully', 'success');
            
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error extracting pages', 'error');
        } finally {
            actionBtn.disabled = false;
            actionBtn.textContent = 'Extract Pages';
        }
    });
})();`
  },
  {
    slug: 'watermark-pdf',
    name: 'Watermark PDF',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '©️',
    shortDesc: 'Add a text watermark diagonally to all PDF pages',
    metaTitle: 'Watermark PDF - Add Text Watermark Online | ToolVerse',
    metaDescription: 'Easily add a custom text watermark to all pages of your PDF document. Free, secure, and fully private.',
    keywords: 'watermark pdf, add text to pdf, stamp pdf',
    benefits: ['Protect your documents', '100% local processing', 'Customizable text'],
    lastUpdated: '2023-11-01',
    features: ['Diagonal placement', 'Applies to all pages', 'Client-side processing'],
    howToUse: ['Select a PDF file', 'Enter your watermark text', 'Click Add Watermark and download'],
    faqs: [{ q: 'Can I remove the watermark later?', a: 'No, this tool permanently draws the text onto the PDF.' }],
    relatedSlugs: ['add-page-numbers', 'rotate-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-info" style="margin-top: 1rem; display: none;">
        <p id="file-name"></p>
        <div style="margin-top: 1rem;">
            <label>Watermark Text:</label>
            <input type="text" id="watermark-text" class="form-input" placeholder="CONFIDENTIAL" style="width: 100%; margin-top: 0.5rem;">
        </div>
        <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;">Add Watermark</button>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/watermark-pdf.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/watermark-pdf.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/watermark-pdf.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const textInput = document.getElementById('watermark-text');
    const actionBtn = document.getElementById('action-btn');
    let currentFile = null;
    let arrayBuffer = null;

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        currentFile = file;
        fileName.textContent = 'Selected: ' + file.name;
        fileInfo.style.display = 'block';
        try {
            arrayBuffer = await file.arrayBuffer();
        } catch (e) {
            console.error(e);
            if(window.showToast) window.showToast('Failed to load PDF', 'error');
            currentFile = null;
            fileInfo.style.display = 'none';
        }
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });

    actionBtn.addEventListener('click', async () => {
        if (!arrayBuffer) return;
        const text = textInput.value.trim();
        if (!text) {
            if(window.showToast) window.showToast('Please enter watermark text', 'error');
            return;
        }
        try {
            actionBtn.disabled = true;
            actionBtn.textContent = 'Adding...';
            
            const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
            const pages = pdfDoc.getPages();
            
            pages.forEach((page) => {
                const { width, height } = page.getSize();
                const fontSize = 60;
                const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
                const textHeight = helveticaFont.heightAtSize(fontSize);
                
                page.drawText(text, {
                    x: width / 2 - textWidth / 2,
                    y: height / 2 - textHeight / 2,
                    size: fontSize,
                    font: helveticaFont,
                    color: PDFLib.rgb(0.5, 0.5, 0.5),
                    opacity: 0.3,
                    rotate: PDFLib.degrees(45),
                });
            });
            
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'watermarked_' + currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('Watermark added successfully', 'success');
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error adding watermark', 'error');
        } finally {
            actionBtn.disabled = false;
            actionBtn.textContent = 'Add Watermark';
        }
    });
})();`
  },
  {
    slug: 'add-page-numbers',
    name: 'Add Page Numbers',
    category: 'pdf',
    categoryName: 'PDF Tools',
    icon: '🔢',
    shortDesc: 'Add page numbers to the bottom of your PDF document',
    metaTitle: 'Add Page Numbers to PDF Online | ToolVerse',
    metaDescription: 'Insert page numbers into your PDF file easily. Secure, fast, and processes entirely within your browser.',
    keywords: 'add page numbers pdf, paginate pdf, insert page numbers',
    benefits: ['Organize documents', '100% local processing', 'Clean formatting'],
    lastUpdated: '2023-11-01',
    features: ['Bottom center placement', 'Customizable font', 'Client-side processing'],
    howToUse: ['Select a PDF file', 'Click Add Numbers and download'],
    faqs: [{ q: 'Where are numbers placed?', a: 'They are placed at the bottom center of each page.' }],
    relatedSlugs: ['watermark-pdf', 'merge-pdf'],
    hasDownload: true,
    hasCopy: false,
    toolHTML: `
<div class="tool-interface">
    <div class="drop-zone" id="drop-zone">
        <input type="file" id="file-input" accept="application/pdf" style="display:none">
        <p>Drop PDF file here or <button class="btn btn-secondary btn-sm" onclick="document.getElementById('file-input').click()">Browse</button></p>
    </div>
    <div id="file-info" style="margin-top: 1rem; display: none;">
        <p id="file-name"></p>
        <button class="btn btn-primary" id="action-btn" style="margin-top: 1rem; width: 100%;">Add Page Numbers</button>
    </div>
</div>
<div class="tool-actions" style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="btn btn-secondary btn-sm" onclick="window.copyToClipboard('https://toolverse.com/tools/add-page-numbers.html')">🔗 Copy URL</button>
    <a href="https://twitter.com/intent/tweet?url=https://toolverse.com/tools/add-page-numbers.html" target="_blank" class="btn btn-secondary btn-sm">🐦 Twitter</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://toolverse.com/tools/add-page-numbers.html" target="_blank" class="btn btn-secondary btn-sm">📘 Facebook</a>
    <button class="btn btn-ghost btn-sm" style="margin-left: auto;" onclick="window.showToast('Issue reported. Thank you!', 'success')">⚠️ Report Issue</button>
</div>`,
    toolScript: `(function() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const actionBtn = document.getElementById('action-btn');
    let currentFile = null;
    let arrayBuffer = null;

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            if(window.showToast) window.showToast('Please select a PDF file', 'error');
            return;
        }
        currentFile = file;
        fileName.textContent = 'Selected: ' + file.name;
        fileInfo.style.display = 'block';
        try {
            arrayBuffer = await file.arrayBuffer();
        } catch (e) {
            console.error(e);
            if(window.showToast) window.showToast('Failed to load PDF', 'error');
            currentFile = null;
            fileInfo.style.display = 'none';
        }
    };

    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; });
    dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border)'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });

    actionBtn.addEventListener('click', async () => {
        if (!arrayBuffer) return;
        try {
            actionBtn.disabled = true;
            actionBtn.textContent = 'Adding...';
            
            const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
            const pages = pdfDoc.getPages();
            
            pages.forEach((page, idx) => {
                const { width, height } = page.getSize();
                const text = String(idx + 1);
                const fontSize = 12;
                const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
                
                page.drawText(text, {
                    x: width / 2 - textWidth / 2,
                    y: 20, // 20 units from bottom
                    size: fontSize,
                    font: helveticaFont,
                    color: PDFLib.rgb(0, 0, 0),
                });
            });
            
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'numbered_' + currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
            if(window.showToast) window.showToast('Page numbers added successfully', 'success');
        } catch (error) {
            console.error(error);
            if(window.showToast) window.showToast('Error adding page numbers', 'error');
        } finally {
            actionBtn.disabled = false;
            actionBtn.textContent = 'Add Page Numbers';
        }
    });
})();`
  }
];
