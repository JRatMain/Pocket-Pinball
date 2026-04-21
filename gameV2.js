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

 var score = 0
 var score = 0

  var engine;
  var box1;
  var world;

  var obstacles = [];
  // list to hold all objects
  var objs = [];
  // list to hold bumpers for collision detection and calculation of score and speed
  var bumpers = [];
  var flipperL, flipperR;

  var ground;
  var staticObj = {isStatic: true}
  var gameball;
  var constrainCenter;
  var constraint;


  // sensor detections
  var ballout;

  var ballout_bool;

  // Function to recreate constraint every time the ball is lost
  function createConstraint() {
    gameball = new Ball(740, 530, 30);
    
    var constraintOptions = {
      pointA: {x: 740, y: 490},
      bodyB: gameball.body,
      length: 0,
      stiffness: 0.05
    }

    constraint = Constraint.create(constraintOptions);
    World.add(world, constraint);

  }
  function bumpCollision() {
    Matter.Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs; // copies the pairs so they can be accessed
      pairs.forEach(pair => {
        if (pair.bodyA.label == 'ball' & pair.bodyB.label == 'Circle Body' || 
          pair.bodyA.label == 'Circle Body' & pair.bodyB.label == 'ball' & !pair.handled 
        ) {
          pair.handled = true
          console.log("collision!")
          let collision = pair.collision;
          if (collision.normal.x > 0) {
            if (collision.normal.y < 0) {
              Matter.Body.applyForce(gameball.body, gameball.body.position, {x:0,y:-220})
              console.log("up!")
            }else {
            console.log("left!")
            Matter.Body.applyForce(gameball.body, gameball.body.position, {x:-222.5,y:0})
            }
            score += 100
            
          } else if (collision.normal.x < 0) {
            if (collision.normal.y > 0) {
              Matter.Body.applyForce(gameball.body, gameball.body.position, {x:0,y:220})
              console.log("down!")
            } else {
              console.log("right!")
              Matter.Body.applyForce(gameball.body, gameball.body.position, {x:222.5,y:0})
            }
            score += 100
          }
        }
      })
    })

    Matter.Events.on(engine, 'collisionEnd', function(event) {
      var pairs = event.pairs; // copies the pairs so they can be accessed
      pairs.forEach(pair => {
        if (pair.handled) {
          pair.handled = false
        }
    })
  })
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
    textSize(14);
    textAlign(CENTER, CENTER)
    
    

    // initialization of variables to make Matter methods easier to call
    engine = Engine.create(); 
    engine.world.gravity.y = 0;
    world = engine.world;
    Runner.run(engine);

    engine.constraintIterations = 20;
    engine.positionIterations = 20;
    engine.velocityIterations = 20;

    stroke(255);
    strokeWeight(5);
    fill(0);

    // methods to create the constraints
    createConstraint();
    createMouseConstrain(canvas);
    //flipperL = new createleftFlipper(250, 900, 150, 30);
    //flipperR = new createrightFlipper(550, 900, 150, 30);


    
    //const staticREct = new staticRect(200, 1000, 200, 75);
    flipperL = new leftFlipper(225, 950, 200, 50, world);
    flipperR = new rightFlipper(550, 950, 200, 50, world);
    //const staticREct2 = new staticRect(450, 1000, 200, 75);
    var flipperRampL = new staticRect(70, 800, 175, 25, 255, 3.8, CENTER)
    var flipperRampR = new staticRect(680, 850, 50, 25, 255, 2, CENTER)
    ballout = new sensorRect(500, 1000, 1000, 11, 'firstsensor')


    

    //World.add(world, staticREct);
    //World.add( world, staticREct2);
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
    var wallR = new staticRect(790, 0, 20, 1024);
    var ceiling = new staticRect(400, -10, 800, 30, 0, 0, CENTER);
    var chuteBorderL = new staticRect(680, 175, 20, 1024);
    var chuteAngle = new staticRect(750, -20, 30, 200, 255, 2.1, CENTER)


    // adding objects to a list to add to the world, needs to be renamed
    objs.push(wallL);
    objs.push(wallR);
    objs.push(ceiling);
    objs.push(chuteAngle);
    objs.push(flipperRampL)
    objs.push(flipperRampR)
    objs.push(chuteBorderL);
    objs.push(bumperA);
    objs.push(bumperB);
    objs.push(bumperC);
    objs.push(bumperD);
    objs.push(bumperE);
    objs.push(bumperF);
    objs.push(bumperG);
    objs.push(bumperH); 
     bumpers.push(bumperA);
    bumpers.push(bumperB);
    bumpers.push(bumperC);
    bumpers.push(bumperD);
    bumpers.push(bumperE);
    bumpers.push(bumperF);
    bumpers.push(bumperG);
    bumpers.push(bumperH); 


      //ground = Bodies.rectangle(200, height, width, 10, {isStatic: true});
    //World.add(world, ground);
  }


  function draw() {
    background(220);
    Engine.update(engine);
    s = 'Score will be here ' + score
    text(s, 100, 14)
    for (var i = 0; i < objs.length; i++) {
      objs[i].show();
      gameball.show();  
    }

    flipperL.show();
    flipperR.show(); 
    flipperL.pressed();
    flipperR.pressed();
    ballout_bool = detectCol(gameball.body, ballout.body)
    console.log(ballout_bool)
      bumpCollision();
      if (mouseIsPressed) {
      isPressed = true;
    }
    if (!mouseIsPressed & isPressed) {
      //Matter.Composite.remove(world, constraint);\
      
      constraint.bodyB = null;
      isPressed = false;
    }
    if (ballout_bool) {
      createConstraint()
      ballout_bool = false
    }

    stroke(255);
    strokeWeight(5);
  }
