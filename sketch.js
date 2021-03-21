var balloon;
var position, database;
var bgImage;
var BalloonImg;

function preload(){
  bgImage=loadImage("Hot Air Ballon-01.png");

  BalloonImg1=loadImage("Hot Air Ballon-02.png");
  BalloonImg2=loadImage("Hot Air Ballon-03.png");
  BalloonImg3=loadImage("Hot Air Ballon-04.png");

}
function setup(){
    database=firebase.database();
    createCanvas(500,500);
    balloon = createSprite(250,250,10,10);
    balloon.addImage("balloon",BalloonImg1);

    var balloonPosition=database.ref('balloon/position');
    balloonPosition.on("value", readPosition, showError);
}

function draw(){
    background(bgImage);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('balloon/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}
function readPosition(data){
    position=data.val();
    balloon.x=position.x;
    balloon.y=position.y;
}
function showError(){
    console.log("Error");
}