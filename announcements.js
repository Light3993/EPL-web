// Gestion des annonces
import { db } from '../firebase-config.js';

class Announcements {
    constructor() {
        this.container = document.getElementById('announcements-container');
        this.loadAnnouncements();
    }

    async loadAnnouncements() {
        try {
            const snapshot = await db.collection('annonces')
                .orderBy('date', 'desc')
                .limit(10)
                .get();

            this.container.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                this.renderAnnouncement(data);
            });
        } catch (error) {
            console.error('Erreur lors du chargement des annonces:', error);
        }
    }

    renderAnnouncement(announcement) {
        const card = document.createElement('div');
        card.className = 'card announcement-card';
        card.innerHTML = `
            <h3>${announcement.titre}</h3>
            <p>${announcement.contenu}</p>
            <small>${new Date(announcement.date).toLocaleDateString()}</small>
        `;
        this.container.appendChild(card);
    }
}

export const announcementsManager = new Announcements();