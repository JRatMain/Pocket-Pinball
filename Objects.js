// this function controls the flippers used by the game for hitting the ball
function createleftFlipper(x, y, w, h, xlg, ylg) {
    // options that will be used for the flippers, may look a bit different than subesquent functions
    flipperObjs = [] // stores the flipper objects that will be returned
    var color = 255; // default color for the flippers
    var options = { 
        friction: 0.5,
        restitution: 0.8,
        angle: Math.PI
    }

    // creatopm of the left and right body for the flippers in options they will be rounded so they dont appear as flat rectangles
    this.body = Bodies.rectangle(x, y, w, h, options)

    const constraint = Constraint.create({
        bodyA: this.body,
        pointA: {x: -w / 2, y: 0},
        pointB: {x: xlg, y: ylg},
        stiffness: 0.5,
        length: 0
    });
    
   

    // line that adds the flippers to the world 
    Matter.Composite.add(world, [this.body, constraint]);


    // flipper show functions 
    this.show = function() {
        var pos = this.body.position; 
        var angle = this.body.angle;
        
        push();
        stroke(200);
        strokeWeight(2);
        fill(color); // color variable allows for different colors to easily be added in
        translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
        rotate(angle); // controls p5 rotation
        rect(0, 0, w, h);
        pop();
    }


    // returns value to a list in the main file so that functions for the flippers can be called
    
}

function createrightFlipper(x, y, w, h, xrg, yrg) {
    // options that will be used for the flippers, may look a bit different than subesquent functions
    flipperObjs = [] // stores the flipper objects that will be returned

    var color = 255; // default color for the flippers
    var options = { 
        friction: 0.5,
        restitution: 0.8,
        angle: Math.PI
    }

    // creatopm of the left and right body for the flippers in options they will be rounded so they dont appear as flat rectangles
    this.body = Bodies.rectangle(x, y, w, h, options)

    const constraint = Constraint.create({
        bodyA: this.body,
        pointA: {x: w / 2, y: 0},
        pointB: {x: xrg, y: yrg},
        stiffness: 0.5,
        length: 0
    });
    
   

    // line that adds the flippers to the world 
    Matter.Composite.add(world, [this.body, constraint]);


    // flipper show functions 
    this.show = function() {
        var pos = this.body.position; 
        var angle = this.body.angle;
        
        push();
        stroke(200);
        strokeWeight(2);
        fill(color); // color variable allows for different colors to easily be added in
        translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
        rotate(angle); // controls p5 rotation
        rect(0, 0, w, h);
        pop();
    }


    // returns value to a list in the main file so that functions for the flippers can be called
}



// function to create game ball
function Ball(x, y, r, options, color = 255) {
    var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI
  }
    //creates matter.js Circle
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    
    // adds object to the world object
    World.add(world, this.body);
    
    // function specific to this object to integrate p5 into the matter.js object
    this.show = function() {
        // this sets the p5 position and angle to the matter.js positions and angles
        var pos = this.body.position; 
        var angle = this.body.angle;
        
        push();
        stroke(200);
        strokeWeight(2);
        fill(color); // color variable allows for different colors to easily be added in
        translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
        rotate(angle); // controls p5 rotation
        ellipse(0, 0, this.r * 2);
        pop();

    }
       
}

// function to create constraint center
function ConstraintOrb(x, y, r) {
    var options = {
    isStatic: true,
    collisionFilter: {
        mask: 0
    }
  }
    //creates matter.js Circle
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    
    // adds object to the world object
    World.add(world, this.body);
    
    // function specific to this object to integrate p5 into the matter.js object
    this.show = function() {
    }
       
}

// function to create bumpers
function Bumpers(x, y, r, color = 255) {
    var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI
  }
    //creates matter.js Circle and is set to static
    this.body = Bodies.circle(x, y, r, {isStatic: true});
    this.r = r;

    // adds object to the world object
    Matter.Composite.add(world, this.body);
    
    // function specific to this object to integrate p5 into the matter.js object
    this.show = function() {
        // this sets the p5 position and angle to the matter.js positions and angles
        var pos = this.body.position;
        var angle = this.body.angle;
        
        push();
        stroke(200);
        strokeWeight(2);
        fill(color); // color variable allows for different colors to easily be added in
        translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
        rotate(angle);
        ellipse(0, 0, this.r * 2);
        pop();

    }
       
}


//Function to create rectangles, can be used for physics rectangles
function modRectangle(x, y, w, h) {
      var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI
  }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;

    World.add(world, this.body);
    
    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;
        
        push();
        stroke(200);
        strokeWeight(2);
        fill(0, 255, 255, 100);
        translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
        rotate(angle);
        rect(0, 0, this.w, this.h);
        pop();

    }
}

//Function to create static rectangles, good for walls
function staticRect(x, y, w, h, color = 255) {
      var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI
  }
    this.body = Bodies.rectangle(x, y + h/2, w, h, {isStatic: true});
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;

    Matter.Composite.add(world, this.body);

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;
        
        push();
        stroke(200);
        strokeWeight(2);
        translate(pos.x, pos.y - h/2);
        fill(color); // color variable allows for different colors to easily be added in// tracks x and y position of matter.js and moves p5 object so the image matches
        rotate(angle);
        rect(0, 0, this.w, this.h);
        pop();

    }
}

function staticTriangle(x1, y1, x2, y2, x3, y3, color) {
    this.body = Bodies.fromVertices(0,0, [{x:x1, y:y1}, {x:x2, y:y2}, {x:x3, y:y3}], {isStatic: true});

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;

    World.add(world, this.body);

    this.show = function() {
        push();
        stroke(200);
        strokeWeight(2);
        fill(color); // color variable allows for different colors to easily be added in
        triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3); 
        pop();
    } 
}