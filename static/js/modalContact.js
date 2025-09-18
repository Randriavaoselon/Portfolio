  // Sélection des éléments
        const modal = document.querySelector('.modal');
        const btnOpenModal = document.querySelector('.btn-open-modal');
        const btnCloseModal = document.querySelector('.close-btn');
        const contactForm = document.getElementById('contact-form');
        
        // Ouvrir le modal
        btnOpenModal.addEventListener('click', () => {
            modal.classList.add('active');
        });
        
        // Fermer le modal
        btnCloseModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Fermer le modal en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Gérer la soumission du formulaire
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            // Ici vous pouvez traiter les données (envoyer à un serveur, etc.)
            console.log('Email:', email);
            console.log('Téléphone:', phone);
            
            // Afficher un message de confirmation
            alert('Merci ! Vos informations ont été envoyées.');
            
            // Fermer le modal
            modal.classList.remove('active');
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });