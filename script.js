// script.js
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let selectedCell = null;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        selectedCell = index;
        showPopup();
    }
}

function submitAnswer() {
    const sentence = document.getElementById('sentenceInput').value.trim().toLowerCase();
    const resultElement = document.getElementById('result');

    if (selectedCell === null) {
        resultElement.textContent = "Select a cell first!";
        resultElement.style.color = "red";
        return;
    }

    // Basic subject-verb agreement rules for "to be" verbs
    const subjectVerbAgreements = {
        "i": "am",
        "he": "is",
        "she": "is",
        "it": "is",
        "they": "are",
        "we": "are",
        "you": "are"
    };

    const words = sentence.split(" ");
    const subject = words[0];
    const verb = words[1];

    if (subject in subjectVerbAgreements && verb === subjectVerbAgreements[subject]) {
        board[selectedCell] = currentPlayer;
        document.querySelectorAll('.cell')[selectedCell].textContent = currentPlayer;
        if (checkWinner()) {
            resultElement.textContent = `Player ${currentPlayer} wins!`;
            resultElement.style.color = "green";
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            resultElement.textContent = "It's a draw!";
            resultElement.style.color = "orange";
            gameActive = false;
        } else {
            resultElement.textContent = `Correct! It's now ${currentPlayer === 'X' ? 'O' : 'X'}'s turn.`;
            resultElement.style.color = "green";
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    } else {
        resultElement.textContent = "Incorrect! You lose your turn.";
        resultElement.style.color = "red";
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    
    selectedCell = null;
    
    document.getElementById('sentenceInput').value = ''; // Clear input after submitting
    closePopup();
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    selectedCell = null;
    gameActive = true;

    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('result').textContent = "Game restarted! Player X's turn.";
    document.getElementById('result').style.color = "black";
}

function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    if (selectedCell !== null && board[selectedCell] === '') {
        // Allow the player to continue by resetting the selected cell
        selectedCell = null;
    }
}

// Add restart button functionality
document.addEventListener('DOMContentLoaded', () => {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.style.marginTop = '20px';
    restartButton.addEventListener('click', restartGame);
    document.querySelector('.container').appendChild(restartButton);
});
