/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

const backgroundImage = new Image();
backgroundImage.src = "bravefox_sprites/Background.png";

const maxImage_1 = new Image();
maxImage_1.src = "bravefox_sprites/01.png";

const maxImage_2 = new Image();
maxImage_2.src = "bravefox_sprites/02.png";

const maxImage_3 = new Image();
maxImage_3.src = "bravefox_sprites/03.png";

const maxImage_4 = new Image();
maxImage_4.src = "bravefox_sprites/04.png";

const slimeImage_s = new Image();
slimeImage_s.src = "bravefox_sprites/Short.png";

const slimeImage_l = new Image();
slimeImage_l.src = "bravefox_sprites/Long.png";

const slimeImage_w = new Image();
slimeImage_w.src = "bravefox_sprites/Wide.png";

const slimeImage_b = new Image();
slimeImage_b.src = "bravefox_sprites/Boss.png";

const scoreText = document.getElementById('score');
let scoreCount = 0;

const startText = document.getElementById('tap');
const gameoverText = document.getElementById('gameover');
const recordText = document.getElementById('record');

let maxSprites = [maxImage_1, maxImage_2, maxImage_3, maxImage_4];

let isChanged = false;
let isSpawned = false;

const max = {
    x : 24,
    y : 200,
    width : 84,
    height : 84,
    speed : 480,
    isJump : false,
    isDown : false
}

let bossSlimes = [];

class BossSlime {
    constructor(){
        this.x = 640;
        this.y = 173;
        this.width = 104;
        this.height = 108;
        this.speed = slimeSpeed;
    }
}


let shortSlimes = [];

class ShortSlime {
    constructor(){
        this.x = 640;
        this.y = 232;
        this.width = 52;
        this.height = 48;
        this.speed = slimeSpeed;
    }
}

let longSlimes = [];

class LongSlime {
    constructor(){
        this.x = 640;
        this.y = 185;
        this.width = 52;
        this.height = 94;
        this.speed = slimeSpeed;
    }
}

let wideSlimes = [];

class WideSlime {
    constructor(){
        this.x = 640;
        this.y = 232;
        this.width = 102;
        this.height = 48;
        this.speed = slimeSpeed;
    }
}

let slimeSpeed = 380;
let background_x = 0;
let then = 0;
let i = 0;
let isStarted = false;
let isGameOver = false;

function setDifficulty(){
    if(slimeSpeed != 560){
        if(scoreCount >= 25 && slimeSpeed <= 380){
            slimeSpeed = 440;
        }else if(scoreCount >= 50 && slimeSpeed <= 440){
            slimeSpeed = 480;
        }else if(scoreCount >= 75 && slimeSpeed <= 480){
            slimeSpeed = 520;
        }else if(scoreCount >= 100 && slimeSpeed <= 520){
            slimeSpeed = 560;
        }
    }
}

function animate(now){
    now *= 0.001;
    var deltaTime = now - then;
    then = now;

    if(!max.isJump){
        if(Math.floor(now * 20) % 2 == 0){
            if(!isChanged){
            isChanged = true;
            i++;
            if(i > 3){
                i = 0;
            }
        }
        }else{
            isChanged = false;
        }
    }else{
        i = 3;
    }

    if(isStarted){
    if(Math.floor(now * 10) % 12 == 0){
        if(!isSpawned){
            isSpawned = true;
            let temp = Math.floor(Math.random() * 100);

            if(temp <= 39)
            {
                let shortSlime = new ShortSlime();
                shortSlimes.push(shortSlime);
            }else if(temp <= 64){
                let wideSlime = new WideSlime();
                wideSlimes.push(wideSlime);
            }else if(temp <= 89){
                let longSlime = new LongSlime();
                longSlimes.push(longSlime);
            }else{
                let bossSlime = new BossSlime();
                bossSlimes.push(bossSlime);
                
            }
        }
    }else{
        isSpawned = false;
    }
    }

    ctx.clearRect(0,0, canvas.width, canvas.height);

    background_x -= slimeSpeed * deltaTime * 0.6;
    if(background_x < -640){
        background_x = 0;
    }

    ctx.drawImage(backgroundImage, background_x, 0, 640, 360);
    ctx.drawImage(backgroundImage, background_x + 640, 0, 640, 360);

    for(let i = 0; i < shortSlimes.length; i++){
        shortSlimes[i].x -= shortSlimes[i].speed * deltaTime;
        ctx.drawImage(slimeImage_s, shortSlimes[i].x, shortSlimes[i].y, 52, 48);
        if(detectCollision(max, shortSlimes[i]) || shortSlimes[i].x <= -52){
            shortSlimes.splice(i, 1);
            i--;
            if(!isGameOver){
            scoreCount += 2;
            setDifficulty();
            scoreText.innerHTML = "SCORE : " + scoreCount.toString();}
        };
    }

    for(let i = 0; i < longSlimes.length; i++){
        longSlimes[i].x -= longSlimes[i].speed * deltaTime;
        ctx.drawImage(slimeImage_l, longSlimes[i].x, longSlimes[i].y, 52, 94);
        if(detectCollision(max, longSlimes[i]) || longSlimes[i].x <= -52){
            longSlimes.splice(i, 1);
            i--;
            if(!isGameOver){
            scoreCount += 4;
            setDifficulty();
            scoreText.innerHTML = "SCORE : " + scoreCount.toString();}
        };
    
    }

    for(let i = 0; i < wideSlimes.length; i++){
        wideSlimes[i].x -= wideSlimes[i].speed * deltaTime;
        ctx.drawImage(slimeImage_w, wideSlimes[i].x, wideSlimes[i].y, 102, 48);
        if(detectCollision(max, wideSlimes[i]) || wideSlimes[i].x <= -102){
            wideSlimes.splice(i, 1);
            i--;
            if(!isGameOver){
            scoreCount += 4;
            setDifficulty();
            scoreText.innerHTML = "SCORE : " + scoreCount.toString();} 
        };
    
    }

    for(let i = 0; i < bossSlimes.length; i++){
        bossSlimes[i].x -= bossSlimes[i].speed * deltaTime;
        ctx.drawImage(slimeImage_b, bossSlimes[i].x, bossSlimes[i].y, 104, 108);
        if(detectCollisionBoss(max, bossSlimes[i]) || bossSlimes[i].x <= -124){
            bossSlimes.splice(i, 1);
            i--;
            if(!isGameOver){
            scoreCount += 8;
            setDifficulty();
            scoreText.innerHTML = "SCORE : " + scoreCount.toString();} 
        };
    
    }

    jumpMax(deltaTime);
    ctx.drawImage(maxSprites[i], max.x, max.y, 84,84);
    
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

canvas.addEventListener('click', function(){
    if(isStarted){
        if(!max.isJump){
            max.isJump = true;
        }
    }
})

startText.addEventListener('click', function(){
    isStarted = true;
    scoreText.style.visibility = "visible";
    gameoverText.style.visibility = "hidden";
    recordText.style.visibility = "hidden";
    startText.style.visibility = "hidden";
    scoreCount = 0;
    scoreText.innerHTML = "SCORE : " + scoreCount.toString();
    slimeSpeed = 380;
    isGameOver = false;
})

function jumpMax(delta){
    if(max.isJump){
        if(max.y >= 52 && !max.isDown){
            max.y -= max.speed * delta * (max.y - 52) * 0.015;
            if(max.y - 52 <= 10){
                max.isDown = true;
            }
        }else if(max.isDown){
            max.y += max.speed * delta * (max.y - 52) * 0.015;
            if(max.y >= 196){
                max.y = 200;
                max.isDown = false;
                max.isJump = false;
            }
        }
    }
}


function detectCollisionBoss(a, b){
    if(a.x > b.x + b.width - 24 || a.x + a.width - 24 < b.x || a.y > b.y + b.height - 24 || a.y + a.height - 24 < b.y){

    }else{
        isStarted = false;
        isGameOver = true;
        scoreText.style.visibility = "hidden";
        gameoverText.innerHTML = "GAME OVER";
        gameoverText.style.visibility = "visible";
        recordText.innerHTML = scoreCount.toString();
        recordText.style.visibility = "visible";
        startText.innerHTML = "Tap to Retry";
        startText.style.visibility = "visible";
        scoreCount = 0;
        scoreText.innerHTML = "SCORE : " + scoreCount.toString();
        slimeSpeed = 380;
        spawnDifficulty = 15;
        shortSlimes = [];
        longSlimes = [];
        wideSlimes = [];
        bossSlimes = [];

        callGameOver();

        return true;
    }
}



function detectCollision(a, b){
    if(a.x > b.x + b.width - 16 || a.x + a.width - 16 < b.x || a.y > b.y + b.height - 16 || a.y + a.height - 16 < b.y){

    }else{
        isStarted = false;
        isGameOver = true;
        scoreText.style.visibility = "hidden";
        gameoverText.innerHTML = "GAME OVER";
        gameoverText.style.visibility = "visible";
        recordText.innerHTML = scoreCount.toString();
        recordText.style.visibility = "visible";
        startText.innerHTML = "Tap to Retry";
        startText.style.visibility = "visible";
        scoreCount = 0;
        scoreText.innerHTML = "SCORE : " + scoreCount.toString();
        slimeSpeed = 380;
        spawnDifficulty = 15;
        shortSlimes = [];
        longSlimes = [];
        wideSlimes = [];
        bossSlimes = [];

        callGameOver();

        return true;
    }
}

function callGameOver(){
    
    var inputID = prompt('무슨 이름으로 불러드릴까요? Tell me what your name is','');
    if(inputID == null || inputID.trim() == ""){
    }else{
        gameoverText.innerHTML = inputID;
    }

    max.isJump = false;
    max.isDown = false;

    max.x = 24;
    max.y = 200;
}

