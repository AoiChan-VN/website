import { AOI_CONFIG } from './config.js';
import { AOI_STATE } from './state.js';
import { loadJSON } from './loader.js';

import { renderLayout } from '../modules/layout/layout.js';
import { renderCards } from '../modules/cards/cards.js';

async function boot() {

  const app = document.querySelector(
    AOI_CONFIG.selectors.app
  );

  renderLayout(app);

  AOI_STATE.categories = await loadJSON(
    AOI_CONFIG.paths.tree
  );

  renderCards(
    document.querySelector('#aoi-content'),
    AOI_STATE.categories
  );
}

boot(); 
