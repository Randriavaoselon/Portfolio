document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.image-slider');
    const slides = document.querySelectorAll('.slide');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const indicators = document.querySelectorAll('.indicator');

    let currentSlide = 0;
    const slideCount = slides.length;

    // Fonction pour mettre à jour le slider
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Mettre à jour les indicateurs
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Gestion de l'état des boutons
        leftBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        rightBtn.style.opacity = currentSlide === slideCount - 1 ? '0.5' : '1';
    }

    // Événements pour les boutons
    leftBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    rightBtn.addEventListener('click', () => {
        if (currentSlide < slideCount - 1) {
            currentSlide++;
            updateSlider();
        }
    });

    // Événements pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            leftBtn.click();
        } else if (e.key === 'ArrowRight') {
            rightBtn.click();
        }
    });

    // Swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const sliderWrapper = document.querySelector('.image-slider-wrapper');

    sliderWrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    sliderWrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe gauche
            rightBtn.click();
        }

        if (touchEndX > touchStartX + 50) {
            // Swipe droite
            leftBtn.click();
        }
    }

    // Initialisation
    updateSlider();
});