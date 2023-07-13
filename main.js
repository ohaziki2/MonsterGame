// モンスターのデータ
const monsters = [
  { name: 'モンスター1', winRate: 0.3, image: 'monster1.png' },
  { name: 'モンスター2', winRate: 0.4, image: 'monster2.png' },
  { name: 'モンスター3', winRate: 0.5, image: 'monster3.png' },
  // ... 他のモンスターのデータを追加
  { name: 'モンスター12', winRate: 0.8, image: 'monster12.png' }
];

let currentMonster;
let victories = 0;

// スタートボタンのクリックイベント
document.getElementById('start-button').addEventListener('click', () => {
  // ゲーム画面を表示し、スタート画面を非表示にする
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';

  // ランダムにモンスターを選択
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)];

  // モンスターのイラスト、名前、勝率を表示
  const monsterContainer = document.getElementById('monster-container');
  monsterContainer.innerHTML = '';
  
  const monsterImage = document.createElement('img');
  monsterImage.src = currentMonster.image;
  monsterImage.alt = currentMonster.name;
  monsterContainer.appendChild(monsterImage);
  
  const monsterName = document.createElement('h2');
  monsterName.textContent = currentMonster.name;
  monsterContainer.appendChild(monsterName);
  
  const winRate = document.createElement('p');
  winRate.textContent = `勝率: ${currentMonster.winRate * 100}%`;
  monsterContainer.appendChild(winRate);
});

// 戦闘ボタンのクリックイベント
document.getElementById('attack-button').addEventListener('click', () => {
  const random = Math.random();

  if (random <= currentMonster.winRate) {
    // 勝利した場合
    victories++;
    document.getElementById('result-text').textContent = '勝利！';
  } else {
    // 敗北した場合
    victories = 0;
    document.getElementById('result-text').textContent = '敗北...';
  }

  // ゲーム画面を非表示にし、結果画面を表示する
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  // 10回勝利した場合はゲームクリア画面を表示する
  if (victories >= 10) {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('game-clear-screen').style.display = 'block';
  }
});

// 次へボタンのクリックイベント
document.getElementById('next-button').addEventListener('click', () => {
  // 結果画面を非表示にし、ゲーム画面を表示する
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';

  // ランダムにモンスターを選択
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)];

  // モンスターのイラスト、名前、勝率を表示
  const monsterContainer = document.getElementById('monster-container');
  monsterContainer.innerHTML = '';
  
  const monsterImage = document.createElement('img');
  monsterImage.src = currentMonster.image;
  monsterImage.alt = currentMonster.name;
  monsterContainer.appendChild(monsterImage);
  
  const monsterName = document.createElement('h2');
  monsterName.textContent = currentMonster.name;
  monsterContainer.appendChild(monsterName);
  
  const winRate = document.createElement('p');
  winRate.textContent = `勝率: ${currentMonster.winRate * 100}%`;
  monsterContainer.appendChild(winRate);
});
