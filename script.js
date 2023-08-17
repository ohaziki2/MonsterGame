// モンスターのデータ
const monsters = [
  { name: 'グリーンモンスター', winRate: 0.3, image: '1.png' ,reward: 0,},
  { name: 'オレンジスパイク', winRate: 0.4, image: '2.png' ,reward: 0,},
  { name: 'アクアアイ', winRate: 0.5, image: '3.png' ,reward: 0,},
  { name: 'ピンクゴースト', winRate: 0.5, image: '4.png' ,reward: 0,},
  { name: 'イエローウィング', winRate: 0.5, image: '5.png' ,reward: 0,},
  { name: 'パープルスペクター', winRate: 0.5, image: '6.png' ,reward: 0,},
  { name: 'ライムハンド', winRate: 0.5, image: '7.png' ,reward: 0,},
  { name: 'ネイビーマインド', winRate: 0.5, image: '8.png' ,reward: 0,},
  { name: 'レッドデビル', winRate: 0.5, image: '9.png' ,reward: 0,},
  { name: 'ブルーヘア', winRate: 0.5, image: '10.png',reward: 0, },
  { name: 'グレイ', winRate: 0.5, image: '11.png' ,reward: 1, },
  { name: 'コーラルシェル', winRate: 0.8, image: '12.png' ,reward: 1, }
];
const perks = [,
  { name: 'シールド',image: 'light_amulet.png'},
  { name: 'リロール',image: 'light_amulet.png'}
]
//シールド 1 失敗判定無効
//リロール 2 モンスター歳出減
let showmeat = 0;
let currentMonsters = [];
let victories = 0;
let defeats = 0;
let invetory = []

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
      gameScreen.style.display = 'none';
      resultScreen.style.display = 'block';
      document.body.style.backgroundColor = '#00d0ff';

      setTimeout(() => {
        const reward = currentMonsters[choice - 1].reward
        if (reward) invetory.push(reward)
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
        invetory = []
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
  refleshInventory()
  victoryCount.textContent = `勝利数: ${victories}`;
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
    const rewardImage = document.querySelectorAll('.reward')[i];
    monsterImage.src = currentMonsters[i].image;
    monsterImage.alt = currentMonsters[i].name;
    if (perks[currentMonsters[i].reward]) {
      rewardImage.src = perks[currentMonsters[i].reward].image;
    } else {
      rewardImage.src = null;
    }
    document.querySelectorAll('.monster-name')[i].textContent = currentMonsters[i].name;
    document.querySelectorAll('.win-rate')[i].textContent = `勝率: ${currentMonsters[i].winRate * 100}%`;
  }
}
function refleshInventory() {
  for(let i = 0; i < 10; i++) {
    const invImage = document.querySelectorAll('.slot')[i];
    if (invetory[i]) {
      invImage.src = perks[invetory[i]].image
    } else {
      invImage.src = null
    }
    
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
