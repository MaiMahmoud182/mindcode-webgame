let translations = {
  en: { title:"Memory Match Game", age:"Age:", score:"Score", time:"Time" },
  "en-uk": { title:"Memory Matching Game", age:"Age:", score:"Score", time:"Time" },
  ar: { title:"لعبة الذاكرة", age:"العمر:", score:"النقاط", time:"الوقت" },
  fr: { title:"Jeu de Mémoire", age:"Âge:", score:"Score", time:"Temps" },
  de: { title:"Gedächtnisspiel", age:"Alter:", score:"Punkte", time:"Zeit" },
  id: { title:"Permainan Memori", age:"Usia:", score:"Skor", time:"Waktu" },
  jp: { title:"記憶ゲーム", age:"年齢:", score:"スコア", time:"時間" }
};

let emojis = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let timer = 0;
let interval = null;
let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("ageLabel").innerText = translations[lang].age;
  updateScoreTimer();
}

function updateScoreTimer() {
  document.getElementById("scoreText").innerText =
    translations[currentLang].score + ": " + score;

  document.getElementById("timerText").innerText =
    translations[currentLang].time + ": " + timer;
}

function startGame() {

  const age = parseInt(document.getElementById("ageInput").value);
  const lang = document.getElementById("languageSelect").value;
  setLanguage(lang);

  // Difficulty based on age
  if (age < 18) {
    emojis = ["🐶","🐱","🐭","🐰","🐶","🐱","🐭","🐰"];
  } else if (age < 50) {
    emojis = ["🍎","🍌","🍇","🍉","🍎","🍌","🍇","🍉"];
  } else {
    emojis = ["🌸","🌼","🌺","🌻","🌸","🌼","🌺","🌻"];
  }

  score = 0;
  timer = 0;
  clearInterval(interval);

  interval = setInterval(() => {
    timer++;
    updateScoreTimer();
  }, 1000);

  createBoard();
  updateScoreTimer();
}

function createBoard() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  board.style.gridTemplateColumns = "repeat(4, 90px)";

  emojis.sort(() => 0.5 - Math.random());

  emojis.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("matched")) return;
  if (this === firstCard) return;

  this.innerText = this.dataset.value;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    score += 10;
    document.getElementById("successSound").play();
    updateScoreTimer();

    resetBoard();

  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.innerText = "";
      secondCard.innerText = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 900);
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
