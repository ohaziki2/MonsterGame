// モンスターのデータ
const monsters = [
  { name: 'グリーンモンスター', winRate: 0.3, image: 'image/green_monster.png' ,reward: 0,score: 10,},
  { name: 'オレンジスパイク', winRate: 0.4, image: 'image/orange_spike.png' ,reward: 0,score: 6,},
  { name: 'アクアアイ', winRate: 0.5, image: 'image/aqua_eye.png' ,reward: 0,score: 5,},
  { name: 'ピンクゴースト', winRate: 0.6, image: 'image/pink_ghost.png' ,reward: 1,score: 4,},
  { name: 'イエローウィング', winRate: 0.65, image: 'image/yellow_wing.png' ,reward: 2,score: 3,},
  { name: 'パープルスペクター', winRate: 0.75, image: 'image/purple_specter.png' ,reward: 2,score: 2,},                                                           
  { name: 'ライムハンド', winRate: 0.55, image: 'image/lime_hand.png' ,reward: 0,score: 4,},
  { name: 'ネイビーマインド', winRate: 0.4, image: 'image/navy_mind.png' ,reward: 0,score: 7,},
  { name: 'レッドデビル', winRate: 0.1, image: 'image/red_devil.png' ,reward: 0,score: 25,},
  { name: 'ブルーヘア', winRate: 0.7, image: 'image/blue_hair.png',reward: 2,score: 4,},
  { name: 'グレイ', winRate: 0.65, image: 'image/gray.png' ,reward: 1,score: 5,},
  { name: 'コーラルシェル', winRate: 0.8, image: 'image/choral_shell.png' ,reward: 1, score: 2,}
];

const perks = [,
  { name: 'シールド',image: 'image/shield.png'},
  { name: 'リロール',image: 'image/light_amulet.png'}
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
const smallButton = document.getElementById('small-Button');
const lastScore = document.getElementById('last-score');

document.getElementById('start-button').addEventListener('click', () => {
  nowScore = 0;
  myScore.textContent = "スコア:" + 0;
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
        resultScreen.style.display = 'none';
        showRandomMonsters();
        document.body.style.backgroundColor = '';
        defeats = 0;
      }, 2000);

    } else {
      if (isShield) {
        alert("シールドがあなたを守った！");
        isShield = false;
        // この行を追加して閉じカッコを閉じる
        showRandomMonsters();
      } else {
        victories = 0;
        defeats++;
        resultText.textContent = '敗北...';
        lastScore.textContent = nowScore;
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
      rewardImage.src = "image/transparent.png";
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
      invImage.src = "image/transparent.png"
    }
    
  }
}
//document.getElementById('pig-meat').addEventListener('click', () => {
  //window.location.href = "https://www.calbee.co.jp/"; 
//});


document.addEventListener("DOMContentLoaded", function(event) {

  function ground() {
    var tl = gsap.timeline({
      repeat: -1
    });
  
    tl.to("#ground", 20, {
      backgroundPosition: "1301px 0px",
      force3D: true,
      rotation: 0.01,
      z: 0.01,
      autoRound: false,
      ease: Linear.easeNone
    });
  
    return tl;
  }
  
  function clouds() {
    var tl = gsap.timeline({
      repeat: -1
    });
  
    tl.to("#clouds", 52, {
      backgroundPosition: "-2247px bottom",
      force3D: true,
      rotation: 0.01,
      z: 0.01,
      //autoRound:false,
      ease: Linear.easeNone
    });
  
    return tl;
  }

  var masterTL = new TimelineMax({
    repeat: -1
  });
  
  // window load event makes sure image is 
// loaded before running animation
window.onload = function() {
  var masterTL = gsap.timeline({
    repeat: -1
  });

  masterTL
  .add(ground(),0)
  .add(clouds(),0)
  .timeScale(0.7)
  .progress(1).progress(0)
  .play();
};
  
});