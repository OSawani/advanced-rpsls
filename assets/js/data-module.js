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

function initializeGameState() {
    gameState = {
        mode: 'single', // Default to 'single' game mode
        // ... other state properties as needed
    };
}

function loadSavedGameData() {
    gameData = getGameData(); // Fetches saved data or initializes new data
}

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
 * Retrieves and repairs or resets the game data if necessary.
 * @returns {object} The game data object.
 */
function getGameData() {
    let data = localStorage.getItem('gameData');
    if (data) {
        let parsedData = JSON.parse(data);
        return handleGameDataEdgeCases(parsedData);
    }
    return initializeGameData();
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
 * @returns {boolean} True if the data is valid, false otherwise.
 */
function isDataValid(data) {
    if (typeof data !== 'object' || data === null) return false;
    if (!['single', 'bestOfThree'].includes(data.mode)) return false;

    // Validate playerStats and computerStats structures
    if (!data.playerStats || !data.computerStats) return false;
    if (!validateStats(data.playerStats) || !validateStats(data.computerStats)) return false;

    return true;
}

/**
 * Validates the stats structure for player or computer.
 * @param {object} stats - The stats object for player or computer.
 * @returns {boolean} True if stats structure is valid, false otherwise.
 */
function validateStats(stats) {
    // Example: Check if rounds and games are numbers and choices is an object
    if (typeof stats.rounds !== 'number' || typeof stats.games !== 'number') return false;
    if (typeof stats.choices !== 'object') return false;
    // Further checks can be added as necessary
    return true;
}

/**
 * Handles edge cases in game data, repairing or resetting if necessary.
 * @param {object|null} data - The parsed game data object or null.
 * @returns {object} The repaired or reset game data.
 */
function handleGameDataEdgeCases(data) {
    if (!isDataValid(data)) {
        console.warn("Invalid game data found, resetting to default.");
        return initializeGameData();
    }
    return data;
}