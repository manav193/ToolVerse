'use strict';

const multiPdfTools = new Set(['merge-pdf', 'jpg-to-pdf']);
const rangeTools = new Set(['split-pdf', 'pdf-to-jpg', 'rotate-pdf', 'delete-pdf-pages', 'extract-pdf-pages']);

const toolConfig = {
  'merge-pdf': { action: 'Merge PDFs', accept: 'application/pdf,.pdf', multiple: true, minimum: 2 },
  'split-pdf': { action: 'Create Split PDF', accept: 'application/pdf,.pdf' },
  'optimize-pdf': { action: 'Optimize PDF', accept: 'application/pdf,.pdf' },
  'jpg-to-pdf': { action: 'Create PDF', accept: 'image/jpeg,image/png,.jpg,.jpeg,.png', multiple: true, minimum: 1 },
  'pdf-to-jpg': { action: 'Convert Pages to JPG', accept: 'application/pdf,.pdf' },
  'rotate-pdf': { action: 'Rotate PDF', accept: 'application/pdf,.pdf' },
  'delete-pdf-pages': { action: 'Delete Pages', accept: 'application/pdf,.pdf' },
  'extract-pdf-pages': { action: 'Extract Pages', accept: 'application/pdf,.pdf' },
  'watermark-pdf': { action: 'Add Watermark', accept: 'application/pdf,.pdf' },
  'add-page-numbers': { action: 'Add Page Numbers', accept: 'application/pdf,.pdf' }
};

const controlsFor = (slug) => {
  if (slug === 'merge-pdf') return `
    <div class="pdf-control-grid">
      <div><label for="output-filename">Output filename</label><input id="output-filename" class="form-input" value="merged.pdf" autocomplete="off"></div>
    </div>`;
  if (slug === 'split-pdf') return `
    <div class="pdf-control-grid">
      <div><label for="page-ranges">Pages to include</label><input id="page-ranges" class="form-input" placeholder="1-3, 5, 8-10" autocomplete="off" aria-describedby="page-ranges-help selection-summary"></div>
    </div>
    <p id="page-ranges-help" class="pdf-field-help">Use ranges such as 1-3, 5, 8-10. Leave blank to include every page in one output PDF.</p>
    <p id="selection-summary" class="pdf-selection-summary" aria-live="polite">Select a PDF to see its page count.</p>`;
  if (slug === 'pdf-to-jpg') return `
    <div class="pdf-control-grid">
      <div><label for="page-ranges">Pages to convert</label><input id="page-ranges" class="form-input" placeholder="1-3, 5, 8-10" autocomplete="off" aria-describedby="page-ranges-help selection-summary"></div>
    </div>
    <p id="page-ranges-help" class="pdf-field-help">Leave blank for all pages. JPG output uses the existing high-resolution 2× render scale.</p>
    <p id="selection-summary" class="pdf-selection-summary" aria-live="polite">Select a PDF to see its page count.</p>`;
  if (slug === 'rotate-pdf') return `
    <div class="pdf-control-grid pdf-control-grid--two">
      <div><label for="angle-select">Rotation</label><select id="angle-select" class="form-input"><option value="90">90° clockwise</option><option value="180">180°</option><option value="270">270° clockwise</option></select></div>
      <div><label for="page-ranges">Pages to rotate</label><input id="page-ranges" class="form-input" placeholder="Leave blank for all pages" autocomplete="off" aria-describedby="page-ranges-help selection-summary"></div>
    </div>
    <p id="page-ranges-help" class="pdf-field-help">Use ranges such as 1-3, 5, 8-10, or leave blank to rotate every page.</p>
    <p id="selection-summary" class="pdf-selection-summary" aria-live="polite">Select a PDF to see its page count.</p>`;
  if (slug === 'delete-pdf-pages') return `
    <div class="pdf-control-grid"><div><label for="pages-to-delete">Pages to delete</label><input id="pages-to-delete" class="form-input" placeholder="1-3, 5, 8-10" autocomplete="off" aria-describedby="page-ranges-help selection-summary"></div></div>
    <p id="page-ranges-help" class="pdf-field-help">Enter one or more pages. You cannot delete every page.</p>
    <p id="selection-summary" class="pdf-selection-summary" aria-live="polite">Select a PDF to see its page count.</p>`;
  if (slug === 'extract-pdf-pages') return `
    <div class="pdf-control-grid"><div><label for="pages-to-keep">Pages to extract</label><input id="pages-to-keep" class="form-input" placeholder="1-3, 5, 8-10" autocomplete="off" aria-describedby="page-ranges-help selection-summary"></div></div>
    <p id="page-ranges-help" class="pdf-field-help">Enter page numbers or ranges in the order they should appear in the output.</p>
    <p id="selection-summary" class="pdf-selection-summary" aria-live="polite">Select a PDF to see its page count.</p>`;
  if (slug === 'watermark-pdf') return `
    <div class="pdf-control-grid"><div><label for="watermark-text">Watermark text</label><input id="watermark-text" class="form-input" value="CONFIDENTIAL" maxlength="120" autocomplete="off"></div></div>`;
  if (slug === 'optimize-pdf') return `<p class="pdf-processing-note"><strong>Structural optimization:</strong> removes document metadata and uses object streams. Embedded images are not recompressed.</p>`;
  return '';
};

const buildMarkup = (tool) => {
  const config = toolConfig[tool.slug];
  if (!config) return tool;
  const isMulti = multiPdfTools.has(tool.slug);
  const uploadCopy = tool.slug === 'jpg-to-pdf' ? 'JPG or PNG images' : 'PDF files';
  const multiple = config.multiple ? ' multiple' : '';
  const controlsMarkup = controlsFor(tool.slug);
  const listMarkup = isMulti
    ? `<section class="pdf-selected-section" aria-labelledby="selected-files-title"><div class="pdf-section-heading"><h3 id="selected-files-title">Selected files</h3><span id="file-totals">No files selected</span></div><ol id="file-list" class="pdf-file-list" aria-live="polite"></ol></section>`
    : `<section id="file-info" class="pdf-selected-section" aria-labelledby="selected-file-title" hidden><div class="pdf-section-heading"><h3 id="selected-file-title">Selected file</h3></div><dl class="pdf-file-summary"><div><dt>Filename</dt><dd id="file-name">—</dd></div><div><dt>Size</dt><dd id="file-size">—</dd></div><div><dt>Pages</dt><dd id="file-pages">—</dd></div></dl></section>`;
  const outputMarkup = tool.slug === 'pdf-to-jpg'
    ? `<section id="result-panel" class="pdf-result-panel" hidden aria-labelledby="pdf-result-title"><div class="pdf-section-heading"><h3 id="pdf-result-title">Converted pages</h3><span id="result-summary"></span></div><div id="output-list" class="pdf-output-grid"></div></section>`
    : `<section id="result-panel" class="pdf-result-panel" hidden aria-labelledby="pdf-result-title"><div><p class="pdf-result-kicker">Complete</p><h3 id="pdf-result-title">Your file is ready</h3></div><dl class="pdf-result-metadata"><div><dt>Filename</dt><dd id="result-name">—</dd></div><div><dt>Size</dt><dd id="result-size">—</dd></div><div><dt>Pages</dt><dd id="result-pages">—</dd></div></dl><button type="button" id="download-btn" class="btn btn-primary">Download result</button></section>`;

  return {
    ...tool,
    toolHTML: `<div class="pdf-tool" data-pdf-tool="${tool.slug}" data-minimum-files="${config.minimum || 1}">
      <div class="pdf-upload-header"><div><p class="pdf-workspace-kicker">Document source</p><label for="file-input">Choose ${uploadCopy}</label></div><p id="pdf-upload-help">${uploadCopy}; processed in this browser. No invented file-size limit.</p></div>
      <div class="drop-zone pdf-upload-zone" id="drop-zone" role="button" tabindex="0" aria-label="Choose or drop ${uploadCopy}" aria-describedby="pdf-upload-help">
        <span class="pdf-upload-mark" aria-hidden="true">PDF</span><p>Drop ${uploadCopy.toLowerCase()} here</p><span>or use the file picker</span>
        <input type="file" id="file-input" accept="${config.accept}"${multiple} hidden aria-label="${uploadCopy}">
      </div>
      <p id="status" class="pdf-workspace-status" role="status" aria-live="polite" tabindex="-1">Choose ${uploadCopy.toLowerCase()} to begin.</p>
      ${listMarkup}
      ${controlsMarkup ? `<section id="controls-panel" class="pdf-controls-panel" aria-labelledby="pdf-options-title" hidden><div class="pdf-section-heading"><h3 id="pdf-options-title">Processing options</h3></div>${controlsMarkup}</section>` : ''}
      <div class="pdf-action-row"><button type="button" class="btn btn-primary" id="action-btn" disabled>${config.action}</button><button type="button" class="btn btn-secondary" id="reset-btn" disabled>Start over</button></div>
      ${outputMarkup}
    </div>`
  };
};

const runtimeFor = (slug) => `
(() => {
  const slug = '${slug}';
  const root = document.querySelector('[data-pdf-tool="${slug}"]');
  if (!root) return;
  const input = root.querySelector('#file-input');
  const dropZone = root.querySelector('#drop-zone');
  const status = root.querySelector('#status');
  const controls = root.querySelector('#controls-panel');
  const action = root.querySelector('#action-btn');
  const reset = root.querySelector('#reset-btn');
  const resultPanel = root.querySelector('#result-panel');
  const fileInfo = root.querySelector('#file-info');
  const fileList = root.querySelector('#file-list');
  const minimumFiles = Number(root.dataset.minimumFiles || 1);
  const isImageInput = slug === 'jpg-to-pdf';
  const isMulti = input.multiple;
  let entries = [];
  let current = null;
  let outputBlob = null;
  let outputName = '';
  let pageImageUrls = [];

  const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes) || bytes < 1) return '0 bytes';
    const units = ['bytes', 'KB', 'MB', 'GB'];
    const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / (1024 ** unit);
    return (unit === 0 ? value : value.toFixed(value >= 10 ? 1 : 2)) + ' ' + units[unit];
  };
  const setStatus = (message, tone = 'info', focus = false) => {
    status.textContent = message;
    status.dataset.tone = tone;
    if (focus) status.focus({ preventScroll: true });
  };
  const friendlyError = (error, fallback = 'The PDF could not be processed.') => {
    const message = String(error && error.message || error || '');
    if (/encrypt|password/i.test(message)) return 'This PDF is encrypted or password-protected and cannot be processed here.';
    if (/worker|fake worker/i.test(message)) return 'The PDF rendering worker could not be loaded. Check your connection and try again.';
    return fallback;
  };
  const setBusy = (busy, label) => {
    root.dataset.busy = String(busy);
    action.disabled = busy || (isMulti ? entries.length < minimumFiles : !current);
    reset.disabled = busy || (!current && entries.length === 0);
    if (label) action.textContent = label;
  };
  const clearResult = () => {
    outputBlob = null;
    outputName = '';
    resultPanel.hidden = true;
    pageImageUrls.forEach(url => URL.revokeObjectURL(url));
    pageImageUrls = [];
    const outputList = root.querySelector('#output-list');
    if (outputList) outputList.replaceChildren();
  };
  const triggerDownload = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };
  const presentPdfResult = (blob, name, pages) => {
    outputBlob = blob;
    outputName = name;
    root.querySelector('#result-name').textContent = name;
    root.querySelector('#result-size').textContent = formatBytes(blob.size);
    root.querySelector('#result-pages').textContent = String(pages);
    resultPanel.hidden = false;
    setStatus('Complete. Your PDF is ready to download again if needed.', 'success');
    triggerDownload(blob, name);
  };
  const fileKey = (file) => [file.name, file.size, file.type].join(':');
  const validateFile = (file) => {
    if (!file || file.size === 0) return 'The selected file is empty.';
    if (isImageInput) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) return 'Choose JPG or PNG images only.';
    } else if (file.type !== 'application/pdf' && !/\\.pdf$/i.test(file.name)) {
      return 'Choose a PDF file.';
    }
    return '';
  };
  const loadEntry = async (file) => {
    const validation = validateFile(file);
    if (validation) throw new Error('USER:' + validation);
    const bytes = await file.arrayBuffer();
    if (isImageInput) return { file, bytes, pages: 1, key: fileKey(file) };
    if (!window.PDFLib) throw new Error('USER:The PDF processing library did not load. Check your connection and try again.');
    const document = await PDFLib.PDFDocument.load(bytes);
    return { file, bytes, document, pages: document.getPageCount(), key: fileKey(file) };
  };
  const showEntryError = (error) => {
    const message = String(error.message || error).replace(/^USER:/, '');
    setStatus(error.message?.startsWith('USER:') ? message : friendlyError(error, 'This file could not be read as a valid PDF.'), 'error', true);
  };
  const updateReadyState = () => {
    const ready = isMulti ? entries.length >= minimumFiles : Boolean(current);
    if (controls) controls.hidden = !ready;
    action.disabled = !ready;
    reset.disabled = !current && entries.length === 0;
    updateSelectionSummary();
  };
  const renderFileList = () => {
    if (!fileList) return;
    fileList.replaceChildren();
    entries.forEach((entry, index) => {
      const item = document.createElement('li');
      item.className = 'pdf-file-item';
      const details = document.createElement('div');
      details.className = 'pdf-file-details';
      const name = document.createElement('strong');
      name.textContent = entry.file.name;
      name.title = entry.file.name;
      const metadata = document.createElement('span');
      metadata.textContent = formatBytes(entry.file.size) + (isImageInput ? '' : ' · ' + entry.pages + ' page' + (entry.pages === 1 ? '' : 's'));
      details.append(name, metadata);
      const controls = document.createElement('div');
      controls.className = 'pdf-file-actions';
      [['Move up', -1], ['Move down', 1]].forEach(([label, offset]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-secondary btn-sm';
        button.textContent = offset < 0 ? '↑' : '↓';
        button.setAttribute('aria-label', label + ' ' + entry.file.name);
        button.disabled = offset < 0 ? index === 0 : index === entries.length - 1;
        button.addEventListener('click', () => {
          const target = index + offset;
          [entries[index], entries[target]] = [entries[target], entries[index]];
          clearResult();
          renderFileList();
          setStatus('File order updated.', 'success');
        });
        controls.appendChild(button);
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'btn btn-ghost btn-sm';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', 'Remove ' + entry.file.name);
      remove.addEventListener('click', () => {
        entries.splice(index, 1);
        clearResult();
        renderFileList();
        updateReadyState();
        setStatus(entries.length ? 'File removed.' : 'Choose files to begin.', 'info');
      });
      controls.appendChild(remove);
      item.append(details, controls);
      fileList.appendChild(item);
    });
    const totals = root.querySelector('#file-totals');
    const pages = entries.reduce((sum, entry) => sum + entry.pages, 0);
    totals.textContent = entries.length ? entries.length + ' file' + (entries.length === 1 ? '' : 's') + (isImageInput ? '' : ' · ' + pages + ' pages') : 'No files selected';
  };
  const showCurrent = () => {
    fileInfo.hidden = false;
    const filename = root.querySelector('#file-name');
    filename.textContent = current.file.name;
    filename.title = current.file.name;
    root.querySelector('#file-size').textContent = formatBytes(current.file.size);
    root.querySelector('#file-pages').textContent = current.pages + ' page' + (current.pages === 1 ? '' : 's');
  };
  const addFiles = async (fileCollection) => {
    const incoming = Array.from(fileCollection || []);
    if (!incoming.length) return;
    clearResult();
    setBusy(true, 'Reading…');
    setStatus('Reading ' + incoming.length + ' file' + (incoming.length === 1 ? '' : 's') + '…', 'info');
    try {
      if (isMulti) {
        let duplicates = 0;
        for (const file of incoming) {
          if (entries.some(entry => entry.key === fileKey(file))) { duplicates += 1; continue; }
          entries.push(await loadEntry(file));
        }
        renderFileList();
        setStatus(duplicates ? 'Files ready. ' + duplicates + ' duplicate ' + (duplicates === 1 ? 'was' : 'were') + ' skipped.' : 'Files ready. Review their order before processing.', duplicates ? 'info' : 'success');
      } else {
        current = await loadEntry(incoming[0]);
        showCurrent();
        setStatus('PDF ready. Review the options before processing.', 'success');
      }
    } catch (error) {
      if (!isMulti) {
        current = null;
        if (fileInfo) fileInfo.hidden = true;
      }
      showEntryError(error);
    } finally {
      action.textContent = '${toolConfig[slug].action}';
      updateReadyState();
    }
  };
  const parsePages = (raw, maximum, allowBlank) => {
    const value = raw.trim();
    if (!value) {
      if (!allowBlank) throw new Error('Enter at least one page number or range.');
      return Array.from({ length: maximum }, (_, index) => index);
    }
    const selected = [];
    const seen = new Set();
    for (const token of value.split(',')) {
      const part = token.trim();
      if (!/^\\d+(?:\\s*-\\s*\\d+)?$/.test(part)) throw new Error('Use page ranges such as 1-3, 5, 8-10.');
      const [startText, endText = startText] = part.split('-').map(item => item.trim());
      const start = Number(startText);
      const end = Number(endText);
      if (start < 1 || end < start || end > maximum) throw new Error('Page ranges must stay between 1 and ' + maximum + '.');
      for (let page = start; page <= end; page += 1) {
        const index = page - 1;
        if (!seen.has(index)) { seen.add(index); selected.push(index); }
      }
    }
    return selected;
  };
  const selectionInput = root.querySelector('#page-ranges, #pages-to-delete, #pages-to-keep');
  function updateSelectionSummary() {
    const summary = root.querySelector('#selection-summary');
    if (!summary) return;
    if (!current) { summary.textContent = 'Select a PDF to see its page count.'; return; }
    try {
      const allowBlank = !['delete-pdf-pages', 'extract-pdf-pages'].includes(slug);
      const pages = parsePages(selectionInput.value, current.pages, allowBlank);
      summary.textContent = pages.length + ' of ' + current.pages + ' pages selected.';
      summary.dataset.tone = 'success';
    } catch (error) {
      summary.textContent = error.message;
      summary.dataset.tone = 'error';
    }
  }
  selectionInput?.addEventListener('input', updateSelectionSummary);

  const freshDocument = async () => PDFLib.PDFDocument.load(current.bytes.slice(0));
  const savePdf = async () => {
    if (slug === 'merge-pdf') {
      const result = await PDFLib.PDFDocument.create();
      for (let index = 0; index < entries.length; index += 1) {
        setStatus('Merging file ' + (index + 1) + ' of ' + entries.length + '…', 'info');
        const source = await PDFLib.PDFDocument.load(entries[index].bytes.slice(0));
        const pages = await result.copyPages(source, source.getPageIndices());
        pages.forEach(page => result.addPage(page));
      }
      const rawName = root.querySelector('#output-filename').value.trim() || 'merged.pdf';
      const name = /\\.pdf$/i.test(rawName) ? rawName : rawName + '.pdf';
      return { bytes: await result.save(), name, pages: result.getPageCount() };
    }
    if (slug === 'jpg-to-pdf') {
      const result = await PDFLib.PDFDocument.create();
      for (let index = 0; index < entries.length; index += 1) {
        setStatus('Adding image ' + (index + 1) + ' of ' + entries.length + '…', 'info');
        const entry = entries[index];
        const image = entry.file.type === 'image/jpeg' ? await result.embedJpg(entry.bytes) : await result.embedPng(entry.bytes);
        const page = result.addPage(PDFLib.PageSizes.A4);
        const size = image.scaleToFit(page.getWidth() - 40, page.getHeight() - 40);
        page.drawImage(image, { x: (page.getWidth() - size.width) / 2, y: (page.getHeight() - size.height) / 2, width: size.width, height: size.height });
      }
      return { bytes: await result.save(), name: 'images.pdf', pages: result.getPageCount() };
    }
    let document = await freshDocument();
    let name = current.file.name;
    if (slug === 'split-pdf' || slug === 'extract-pdf-pages') {
      const pages = parsePages(selectionInput.value, current.pages, slug === 'split-pdf');
      const result = await PDFLib.PDFDocument.create();
      const copied = await result.copyPages(document, pages);
      copied.forEach(page => result.addPage(page));
      document = result;
      name = (slug === 'split-pdf' ? 'split_' : 'extracted_') + current.file.name;
    } else if (slug === 'delete-pdf-pages') {
      const pages = parsePages(selectionInput.value, current.pages, false);
      if (pages.length >= current.pages) throw new Error('You cannot delete every page in the document.');
      [...pages].sort((a, b) => b - a).forEach(index => document.removePage(index));
      name = 'deleted_' + current.file.name;
    } else if (slug === 'rotate-pdf') {
      const pages = parsePages(selectionInput.value, current.pages, true);
      const degrees = Number(root.querySelector('#angle-select').value);
      pages.forEach(index => {
        const page = document.getPage(index);
        page.setRotation(PDFLib.degrees((page.getRotation().angle + degrees) % 360));
      });
      name = 'rotated_' + current.file.name;
    } else if (slug === 'optimize-pdf') {
      document.setTitle(''); document.setAuthor(''); document.setSubject(''); document.setKeywords([]);
      document.setProducer('ToolVerse'); document.setCreator('ToolVerse');
      name = 'optimized_' + current.file.name;
    } else if (slug === 'watermark-pdf') {
      const text = root.querySelector('#watermark-text').value.trim();
      if (!text) throw new Error('Enter watermark text before processing.');
      const font = await document.embedFont(PDFLib.StandardFonts.HelveticaBold);
      document.getPages().forEach(page => {
        const { width, height } = page.getSize();
        const size = Math.max(24, Math.min(56, width / 10));
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, { x: (width - textWidth) / 2, y: height / 2, size, font, color: PDFLib.rgb(0.55, 0.55, 0.55), opacity: 0.35, rotate: PDFLib.degrees(35) });
      });
      name = 'watermarked_' + current.file.name;
    } else if (slug === 'add-page-numbers') {
      const font = await document.embedFont(PDFLib.StandardFonts.Helvetica);
      document.getPages().forEach((page, index) => {
        const text = String(index + 1);
        const size = 11;
        const width = font.widthOfTextAtSize(text, size);
        page.drawText(text, { x: (page.getWidth() - width) / 2, y: 20, size, font, color: PDFLib.rgb(0.2, 0.2, 0.2) });
      });
      name = 'numbered_' + current.file.name;
    }
    return { bytes: await document.save({ useObjectStreams: true }), name, pages: document.getPageCount() };
  };
  const convertToJpg = async () => {
    if (!window.pdfjsLib) throw new Error('The PDF rendering worker did not load.');
    clearResult();
    const pages = parsePages(selectionInput.value, current.pages, true);
    const loadingTask = pdfjsLib.getDocument({ data: current.bytes.slice(0) });
    const pdfDocument = await loadingTask.promise;
    const outputList = root.querySelector('#output-list');
    for (let outputIndex = 0; outputIndex < pages.length; outputIndex += 1) {
      const pageNumber = pages[outputIndex] + 1;
      setStatus('Processing page ' + (outputIndex + 1) + ' of ' + pages.length + '…', 'info');
      const page = await pdfDocument.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
      if (!blob) throw new Error('A page image could not be created.');
      const url = URL.createObjectURL(blob);
      pageImageUrls.push(url);
      const card = document.createElement('article');
      card.className = 'pdf-output-card';
      const heading = document.createElement('h4');
      heading.textContent = 'Page ' + pageNumber;
      const image = document.createElement('img');
      image.src = url;
      image.alt = 'Preview of PDF page ' + pageNumber;
      const metadata = document.createElement('p');
      metadata.textContent = Math.round(viewport.width) + ' × ' + Math.round(viewport.height) + ' px · ' + formatBytes(blob.size);
      const link = document.createElement('a');
      link.className = 'btn btn-primary btn-sm';
      link.href = url;
      link.download = 'page_' + pageNumber + '.jpg';
      link.textContent = 'Download page ' + pageNumber;
      card.append(heading, image, metadata, link);
      outputList.appendChild(card);
      page.cleanup();
    }
    root.querySelector('#result-summary').textContent = pages.length + ' page' + (pages.length === 1 ? '' : 's') + ' ready';
    resultPanel.hidden = false;
    setStatus('Complete. Download the converted page images below.', 'success');
    await pdfDocument.destroy();
  };

  action.addEventListener('click', async () => {
    if (action.disabled) return;
    clearResult();
    setBusy(true, slug === 'pdf-to-jpg' ? 'Converting…' : 'Processing…');
    setStatus(slug === 'pdf-to-jpg' ? 'Preparing PDF pages…' : 'Creating output…', 'info');
    try {
      if (slug === 'pdf-to-jpg') await convertToJpg();
      else {
        const result = await savePdf();
        const blob = new Blob([result.bytes], { type: 'application/pdf' });
        presentPdfResult(blob, result.name, result.pages);
      }
    } catch (error) {
      clearResult();
      setStatus(friendlyError(error, error.message || 'The PDF could not be processed.'), 'error', true);
    } finally {
      action.textContent = '${toolConfig[slug].action}';
      updateReadyState();
    }
  });
  root.querySelector('#download-btn')?.addEventListener('click', () => {
    if (!outputBlob) return;
    triggerDownload(outputBlob, outputName);
    setStatus('Download started again.', 'success');
  });
  const resetWorkspace = () => {
    clearResult();
    entries = [];
    current = null;
    input.value = '';
    fileList?.replaceChildren();
    if (fileInfo) fileInfo.hidden = true;
    if (controls) controls.hidden = true;
    const totals = root.querySelector('#file-totals');
    if (totals) totals.textContent = 'No files selected';
    if (selectionInput) selectionInput.value = '';
    action.disabled = true;
    reset.disabled = true;
    setStatus('Choose ' + (isImageInput ? 'images' : 'PDF files') + ' to begin.', 'info');
    dropZone.focus({ preventScroll: true });
  };
  reset.addEventListener('click', resetWorkspace);
  input.addEventListener('change', () => addFiles(input.files));
  input.addEventListener('click', () => { input.value = ''; });
  dropZone.addEventListener('click', event => { if (!event.target.closest('button, input')) input.click(); });
  dropZone.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); }
  });
  dropZone.addEventListener('dragover', event => { event.preventDefault(); dropZone.classList.add('is-dragging'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('is-dragging'));
  dropZone.addEventListener('drop', event => {
    event.preventDefault();
    dropZone.classList.remove('is-dragging');
    addFiles(event.dataTransfer.files);
  });
  setStatus('Choose ' + (isImageInput ? 'images' : 'PDF files') + ' to begin.', 'info');
})();`;

const enhancePdfTool = (tool) => {
  const enhanced = buildMarkup(tool);
  if (enhanced === tool) return tool;
  return { ...enhanced, toolScript: runtimeFor(tool.slug) };
};

module.exports = enhancePdfTool;
