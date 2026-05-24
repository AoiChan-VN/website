import { openModal }
from '../modal/modal.js';

export function openImagePreview(src) {

  openModal(`
    <div class="aoi-image-preview">

      <img
        src="${src}"
        alt="preview"
      />

    </div>
  `);

} 
