let header = document.querySelector("header");
let header_wrapper = document.querySelector(".header_wrapper");
let menu_toggle = document.querySelector(".menu_btn");
let navbar = document.querySelector(".navbar");
let menus = document.querySelectorAll(".menu");
let membership_btn = document.querySelector(".membership_btn");
let global_btn = document.querySelector(".global_btn");
let timeOutID = 0;
let isToggle = false;

global_btn.addEventListener('click', function(){
    window.alert("현재 글로벌 버전을 준비 중입니다. 빠른 시일 내에 찾아뵙겠습니다.\nWe are currently preparing a web page for global users.");
    if(isToggle){
        menu_toggle.click();
    }
});

membership_btn.addEventListener('click',function(){
    if(isToggle){
        menu_toggle.click();
    }
});

menus[0].addEventListener('click',function(){
    if(isToggle){
        menu_toggle.click();
    }
});

menus[1].addEventListener('click',function(){
    if(isToggle){
        menu_toggle.click();
    }
});

menus[2].addEventListener('click',function(){
    if(isToggle){
        menu_toggle.click();
    }
});

menus[3].addEventListener('click',function(){
    if(isToggle){
        menu_toggle.click();
    }
});

menus[4].addEventListener('click',function(){
    if(isToggle){
        menu_toggle.click();
    }
});

window.addEventListener("scroll", function () {
    if(!isToggle){
        header.classList.toggle("sticky", window.scrollY > 0);
    }
});

header.addEventListener("mouseover", function () {
    if (window.scrollY == 0) {
        header.classList.add("sticky");
    }
});

header.addEventListener("mouseout", function () {
    if (window.scrollY == 0 && !isToggle) {
        header.classList.remove("sticky");
    }
});


menu_toggle.addEventListener("click", function(){
    if(isToggle){
        clearTimeout(timeOutID);

        header.classList.remove("toggle");
        header_wrapper.classList.remove("toggle");
        navbar.classList.remove("toggle");
        membership_btn.classList.remove("toggle");
        global_btn.classList.remove("toggle");
        isToggle = false;
    }else{
        header.classList.add("sticky");
        header.classList.add("toggle");
        header_wrapper.classList.add("toggle");
        
        timeOutID = setTimeout(function(){
            navbar.classList.add("toggle");
            membership_btn.classList.add("toggle");
            global_btn.classList.add("toggle");
            isToggle = true;}, 250);
    }
})

var banner_swiper = new Swiper(".banner_swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 54,
        depth: 92,
        modifier: 2,
        slideShadows: false,
    },    
    breakpoints: {  
        768: {
            coverflowEffect: {
                rotate: 0,
                stretch: 34,
                depth: 84,
                modifier: 2,
                slideShadows: false,
            },    
        },
        1024: {
            coverflowEffect: {
                rotate: 0,
                stretch: 23,
                depth: 78,
                modifier: 2,
                slideShadows: false,
            },    
        },
    },
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
});

var story_swiper = new Swiper(".story_swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    loop: false,
    loopFillGroupWithBlank: false,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
        },
        768:{
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 32,
        },
        1320:{
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
        }
    },
});


var team_swiper = new Swiper(".team_swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    loop: false,
    loopFillGroupWithBlank: false,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
        },
        768:{
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 32,
        },
        1320:{
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
        }
    },
});