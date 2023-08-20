// モンスターのデータ
const monsters = [
  { name: 'グリーンモンスター', winRate: 0.3, image: '1.png' ,reward: 0,score: 10,},
  { name: 'オレンジスパイク', winRate: 0.4, image: '2.png' ,reward: 0,score: 6,},
  { name: 'アクアアイ', winRate: 0.5, image: '3.png' ,reward: 0,score: 5,},
  { name: 'ピンクゴースト', winRate: 0.6, image: '4.png' ,reward: 0,score: 4,},
  { name: 'イエローウィング', winRate: 0.65, image: '5.png' ,reward: 2,score: 3,},
  { name: 'パープルスペクター', winRate: 0.75, image: '6.png' ,reward: 2,score: 2,},                                                           
  { name: 'ライムハンド', winRate: 0.55, image: '7.png' ,reward: 0,score: 4,},
  { name: 'ネイビーマインド', winRate: 0.4, image: '8.png' ,reward: 0,score: 7,},
  { name: 'レッドデビル', winRate: 0.1, image: '9.png' ,reward: 0,score: 25,},
  { name: 'ブルーヘア', winRate: 0.7, image: '10.png',reward: 2,score: 4,},
  { name: 'グレイ', winRate: 0.45, image: '11.png' ,reward: 1,score: 5,},
  { name: 'コーラルシェル', winRate: 0.8, image: '12.png' ,reward: 1, score: 2,}
];
const perks = [,
  { name: 'シールド',image: 'shield.png'},
  { name: 'リロール',image: 'light_amulet.png'}
]
//シールド 1 失敗判定無効
//リロール 2 モンスター歳出減
let showmeat = 0;
let currentMonsters = [];
let victories = 0;
let defeats = 0;
let invetory = [];
let nowScore = 0;
let isShield = false;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');
const victoryCount = document.getElementById('victory-count');
const pigMeat = document.getElementById('pig-meat');
const myScore = document.getElementById('my-Score');

document.getElementById('start-button').addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  showRandomMonsters();
  
});
document.getElementsByClassName('use-shield')[0].addEventListener('click',useShield)
function useShield(){
  for (let i = 0; i < invetory.length; i++) {
    const element = invetory[i];
    if (element== 1 &&!isShield) {
      isShield = true;
      invetory.splice(i,1);
      refleshInventory()
      i = invetory.length
    } 
  } 
}
document.getElementsByClassName('use-reroll')[0].addEventListener('click',useReroll)
function useReroll(){
  for (let i = 0; i < invetory.length; i++) {
    const element = invetory[i];
    if (element== 2) {
      showRandomMonsters()
      invetory.splice(i,1);
      refleshInventory()
      i = invetory.length
    } 
  } 
}
document.querySelectorAll('.attack-button').forEach(button => {
  button.addEventListener('click', event => {
    const choice = event.target.getAttribute('data-choice');
    const random = Math.random();

    if (random <= currentMonsters[choice - 1].winRate) {
      isShield = false;
      victories++;
      defeats = 0;
      nowScore += currentMonsters[choice - 1].score;
      myScore.textContent = "スコア:" + nowScore;
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
      if (isShield) {
        alert("シールドがあなたを守った！")
        isShield = false;
      } else{
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
        }
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'block';
    
        if (victories >= 10) {
          resultScreen.style.display = 'none';
          document.getElementById('game-clear-screen').style.display = 'block';
        }
      }
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
    document.querySelectorAll('.monster-info')[i].textContent = `スコア` + currentMonsters[i].score;
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
document.getElementById('pig-meat').addEventListener('click', () => {
  window.location.href = "https://www.calbee.co.jp/"; 
});


function Redirect() {
  alert("ジャガイモのクリックありがとうございます")
  window.location.href = "https://www.calbee.co.jp/"; 
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

