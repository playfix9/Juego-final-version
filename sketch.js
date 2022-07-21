let ground;
let lander;
var lander_img;
var bg_img;
var fondo;
var enem_img;
var vy = 0;
var g = 0.05;
var gameState = "main";
var bulletsGenerated = 0;
var bulletGroup, enemiesGroup;
bulletGroup = [];
enemiesGroup = [];
var score = 0;
 var bandera =true;

var edges = [];

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("1866.jpg");
  enem_img = loadImage("nave-enemiga.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(80);
  fondo = createSprite(width/2,height/2,width,height);
  fondo.addImage(bg_img);
  fondo.scale=0.248;

  lander = createSprite(500,650,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.14;
  lander.setCollider("rectangle",0,0,690,900)
  
  edges = createEdgeSprites ();

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
 if(bandera==true){
  shipsSpawn();
  controls();

  for (var i = 0; i < bulletGroup.length; i++) {
    collisionWithBoat(i);
  }

  for (var i = 0; i < enemiesGroup.length; i++) {
    if(enemiesGroup[i].collide(edges[3])){
      gameOver();
      for (var i = 0; i < enemiesGroup.length; i++) {
        enemiesGroup[i].velocityY=0;
        bandera=false;
      }
    }

    if(score>=2){
      win();
    }
  }
 }

  if(gameState=="play"){
setTimeout(()=>{
  gameState="main";
},3000 );}

  

  drawSprites();

  push()
  fill(255);
  textFont("rubikreg");
  textSize(30);
  text("Enemigos eliminados: "+score,1000,60);
  pop();

}

function shipsSpawn(){
if (frameCount%100==0){
var enemie1 = createSprite(150,-60);
enemie1.addImage(enem_img);
enemie1.x=Math.round(random(30,1430));
enemie1.velocityY=3;
enemie1.scale=0.3;
enemie1.setCollider("rectangle",0,0,200,470);
enemiesGroup.push(enemie1);
}

}

function bullet(){
var bullet = createSprite(lander.x,lander.y,10,40);
bullet.velocityY=-3 ;
bullet.shapeColor="red";
bullet.depth=lander.depth;
bullet.depth-=1;
bulletGroup.push(bullet);

}

function controls(){
  if(keyDown("a"))
  {
  lander.x-=8;
  }


  if(keyDown("d"))
  {
   lander.x+=8;
    
  }

  if(gameState=="main"){
  if(keyDown("space")){
    gameState="play";
     bullet();
   }
  }
}

function collisionWithBoat(index) {
  for (var i = 0; i < enemiesGroup.length; i++) {
    if (bulletGroup[index] !== undefined && enemiesGroup[i] !== undefined) {

      if (bulletGroup[index].collide(enemiesGroup[i])) {
        score+=1;
          enemiesGroup[i].destroy(i);
          bulletGroup[index].destroy(index);
     


      }
    }
  }
}

function gameOver(){

  swal(
    {
      title: `¡Has perdido!`,
      text: "¡Gracias por jugar!",
      imageUrl:
        "https://images.vexels.com/media/users/3/150034/isolated/preview/29e322a8fe068f39d666137f7c1fc8f8-ilustracion-de-ninos-de-nave-espacial.png",
      imageSize: "150x150",
      confirmButtonText: "intentarlo de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

}

function win(){

  swal(
    {
      title: `¡Has ganado!`,
      text: "¡Gracias por jugar :D!",
      imageUrl:
        "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55962/sports-medal-emoji-clipart-md.png",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

}