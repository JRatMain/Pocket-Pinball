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

var bumperA = Bodies.circle(400, 200, 80, {isStatic: true}); // creates bumper that should be still, isStatic is nessesary 

Composite.add(engine.world, bumperA); 

Matter.Render.setSize(render, 728, 1024); // method to change render window size 

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine); // outputs render window