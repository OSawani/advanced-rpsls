/*
I chose to structure the code into distinct modules
for better organization and maintainability.

This module will handle updates to the DOM, animations, and user interactions.
It will include functions like updatePlayerChoiceUI, updateScoresAndAnimate, and showEndGameMessage.
*/

/**
 * Sets up event listeners for each choice button the player can press.
 * Buttons have data-choice attributes corresponding to their choice.
 */
function setupChoiceListeners() {
    const choiceButtons = document.querySelectorAll('.choice-button');
    choiceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const playerChoice = event.target.getAttribute('data-choice');
            playRound(playerChoice); // Directly calling the game logic function (Game Logic Module)
        });
    });
}

/**
 * Updates the UI to show the player's and computer's choices.
 * @param {string} playerChoice - The player's choice.
 * @param {string} computerChoice - The computer's choice.
 */
function updateChoicesUI(playerChoice, computerChoice) {
    updateChoiceUI('player', playerChoice);
    updateChoiceUI('computer', computerChoice);
    // Additional animations or effects will be added here
}

/**
 * Updates the choice display for either player or computer.
 * @param {string} participant - 'player' or 'computer'.
 * @param {string} choice - The choice to display.
 */
function updateChoiceUI(participant, choice) {
    const choiceDisplay = document.getElementById(`${participant}-choice`);
    choiceDisplay.innerHTML = ''; // Reset existing content
    const choiceImage = document.createElement('img');
    choiceImage.src = `./assets/images/${choice}.png`; // images have choice name
    choiceImage.alt = choice;
    choiceDisplay.appendChild(choiceImage);
}

/**
 * Updates the scores in the UI.
 * @param {object} scores - The current scores object from gameData.
 */
function updateScoresUI(scores) {
    document.getElementById('player-round-score').textContent = scores.playerStats.rounds;
    document.getElementById('computer-round-score').textContent = scores.computerStats.rounds;
    document.getElementById('player-game-score').textContent = scores.playerStats.games;
    document.getElementById('computer-game-score').textContent = scores.computerStats.games;

    animateScoreUpdate();
}

/**
 * Adds animation effects to the score elements.
 */
function animateScoreUpdate() {
    const scoreElements = document.querySelectorAll('.score');
    scoreElements.forEach(elem => {
        elem.classList.add('score-change-animation');
        setTimeout(() => elem.classList.remove('score-change-animation'), 1000);
    });
}

/**
 * Manages the UI changes when the game ends.
 */
function handleEndOfGameUI() {
    const endGameMessage = determineEndGameMessage();
    const messageElement = document.getElementById('end-game-message');
    messageElement.textContent = endGameMessage;
    messageElement.style.display = 'block';
}

/**
 * Determines the end game message based on the game outcome.
 * @returns {string} - The message to be displayed.
 */
function determineEndGameMessage() {
    if (gameData.playerStats.games > gameData.computerStats.games) {
        return "Congratulations! You won the game!";
    } else if (gameData.playerStats.games < gameData.computerStats.games) {
        return "Game Over! The computer won this time.";
    } else {
        return "It's a tie! Well played!";
    }
}
