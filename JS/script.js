// script.js

// Inscription
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const age = parseInt(document.getElementById('registerAge').value, 10);

    if (localStorage.getItem(email)) {
        alert('Cet email est déjà utilisé.');
        return;
    }

    const user = { name, email, password, age };
    localStorage.setItem(email, JSON.stringify(user));
    alert('Inscription réussie ! Connectez-vous.');
    window.location.href = 'connexion.html';
});

// Connexion
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
        sessionStorage.setItem('currentUser', email);
        if (user.age >= 18) {
            window.location.href = 'adulte.html';
        } else {
            window.location.href = 'enfant.html';
        }
    } else {
        alert('Email ou mot de passe incorrect');
    }
});

// Affichage du nom sur adulte/enfant.html
window.addEventListener('DOMContentLoaded', function() {
    const welcome = document.getElementById('welcome');
    if (welcome) {
        const email = sessionStorage.getItem('currentUser');
        if (!email) {
            window.location.href = 'connexion.html';
            return;
        }
        const user = JSON.parse(localStorage.getItem(email));
        welcome.textContent = `Bonjour, ${user.name} (${user.age} ans)`;
    }
});

// Déconnexion
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'connexion.html';
}