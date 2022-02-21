/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 640;

const slimeImage = new Image();
slimeImage.src = "bravemongz_sprites/Mongz_Slime_R.png";

const bananaImage = new Image();
bananaImage.src = "bravemongz_sprites/Mongz_Banana.png";

const stoneImage = new Image();
stoneImage.src = "bravemongz_sprites/Mongz_Stone.png";

const scoreText = document.getElementById('score');
let scoreCount = 0;

const startText = document.getElementById('tap');
const gameoverText = document.getElementById('gameover');
const recordText = document.getElementById('record');
const hashtag1 = document.getElementById('hashtag1');
const hashtag2 = document.getElementById('hashtag2');

let isStarted = false;

const slime = {
    x : 166,
    y : 460,
    width : 68,
    height : 56,
    speed : 180,
    moveRight : true
}

let bananas = []

class Banana {
    constructor(){
        this.type = "banana";
        this.x = 0;
        this.y = 0;
        this.width = 42;
        this.height = 40;
        this.speed = 180;
    }
    randomPos(){
        this.x = Math.floor(Math.random() * 358);
        this.speed = Math.floor(Math.random() * 120) + 120;
    }
}

let stones = []

class Stone {
    constructor(){
        this.type = "stone";
        this.x = 0;
        this.y = 0;
        this.width = 38;
        this.height = 40;
        this.speed = 180;
    }
    randomPos(){
        this.x = Math.floor(Math.random() * 362);
        this.speed = Math.floor(Math.random() * 120) + 120;
    }
}

let then = 0;
let isStopped = false;
let isSpawned = false;

function moveSlime(delta){
    if(slime.moveRight){
        slime.x += slime.speed * delta;
    }else{
        slime.x -= slime.speed * delta;}
}

function detectCollision(a, b){
    if(a.x > b.x + b.width - 12 || a.x + a.width - 12 < b.x || a.y > b.y + b.height - 16 || a.y + a.height - 16 < b.y){

    }else{
        if(b.type == "stone"){
            isStopped = true;
            recordText.innerText = scoreCount.toString();
            recordText.style.visibility = "visible";
            gameoverText.style.visibility = "visible";
            startText.style.visibility = "visible";
            scoreText.style.visibility = "hidden";
            startText.innerText = "Tap to Retry"
            hashtag1.style.visibility = "visible";
            hashtag2.style.visibility = "visible";

            var inputID = prompt('무슨 이름으로 불러드릴까요? Tell me what your name is','');
            if(inputID != null){
                hashtag2.innerText = "#"+inputID;}
            else{
                hashtag2.innerText = "#Collaboration #Event #AirDrop";
                }
            
        }else{
            scoreCount += 5;
            scoreText.innerText = "SCORE : " + scoreCount.toString();
        }

        return true;
    }
}

function animate(now){

    now *= 0.001;
    var deltaTime = now - then;
    then = now;

    console.log(deltaTime);

    if(!isStopped){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(slimeImage, 0, 0, 68, 56, slime.x, slime.y, 68, 56);

    moveSlime(deltaTime);
    
    if(slime.x > 320 && slime.moveRight){
        slime.moveRight = false;
        slimeImage.src = "bravemongz_sprites/Mongz_Slime_L.png";
    }else if(slime.x < 0 && !slime.moveRight){
        slime.moveRight = true;
        slimeImage.src = "bravemongz_sprites/Mongz_Slime_R.png";
    }

    if(isStarted){
        if(Math.floor(now * 10) % 10 == 0){
            if(!isSpawned){
            isSpawned = true;

            if(Math.floor(Math.random() * 100) <= 33){
                let banana = new Banana();
                banana.randomPos();
                bananas.push(banana);
                
            }
            else
            {
                let stone = new Stone();
                stone.randomPos();
                stones.push(stone);
            }
        }
        }else{
            isSpawned = false;
        }

        for(let i = 0; i < bananas.length; i++){
            bananas[i].y += bananas[i].speed * deltaTime;
            ctx.drawImage(bananaImage, 0, 0, 42, 40, bananas[i].x, bananas[i].y, 42, 40);
            if(detectCollision(slime, bananas[i]) || bananas[i].y > 456){
                bananas.splice(i, 1);
                i--;
            };
            
        }

        for(let i = 0; i < stones.length; i++){
            stones[i].y += stones[i].speed * deltaTime;
            ctx.drawImage(stoneImage, 0, 0, 38, 40, stones[i].x, stones[i].y, 38, 40);
            if(detectCollision(slime, stones[i]) || stones[i].y > 456){
                stones.splice(i, 1);
                i--;
            };
        }
    }
}
requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

canvas.addEventListener('click', function(e){

    if(isStarted && e.target.id != "tap"){
        slime.moveRight = !slime.moveRight;

        if(slime.moveRight){
            slimeImage.src = "bravemongz_sprites/Mongz_Slime_R.png";
        }else{
            slimeImage.src = "bravemongz_sprites/Mongz_Slime_L.png";
        }
    }
})

startText.addEventListener('click', function(){
    isStarted = true;
    if(startText.innerText == "Tap to Retry"){
        isStopped = false;
        gameoverText.style.visibility = "hidden";
        recordText.style.visibility = "hidden";
        hashtag1.style.visibility = "hidden";
        hashtag2.style.visibility = "hidden";
        scoreText.style.visibility = "visible";
        bananas = [];
        stones = [];
    }
    scoreCount = 0;
    scoreText.innerText = "SCORE : " + scoreCount.toString();
    startText.style.visibility = "hidden";
})