// Initialization of matter.js components
var Engine = Matter.Engine;
var World = Matter.World;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;

var engine;
var box1;
var world;
var obstacles = [];
var walls = [];
var ground;
var staticObj = {isStatic: true}
var gameball;
var constrainCenter;
var mConstraint;

// Function to recreate constraint every time the ball is lost
function createConstraint() {
  constrainCenter = new ConstraintOrb(550, 450, 30);
  gameball = new Ball(500, 500, 30);
  
  var constraintOptions = {
    bodyA: constrainCenter.body,
    bodyB: gameball.body,
    length: 10,
    stiffness: 0.6
  }

  var constraint = Constraint.create(constraintOptions);
  World.add(world, constraint);

}

function createMouseConstrain() {
  var canvasmouse = Mouse.create(canvas.elt); //creates an object mouse that can interact with the canvas
  canvasmouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasmouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function setup() {
  createCanvas(800, 1024);

  engine = Engine.create(); 
  engine.world.gravity.y = 1;
  world = engine.world;
  Runner.run(engine);

  stroke(255);
  strokeWeight(5);
  fill(0);

  createConstraint();
  createMouseConstrain();
 
  var bumperA = new Bumpers(200, 150, 30); 
  var bumperB = new Bumpers(500, 150, 30); 
  var bumperC = new Bumpers(350, 300, 30);
  var bumperD = new Bumpers(250, 450, 30); 
  var bumperE = new Bumpers(450, 450, 30); 
  var bumperF = new Bumpers(350, 600, 30);
  var bumperG = new Bumpers(550, 700, 30); 
  var bumperH = new Bumpers(150, 700, 30);

  var wallL = new staticRect(0, 0, 20, 1024);
  var wallR = new staticRect(780, 0, 20, 1024);
  var chuteBorderL = new staticRect(700, 150, 10, 1024);

  var chuteAngle = new staticTriangle(700, 0, 780, 0, 780, 100, 0);

  walls.push(wallL);
  walls.push(wallR);
  walls.push(chuteBorderL);
  
  walls.push(chuteAngle);

  walls.push(bumperA);
  walls.push(bumperB);
  walls.push(bumperC);
  walls.push(bumperD);
  walls.push(bumperE);
  walls.push(bumperF);
  walls.push(bumperG);
  walls.push(bumperH);



  World.add(world, walls);
    ground = Bodies.rectangle(200, height, width, 10, {isStatic: true});
  World.add(world, ground);
}


function draw() {
  background(220);
    
  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
    gameball.show();
  }

  if (mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.bodyB;
    var m = mConstraint.mouse.position;
     line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);

  }

  stroke(255);
  strokeWeight(5);
}