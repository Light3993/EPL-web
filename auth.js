// Gestion de l'authentification
import { auth, db } from '../firebase-config.js';

class Auth {
    constructor() {
        this.checkAuth();
        this.setupLogout();
    }

    checkAuth() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                window.location.href = '/index.html';
                return;
            }
            this.loadUserProfile(user);
        });
    }

    async loadUserProfile(user) {
        try {
            const doc = await db.collection('etudiants').doc(user.uid).get();
            if (doc.exists) {
                const data = doc.data();
                document.getElementById('userName').textContent = `${data.nom} ${data.prenoms}`;
                document.getElementById('userPhoto').src = data.photoURL || 'assets/placeholder.png';
            }
        } catch (error) {
            console.error('Erreur lors du chargement du profil:', error);
        }
    }

    setupLogout() {
        document.getElementById('logoutBtn').addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await auth.signOut();
                window.location.href = '/index.html';
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
            }
        });
    }
}

export const authManager = new Auth();