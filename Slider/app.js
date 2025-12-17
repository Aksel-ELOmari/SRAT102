let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time'); 

let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item'); 
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

let timeRunning = 3000;
let runTimeOut;

nextDom.onclick = function(){
    showSlider('next');
}

prevDom.onclick = function(){
    showSlider('prev');
}

thumbnailItemsDom.forEach((item, index) => {
    item.addEventListener('click', () => {
        showSliderSelected(index);
    });
});

function showSlider(type){
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    applyTransitionFix();
}

function showSliderSelected(index){
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    const currentActiveIndex = 0; 
    const requiredMoves = index - currentActiveIndex; 

    if (requiredMoves === 0) return; 

    if (requiredMoves > 0) {
        for (let i = 0; i < requiredMoves; i++) {
            SliderDom.appendChild(SliderItemsDom[i]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[i]);
        }
        carouselDom.classList.add('next');
    } else {
        for (let i = 0; i < Math.abs(requiredMoves); i++) {
            SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
            thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        }
        carouselDom.classList.add('prev');
    }
    applyTransitionFix();
}

function applyTransitionFix(){
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
}
