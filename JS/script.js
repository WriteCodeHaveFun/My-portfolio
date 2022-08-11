document.addEventListener('click', onClick);
document.addEventListener('scroll', onScroll);
window.addEventListener('load', onLoad);
window.addEventListener('unload', onUnload);

let animatedElements = document.querySelectorAll('.animate');
let mainLights = document.querySelectorAll('.main-light');
let showOnLoad = document.querySelectorAll('.show-on-load');
let showLater = document.querySelectorAll('.show-later');
let reposition = document.querySelectorAll('.reposition');
let firstTimeShow = document.querySelectorAll('.prep-for-show');
let otherTheme = document.querySelectorAll('.other-theme');

let showEffectSections = document.querySelectorAll('.show-effect');

animatedElements.forEach(function(elem){
    elem.classList.remove('animate');
});

function onClick(e){
    if(e.target.closest('div.toggle-menu')){
        if(e.target.tagName !== 'INPUT') return;
        if(e.target.closest('input').checked){
            document.querySelector('.mobile-menu').classList.add('show');
        } else {
            document.querySelector('.mobile-menu').classList.remove('show');
        }
    }
    
    if(e.target.closest('[data-theme-toggler]')) {
        e.preventDefault();
        otherTheme.forEach(elem => elem.classList.toggle('other-theme'));
    }
}

function onScroll(){
    
    if(document.querySelector('section.about-me').getBoundingClientRect().top < window.innerHeight - 200){
        reposition.forEach(elem => {
            elem.style.left = '-100%';
        });
    } else{
        mainLights.forEach(elem => elem.style = '');
    }

    if(document.querySelector('section.about-me').getBoundingClientRect().top < 1){
        showLater.forEach(elem => {
            if(elem.getBoundingClientRect().top < window.innerHeight - elem.clientHeight*0.4){
                elem.classList.remove(elem.dataset.scroll);  
            } 
        });
        document.querySelector('.toggle-menu').classList.add('show');
        document.querySelector('.toggle-menu-container').classList.add('show');
        document.querySelector('.decktop-menu-container').classList.add('show');
    } else{
        showLater.forEach(elem => {
            if(elem.getBoundingClientRect().top < window.innerHeight - elem.clientHeight*0.4){
                elem.classList.add(elem.dataset.scroll);  
            } 
        });
        document.querySelector('.toggle-menu').classList.remove('show');
        document.querySelector('.mobile-menu').classList.remove('show');
        document.querySelector('.toggle-menu-container').classList.remove('show');
        document.querySelector('.decktop-menu-container').classList.remove('show');
        clearInputCheckboxes();
    }

    showEffectSections.forEach((elem) => {
        if(!(elem.getBoundingClientRect().top < window.innerHeight*0.3 && elem.getBoundingClientRect().top > -elem.clientHeight)) return;
        mainLights.forEach(lightElem => {
            if(lightElem.classList.contains('reposition')){
                lightElem.style.transform = `translateY(${Math.floor(elem.getBoundingClientRect().top - lightElem.parentElement.getBoundingClientRect().top - window.innerHeight + 90)}px)`;
                return;
            }
            lightElem.style.transform = `translateY(${Math.floor(elem.getBoundingClientRect().top - lightElem.parentElement.getBoundingClientRect().top)}px)`;
        });

        animatedElements.forEach(function(animatedElem){
            if(!elem.contains(animatedElem)) return;
            animatedElem.classList.add('animate');
            if(animatedElem.hasAttribute('data-connected-to')) adaptElem(animatedElem);
        });
    });

    firstTimeShow.forEach(elem => {
        if(elem.getBoundingClientRect().top < window.innerHeight){
            elem.classList.remove('prep-for-show');
        }
    });
}

function onLoad(){
    showOnLoad.forEach(elem => {
        elem.classList.remove(elem.dataset.scroll);
    })
}

function onUnload(){
    clearInputCheckboxes();
}



// ***support functions
function adaptElem(elem){
    let relativeElem = document.querySelector(elem.dataset.connectedTo);
    if(elem.classList.contains('horizontal') || elem.classList.contains('vertical')){
        if(elem.hasAttribute('style'))return;
        elem.style.top = (relativeElem.getBoundingClientRect().top) - elem.parentElement.getBoundingClientRect().top + 'px';
        if(elem.classList.contains('vertical')){
            elem.style.height = relativeElem.clientHeight + parseInt(window.getComputedStyle(relativeElem).marginBottom) + 'px';
        }
    }
    if(elem.classList.contains('first')){
        if(elem.hasAttribute('style'))return;
        elem.style.height = relativeElem.getBoundingClientRect().top - elem.parentElement.getBoundingClientRect().top + 'px';
    }
}

function clearInputCheckboxes(){
    let inputs = document.querySelectorAll('input[type=checkbox]');
    for(let i = 0; i < inputs.length; i++){
      inputs[i].checked = false;
    }
}
// ***end of support functions



// ***Animation settings
function animate({timing, draw, duration}, funcOnAnimationEnd) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);
  
      draw(progress); // отрисовать её
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
      if(progress == 1) {
        if(funcOnAnimationEnd) funcOnAnimationEnd();
      }
  
    });
  
  }
  
function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
}
  // ***end of animation settings