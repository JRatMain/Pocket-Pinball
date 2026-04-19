class Flipper {
    
    constructor (x, y, w, h, isLeft, world) {
        this.Engine = Matter.Engine;
        this.World = Matter.World;
        this.Constraint = Matter.Constraint;
        this.Runner = Matter.Runner;
        this.Bodies = Matter.Bodies;
        this.world = world;


        this.minAngle = false;
        this.maxAngle = false;

        if(isLeft) {
            // options that will be used for the flippers, may look a bit different than subesquent functions
            this.isLeft = isLeft;
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
            this.pivot = this.Bodies.circle(x - w /2, y, 5, {isStatic: true})
             World.add(world, this.body);
             World.add(world, this.pivot);
            
             var constraint = this.Constraint.create({
                bodyA: this.pivot,
                pointA: {x: 5, y: 0},
                bodyB: this.body,
                pointB: {x: -w / 2, y: 0},
                length: 0,
                stiffness: 1

               
             })
             World.add(world, constraint);
        }
            else {
                // options that will be used for the flippers, may look a bit different than subesquent functions
                this.isLeft = isLeft;
                this.color = 255; // default color for the flippers
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.options = { 
                friction: 0.5,
                restitution: 0.8,
                angle: Math.PI,
                isStatic: true
            }
            // creatopm of the left and right body for the flippers in options they will be rounded so they dont appear as flat rectangles
            this.body = Bodies.rectangle(x, y, w, h, this.options)
            World.add(world, this.body);

        }
        
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

    /*angleCalc(pivotPoint, rotationAngle) {
         
                var cos = Math.cos(rotationAngle),
                sin = Math.sin(rotationAngle);
                Matter.Body.rotate(this.body, rotationAngle, pivotPoint);  
    }

    clamp(min, max) {
       // Clamp
        if (this.body.angle > max) {
            var angleDifference = max - this.body.angle;
            //Matter.Body.setAngle(this.body, max);
            Matter.Body.setAngularVelocity(this.body, angleDifference); // Stop the speed
        }
        if (this.body.angle < min) {
            var angleDifference = min - this.body.angle;
            //Matter.Body.setAngle(this.body, min);
            Matter.Body.setAngularVelocity(this.body, angleDifference); // Stop the speed
        }
    }
    
    pressed() {
        
        if(this.isLeft) {
            var min =   4.7123889804;
            var max = 0.7853981634;
            var pivotPoint = {x: this.x - this.w /2, y: this.y};
        
            if(keyIsDown(LEFT_ARROW)) {
               var rotationAngle = -.4;
               this.angleCalc(pivotPoint, rotationAngle);
            }
    
            if (!keyIsDown(LEFT_ARROW) & !this.minAngle) {
                rotationAngle = .4
                this.angleCalc(pivotPoint, rotationAngle);
            }

            this.clamp(min, max);
        }

        else {
            var pivotPoint = {x: this.x + this.w /2, y: this.y};
            
            
            if(keyIsDown(RIGHT_ARROW) * !this.maxAngle) {
                var rotationAngle = .4; 
                Matter.Body.rotate(this.body, .4, pivotPoint)
            }
            else if (this.maxAngle) {
                Matter.Body.rotate(this.body, 0);
            }

            if (!keyIsDown(RIGHT_ARROW) & !this.minAngle) {
                rotationAngle = -.4
                Matter.Body.rotate(this.body, -.4, pivotPoint)
            }
            else if (this.minAngle) {
                Matter.Body.rotate(this.body, 0);
            }
        }
    }
        */
}