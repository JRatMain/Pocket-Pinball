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
                angle: Math.PI,
                isStatic: true
            }

            // creatopm of the left and right body for the flippers in options they will be rounded so they dont appear as flat rectangles
            this.body = Bodies.rectangle(x, y, w, h, this.options)
             World.add(world, this.body);

            this.flipCompositeL = Matter.Composite.create({ label: 'flipperGroupL'});
            Matter.Composite.add(this.flipCompositeL, this.body);
            Matter.Composite.add(world, this.flipCompositeL);
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

            this.flipCompositeR = Matter.Composite.create({ label: 'flipperGroupR'});
            Matter.Composite.add(this.flipCompositeR, this.body);
            Matter.Composite.add(world, this.flipCompositeR);
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

    angleCalc(pivotPoint, rotationAngle) {
         
                var cos = Math.cos(rotationAngle),
                sin = Math.sin(rotationAngle);

                var dx = this.body.position.x - pivotPoint.x,
                dy = this.body.position.y - pivotPoint.y;

            
            var dx = this.body.position.x - pivotPoint.x,
                dy = this.body.position.y - pivotPoint.y;

            Matter.Body.setPosition(this.body, {
                x: pivotPoint.x + (dx * cos - dy * sin),
                y: pivotPoint.y + (dx * sin + dy * cos)
            });
                Matter.Body.rotate(this.body, rotationAngle);  
    }

    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    
    pressed() {
        
        if(this.isLeft) {
            var min =  4.7123889804;
            var max =  0.7853981634;
            var pivotPoint = {x: this.x - this.w /2, y: this.y};
            if (min > this.body.angle & !this.minAngle) {
                this.minAngle = true;
                this.maxAngle = false;
            }
            if (max <= this.body.angle & !this.maxAngle) {
                this.maxAngle = true;
                this.minAngle = false;
            }
            if(keyIsDown(LEFT_ARROW)) {
               var rotationAngle = -.4;
               this.minAngle = false;
               this.angleCalc(pivotPoint, rotationAngle);
            }
            if (this.maxAngle) {
                console.log('max')
                var rotationAngle = .4
                this.angleCalc(pivotPoint, rotationAngle);
                Matter.Body.rotate(this.body, rotationAngle);
            }
           
            if (!keyIsDown(LEFT_ARROW) & !this.minAngle) {
                rotationAngle = .4
                this.angleCalc(pivotPoint, rotationAngle);
            }
                
            if (this.minAngle & !keyIsDown(LEFT_ARROW)) {
                Matter.Body.rotate(this.body, 0)
            }
           
        }
        
        else {
            var pivotPoint = {x: this.x + this.w /2, y: this.y};
            
            
            if(keyIsDown(RIGHT_ARROW) * !this.maxAngle) {
                var rotationAngle = .4; 
                this.angleCalc(pivotPoint, rotationAngle); 
            }
            else if (this.maxAngle) {
                Matter.Body.rotate(this.body, 0);
            }

            if (!keyIsDown(RIGHT_ARROW) & !this.minAngle) {
                rotationAngle = -.4
                this.angleCalc(pivotPoint, rotationAngle);
            }
            else if (this.minAngle) {
                Matter.Body.rotate(this.body, 0);
            }
        }
    }
}