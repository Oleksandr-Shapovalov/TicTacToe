const game = document.querySelector(".game");
const res = document.querySelector(".res");
const sound = document.querySelector(".sound");
const soundSpan = document.querySelector(".sound span");
const btnGame = document.querySelector(".new_game");
const fields = [...document.querySelectorAll(".field")];
step = false;
let count = 0;
isSound = false;
const circle = ` <svg class="circle">
          <circle
            r="45"
            cx="58"
            cy="58"
            stroke="#1d1c1cc4"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
          />
        </svg>`;
const cross = ` <svg class="cross">
          <line
            class="first"
            x1="15"
            y1="15"
            x2="105"
            y2="105"
            stroke="#1d1c1cc4"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
          />
          <line
            class="second"
            x1="105"
            y1="15"
            x2="15"
            y2="105"
            stroke="#1d1c1cc4"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
          />
        </svg>`;

function stepCross(target) {
  if (!target.innerHTML) {
    if (isSound) {
      const crossAudio = new Audio("audio/cross.mp3");
      crossAudio.play();
    }
    target.innerHTML = cross;
    target.classList.add("x");
    count++;
  }
}
function stepZero(target) {
  if (!target.innerHTML) {
    if (isSound) {
      const zeroAudio = new Audio("audio/zero.mp3");
      zeroAudio.play();
    }
    target.innerHTML = circle;
    target.classList.add("o");
    count++;
  }
}

function init(e) {
  if (!step) stepCross(e.target);
  else stepZero(e.target);
  step = !step;
  win();
}

function newGame() {
  step = false;
  count = 0;
  game.style.backgroundColor = "#trasparent";
  res.textContent = "";
  fields.forEach((elem) => {
    elem.classList.remove("o", "x", "active");
    elem.innerHTML = "";
  });
  game.addEventListener("click", init);
}

function win() {
  if (count === 9) {
    res.textContent = "Draw";
    game.style.backgroundColor = "#1d1c1c21";
  }
  let win = "";
  let isWinner = false;
  const comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < comb.length; i++) {
    if (
      fields[comb[i][0]].classList.contains("x") &&
      fields[comb[i][1]].classList.contains("x") &&
      fields[comb[i][2]].classList.contains("x")
    ) {
      win = "x";
      isWinner = true;
    }
    if (
      fields[comb[i][0]].classList.contains("o") &&
      fields[comb[i][1]].classList.contains("o") &&
      fields[comb[i][2]].classList.contains("o")
    ) {
      win = "o";
      isWinner = true;
    }
    if (isWinner) {
      setTimeout(() => {
        res.textContent = `Won ${win}`;
        game.removeEventListener("click", init);
        for (let j = 0; j < comb[i].length; j++) {
          fields[comb[i][j]].classList.add("active");
        }
      }, 1500);
      return;
    }
  }
}

btnGame.addEventListener("click", newGame);
game.addEventListener("click", init);
sound.addEventListener("click", () => {
  isSound = !isSound;
  soundSpan.classList.toggle("on");
  soundSpan.classList.toggle("off");
  if (isSound) soundSpan.textContent = "On";
  else soundSpan.textContent = "Off";
});
