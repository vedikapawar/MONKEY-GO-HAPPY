var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImage,stone,stoneImage;
var FoodGroup,obstaclesGroup;
var score = 0;
var obstacle;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage = loadImage("banana.png");
stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y>=100 ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
   player.collide(ground);

  if(FoodGroup.isTouching(player)){
  FoodGroup.destroyEach();
  score = score + 2;
  player.scale += + 0.1
}
//backgr.velocityX = -7;
ground.velocityX = -7;
  drawSprites();
spawnFood();
Obstacles();

if(obstaclesGroup.isTouching(player)){
  gameState = End;

}
  }
    
else if(gameState === End){

  backgr.velocityX = 0;
  player.visible = false;

  FoodGroup.destroyEach();
  obstaclesGroup.destroyEach();

  textSize(30);
  fill(255);
  text("Game Over",300,220);
}
   

  


}
function spawnFood(){
  if(frameCount % 80 ===0){
    var food = createSprite(600,250,40,10);
    food.y = random(120,200);
    food.addImage(bananaImage);
    food.scale = 0.05;
    food.velocityX = -4;

    food.lifetime = 300;
    player.depth = food.depth + 1;
    FoodGroup.add(banana);
  }
}

function Obstacles(){
  if(frameCount % 300 ===5){
    var obstacle = createSprite(800,350,10,40);
    
    obstacle.addImage(stoneImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -6;

    obstacle.lifetime = 500;
    player.depth = obstacle.depth + 1;
    obstaclesGroup.add(stone);
  }
}