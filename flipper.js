// function to check collision between two rectangles to be used to check if the flippers collide and set their rotation to zero
function checkFlipColision(bodyA, bodyB) {
    return Matter.Collision.collides(bodyA, bodyB);
}
class leftFlipper {
    
    constructor (x, y, w, h, world) {
        this.Engine = Matter.Engine;
        this.World = Matter.World;
        this.Constraint = Matter.Constraint;
        this.Runner = Matter.Runner;
        this.Bodies = Matter.Bodies;
        this.world = world;


        this.minAngle = false;
        this.maxAngle = false;

            this.color = 255; // default color for the flippers
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.options = { 
                friction: 0.5,
                restitution: 0.8,
                angle: Math.PI
            }

            // creatopm of the left and right body for the flippers in options they will be rounded so they dont appear as flat rectangles
            this.body = Bodies.rectangle(x, y, w, h, this.options)
            this.pivot ={x: x - w / 2, y: y};
             World.add(world, this.body);
             World.add(world, this.pivot);
            
            this.constraint = this.Constraint.create({
                pointA: this.pivot,
                bodyB: this.body,
                pointB: {x: -w / 2, y: 0},
                length: 0,
                stiffness: 1

               
             })
             World.add(world, this.constraint);
        
    }

    show() {
        // flipper show functions 
            this.show = function() {
                var pos = this.body.position; 
                var angle = this.body.angle;
                
                push();
                stroke(200);
                strokeWeight(2);
                fill(this.color); // color variable allows for different colors to easily be added in
                translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
                rotate(angle); // controls p5 rotation
                rectMode(CENTER);
                rect(0, 0, this.w, this.h);
                pop();
    }
    }

    pressed() {
        if(this.body.angle <= 1) {
             Matter.Body.rotate(this.body, 0, this.pivotr);
        }
        else if(keyIsDown(LEFT_ARROW)) {
            Matter.Body.rotate(this.body, -.45, this.pivot);
        }

        if(this.body.angle >= 3.4) {
            Matter.Body.rotate(this.body, 0, this.pivotr);
        }
            
        else if (!keyIsDown(LEFT_ARROW)) {
            //console.log(this.body.angle)
            Matter.Body.rotate(this.body, .3, this.pivot);
            //this.angleCalc(pivotPoint, rotationAngle);
        } 
    
    
}
}

class rightFlipper {
    
    constructor (x, y, w, h, world) {
        this.Engine = Matter.Engine;
        this.World = Matter.World;
        this.Constraint = Matter.Constraint;
        this.Runner = Matter.Runner;
        this.Bodies = Matter.Bodies;
        this.world = world;

        
            this.color = 255; // default color for the flippers
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.options = { 
                friction: 0.5,
                restitution: 0,
                angle: Math.PI
            }

            // creatopm of the left and right body for the flippers in options they will be rounded so they dont appear as flat rectangles
            this.bodyr = Bodies.rectangle(x, y, w, h, this.options)
            this.pivotr ={x: x + w/2, y: y};
             World.add(world, this.bodyr);
             World.add(world, this.pivotr);
            
            this.constraintr = this.Constraint.create({
                pointA: this.pivotr,
                bodyB: this.bodyr,
                pointB: {x: w / 2, y: 0},
                length: 0,
                stiffness: 1,
                restitution:0 
               
             })
             World.add(world, this.constraintr);

        }
        
    

    show() {
        // flipper show functions 
            this.show = function() {
                var pos = this.bodyr.position; 
                var angle = this.bodyr.angle;
                
                push();
                stroke(200);
                strokeWeight(2);
                fill(this.color); // color variable allows for different colors to easily be added in
                translate(pos.x, pos.y); // tracks x and y position of matter.js and moves p5 object so the image matches
                rotate(angle); // controls p5 rotation
                rectMode(CENTER);
                rect(0, 0, this.w, this.h);
                pop();
    }
    }
    pressed() {
        if(this.bodyr.angle >= 4) {
             Matter.Body.rotate(this.bodyr, 0, this.pivotr);
        }
        else if(keyIsDown(RIGHT_ARROW)) {
               Matter.Body.rotate(this.bodyr, .5, this.pivotr);
            }
            if(this.bodyr.angle <= 2.9) {
                Matter.Body.rotate(this.bodyr, 0, this.pivotr);
            }
            else if (!keyIsDown(RIGHT_ARROW)) {
                console.log(this.bodyr.angle)
                Matter.Body.rotate(this.bodyr, -.3, this.pivotr);
                //this.angleCalc(pivotPoint, rotationAngle);
            } 
        
    
}
}

