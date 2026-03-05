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

// borders declaration
var borderL = Bodies.rectangle(0, 512, 30, 1024, {isStatic: true});
var borderR = Bodies.rectangle(800, 512, 30, 1024, {isStatic: true});
var chuteBorderL = Bodies.rectangle(700, 700, 10, 1024, {isStatic: true});
var trianAngle = Bodies.fromVertices(752, 25, [{x:0, y:0}, {x: 100, y:0}, {x:100, y:100}], {isStatic: true})

// physics arrays
physicsObjs = [
    bumperA,bumperB,bumperC,
    bumperD,bumperE,bumperF,
    bumperG,bumperH
]

// borders arrays
walls = [
    borderL, borderR, chuteBorderL,
    trianAngle
]

// Array that holds the launching mechanism for balls
launchMech = [

]

Composite.add(engine.world, physicsObjs); 
Composite.add(engine.world, walls);

Matter.Render.setSize(render, 800, 1024); // method to change render window size 

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine); // outputs render window