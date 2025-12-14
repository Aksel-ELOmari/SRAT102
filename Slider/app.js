// step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let pauseDom = document.getElementById('pause'); 

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time'); 

// Récupère la liste complète des vignettes au début
// NOTE : Il est préférable de redéfinir thumbnailItemsDom après l'initialisation pour garantir la liste complète
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item'); 
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

let timeRunning = 3000;
let runTimeOut;
let isPaused = false; 

// --- GESTION DES BOUTONS DE CONTRÔLE ---

nextDom.onclick = function(){
    showSlider('next');
    if (isPaused) {
        isPaused = false;
        pauseDom.textContent = '||'; 
    }
}

prevDom.onclick = function(){
    showSlider('prev');
    if (isPaused) {
        isPaused = false;
        pauseDom.textContent = '||'; 
    }
}

pauseDom.onclick = function() {
    isPaused = !isPaused; 
    if (isPaused) {
        clearTimeout(runTimeOut); 
        pauseDom.textContent = '▶'; 
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
        carouselDom.classList.add('paused'); 
    } else {
        carouselDom.classList.remove('paused');
        pauseDom.textContent = '||'; 
    }
}

// --- NOUVELLE LOGIQUE : NAVIGATION PAR VIGNETTE ---
// Ajout d'un écouteur d'événement à chaque vignette pour la navigation
thumbnailItemsDom.forEach((item, index) => {
    item.addEventListener('click', () => {
        showSliderSelected(index);
    });
});
// --- FIN NOUVELLE LOGIQUE ---


// --- FONCTIONS DE DÉPLACEMENT DU SLIDER ---

// Fonction pour les clics 'next' et 'prev'
function showSlider(type){
    if (isPaused) {
        isPaused = false;
        carouselDom.classList.remove('paused');
        pauseDom.textContent = '||';
    }

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

// Fonction pour le clic sur une vignette spécifique
function showSliderSelected(index){
    // Sortir de la pause si nécessaire
    if (isPaused) {
        isPaused = false;
        carouselDom.classList.remove('paused');
        pauseDom.textContent = '||';
    }
    
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    // Calculer la direction et le nombre de pas
    const currentActiveIndex = 0; // L'élément actif est toujours le premier
    const requiredMoves = index - currentActiveIndex; 

    if (requiredMoves === 0) return; // Si c'est l'élément actif, ne rien faire

    // Logique de déplacement (similaire à 'next' ou 'prev' mais pour un nombre de pas)
    if (requiredMoves > 0) { // Déplacement vers l'avant (Next)
        for (let i = 0; i < requiredMoves; i++) {
            SliderDom.appendChild(SliderItemsDom[i]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[i]);
        }
        carouselDom.classList.add('next');
    } else { // Déplacement vers l'arrière (Prev)
        for (let i = 0; i < Math.abs(requiredMoves); i++) {
            // Prendre le dernier élément et le mettre au début
            SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
            thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        }
        carouselDom.classList.add('prev');
    }

    applyTransitionFix();
}

// Fonction utilitaire pour gérer la fin des transitions
function applyTransitionFix(){
    // Gère la fin de la transition CSS (supprime les classes 'next'/'prev')
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
}
