const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startBtn = document.querySelector('.start_btn');

let lastHole;
let timeUp = false;
let timeLimit = 30000;
let score = 0;
let countdown;

function pickRandomHole(holes){
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole){
        return pickRandomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

function popOut(){
    const time = Math.random() * 1000 + 500;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeUp) popOut();
    },time);
}

function startGame(){
    startBtn.style.display = "none";
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = "남은 시간 : " + countdown + "초";
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(() => {
        timeUp = true; 
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = "남은 시간 : " + countdown + "초";
        if(countdown <= 0){
            countdown = 0;
            clearInterval(startCountdown);
            startBtn.style.display = "block";
            recordScore();
        }
    }, 1000)
}

startBtn.addEventListener('click', startGame);

function whack(e){
    score++;
    this.style.backgroundImage = 'url(bravesoulmate_sprites/ghost_2.png)';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url(bravesoulmate_sprites/ghost_1.png)';
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = score;
}

function recordScore(){
    let record = prompt(score + "점을 달성! 어떤 이름으로 불러드릴까요?\nYour score is " + score + "! What should I call you?", "여기에 이름을 입력해주세요!").trim();
    countdownBoard.textContent = record + "님이 " + score + "점을 달성하였습니다!";
}

moles.forEach(mole => mole.addEventListener('click', whack));