// Point d'entrée principal du dashboard
import { authManager } from './auth.js';
import { announcementsManager } from './announcements.js';
import { coursesManager } from './courses.js';
import { chatManager } from './chat.js';
import { suggestionsManager } from './suggestions.js';

// Gestion de la navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.target.id === 'logoutBtn') return;
        
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        
        // Mise à jour de la classe active
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        e.target.classList.add('active');
        
        // Affichage de la section correspondante
        document.querySelectorAll('section').forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
    });
});