// Système de suggestions
import { auth } from '../firebase-config.js';

class Suggestions {
    constructor() {
        this.form = document.getElementById('suggestionForm');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const suggestion = document.getElementById('suggestionText').value.trim();
        if (!suggestion) return;

        try {
            const user = auth.currentUser;
            await this.sendEmail({
                to: '39lightob@gmail.com',
                subject: 'Nouvelle suggestion étudiant',
                body: `
                    Suggestion de: ${user.displayName}
                    Email: ${user.email}
                    
                    ${suggestion}
                `
            });

            document.getElementById('suggestionText').value = '';
            alert('Suggestion envoyée avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la suggestion:', error);
            alert('Erreur lors de l\'envoi de la suggestion. Veuillez réessayer.');
        }
    }

    async sendEmail({ to, subject, body }) {
        // Utiliser un service d'envoi d'email comme EmailJS ou une fonction Cloud Firebase
        // Pour cet exemple, nous simulerons l'envoi
        console.log('Email envoyé:', { to, subject, body });
    }
}

export const suggestionsManager = new Suggestions();