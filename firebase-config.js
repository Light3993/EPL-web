// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDAP-7qQA5PDKYIXpPICH8mvWWrwjywRbw",
    authDomain: "light-web-site-epl.firebaseapp.com",
    projectId: "light-web-site-epl",
    storageBucket: "light-web-site-epl.firebasestorage.app",
    messagingSenderId: "687954621283",
    appId: "1:687954621283:web:10c7f7c58fbe5d72571956",
    measurementId: "G-G83YQRS2NX"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Références aux services Firebase
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Export pour utilisation dans d'autres fichiers
export { auth, db, storage };