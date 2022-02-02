var PLAY = 1;
var END = 0;
var gameState = PLAY;
var touches =[]
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOver, gameOverImg,restartImg,restart

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png") 
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height-10,width,125);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImg)

  restart=createSprite(300,140)
  restart.addImage(restartImg)
  gameOver.scale=0.5;
  restart.scale=0.5;
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  //crear grupos de obstáculos y nubes
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hola" + 5);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = true
  
  score = 0
}

function draw() {
  background("orange");
  //mostrar la puntuación
  text("Puntuación : "+ score, 500,50);
  
  console.log("esto es  ",gameState)
  
  
  if(gameState === PLAY){
    //mover el suelo
    ground.velocityX = -4;
    //puntuación
    score = score + Math.round(frameCount/60);
    if((touches.length>0||keyDown("space"))&&trex.y>= height-120){
      trex.velocityY=-10
      touches=[]
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //agregar gravedad
    trex.velocityY = trex.velocityY + 0.8
    gameOver.visible=false
    restart.visible=false
    //aparecer nubes
    spawnClouds();
  
    //aparecer obstáculos en el suelo
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
      trex,velocityY=0
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1)
     gameOver.visible=true
     restart.visible=true
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     trex.changeAnimation("collided",trex_collided);
   }
  
 
  //evitar que el Trex caiga
  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  drawSprites();
}
function reset(){
gameState=PLAY;
gameOver.visible=false
restart.visible=false
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
score=0
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asignar escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asignar ciclo de vida a la variable
    cloud.lifetime = 134;
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //ajustar la profundidad
   cloudsGroup.add(cloud);
  }
  }
