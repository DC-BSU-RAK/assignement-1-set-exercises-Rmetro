// JavaScript for RGB Colour Guessing Game

let correctColor;
let lives;
let score;

// Start or reset the game
function startGame() {
  lives = 3;
  score = 0;
  document.getElementById("restartBtn").style.display = "none";
  updateStatus();
  newRound();
}

// Update lives and score on screen
function updateStatus() {
  document.getElementById("lives").textContent = `Lives: ${lives}`;
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("feedback").textContent = "";
}

// Generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start a new round
function newRound() {
  const optionsContainer = document.getElementById("colorOptions");
  optionsContainer.innerHTML = "";

  correctColor = getRandomColor();
  document.getElementById("rgbDisplay").textContent = correctColor.toUpperCase();

  // Create an array of color options
  const colors = [correctColor];
  while (colors.length < 3) {
    const color = getRandomColor();
    if (!colors.includes(color)) colors.push(color);
  }

  // Shuffle options
  colors.sort(() => Math.random() - 0.5);

  // Display color options
  colors.forEach(color => {
    const div = document.createElement("div");
    div.className = "option";
    div.style.backgroundColor = color;
    div.onclick = () => handleGuess(color);
    optionsContainer.appendChild(div);
  });
}

// Handle user's guess
function handleGuess(selectedColor) {
  if (selectedColor === correctColor) {
    document.getElementById("feedback").textContent = "Correct! 🎉";
    score++;
  } else {
    document.getElementById("feedback").textContent = "Incorrect ❌";
    lives--;
  }

  updateStatus();

  if (lives > 0) {
    setTimeout(newRound, 1000);
  } else {
    endGame();
  }
}

// End game logic
function endGame() {
  document.getElementById("feedback").textContent = `Game Over! Final Score: ${score}`;
  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("colorOptions").innerHTML = "";
  document.getElementById("rgbDisplay").textContent = "RGB(?, ?, ?)";
}

// Start the game when page loads
window.onload = startGame;
