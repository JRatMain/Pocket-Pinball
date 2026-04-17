// Initialization of matter.js components
var Engine = Matter.Engine;
var World = Matter.World;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;

var isPressed = false;

// mouse constraint variables
var mouse
var mouseConstraint

// min rotation
const minRotation = -Math.PI / 4; // 45 degrees

var engine;
var box1;
var world;

var flipperL, flipperR;

var obstacles = [];
var objs = [];
var flippers = [];

var ground;
var staticObj = {isStatic: true}
var gameball;
var constrainCenter;
var constraint;

//function to control the use of flippers
function flipperControl() {
  if(keyIsDown(LEFT_ARROW)) {
    console.log("left arrow pressed");
  flipperL.body.angle += -Math.PI / 40; // Adjust the angle increment as needed
   // Matter.Body.setAngularVelocity(flipperL.pointA, -0.2);
  }
  else if(!keyIsDown(LEFT_ARROW)) {
     flipperL.body.angle -= -.008;
  }

  if(keyIsDown(RIGHT_ARROW)) {
    console.log("right arrow pressed");
  }
}

// Function to recreate constraint every time the ball is lost
function createConstraint() {
  constrainCenter = new ConstraintOrb(550, 450, 30);
  gameball = new Ball(500, 500, 30);
  
  var constraintOptions = {
    pointA: {x: 500, y: 300},
    bodyB: gameball.body,
    length: 0,
    stiffness: 0.05
  }

  constraint = Constraint.create(constraintOptions);
  World.add(world, constraint);

}

function createMouseConstrain(canvas) {
  mouse = Matter.Mouse.create(canvas.elt) // this ties the matter.mouse object to the p5 canvas
  
  var options = {
    mouse:mouse,
    constraint: {
      stiffness: 2
    }
  }

  mouseConstraint = MouseConstraint.create(engine, options)
  World.add(world, mouseConstraint)
}

function setup() {
  let canvas = createCanvas(800, 1024);
  canvas.pixelRatio = pixelDensity();

  

  // initialization of variables to make Matter methods easier to call
  engine = Engine.create(); 
  engine.world.gravity.y = 0;
  world = engine.world;
  Runner.run(engine);

  engine.constraintIterations = 10;

  stroke(255);
  strokeWeight(5);
  fill(0);

  // methods to create the constraints
  createConstraint();
  createMouseConstrain(canvas);
  flipperL = new createleftFlipper(250, 900, 100, 20);
  flipperR = new createrightFlipper(550, 900, 100, 20);

  objs.push(flipperL);
  objs.push(flipperR);

  // Creation of bumper objects in the game for player to interact with
  var bumperA = new Bumpers(200, 150, 30); 
  var bumperB = new Bumpers(500, 150, 30); 
  var bumperC = new Bumpers(350, 300, 30);
  var bumperD = new Bumpers(250, 450, 30); 
  var bumperE = new Bumpers(450, 450, 30); 
  var bumperF = new Bumpers(350, 600, 30);
  var bumperG = new Bumpers(550, 700, 30); 
  var bumperH = new Bumpers(150, 700, 30);

  // game walls
  var wallL = new staticRect(0, 0, 20, 1024);
  var wallR = new staticRect(780, 0, 20, 1024);
  var chuteBorderL = new staticRect(700, 150, 10, 1024);

  // triangle to make sure the ball doesnt fall back down the chute
  var chuteAngle = new staticTriangle(700, 0, 780, 0, 780, 100, 0);

  // adding objects to a list to add to the world, needs to be renamed
  objs.push(wallL);
  objs.push(wallR);
  objs.push(chuteBorderL);
  objs.push(chuteAngle);
  objs.push(bumperA);
  objs.push(bumperB);
  objs.push(bumperC);
  objs.push(bumperD);
  objs.push(bumperE);
  objs.push(bumperF);
  objs.push(bumperG);
  objs.push(bumperH);



    //ground = Bodies.rectangle(200, height, width, 10, {isStatic: true});
  //World.add(world, ground);
}


function draw() {
  background(220);
  Engine.update(engine);
  flipperControl(); 
  for (var i = 0; i < objs.length; i++) {
    objs[i].show();
    gameball.show();

    // code used to restrain flippers positions, needs work
    Matter.Events.on(engine, 'beforeUpdate', function() {

      if (flipperR.body.angle < minRotation) {
        Matter.Body.setAngularVelocity(flipperR.body.angle, 0);
      }
    });
  }

  // Pulls ball to mouse
  if (mouseIsPressed) {
    isPressed = true;
  }
  if (!mouseIsPressed & isPressed) {
    //Matter.Composite.remove(world, constraint);
    constraint.bodyB = null;
  }

  stroke(255);
  strokeWeight(5);
}