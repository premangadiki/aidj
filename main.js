function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

harryPotter ="";
peterPan ="";

function preload(){
    harryPotter = loadSound("music.mp3");
    peterPan = loadSound("music2.mp3");
}

function draw(){
    image(video , 0 , 0 , 600 , 500);
}