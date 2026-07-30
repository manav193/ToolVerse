'use strict';

const outputFormats = {
  'resize-image': 'Original format',
  'jpg-to-png': 'PNG',
  'compress-image': 'JPEG',
  'crop-image': 'PNG',
  'png-to-jpg': 'JPEG',
  'webp-converter': 'WebP',
  'rotate-image': 'PNG',
  'flip-image': 'PNG',
  'blur-image': 'PNG',
  'bg-color-changer': 'JPEG',
  'image-watermark': 'PNG',
  'ico-generator': 'ICO / PNG preview'
};

const acceptedFormatCopy = {
  'resize-image': 'JPG, PNG, or WebP',
  'jpg-to-png': 'JPG or JPEG'
};

const addClass = (attributes, className) => attributes.replace(
  /class=(['"])([^'"]*)\1/i,
  (_match, quote, classes) => `class=${quote}${classes} ${className}${quote}`
);

const enhanceImageMarkup = (tool) => {
  const slug = tool.slug;
  let markup = tool.toolHTML || '';

  // The two legacy definitions contained placeholder actions backed by alert().
  // Removing those lets the shared generator add its real URL/share actions.
  markup = markup.replace(/<div class="tool-footer"[\s\S]*?Share feature coming soon![\s\S]*?<\/div>/i, '');

  const fileInputMatch = markup.match(/<input\b[^>]*\btype=['"]file['"][^>]*\bid=['"]([^'"]+)['"][^>]*>/i)
    || markup.match(/<input\b[^>]*\bid=['"]([^'"]+)['"][^>]*\btype=['"]file['"][^>]*>/i);
  if (!fileInputMatch) return tool;

  const fileInputId = fileInputMatch[1];
  const helpId = `${slug}-upload-help`;
  const statusId = `${slug}-status`;
  const metadataId = `${slug}-metadata`;
  const accepted = acceptedFormatCopy[slug] || 'browser-supported image formats';

  markup = markup.replace(/<div([^>]*\bclass=['"][^'"]*\bdrop-zone\b[^'"]*['"][^>]*)>/i, (_match, attributes) => {
    let next = addClass(attributes, 'image-upload-zone');
    next = next
      .replace(/\srole=['"][^'"]*['"]/gi, '')
      .replace(/\stabindex=['"][^'"]*['"]/gi, '')
      .replace(/\saria-label=['"][^'"]*['"]/gi, '')
      .replace(/\saria-describedby=['"][^'"]*['"]/gi, '');
    return `<div${next} role="button" tabindex="0" aria-label="Choose or drop an image" aria-describedby="${helpId}">`;
  });

  const fileInputPattern = new RegExp(`<input\\b([^>]*\\bid=['"]${fileInputId.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}['"][^>]*)>`, 'i');
  markup = markup.replace(fileInputPattern, (_match, attributes) => {
    const cleaned = attributes.replace(/\saria-label=['"][^'"]*['"]/gi, '');
    return `<input${cleaned} aria-label="Image file">`;
  });

  markup = markup
    .replace(/class=(['"])([^'"]*\bcontrols-section\b[^'"]*)\1/gi, (_m, q, c) => `class=${q}${c} image-controls-panel${q}`)
    .replace(/class=(['"])([^'"]*\bpreview-section\b[^'"]*)\1/gi, (_m, q, c) => `class=${q}${c} image-preview-grid${q}`)
    .replace(/class=(['"])([^'"]*\bactions-section\b[^'"]*)\1/gi, (_m, q, c) => `class=${q}${c} image-result-actions${q}`)
    .replace(/class=(['"])([^'"]*\bbefore-img\b[^'"]*)\1/gi, (_m, q, c) => `class=${q}${c} image-preview-card image-preview-card--original${q}`)
    .replace(/class=(['"])([^'"]*\bafter-img\b[^'"]*)\1/gi, (_m, q, c) => `class=${q}${c} image-preview-card image-preview-card--result${q}`);

  markup = markup.replace(/<img\b([^>]*\bid=['"]([^'"]+)['"][^>]*)>/gi, (_match, attributes, id) => {
    const isResult = /(?:after|result)/i.test(id);
    const cleaned = attributes
      .replace(/\salt=['"][^'"]*['"]/gi, '')
      .replace(/\sclass=['"]([^'"]*)['"]/i, (_m, classes) => ` class="${classes} image-preview-media"`);
    const withClass = /\bclass=/i.test(cleaned) ? cleaned : `${cleaned} class="image-preview-media"`;
    return `<img${withClass} alt="${isResult ? 'Processed image preview' : 'Original image preview'}">`;
  });

  if (slug === 'resize-image') {
    markup = markup
      .replace(/id="img-w" class="form-input"/i, 'id="img-w" class="form-input" min="1" max="12000" inputmode="numeric"')
      .replace(/id="img-h" class="form-input"/i, 'id="img-h" class="form-input" min="1" max="12000" inputmode="numeric"')
      .replace(/<button id="img-download"([^>]*)>Resize & Download<\/button>/i,
        '<div class="image-primary-actions"><button type="button" id="img-download"$1>Resize & Download</button><button type="button" class="btn btn-secondary" data-image-replace>Replace image</button><button type="button" class="btn btn-ghost" data-image-reset>Start over</button></div>');
  }

  markup = markup.replace(/<button(?![^>]*\btype=)([^>]*)>/gi, '<button type="button"$1>');

  const uploadHeader = `<div class="image-upload-header">
    <div><p class="image-workspace-kicker">Image source</p><label class="image-file-label" for="${fileInputId}">Choose or replace an image</label></div>
    <p id="${helpId}" class="image-upload-help">${accepted}. Files stay in this browser while you work.</p>
  </div>`;
  const feedback = `<p id="${statusId}" class="image-workspace-status" role="status" aria-live="polite" tabindex="-1"></p>
  <dl id="${metadataId}" class="image-file-metadata" hidden>
    <div><dt>File</dt><dd data-image-meta="name">—</dd></div>
    <div><dt>Dimensions</dt><dd data-image-meta="dimensions">—</dd></div>
    <div><dt>Size</dt><dd data-image-meta="size">—</dd></div>
    <div><dt>Format</dt><dd data-image-meta="format">—</dd></div>
  </dl>`;

  markup = `<div class="image-tool" data-image-tool="${slug}" data-output-format="${outputFormats[slug] || 'Image'}">
    ${uploadHeader}${feedback}${markup}
  </div>`;

  return { ...tool, toolHTML: markup };
};

const sharedRuntime = (slug) => `
;(() => {
  const root = document.querySelector('[data-image-tool="${slug}"]');
  if (!root) return;
  const fileInput = root.querySelector('input[type="file"]');
  const dropZone = root.querySelector('.image-upload-zone');
  const status = root.querySelector('.image-workspace-status');
  const metadata = root.querySelector('.image-file-metadata');
  let metadataUrl = '';

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
  window.imageToolFeedback = (message, tone = 'info', requestedSlug = '') => {
    if (requestedSlug && requestedSlug !== '${slug}') return;
    setStatus(message, tone, tone === 'error');
    if (window.showToast && tone !== 'info') window.showToast(message, tone);
  };
  const setMetadata = (file, image) => {
    metadata.hidden = false;
    metadata.querySelector('[data-image-meta="name"]').textContent = file.name || 'Pasted image';
    metadata.querySelector('[data-image-meta="dimensions"]').textContent = image.naturalWidth + ' × ' + image.naturalHeight + ' px';
    metadata.querySelector('[data-image-meta="size"]').textContent = formatBytes(file.size);
    metadata.querySelector('[data-image-meta="format"]').textContent = (file.type || 'image').replace('image/', '').toUpperCase();
    root.dataset.hasImage = 'true';
    setStatus('Image ready. Adjust the controls or download the result.', 'success');
  };
  const clearExperience = (keepStatus = false) => {
    if (metadataUrl) URL.revokeObjectURL(metadataUrl);
    metadataUrl = '';
    metadata.hidden = true;
    root.removeAttribute('data-has-image');
    root.querySelectorAll('.image-preview-media').forEach((image) => {
      image.removeAttribute('src');
    });
    if (!keepStatus) setStatus('Choose an image to begin.', 'info');
  };
  const acceptsFile = (file) => {
    if (!file || file.size === 0) return 'The selected file is empty. Choose a valid image.';
    if (!file.type || !file.type.startsWith('image/')) return 'That file is not a supported image.';
    if (/image\\/jpeg/.test(fileInput.accept) && !/image\\/\*/.test(fileInput.accept) && file.type !== 'image/jpeg') {
      return 'Choose a JPG or JPEG image for this converter.';
    }
    return '';
  };
  const inspectFile = (file) => {
    const validationError = acceptsFile(file);
    if (validationError) {
      clearExperience(true);
      fileInput.value = '';
      setStatus(validationError, 'error', true);
      return false;
    }
    setStatus('Reading image…', 'info');
    if (metadataUrl) URL.revokeObjectURL(metadataUrl);
    metadataUrl = URL.createObjectURL(file);
    const probe = new Image();
    probe.onload = () => {
      setMetadata(file, probe);
      URL.revokeObjectURL(metadataUrl);
      metadataUrl = '';
    };
    probe.onerror = () => {
      clearExperience(true);
      fileInput.value = '';
      setStatus('This image could not be decoded. Try a different file.', 'error', true);
      URL.revokeObjectURL(metadataUrl);
      metadataUrl = '';
    };
    probe.src = metadataUrl;
    return true;
  };

  root.addEventListener('change', (event) => {
    if (event.target !== fileInput || !fileInput.files.length) return;
    if (!inspectFile(fileInput.files[0])) event.stopImmediatePropagation();
  }, true);
  root.addEventListener('drop', (event) => {
    const file = event.dataTransfer && event.dataTransfer.files[0];
    if (file && !inspectFile(file)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  window.addEventListener('paste', (event) => {
    const item = Array.from(event.clipboardData?.items || []).find((candidate) => candidate.type.startsWith('image/'));
    if (item) inspectFile(item.getAsFile());
  });

  dropZone.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fileInput.click();
    }
  });
  fileInput.addEventListener('click', () => {
    // Selecting the same filename again must still count as a replacement.
    fileInput.value = '';
  });
  ['dragenter', 'dragover'].forEach((name) => dropZone.addEventListener(name, () => dropZone.classList.add('is-dragging')));
  ['dragleave', 'drop'].forEach((name) => dropZone.addEventListener(name, () => dropZone.classList.remove('is-dragging')));

  root.querySelectorAll('input[type="range"]').forEach((range) => {
    const updateRangeValue = () => range.setAttribute('aria-valuetext', range.value);
    updateRangeValue();
    range.addEventListener('input', updateRangeValue);
  });

  root.querySelectorAll('.image-preview-card').forEach((card) => {
    const image = card.querySelector('img');
    if (!image) return;
    let detail = card.querySelector('.image-preview-detail');
    if (!detail) {
      detail = document.createElement('p');
      detail.className = 'image-preview-detail';
      card.appendChild(detail);
    }
    image.addEventListener('load', () => {
      const size = card.querySelector('h4 span')?.textContent || '';
      const format = card.classList.contains('image-preview-card--result') ? root.dataset.outputFormat : 'Original';
      detail.textContent = image.naturalWidth + ' × ' + image.naturalHeight + ' px · ' + format + (size ? ' · ' + size : '');
      if (card.classList.contains('image-preview-card--result')) setStatus('Result preview updated and ready to download.', 'success');
    });
  });

  root.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.id === 'img-download') {
      const width = Number(root.querySelector('#img-w')?.value);
      const height = Number(root.querySelector('#img-h')?.value);
      if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 12000 || height > 12000) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setStatus('Enter whole-number dimensions between 1 and 12,000 pixels.', 'error', true);
        return;
      }
      setStatus('Preparing the resized image download…', 'info');
    }
    if (/btnDownload|jp-convert/.test(target.id)) {
      setStatus('Preparing your image download…', 'info');
      setTimeout(() => setStatus('Download started. Your image remains available for another export.', 'success'), 350);
    }
    if (target.matches('[data-image-replace]')) fileInput.click();
    if (target.matches('[data-image-reset], [id^="btnReset_"], #jp-reset')) {
      fileInput.value = '';
      clearExperience();
      const workspace = root.querySelector('#img-workspace, #jp-workspace');
      if (workspace) workspace.style.display = 'none';
      dropZone.style.display = '';
      dropZone.focus({ preventScroll: true });
    }
  }, true);

  setStatus('Choose an image to begin.', 'info');
})();`;

const enhanceImageTool = (tool) => {
  const enhanced = enhanceImageMarkup(tool);
  let script = enhanced.toolScript || '';
  script = script
    .split('alert("Please select an image file")').join(`window.imageToolFeedback('Please select a supported image file.', 'error', '${tool.slug}')`)
    .split('alert("Image copied to clipboard!")').join(`window.imageToolFeedback('Image copied to clipboard.', 'success', '${tool.slug}')`)
    .split('alert("Failed to copy image: " + err)').join(`window.imageToolFeedback('The image could not be copied in this browser.', 'error', '${tool.slug}')`)
    .replace(/URL\.revokeObjectURL\(url\);/g, 'setTimeout(() => URL.revokeObjectURL(url), 1000);');
  if (/function processImage\(\)/.test(script)) {
    script = script
      .replace('let resetTool = null;', `let resetTool = null;
    let imageRenderFrame = 0;
    const scheduleImageProcessing = () => {
        if (imageRenderFrame) cancelAnimationFrame(imageRenderFrame);
        imageRenderFrame = requestAnimationFrame(() => {
            imageRenderFrame = 0;
            processImage();
        });
    };`)
      .replace('qSlider.addEventListener(\'input\', () => { qVal.textContent = qSlider.value; processImage(); });', 'qSlider.addEventListener(\'input\', () => { qVal.textContent = qSlider.value; scheduleImageProcessing(); });')
      .replace('blurSlider.addEventListener(\'input\', () => { blurVal.textContent = blurSlider.value; processImage(); });', 'blurSlider.addEventListener(\'input\', () => { blurVal.textContent = blurSlider.value; scheduleImageProcessing(); });')
      .replace(/(\[(?:bgType|wmT)[\s\S]*?\.forEach\(el => el\.addEventListener\('input', \(\) => \{[\s\S]*?)processImage\(\);(\s*\}\)\);)/, '$1scheduleImageProcessing();$2');
  }
  return { ...enhanced, toolScript: `${script}\n${sharedRuntime(tool.slug)}` };
};

module.exports = enhanceImageTool;
