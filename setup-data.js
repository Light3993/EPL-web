// Script pour ajouter des données test dans Firebase
import { db, storage } from '../firebase-config.js';

// Ajout d'annonces test
async function addTestAnnouncements() {
    const announcements = [
        {
            titre: "Rentrée académique 2024",
            contenu: "La rentrée académique est prévue pour le 15 janvier 2024.",
            date: new Date()
        },
        {
            titre: "Examens partiels",
            contenu: "Les examens partiels débuteront le 1er mars 2024.",
            date: new Date()
        }
    ];

    for (const announcement of announcements) {
        await db.collection('annonces').add(announcement);
    }
}

// Ajout de cours test
async function addTestCourses() {
    const courses = [
        {
            titre: "Introduction à l'Intelligence Artificielle",
            description: "Fondamentaux de l'IA et apprentissage automatique",
            pdfUrl: "https://example.com/cours-ia.pdf"
        },
        {
            titre: "Logistique internationale",
            description: "Principes de la logistique et transport international",
            pdfUrl: "https://example.com/cours-logistique.pdf"
        }
    ];

    for (const course of courses) {
        await db.collection('cours').add(course);
    }
}

// Exécution
async function setupTestData() {
    try {
        await addTestAnnouncements();
        await addTestCourses();
        console.log('Données test ajoutées avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout des données:', error);
    }
}