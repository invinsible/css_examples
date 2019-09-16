const seacrhAnimation = function() {
    const searchInput = document.querySelector('.search__input');
    const searchLabel = document.querySelector('.search__label');
    const searchClose = document.querySelector('.search__close');

    searchLabel.addEventListener('click', function(){
        searchInput.classList.add('open');
        searchClose.style.cssText = 'opacity: 1; pointer-events: all';        
    });

    searchClose.addEventListener('click', function(){
        searchInput.classList.remove('open');
        this.style.cssText = 'opacity: 0; pointer-events: none';    
    });
};

seacrhAnimation();

