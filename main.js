
const startButton = document.getElementById('start-button');
function writeQuestion() {
    titleText.textContent = `第${sum + 1}問`;
    questionText.textContent = questions[sum].question;
}
startButton.onclick = function(){
    startButton.style.display = "none";
}