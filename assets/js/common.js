const NAVMENU = document.getElementById('navMenu');
const NAVTOGGLE = document.getElementById('navToggle');

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
    NAVTOGGLE.addEventListener('click', function () {
        NAVMENU.classList.toggle('nav-active');
    });
});