const areaWidth = 140;
const sliderWidth = 30-1;
const middleLineX = 59;
const sliderHeight = 240-1;

function main(){
    let slider = document.querySelector("#slider");
    slider.setAttribute('y', 0);
    slider.setAttribute('x', middleLineX - sliderWidth/2);
    slider.setAttribute('width', sliderWidth);
    slider.setAttribute('height', sliderHeight);
    anime({
        targets: 'div', 
        translateX: 250,
        //rotate: '1turn',
        //backgroundColor: '#FFF',
        duration: 1500,
        scale: 0.75,
        easing: 'easeInOutExpo',
        direction: 'alternate',
        loop: true,
        autoplay: true
    });

    anime({
        targets: '#slider',
        y: "150",
        height: "20",
        easing: "easeOutExpo",
        direction: "alternate",
        delay: 500,
        endDelay: 1000,
        loop: true
    })
}

document.addEventListener("DOMContentLoaded", main);