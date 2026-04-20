// categories
var ballCategory = 0x0001
var bumperCategory = 0x0002
var wallCategory = 0x0003

// function to create game ball
function Ball(x, y, r, options, color = 255) {
    var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI,
    //inertia: Infinity
    label: "ball",
    category: ballCategory,
    mask: bumperCategory, wallCategory
  }
    //creates matter.js Circle
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.mass = 10;
    
    // adds object to the world object
    World.add(world, this.body);
    
    // function specific to this object to integrate p5 into the matter.js object
    this.show = function() {
        // this sets the p5 position and angle to the matter.js positions and angles
        var pos = this.body.position; 
        var angle = this.body.angle;

        Matter.Body.applyForce(this.body, pos, { 
        x: 0, 
        y: 0.0003
    });
        
        push();
        stroke(200);
        strokeWeight(2);
        fill(color); // color variable allows for different colors to easily be added in
        translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
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
    angle: Math.PI,
    label: "bumper",
    category: bumperCategory,
    mask: ballCategory
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
function staticRect(x, y, w, h, color = 255, rotation = 0, rectchoice = CORNER) {
      var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI,
    category: wallCategory,
    mask: ballCategory
  }
    this.body = Bodies.rectangle(x, y + h/2, w, h, {isStatic: true});
    Matter.Body.setAngle(this.body, rotation)
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
        rectMode(rectchoice);
        translate(pos.x, pos.y - h/2);
        fill(color); // color variable allows for different colors to easily be added in// tracks x and y position of matter.js and moves p5 object so the image matches
        rotate(angle);
        rect(0, 0, this.w, this.h);
        pop();

    }
}
