// script.js
// Ce fichier contient la logique principale du jeu "Devine la Plateforme!".

let currentPerson = null;
let score = 0;
let totalQuestions = 0;
let answered = false; // Pour empêcher les clics multiples sur la même question

// Éléments du DOM
const personImageElement = document.getElementById('person-image');
const personNameElement = document.getElementById('person-name');
const personHintElement = document.getElementById('person-hint');
const interpolBtn = document.getElementById('Interpol-btn'); // Renommé en camelCase pour la cohérence
const linkedinBtn = document.getElementById('LinkedIn-btn'); // ID corrigé ici
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextPersonBtn = document.getElementById('next-person-btn');
const platformLinkElement = document.getElementById('platform-link');

// La variable 'personalities' est maintenant disponible ici car elle est importée
// via <script src="personalities.js"></script> dans index.html AVANT ce script.
let availablePersonalities = [...personalities]; // Crée une copie pour la modifier sans affecter la liste originale

/**
 * Charge une nouvelle personnalité aléatoire parmi les personnalités disponibles.
 */
function loadNewPerson() {
    resetGameUI();

    if (availablePersonalities.length === 0) {
        personNameElement.textContent = "Partie terminée !";
        personHintElement.textContent = `Plus de personnalités disponibles. Votre score final est ${score} / ${totalQuestions}.`;
        disableButtons();
        nextPersonBtn.style.display = 'none';
        personImageElement.style.display = 'none'; // Cache l'image à la fin du jeu
        return;
    }

    const randomIndex = Math.floor(Math.random() * availablePersonalities.length);
    currentPerson = availablePersonalities.splice(randomIndex, 1)[0];

    personNameElement.textContent = currentPerson.name;
    personHintElement.textContent = currentPerson.hint || "";
    
    // Définit la source de l'image et la rend visible
    if (currentPerson.imageUrl) {
        personImageElement.src = currentPerson.imageUrl;
        personImageElement.alt = `Photo de ${currentPerson.name}`;
        personImageElement.style.display = 'block'; // Assure que l'image est visible
    } else {
        personImageElement.style.display = 'none'; // Cache l'image si pas d'URL
    }

    enableButtons();
    totalQuestions++;
    updateScoreDisplay();
}

/**
 * Vérifie la réponse de l'utilisateur par rapport à la bonne plateforme.
 * @param {string} chosenPlatform La plateforme choisie par l'utilisateur ('Interpol' ou 'Linkdin').
 */
function checkAnswer(chosenPlatform) {
    if (answered || !currentPerson) return;

    answered = true;
    disableButtons();

    // Crée le lien vers la plateforme si l'URL est disponible
    if (currentPerson.url) {
        // La couleur du lien sera différente selon la plateforme choisie
        let linkColor = '';
        if (currentPerson.platform === 'Interpol') {
            linkColor = '#6441a5'; // Ou une couleur plus appropriée pour Interpol si vous en avez une
        } else if (currentPerson.platform === 'LinkedIn') {
            linkColor = '#0077B5'; // Couleur LinkedIn
        }
        
        let linkText = `Voir la page ${currentPerson.platform}`;
        platformLinkElement.innerHTML = `<a href="${currentPerson.url}" target="_blank" style="color: ${linkColor}; text-decoration: none; font-weight: bold; transition: color 0.3s ease;">${linkText}</a>`;
        platformLinkElement.style.display = 'block';
    } else {
        platformLinkElement.innerHTML = '';
        platformLinkElement.style.display = 'none';
    }

    if (chosenPlatform === currentPerson.platform) {
        feedbackElement.textContent = "Correct ! 🎉";
        feedbackElement.style.color = "#28a745";
        score++;
    } else {
        feedbackElement.textContent = `Faux ! La bonne réponse était : ${currentPerson.platform}. 😢`;
        feedbackElement.style.color = "#dc3545";
    }
    updateScoreDisplay();
    nextPersonBtn.style.display = 'block';
}

/**
 * Met à jour l'affichage du score.
 */
function updateScoreDisplay() {
    scoreElement.textContent = `Score : ${score} / ${totalQuestions}`;
}

/**
 * Réinitialise l'interface utilisateur pour une nouvelle question.
 */
function resetGameUI() {
    personNameElement.textContent = "Chargement...";
    personHintElement.textContent = "";
    feedbackElement.textContent = "";
    nextPersonBtn.style.display = 'none';
    answered = false;
    platformLinkElement.innerHTML = '';
    platformLinkElement.style.display = 'none';
    personImageElement.src = "";
    personImageElement.alt = "";
    personImageElement.style.display = 'none'; // Cache l'image pendant le chargement
}

/**
 * Désactive les boutons de réponse.
 */
function disableButtons() {
    interpolBtn.disabled = true;
    linkedinBtn.disabled = true;
}

/**
 * Active les boutons de réponse.
 */
function enableButtons() {
    interpolBtn.disabled = false;
    linkedinBtn.disabled = false;
}

// Écouteurs d'événements
interpolBtn.addEventListener('click', () => checkAnswer('Interpol')); // Corrigé ici
linkedinBtn.addEventListener('click', () => checkAnswer('LinkedIn')); // Corrigé ici
nextPersonBtn.addEventListener('click', loadNewPerson);

document.addEventListener('DOMContentLoaded', loadNewPerson);