// Gestion des cours
import { db, storage } from '../firebase-config.js';

class Courses {
    constructor() {
        this.container = document.getElementById('courses-container');
        this.loadCourses();
    }

    async loadCourses() {
        try {
            const snapshot = await db.collection('cours').get();
            
            this.container.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                this.renderCourse(data);
            });
        } catch (error) {
            console.error('Erreur lors du chargement des cours:', error);
        }
    }

    renderCourse(course) {
        const card = document.createElement('div');
        card.className = 'card course-card';
        card.innerHTML = `
            <h3>${course.titre}</h3>
            <p>${course.description}</p>
            <a href="${course.pdfUrl}" class="neon-button" target="_blank">
                Voir le PDF
            </a>
        `;
        this.container.appendChild(card);
    }
}

export const coursesManager = new Courses();