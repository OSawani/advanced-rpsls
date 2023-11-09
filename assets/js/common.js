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

    // Attach the navigateToScreen function to each navigation link
    let navLinks = document.getElementsByClassName('nav-link');
    Array.from(navLinks).forEach(function (link) {
        link.addEventListener('click', navigateToScreen);
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

