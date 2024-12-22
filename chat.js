// Système de chat
import { db, auth, storage } from '../firebase-config.js';

class Chat {
    constructor() {
        this.messagesContainer = document.getElementById('messages');
        this.messageInput = document.getElementById('messageInput');
        this.fileInput = document.getElementById('fileInput');
        this.sendButton = document.getElementById('sendMessage');
        
        this.setupEventListeners();
        this.loadMessages();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    async loadMessages() {
        try {
            db.collection('messages')
                .orderBy('timestamp', 'desc')
                .limit(50)
                .onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            this.renderMessage(change.doc.data());
                        }
                    });
                });
        } catch (error) {
            console.error('Erreur lors du chargement des messages:', error);
        }
    }

    async sendMessage() {
        const content = this.messageInput.value.trim();
        if (!content) return;

        try {
            const user = auth.currentUser;
            await db.collection('messages').add({
                content,
                userId: user.uid,
                userName: user.displayName,
                timestamp: new Date(),
                type: 'text'
            });
            
            this.messageInput.value = '';
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
        }
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const user = auth.currentUser;
            const fileRef = storage.ref(`chat/${Date.now()}_${file.name}`);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();

            await db.collection('messages').add({
                content: url,
                userId: user.uid,
                userName: user.displayName,
                timestamp: new Date(),
                type: file.type.startsWith('image/') ? 'image' : 'file',
                fileName: file.name
            });
        } catch (error) {
            console.error('Erreur lors de l\'upload du fichier:', error);
        }
    }

    renderMessage(message) {
        const div = document.createElement('div');
        div.className = `message ${message.userId === auth.currentUser.uid ? 'sent' : 'received'}`;
        
        switch (message.type) {
            case 'image':
                div.innerHTML = `
                    <strong>${message.userName}</strong><br>
                    <img src="${message.content}" alt="Image partagée" style="max-width: 200px;">
                `;
                break;
            case 'file':
                div.innerHTML = `
                    <strong>${message.userName}</strong><br>
                    <a href="${message.content}" target="_blank">${message.fileName}</a>
                `;
                break;
            default:
                div.innerHTML = `
                    <strong>${message.userName}</strong><br>
                    ${message.content}
                `;
        }
        
        this.messagesContainer.insertBefore(div, this.messagesContainer.firstChild);
    }
}

export const chatManager = new Chat();