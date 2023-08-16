// モンスターのデータ
const monsters = [
  { name: 'グリーンモンスター', winRate: 0.9, image: '1.png' },
  { name: 'オレンジスパイク', winRate: 0.9, image: '2.png' },
  { name: 'アクアアイ', winRate: 0.9, image: '3.png' },
  // ... 他のモンスターデータ ...
];

let showmeat = 0;
let currentMonsters = [];
let victories = 0;
let defeats = 0;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');
const victoryCount = document.getElementById('victory-count');
const pigMeat = document.getElementById('pig-meat');

document.getElementById('start-button').addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  showRandomMonsters();
});

document.querySelectorAll('.attack-button').forEach(button => {
  button.addEventListener('click', event => {
    const choice = event.target.getAttribute('data-choice');
    const random = Math.random();

    if (random <= currentMonsters[choice - 1].winRate) {
      victories++;
      defeats = 0;
      resultText.textContent = '勝利！';
      victoryCount.textContent = `勝利数: ${victories}`;
      gameScreen.style.display = 'none';
      resultScreen.style.display = 'block';
      document.body.style.backgroundColor = '#00d0ff';

      setTimeout(() => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        showRandomMonsters();
        document.body.style.backgroundColor = '';
        defeats = 0;
      }, 2000);

    } else {
      victories = 0;
      defeats++;
      resultText.textContent = '敗北...';
      if (defeats >= 1) {
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        document.body.style.backgroundColor = 'black';
        setTimeout(() => {
          resultScreen.style.display = 'none';
          startScreen.style.display = 'block';
          document.body.style.backgroundColor = '';
          defeats = 0;
        }, 2000);
        return;
      }
    }

    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';

    if (victories >= 10) {
      resultScreen.style.display = 'none';
      document.getElementById('game-clear-screen').style.display = 'block';
    }
  });
});

function showRandomMonsters() {
  currentMonsters = [];
  const usedIndices = new Set();

  for (let i = 0; i < 3; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * monsters.length);
    } while (usedIndices.has(randomIndex));

    usedIndices.add(randomIndex);
    currentMonsters.push(monsters[randomIndex]);
  }

  for (let i = 0; i < 3; i++) {
    const monsterImage = document.querySelectorAll('.monster-image')[i];
    monsterImage.src = currentMonsters[i].image;
    monsterImage.alt = currentMonsters[i].name;
    document.querySelectorAll('.monster-name')[i].textContent = currentMonsters[i].name;
    document.querySelectorAll('.win-rate')[i].textContent = `勝率: ${currentMonsters[i].winRate * 100}%`;
  }
}

document.getElementById('pig-button').addEventListener('click', () => {
  if (showmeat === 0) {
    pigMeat.style.display = 'block';
    showmeat = 1;
  } else {
    pigMeat.style.display = 'none';
    showmeat = 0;
  }
});
