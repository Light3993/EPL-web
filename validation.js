// Validation en temps réel
const validators = {
    nom: (value) => value.length >= 2,
    prenoms: (value) => value.length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    telephone: (value) => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value),
    password: (value) => value.length >= 6
};

export function validateField(fieldName, value) {
    if (validators[fieldName]) {
        return validators[fieldName](value);
    }
    return true;
}

export function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}