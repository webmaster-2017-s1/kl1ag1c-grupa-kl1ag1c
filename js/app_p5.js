// kod projektu [wpisz nazwę]
var resx=300;
var resy=300;


//Pozycja gracza
var x=resx/2;
var y=50;

//Pozycja sceny
var scene=0;


function setup() {
  // put setup code here
  createCanvas(resx, resy);
  background(100);
}

function moveCar(v,d) {
 if(d==="x"){
   x+=v;
 } else{
   y+=v;
 }
}


function draw() {
  keyboardEvent();
 background(100);

  moveStripes();
  fill('red');

  //Zamieńcie na obrazek samochodu
  rect(x,y,20,40);
  fill('white');
}


function moveStripes() {

  for (var i=0;i<10;i++){
    rect(resx/2-10,scene+i*50,20,30);
  }
  scene+=5;
  if(scene===resy-200) scene=0;

}


function keyboardEvent(){
  if (keyIsDown(LEFT_ARROW)) {
    moveCar(-2,"x");
  }

  if (keyIsDown(RIGHT_ARROW)) {
    moveCar(2,"x")
  }

  if (keyIsDown(UP_ARROW)) {
    moveCar(-2,"y")
  }

  if (keyIsDown(DOWN_ARROW)) {
    moveCar(2,"y")
  }
}

