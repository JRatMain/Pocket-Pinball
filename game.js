// module quick calls (for convenience)
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine = Engine.create(); // this creates the Matter.js physics engine in project

var render = Render.create({
    element: document.body,
    engine: engine
});

// creates bumper that should be still, isStatic is nessesary 
var bumperA = Bodies.circle(200, 150, 40, {isStatic: true}); 
var bumperB = Bodies.circle(500, 150, 40, {isStatic: true}); 
var bumperC = Bodies.circle(350, 300, 40, {isStatic: true});
var bumperD = Bodies.circle(250, 450, 40, {isStatic: true}); 
var bumperE = Bodies.circle(450, 450, 40, {isStatic: true}); 
var bumperF = Bodies.circle(350, 600, 40, {isStatic: true});
var bumperG = Bodies.circle(550, 700, 40, {isStatic: true}); 
var bumperH = Bodies.circle(150, 700, 40, {isStatic: true});

physicsObjs = [
    bumperA,bumperB,bumperC,
    bumperD,bumperE,bumperF,
    bumperG,bumperH
]

Composite.add(engine.world, physicsObjs); 

Matter.Render.setSize(render, 800, 1024); // method to change render window size 

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine); // outputs render window