 // Script pour l'animation en cascade des trois colonnes
        document.addEventListener('DOMContentLoaded', function () {
            const slider = document.querySelector('.slider');
            let imageColumns = document.querySelectorAll('.image-column');
            const indicators = document.querySelectorAll('.indicator');
            const mainSection = document.getElementById('main-section');
            let isAnimating = false;
            let animationInterval;
            let currentSlide = 0;
            const isMobile = window.innerWidth <= 1100;
            
            // Fonction pour réinitialiser l'apparence des colonnes
            function resetColumns() {
                if (isMobile) {
                    // Pour mobile: utiliser le déplacement horizontal
                    updateSliderPosition();
                    updateIndicators();
                    return;
                }
                
                imageColumns.forEach((col, index) => {
                    col.classList.remove('active', 'animating');
                    col.style.opacity = '1';
                    col.style.transform = 'translateX(0) scale(1)';
                    col.style.zIndex = (imageColumns.length - index).toString();
                });
                // Réactiver la première colonne
                imageColumns[0].classList.add('active');
                imageColumns[0].style.zIndex = (imageColumns.length + 1).toString();
            }

            // Fonction pour mettre à jour la position du slider sur mobile
            function updateSliderPosition() {
                if (!isMobile) return;
                
                const translateX = -currentSlide * (100 / 3);
                slider.style.transform = `translateX(${translateX}%)`;
            }

            // Fonction pour mettre à jour les indicateurs
            function updateIndicators() {
                indicators.forEach((indicator, index) => {
                    if (index === currentSlide) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }

            function animateNextColumn() {
                if (isAnimating) return;
                isAnimating = true;

                if (isMobile) {
                    // Animation pour mobile: défilement horizontal
                    currentSlide = (currentSlide + 1) % imageColumns.length;
                    updateSliderPosition();
                    updateIndicators();
                    
                    // Changer le fond de la section
                    mainSection.style.backgroundImage = `url(${imageColumns[currentSlide].dataset.bg})`;
                    
                    isAnimating = false;
                    return;
                }

                // Trouver la colonne active
                let activeIndex = -1;
                imageColumns.forEach((col, index) => {
                    if (col.classList.contains('active')) {
                        activeIndex = index;
                    }
                });

                if (activeIndex === -1) {
                    isAnimating = false;
                    return;
                }

                const currentColumn = imageColumns[activeIndex];
                const nextIndex = (activeIndex + 1) % imageColumns.length;
                const nextColumn = imageColumns[nextIndex];

                // Mettre la colonne suivante au premier plan
                nextColumn.classList.add('active');
                nextColumn.style.zIndex = (imageColumns.length + 2).toString();

                // Commencer l'animation de la colonne actuelle
                currentColumn.classList.remove('active');
                currentColumn.classList.add('animating');

                // Changer le fond de la section à mi-chemin de l'animation
                setTimeout(() => {
                    mainSection.style.backgroundImage = `url(${currentColumn.dataset.bg})`;
                }, 800);

                // Après l'animation, réinitialiser la colonne et la mettre à l'arrière
                setTimeout(() => {
                    currentColumn.classList.remove('animating');
                    currentColumn.style.opacity = '1';
                    currentColumn.style.transform = 'translateX(0) scale(1)';
                    currentColumn.style.zIndex = '1';

                    // Déplacer la colonne animée à la fin du conteneur
                    slider.appendChild(currentColumn);

                    // Mettre à jour la référence des colonnes
                    imageColumns = document.querySelectorAll('.image-column');
                    
                    // Réorganiser les z-index
                    resetColumns();
                    
                    isAnimating = false;
                }, 2000);
            }

            function startAnimationCycle() {
                // Animation en continu
                const interval = isMobile ? 4000 : 3000;
                animationInterval = setInterval(animateNextColumn, interval);
            }

            // Initialiser
            resetColumns();

            // Démarrer l'animation après un court délai
            setTimeout(startAnimationCycle, 1000);

            // Optionnel: Arrêter l'animation au survol
            const sliderContainer = document.querySelector('.slider-column');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(animationInterval);
            });

            sliderContainer.addEventListener('mouseleave', () => {
                // Redémarrer l'animation
                const interval = isMobile ? 4000 : 3000;
                animationInterval = setInterval(animateNextColumn, interval);
            });

            // Gérer le redimensionnement de la fenêtre
            window.addEventListener('resize', function() {
                const newIsMobile = window.innerWidth <= 1100;
                if (newIsMobile !== isMobile) {
                    // Recharger la page si le mode change
                    window.location.reload();
                }
            });

            // Script pour la scène de fumée
            const starsContainer = document.getElementById('stars');
            
            // Créer des étoiles
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                const size = Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                star.style.animationDelay = `${Math.random() * 4}s`;
                
                starsContainer.appendChild(star);
            }
            
            // Fonction pour créer une particule de fumée avec des variations
            function createSmoke() {
                const smoke = document.createElement('div');
                smoke.classList.add('smoke');
                
                // Variations aléatoires pour un effet naturel
                const size = 15 + Math.random() * 20;
                const startPos = -30 + Math.random() * 60;
                const duration = 8 + Math.random() * 7;
                const delay = Math.random() * 3;
                
                smoke.style.width = `${size}px`;
                smoke.style.height = `${size}px`;
                smoke.style.left = `calc(50% + ${startPos}px)`;
                smoke.style.animationDuration = `${duration}s`;
                smoke.style.animationDelay = `${delay}s`;
                
                // Variations de couleur pour un effet plus réaliste
                const hue = 0; // Blanc
                const saturation = 0; // 0% pour gris
                const lightness = 70 + Math.random() * 25; // 70-95% pour un gris très clair
                const alpha = 0.3 + Math.random() * 0.4; // Transparence variable
                smoke.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
                
                // Ajouter une légère rotation
                smoke.style.transform = `rotate(${-5 + Math.random() * 10}deg)`;
                
                document.querySelector('.smoke-scene').appendChild(smoke);
                
                // Supprimer l'élément après l'animation
                setTimeout(() => {
                    smoke.remove();
                }, (duration + delay) * 1000);
            }
            
            // Démarrer l'animation de fumée avec une densité aléatoire
            function generateSmoke() {
                // Créer entre 1 et 3 particules de fumée à chaque intervalle
                const count = 1 + Math.floor(Math.random() * 3);
                for (let i = 0; i < count; i++) {
                    createSmoke();
                }
                
                // Intervalle aléatoire entre 100 et 500ms pour un effet plus naturel
                const nextInterval = 100 + Math.random() * 400;
                setTimeout(generateSmoke, nextInterval);
            }
            
            // Démarrer la génération de fumée
            generateSmoke();
        });