//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var fruit1;
var fruit2;
var fruit3;
var fruit4;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterimage=loadAnimation("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  gameoverimage=loadImage("gameover.png");
  
  gameOverSound=loadSound("gameover.mp3");
  knifeSound=loadSound("knifeSwoosh.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  fruitGroup=new Group()
  MonsterGroup=new Group()
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
     fruits();
 monster();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifeSound.play();
      score=score+2;
    }
    // Go to end state if knife touching enemy
      if (MonsterGroup.isTouching(knife)){
        gameState=END
         gameOverSound.play();
        
        fruitGroup.destroyEach();
        MonsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        MonsterGroup.setVelocityXEach(0);
        
        knife.addImage( gameoverimage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
  }
 
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(World.frameCount%80===0){
      fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    
    r=Math.round(random(1,4));
    if(r==1) {
      fruit.addImage(fruit1); 
    }else if(r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
     
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
  }  
}

function monster(){
    if(World.frameCount%200===0){
   Monster=createSprite(400,200,20,20);
      Monster.addAnimation("moving",monsterimage);
      Monster.y=Math.round(random(100,550));
      Monster.velocityX=-(8+(score/10));
      Monster.setLifetime=50;
      
      MonsterGroup.add(Monster);
    }
}



