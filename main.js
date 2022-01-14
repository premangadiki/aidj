leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded );
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialzed");
}

function gotPoses(results){
    if(results.length > 0){

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of leftWrist =" + scoreLeftWrist);
        console.log("Score of rightWrist =" + scoreRightWrist);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);

    }
}

song ="";

function draw(){
    image(video , 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2){
     circle(leftWristX , leftWristY , 20);
     InNumberLeftWristY = Number(leftWristY);
     remove_decimals = floor(InNumberLeftWristY);
     volume = remove_decimals/500;
     document.getElementById("volume").innerHTML = "Volume =" + volume;
     song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2){

    circle(rightWristX , rightWristY , 20);
     
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementByID("speed").innerHTML = "Speed of the song = 0.5x";
        song.rate(0.5);
    }

  else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementByID("speed").innerHTML = "Speed of the song = 1.0x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementByID("speed").innerHTML = "Speed of the song = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementByID("speed").innerHTML = "Speed of the song = 2.0x";
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementByID("speed").innerHTML = "Speed of the song = 2.5x";
        song.rate(2.5);
    }
}
}
 
function preload(){
    song = loadSound("music.mp3");
}
 function Play(){
   song.play();
   song.setVolume(1);
   song.rate(1);
 }