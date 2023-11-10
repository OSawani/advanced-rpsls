/*
I chose to structure the code into distinct modules
for better organization and maintainability.

This module will contain the core game mechanics such as 
playRound, determineWinner, and generateComputerChoice. 
 
This module will focuse on the rules and flow of the game.
*/

/**
 * Orchestrates the gameplay for a single round.
 * @param {string} playerChoice - The player's selected choice.
 */
function playRound(playerChoice) {
    let computerChoice = generateComputerChoice();
    let roundResult = determineWinner(playerChoice, computerChoice);

    // Update & save game data (Data Management Module)
    updateAndSaveGameData(gameData, playerChoice, computerChoice, roundResult);
    // Update UI based on the choices and the round result (UI Module)
    updateChoicesUI(playerChoice, computerChoice);

    // Check if the game has ended and handle accordingly
    if (checkForGameEnd(gameData, gameState.mode)) {
        handleEndOfGameUI(); // From UI Module
    } else {
        prepareForNextRound(); // Reset for the next round
    }
}

/**
 * Generates a random choice for the computer.
 * @returns {string} The computer's choice.
 */
function generateComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Determines the winner of the round.
 * @param {string} playerChoice - The player's choice.
 * @param {string} computerChoice - The computer's choice.
 * @returns {string} The result of the round ('win', 'lose', or 'tie').
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

/**
 * Checks if the game has ended based on the game mode and scores.
 * @param {object} scores - The scores object holding player and computer scores for rounds and games.
 * @param {string} gameMode - The current game mode.
 * @returns {boolean} True if the game has ended, false otherwise.
 */
function checkForGameEnd(gameData, gameMode) {
    if (gameMode === 'single') {
        return gameData.playerStats.rounds > 0 || gameData.computerStats.rounds > 0;
    } else if (gameMode === 'bestOfThree') {
        return gameData.playerStats.games === 2 || gameData.computerStats.games === 2;
    }
    return false;
}


/**
 * Prepares the game for the next round.
 */
function prepareForNextRound() {
    // Logic to reset the game state for the next round
    // This might involve resetting UI elements, timers, etc.
}