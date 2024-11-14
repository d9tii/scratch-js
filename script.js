let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

const init = ( ) => {
    let gradientColor = context.createLinearGradient(0, 0, 135, 135)
    gradientColor.addColorStop(0,"#c3a3f1");
    gradientColor.addColorStop(1,"#6414e9");
    context.fillStyle = gradientColor;
    context.fillRect(0,0,200,200)
};

//pozicije misa x i y su 0
let mouseX = 0;
let mouseY = 0;
let isDragged = false;

//Desavanja na dodir misa
let events = {
    mouse:{
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

//Detech touch device

const isTouchDevice = () => {
    try{
        DocumentType.createEvent("TouchEvent");
        deviceType = "touch"
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

//Get left and top of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//extract x and y position of mouse
const getXY = (e) => {
    mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
    mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};


isTouchDevice();
canvas.addEventListener(events[deviceType].down,(events) => {
    isDragged = true;
    getXY(events);
    scratch(mouseX, mouseY);
});

canvas.addEventListener(events[deviceType].move,
    (events) => {
        if (!isTouchDevice()) {
            events.preventDefault();
        }
        if(isDragged){
            getXY(events);
            scratch(mouseX, mouseY);
        }
    }
);


canvas.addEventListener(events[deviceType].up, () => {
    isDragged = false;
});

const scratch = (x,y) => {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    //arc makes circle x,y radius
    context.arc(x,y,12,0,2 * Math.PI);
    context.fill()
};

//if mouse leave square
canvas.addEventListener("mouseleave", () => {
    isDragged = false;
});



window.onload = init();