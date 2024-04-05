document.addEventListener("DOMContentLoaded", function () {


  const hangmanImage = document.querySelector(".hangman-box img");
  const wordDisplay = document.querySelector(".word-display");
  const KeyboardDiv = document.querySelector(".keyboard");
  const guessesText = document.querySelector(".guesses-text b");
  const gameModal = document.querySelector(".game-modal");
  const playAgainbtn = document.querySelector(".play-again");
  const hintText=document.querySelector(".hint-text b")
  let currentWord,
    correctLetters,
    wrongGuessCount;
  const maxGuesses = 6;

  const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
    KeyboardDiv.querySelectorAll("button").forEach(
      (btn) => (btn.disabled = false)
    );
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`)
      .join("");
    gameModal.classList.remove("show");
  };

  const getRandomWord = () => {
    const { word, hint } =wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; 
    hintText.innerText = hint;
    resetGame();
    gameModal.classList.remove("show");
  };

  const gameOver = (isVictory) => {
    setTimeout(() => {
      const modalText = isVictory? `You found the word`: `The Correct word was:  `;
      gameModal.querySelector("img").src = `images/${
        isVictory ? "victory" : "lost"
      }.gif`;
      gameModal.querySelector("h4").innerText = `${
        isVictory ? "Congrats!" : "Game Over!"
      }`;
      gameModal.querySelector(
        "p"
      ).innerHTML = `${modalText} <b>${currentWord}</b>`;
      gameModal.classList.add("show");
    }, 300);
  };
  const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
      [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter) {
          correctLetters.push(letter);
          wordDisplay.querySelectorAll("li")[index].innerText = letter;
          wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
      });
    } else {
      wrongGuessCount++;
      hangmanImage.src = `Images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
    if (wrongGuessCount === maxGuesses) return setTimeout(() => gameOver(false), 1000);
    if (correctLetters.length === currentWord.length) return setTimeout(() => gameOver(true), 1000);
  };
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    KeyboardDiv.appendChild(button);
    button.addEventListener("click", (e) =>
      initGame(e.target, String.fromCharCode(i))
    );
  }
  getRandomWord();
  playAgainbtn.addEventListener("click", getRandomWord);
});
