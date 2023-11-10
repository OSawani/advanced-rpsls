/*
I chose to structure the code into distinct modules
for better organization and maintainability.

This module will deal with storing, retrieving, and resetting game data.
It will include functions like updateGameData, getGameData, and resetGameData.
*/

// global-variables are included in this script

let gameState = {
    mode: 'single', // 'single' or 'bestOfThree'
};

let gameData = {
    playerStats: {
        rounds: 0,
        games: 0,
        choices: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 }
    },
    computerStats: {
        rounds: 0,
        games: 0,
        choices: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 }
    }
};

/**
 * Updates the game data based on the latest round and saves it to local storage.
 * @param {string} playerChoice - The player's choice.
 * @param {string} computerChoice - The computer's choice.
 * @param {string} roundResult - The result of the round ('win', 'lose', 'tie').
 */
function updateAndSaveGameData(playerChoice, computerChoice, roundResult) {
    // Update choices
    gameData.playerStats.choices[playerChoice]++;
    gameData.computerStats.choices[computerChoice]++;

    // Update scores based on round result
    if (roundResult === 'win') {
        gameData.playerStats.rounds++;
    } else if (roundResult === 'lose') {
        gameData.computerStats.rounds++;
    }

    // Save the updated game data to local storage
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

/**
 * Retrieves the game data from local storage.
 * @returns {object} The retrieved game data.
 */
function getGameData() {
    const data = localStorage.getItem('gameData');
    return data ? JSON.parse(data) : initializeGameData();
}

/**
 * Resets the game data to initial values.
 */
function resetGameData() {
    gameData = initializeGameData();
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

/**
 * Initializes the game data with default values.
 * @returns {object} The initialized game data object.
 */
function initializeGameData() {
    return {
        playerStats: {
            rounds: 0,
            games: 0,
            choices: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 }
        },
        computerStats: {
            rounds: 0,
            games: 0,
            choices: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 }
        }
    };
}

/**
 * Validates the integrity and structure of the game data.
 * @param {object} data - The game data object.
 * @returns {boolean} True if valid, false otherwise.
 */
function isDataValid(data) {
    // Implement validation checks
    // ...
    return true;
}