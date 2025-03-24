let guessCount = 0;
const maxGuesses = 5;
let guessHistory = [];
const snippets = [
    'audio/Smooktober.mp3',
    'audio/Gone 4 a min.mp3',
    'audio/Breathe.mp3'
];
let currentSnippetIndex = 0;

document.getElementById('play-button').addEventListener('click', playSnippet);
document.getElementById('guess-form').addEventListener('submit', handleGuess);

function playSnippet() {
    const audio = document.getElementById('audio-snippet');
    audio.src = snippets[currentSnippetIndex];
    audio.volume = 0.2; // Set volume to 20%
    audio.play();
}

function handleGuess(event) {
    event.preventDefault();
    const userGuess = document.getElementById('guess-input').value.toLowerCase();
    const audio = document.getElementById('audio-snippet');
    const correctAnswer = getFileNameWithoutExtension(decodeURIComponent(audio.src)).toLowerCase();

    guessHistory.push(userGuess);
    updateGuessHistory();

    if (userGuess === correctAnswer) {
        document.getElementById('result').textContent = "Correct!";
        resetGame();
        cycleToNextSnippet();
    } else {
        guessCount++;
        if (guessCount >= maxGuesses) {
            document.getElementById('result').textContent = "You've used all your guesses. The correct answer was: " + correctAnswer;
            resetGame();
            cycleToNextSnippet(correctAnswer);
        } else {
            document.getElementById('result').textContent = "Try again! You have " + (maxGuesses - guessCount) + " guesses left.";
        }
    }

    // Clear the input box after each guess
    document.getElementById('guess-input').value = '';
}

function updateGuessHistory() {
    const guessHistoryDiv = document.getElementById('guess-history');
    guessHistoryDiv.innerHTML = "<h3>Guess History:</h3>";
    guessHistory.forEach((guess, index) => {
        guessHistoryDiv.innerHTML += `<p>${index + 1}: ${guess}</p>`;
    });
}

function getFileNameWithoutExtension(path) {
    const fileName = path.split('/').pop().split('\\').pop();
    return fileName.substring(0, fileName.lastIndexOf('.'));
}

function cycleToNextSnippet(lastCorrectAnswer = '') {
    currentSnippetIndex = (currentSnippetIndex + 1) % snippets.length;
    const audio = document.getElementById('audio-snippet');
    audio.src = snippets[currentSnippetIndex];
    audio.volume = 0.2; // Set volume to 20%
    if (lastCorrectAnswer) {
        document.getElementById('result').textContent = "The correct answer was: " + lastCorrectAnswer + ". New snippet loaded. Start guessing!";
    } else {
        document.getElementById('result').textContent = "New snippet loaded. Start guessing!";
    }
}

function resetGame() {
    guessHistory = [];
    guessCount = 0;
    updateGuessHistory();
}