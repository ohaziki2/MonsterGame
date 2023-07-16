// モンスターのデータ
const monsters = [
  { name: 'グリーンモンスター', winRate: 0.3, image: '1.png' },
  { name: 'オレンジスパイク', winRate: 0.4, image: '2.png' },
  { name: 'アクアアイ', winRate: 0.5, image: '3.png' },
  { name: 'ピンクゴースト', winRate: 0.5, image: '4.png' },
  { name: 'イエローウィング', winRate: 0.5, image: '5.png' },
  { name: 'パープルスペクター', winRate: 0.5, image: '6.png' },
  { name: 'ライムハンド', winRate: 0.5, image: '7.png' },
  { name: 'ネイビーマインド', winRate: 0.5, image: '8.png' },
  { name: 'レッドデビル', winRate: 0.5, image: '9.png' },
  { name: 'ブルーヘア', winRate: 0.5, image: '10.png' },
  { name: 'グレイ', winRate: 0.5, image: '11.png' },
  { name: '名前をつけれるほどの特徴がない悲しきモンスター', winRate: 0.8, image: '12.png' }
];

let currentMonster;
let victories = 0;
let defeats = 0;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');

// スタートボタンのクリックイベント
document.getElementById('start-button').addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  showRandomMonster();
});

// 戦闘ボタンのクリックイベント
document.getElementById('attack-button').addEventListener('click', () => {
  const random = Math.random();

  if (random <= currentMonster.winRate) {
    victories++;
    defeats = 0;
    resultText.textContent = '勝利！';

      gameScreen.style.display = 'none';
      resultScreen.style.display = 'block';
      document.body.style.backgroundColor = '#FF6761';
      setTimeout(() => {
        resultScreen.style.display = 'none';
        startScreen.style.display = 'block';
        document.body.style.backgroundColor = '';
        defeats = 0;
      }, 3000);

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
      }, 3000);
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

function showRandomMonster() {
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
  const monsterImage = document.getElementById('monster-image');
  monsterImage.src = currentMonster.image;
  monsterImage.alt = currentMonster.name;
  document.getElementById('monster-name').textContent = currentMonster.name;
  document.getElementById('win-rate').textContent = `勝率: ${currentMonster.winRate * 100}%`;
}
