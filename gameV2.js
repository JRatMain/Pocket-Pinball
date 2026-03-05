var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;

var engine;
var box;
var world;
var obstacles = [];
var staticObj = {isStatic: true}


function setup() {
  createCanvas(800, 1024);
  engine = Engine.create(); 
  world = engine.world;
  Engine.run(engine);
  stroke(255);
  strokeWeight(5);
    fill(0);
  var wallL = Bodies.rectangle(0, 512, 30, 1024, staticObj);
  var walls = [wallL];
  World.add(world, walls);
}

function draw() {
  background(220);

  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
  }
}