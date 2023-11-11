/**
 * Declare constants for DOM elements
 */
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementsByClassName('nav-link');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const screens = document.getElementsByClassName('screen');
const modal = document.getElementById('instructions-modal');
const closeButton = document.querySelector('.close');


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
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-active');
    });

    // Attach the navigateToScreen or openModal depending on class of navigation link
    Array.from(navLinks).forEach(function (link) {
        link.addEventListener('click', function (event) {
            if (link.classList.contains('modal-trigger')) {
                openModal();
            } else {
                navigateToScreen(event);
            }
        });
    });

    // querySelector to select all modal trigger element, i.e. nav-link, button on main & play
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Event listener for Home button
    document.getElementById('home-button').addEventListener('click', function () {
        navigateToScreenById('main');
    });

    // Event listener for Scoreboard button
    document.getElementById('scoreboard-button').addEventListener('click', function () {
        navigateToScreenById('scoreboard');
    });

    // Initialize the game
    initializeGame();
    setupResetButtonListener();
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
    let targetId = event.currentTarget.getAttribute('href');
    let targetScreen = document.getElementById(targetId.substring(1)); // Remove the '#' character from the ID

    // Hide all screens and show the target screen
    Array.from(screens).forEach(function (screen) {
        screen.classList.remove('active');
    });
    targetScreen.classList.add('active');
};

/**
 * Navigates to a screen based on the given screen ID.
 * @param {string} screenId - The ID of the target screen.
 */
function navigateToScreenById(screenId) {
    let targetScreen = document.getElementById(screenId);

    // Hide all screens and show the target screen
    Array.from(screens).forEach(function (screen) {
        screen.classList.remove('active');
    });
    targetScreen.classList.add('active');
}

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

/**
 * Typewriter effect for intro text
 */
// Typewriter effect function
const typeWriter = (element, text, i = 0, delay = 75) => {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i, delay), delay);
    }
};
// Selecting the introduction paragraph
const mainText = document.querySelector('#main .introduction');
// Clear text content first
mainText.textContent = '';
// Apply the typing effect to the paragraph
typeWriter(mainText, 'Experience the classic game with a twist. Select Rock, Paper, Scissors, Lizard, or Spock and try to beat the computer. Click below to start playing!', 0, 50);
const startGameButton = document.getElementById('start-game');

startGameButton.addEventListener('click', () => {
    // Play screen has an ID of 'play'
    const playScreen = document.getElementById('play');
    document.querySelector('.screen.active').classList.remove('active');
    playScreen.classList.add('active');
});


/* 
Game Logic is split to four main parts
1. Gameplay Initialisation
2. Data Management
3. Game Interaction
4. UI Management
5. Scoreboard Management
*/

// 1. Game Initialisation 
/**
 * Initializes the game. 
 * Checks local storage for saved game data and sets up the game accordingly.
 */
function initializeGame() {
    let savedData = loadGameDataFromLocalStorage();
    if (savedData) {
        gameData = savedData;
    } else {
        gameData = initializeGameData();
    }
    setupChoiceListeners();
    updateUIWithScores();
    updateScoreboard(); // Display initial scoreboard state
}

// 2. Data Management
/**
 * Loads game data from local storage.
 * @returns {Object|null} The loaded game data or null if no data is found.
 */
function loadGameDataFromLocalStorage() {
    const data = localStorage.getItem('gameData');
    return data ? JSON.parse(data) : null;
}
/**
 * Saves the current game data to local storage.
 */
function saveGameDataToLocalStorage() {
    localStorage.setItem('gameData', JSON.stringify(gameData));
}
/**
 * Initializes new game data with default values.
 * @returns {Object} The initialized game data.
 */
function initializeGameData() {
    return {
        playerStats: {
            roundsPlayed: 0,
            roundsWon: 0,
            roundsLost: 0,
            roundsTied: 0,
            choices: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 }
        },
        computerStats: {
            roundsPlayed: 0,
            roundsWon: 0,
            roundsLost: 0,
            roundsTied: 0,
            choices: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 }
        }
    };
}
/**
 * Updates the game data based on the outcome of a round.
 * @param {string} roundResult - The result of the round ('win', 'lose', 'tie').
 * @param {string} playerChoice - The choice made by the player.
 * @param {string} computerChoice - The choice made by the computer.
 */
function updateGameData(roundResult, playerChoice, computerChoice) {
    gameData.playerStats.choices[playerChoice]++;
    gameData.computerStats.choices[computerChoice]++;
    switch (roundResult) {
        case 'win':
            gameData.playerStats.roundsWon++;
            break;
        case 'lose':
            gameData.computerStats.roundsWon++;
            break;
        case 'tie':
            gameData.playerStats.roundsTied++;
            gameData.computerStats.roundsTied++;
            break;
    }
    saveGameDataToLocalStorage(); // Save updated data to local storage
}
/**
 * Resets the game data to its initial state, updates the UI accordingly, and clears any feedback messages.
 */
function resetGameData() {
    gameData = initializeGameData();
    // Clear the data in local storage
    localStorage.removeItem('gameData');

    // Update the UI to reflect the reset data
    updateUIWithScores();
    updateScoreboard();
    document.getElementById('feedback-area').textContent = ''; // Clear feedback message
}



// 3. Game Interaction
/**
 * Sets up event listeners for each choice button.
 */
function setupChoiceListeners() {
    document.querySelectorAll('.choice-button').forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.getAttribute('data-choice');
            handlePlayerChoice(playerChoice);
            updateScoreboard();
        });
    });
}
/**
 * Handles the player's choice by initiating a round of the game. It animates the player's choice, 
 * generates the computer's choice, determines the round outcome, updates the game data, 
 * and manages the UI updates for the round results.
 * @param {string} playerChoice - The choice made by the player.
 */
let gameData;
function handlePlayerChoice(playerChoice) {
    animatePlayerChoice(playerChoice);
    const computerChoice = generateComputerChoice();
    const roundResult = determineWinner(playerChoice, computerChoice);

    // Update the game data and scoreboard immediately
    updateGameData(roundResult, playerChoice, computerChoice);
    updateScoreboard();

    setTimeout(() => {
        animateComputerChoice(computerChoice); // Animate computer's choice after delay
        displayRoundFeedback(roundResult); // Show round result after computer's choice is revealed
        updateUIWithScores(); // Update scores UI if needed
        saveGameDataToLocalStorage();
    }, 3000); // 3-second delay for the computer's choice animation
}


/**
 * Generates a random choice for the computer from the available options.
 * @returns {string} The computer's choice.
 */
function generateComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
/**
 * Determines the winner of a round based on the choices of the player and the computer.
 * @param {string} playerChoice - The player's choice.
 * @param {string} computerChoice - The computer's choice.
 * @returns {string} The result of the round ('win', 'lose', 'tie').
 */
function determineWinner(playerChoice, computerChoice) {
    const winningCombinations = {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['spock', 'paper'],
        spock: ['scissors', 'rock']
    };

    if (playerChoice === computerChoice) {
        return 'tie';
    } else if (winningCombinations[playerChoice].includes(computerChoice)) {
        return 'win';
    } else {
        return 'lose';
    }
}


// 4. UI Management
/**
 * Updates the user interface with the current game scores.
 */
function updateUIWithScores() {
    document.getElementById('player-game-score').textContent = `User: ${gameData.playerStats.roundsWon}`;
    document.getElementById('computer-game-score').textContent = `Computer: ${gameData.computerStats.roundsWon}`;
    // Additional code to update other UI elements if necessary
}
/**
 * Animates the player's chosen icon in the player's section.
 * @param {string} choice - The player's chosen icon.
 */
function animatePlayerChoice(choice) {
    // Code to animate player's choice
    // Example: document.getElementById('player-choice').classList.add('animate-choice');
}
/**
 * Delays and then animates the computer's chosen icon in the computer's section.
 * @param {string} choice - The computer's chosen icon.
 */
function animateComputerChoice(choice) {
    // Code to delay and animate computer's choice
    // Example: setTimeout(() => { /* animation code */ }, 3000);
}
/**
 * Displays visual feedback for the round result (win, lose, tie).
 * @param {string} result - The result of the round.
 */
function displayRoundFeedback(result) {
    const feedbackArea = document.getElementById('feedback-area');
    // Example feedback display
    feedbackArea.textContent = result === 'win' ? 'You won!' : result === 'lose' ? 'You lost!' : 'It\'s a tie!';
    // Additional animation or styling changes can be added here
}


// 5. Scoreboard Management
/**
 * Updates the scoreboard with the current game data.
 */
function updateScoreboard() {

    document.getElementById('player-rounds-played').textContent = gameData.playerStats.roundsPlayed || '-';
    document.getElementById('player-rounds-won').textContent = gameData.playerStats.roundsWon || '-';
    document.getElementById('player-rounds-lost').textContent = gameData.playerStats.roundsLost || '-';
    document.getElementById('player-rounds-tied').textContent = gameData.playerStats.roundsTied || '-';

    document.getElementById('computer-rounds-played').textContent = gameData.computerStats.roundsPlayed || '-';
    document.getElementById('computer-rounds-won').textContent = gameData.computerStats.roundsWon || '-';
    document.getElementById('computer-rounds-lost').textContent = gameData.computerStats.roundsLost || '-';
    document.getElementById('computer-rounds-tied').textContent = gameData.computerStats.roundsTied || '-';

    // Populate the choices data for both player and computer
    ['rock', 'paper', 'scissors', 'lizard', 'spock'].forEach(choice => {
        const playerChoiceCount = gameData.playerStats.choices[choice] || '-';
        const computerChoiceCount = gameData.computerStats.choices[choice] || '-';
        document.getElementById(`player-${choice}`).textContent = playerChoiceCount;
        document.getElementById(`computer-${choice}`).textContent = computerChoiceCount;
    });

}

/**
 * Sets up an event listener for the reset button. On click, it confirms the reset action 
 * and resets the game data if confirmed.
 */
function setupResetButtonListener() {
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {
        const isConfirmed = confirm('Are you sure you want to reset the scoreboard? This action cannot be undone.');
        if (isConfirmed) {
            resetGameData();
            updateScoreboard();
        }
    });
}




