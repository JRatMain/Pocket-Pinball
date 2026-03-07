var Engine = Matter.Engine;
var World = Matter.World;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;

var engine;
var box1;
var world;
var obstacles = [];
var walls = [];
var ground;
var staticObj = {isStatic: true}



function setup() {
  createCanvas(800, 1024);
  engine = Engine.create(); 
  engine.world.gravity.y = 1;
  world = engine.world;
  Runner.run(engine);
  stroke(255);
  strokeWeight(5);
    fill(0);
  var gameball = new Ball(500, 500, 50);
  walls.push(gameball);
  World.add(world, walls);
    ground = Bodies.rectangle(200, height, width, 10, {isStatic: true});
  World.add(world, ground);
}


function draw() {
  background(220);
    
  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  stroke(255);
  strokeWeight(5);
}