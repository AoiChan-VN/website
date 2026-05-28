import {
  updateSceneState
} from '../core/state.js';

export function initializeMobileMenu(){

  const toggle =
    document.querySelector(
      '.mobile-menu-toggle'
    );

  const overlay =
    document.querySelector(
      '.mobile-overlay'
    );

  if(
    !toggle ||
    !overlay
  ){
    return;
  }

  const closeMenu = () => {

    overlay.classList.remove(
      'mobile-overlay-active'
    );

    document.body.style.overflow = '';

    toggle.setAttribute(
      'aria-expanded',
      'false'
    );

    updateSceneState(
      'menuOpen',
      false
    );
  };

  toggle.addEventListener(
    'click',
    () => {

      const isOpen =
        overlay.classList.contains(
          'mobile-overlay-active'
        );

      if(isOpen){

        closeMenu();

        return;
      }

      overlay.classList.add(
        'mobile-overlay-active'
      );

      document.body.style.overflow =
        'hidden';

      toggle.setAttribute(
        'aria-expanded',
        'true'
      );

      updateSceneState(
        'menuOpen',
        true
      );
    }
  );

  overlay.addEventListener(
    'click',
    (event) => {

      if(
        event.target !== overlay
      ){
        return;
      }

      closeMenu();
    }
  );

  window.addEventListener(
    'keydown',
    (event) => {

      if(event.key !== 'Escape'){
        return;
      }

      closeMenu();
    }
  );

  const links = [
    ...document.querySelectorAll(
      '.mobile-navigation-link'
    )
  ];

  for(const link of links){

    link.addEventListener(
      'click',
      closeMenu
    );
  }
}
