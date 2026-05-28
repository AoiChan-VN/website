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
  };

  toggle.addEventListener(
    'click',
    () => {

      overlay.classList.add(
        'mobile-overlay-active'
      );

      document.body.style.overflow =
        'hidden';
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
