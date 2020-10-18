const areaWidth = 240;
const sliderWidth = 30;
const middleLineX = 59;

function main(){
    let slider = document.querySelector("#slider");
    slider.y = 0;
    slider.x = 
    anime({
        targets: 'div', 
        translateX: 250,
        //rotate: '1turn',
        //backgroundColor: '#FFF',
        duration: 1500,
        easing: 'easeInOutExpo',
        direction: 'alternate',
        loop: true,
        autoplay: true
    });
}

document.addEventListener("DOMContentLoaded", main);