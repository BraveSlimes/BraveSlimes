let enemy = document.querySelector(".enemy");
let btn = document.querySelector(".btn_wrapper")
let dial = document.querySelector(".dial");
let num = 0;
let frame = 0;
let isStopped = false;
let roundCount = 1;
let winCount = 0;
let round = document.querySelector(".round");
let victory = document.querySelector(".victory");
let isSlime = true;
let profile = document.querySelector(".profile");
let player = "";

function animate(){
    if(!isStopped && frame % 6 == 0){
        switch(num){
            case 0:
                enemy.innerHTML = "✊"
                num = 1;
                break;
            case 1:
                enemy.innerHTML = "🖐"
                num = 2;
                break;
            case 2:
                enemy.innerHTML = "✌"
                num = 0;
                break;

        }
    }
    frame ++;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

btn.addEventListener("click", function(e){
    if(e.target.value != undefined && !isStopped){

        let atk = Math.floor(Math.random() * 300) + 1;

        switch(e.target.value){
            case "scissors":
                if(atk <= 150){
                    enemy.innerHTML = "🖐"
                    winBattle()
                }else if(atk <= 225){
                    enemy.innerHTML = "✌"
                    drawBattle();
                }else{
                    enemy.innerHTML = "✊"
                    loseBattle();
                }
                break;
            case "rock":
                if(atk <= 150){
                    enemy.innerHTML = "✌"
                    winBattle();
                }else if(atk <= 225){
                    enemy.innerHTML = "✊"
                    drawBattle();
                }else{
                    enemy.innerHTML = "🖐"
                    loseBattle();
                }
                break;
            case "paper":
                if(atk <= 150){
                    enemy.innerHTML = "✊"
                    winBattle();
                }else if(atk <= 225){
                    enemy.innerHTML = "🖐"
                    drawBattle();
                }else{
                    enemy.innerHTML = "✌"
                    loseBattle();
                }
                break;
        }
    }
})

function winBattle(){
    dial.innerHTML = "읏... 저를 이겼군요... 하지만 저는 사천왕 중 최약체라는 사실을 알아두시죠!"
    roundCount ++;
    round.innerHTML = "- ROUND " + roundCount + " -";
    winCount ++;
    let temp = "";

    for(let i = 0; i < winCount; i++){
        temp += "🔥";
    }

    victory.innerHTML = winCount + " WIN " + temp;
    isStopped = true;
    isSlime = !isSlime;
    setTimeout(retry, 2000);
}

function drawBattle(){
    dial.innerHTML = "저랑 비기시다니 꽤 하시는군요?"
    roundCount ++;
    round.innerHTML = "- ROUND " + roundCount + " -"
    isStopped = true;
    isSlime = !isSlime;
    setTimeout(retry, 2000);
}

function loseBattle(){
    dial.innerHTML = "저의 승리는 당연한 사실! 하지만 좋은 승부였습니다."
    roundCount = 1;
    round.innerHTML = "- ROUND " + roundCount + " -";
    winCount = 0;
    victory.innerHTML = winCount + " WIN";
    isStopped = true;
    player ="";
    isSlime = !isSlime;
    setTimeout(retry, 2000);
}

function retry(){
    if(winCount == 3){
        player = window.prompt("용감한 슬라임과 클레이 다이노로부터 3승을 따셨네요! 어떻게 불러드릴까요?\n" + "What's your name?");
    }

    if(isSlime){
        profile.src = "bravedino_sprites/BraveSlime.png";
        if((player != null && player != undefined && player.trim() != "") && winCount >= 3){
            dial.innerHTML = player + "요? 제가 아는 타짜 중 최고였어요.";
        }else{
            dial.innerHTML = "후훗... 슬라임계의 타짜인 저와 승부라니 정말 운이 나쁘시군요?"
        }
    }else{
        profile.src = "bravedino_sprites/KlayDino.png";
        if((player != null && player != undefined && player.trim() != "") && winCount >= 3){
            dial.innerHTML = player + "요? 제가 아는 타짜 중 최고였어요.";
        }else{
            dial.innerHTML = "후훗... 공룡계의 타짜인 저와 승부라니 정말 운이 나쁘시군요?"
        }
    }
    isStopped = false;
}