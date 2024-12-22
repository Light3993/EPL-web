import { auth, db, storage } from './firebase-config.js';
import { validateField, showNotification } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const photoInput = document.getElementById('photo');
    const preview = document.getElementById('preview');
    const modal = document.getElementById('confirmationModal');

    // Prévisualisation de la photo
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Validation en temps réel
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            if (validators[input.id]) {
                const isValid = validateField(input.id, input.value);
                input.style.borderColor = isValid ? 'var(--primary-color)' : 'red';
            }
        });
    });

    // Soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupération des données
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData);

        // Affichage du modal de confirmation
        showConfirmationModal(userData);
    });

    // Gestion du modal de confirmation
    document.getElementById('editBtn').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('confirmBtn').addEventListener('click', async () => {
        try {
            // Création du compte utilisateur
            const userCredential = await auth.createUserWithEmailAndPassword(
                form.email.value,
                form.password.value
            );

            // Upload de la photo
            const photoFile = form.photo.files[0];
            const photoRef = storage.ref(`photos/${userCredential.user.uid}`);
            await photoRef.put(photoFile);
            const photoURL = await photoRef.getDownloadURL();

            // Sauvegarde des données dans Firestore
            await db.collection('etudiants').doc(userCredential.user.uid).set({
                nom: form.nom.value,
                prenoms: form.prenoms.value,
                dateNaissance: form.dateNaissance.value,
                adresse: form.adresse.value,
                telephone: form.telephone.value,
                email: form.email.value,
                filiere: form.filiere.value,
                semestre: form.semestre.value,
                photoURL: photoURL,
                dateInscription: new Date()
            });

            showNotification('Inscription réussie !');
            window.location.href = 'dashboard.html';
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });
});

function showConfirmationModal(userData) {
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `
        <p><strong>Nom:</strong> ${userData.nom}</p>
        <p><strong>Prénoms:</strong> ${userData.prenoms}</p>
        <p><strong>Date de naissance:</strong> ${userData.dateNaissance}</p>
        <p><strong>Adresse:</strong> ${userData.adresse}</p>
        <p><strong>Téléphone:</strong> ${userData.telephone}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Filière:</strong> ${userData.filiere}</p>
        <p><strong>Semestre:</strong> ${userData.semestre}</p>
    `;
    
    document.getElementById('confirmationModal').style.display = 'block';
}