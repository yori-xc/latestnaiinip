const targetWord = "NAIINIP";
let guessed = Array(targetWord.length).fill("_");

const wordDisplay = document.getElementById("wordDisplay");
const keyboard = document.getElementById("keyboard");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");

function updateDisplay() {
  wordDisplay.textContent = guessed.join(" ");
}

function handleKey(letter, button) {
  if (!button) return;

  document.querySelectorAll('.key').forEach(btn => btn.classList.remove('clicked'));
  button.classList.add('clicked');

  let found = false;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] === letter && guessed[i] === "_") {
      guessed[i] = letter;
      found = true;
    }
  }

  updateDisplay();

  if (!found) {
    alert("Please put the correct answer");
  }
}

const rows = [
  "ABCDEFGHIJ".split(""),
  "KLMNOPQRST".split(""),
  "UVWXYZ".split("").concat(["BACK", "ENTER"])
];

const rowClasses = ["row1", "row2", "row3"];
const keyMap = {};

rows.forEach((row, i) => {
  const rowDiv = document.createElement("div");
  rowDiv.className = `row ${rowClasses[i]}`;

  row.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "key";
    if (letter === "ENTER") btn.classList.add("enter");

    btn.onclick = () => {
      if (letter === "ENTER") {
        if (!guessed.includes("_")) {
          document.querySelector(".wrapper-center").style.display = "none";
          videoContainer.style.display = "block";
          video.play();
        } else {
          alert("Please complete the word before pressing ENTER.");
        }
      } else if (letter === "BACK") {
        for (let i = guessed.length - 1; i >= 0; i--) {
          if (guessed[i] !== "_") {
            guessed[i] = "_";
            break;
          }
        }
        updateDisplay();
      } else {
        handleKey(letter, btn);
      }
    };

    keyMap[letter] = btn;
    rowDiv.appendChild(btn);
  });

  keyboard.appendChild(rowDiv);
});

updateDisplay();

// Physical keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  const mappedKey = key === "BACKSPACE" ? "BACK" : key;
  const btn = keyMap[mappedKey];
  if (btn) btn.click();
});
