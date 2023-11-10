/*
I chose to structure the code into distinct modules
for better organization and maintainability.

This module will deal with interactivity for navigation and landing page.
*/

/**
 * Initializes the navigation menu and toggle functionality.
 * @function
 * @param {Event} event - The DOMContentLoaded event.
 */
// Toggle the 'nav-active' class on click for the hamburger menu
document.addEventListener('DOMContentLoaded', function (event) {
    /**
     * Toggles the 'nav-active' class on click for the hamburger menu.
     * @function
     */
    let navMenu = document.getElementById('navMenu');
    let navToggle = document.getElementById('navToggle');
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-active');
    });

    // Attach the navigateToScreen or openModal depending on class of navigation link
    let navLinks = document.getElementsByClassName('nav-link');
    Array.from(navLinks).forEach(function (link) {
        if (link.classList.contains('modal-trigger')) {
            link.addEventListener('click', openModal);
        } else {
            link.addEventListener('click', navigateToScreen);
        }
    });

    // querySelector to select all modal trigger element, i.e. nav-link, button on main & play
    let modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });
});


/**
 * Function to navigate to the appropriate screen
 * @param {Event} event - The click event when a navigation link is clicked.
 */
function navigateToScreen(event) {
    event.preventDefault(); // Prevent default anchor click behavior

    // Close the hamburger menu if it's open
    navMenu.classList.remove('nav-active');

    // Get the target screen based on the clicked link's href
    let targetId = event.target.getAttribute('href');
    let targetScreen = document.getElementById(targetId.substring(1)); // Remove the '#' character from the ID

    // Hide all screens and show the target screen
    let screens = document.getElementsByClassName('screen');
    Array.from(screens).forEach(function (screen) {
        screen.classList.remove('active');
    });
    targetScreen.classList.add('active');
};

let modal = document.getElementById('instructionsModal');
let closeButton = document.querySelector('.close');
// Function to open modal
function openModal() {
    // Close the hamburger menu if it's open
    navMenu.classList.remove('nav-active');
    modal.style.display = 'block';
}
// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}
// Event listener to close modal when clicking on the close button
closeButton.addEventListener('click', closeModal);
// Event listener to close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function initializeGame() {
    initializeGameState(); // Initialize game state
    loadSavedGameData(); // Load saved game data, if any
    initializeUIElements(); // Setup initial state of UI elements
    setupChoiceListeners(); // Setup UI listeners for player choices
}
document.addEventListener('DOMContentLoaded', initializeGame);