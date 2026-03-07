// function to create game ball
function Ball(x, y, r) {
    var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI
  }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
    
    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;
        
        push();
        stroke(200);
        strokeWeight(2);
        fill(0, 255, 255, 100);
        translate(pos.x, pos.y);
        rotate(angle);
        ellipse(0, 0, this.r);
        pop();

    }
       
}

//Function to create rectangles, can be used for walls or boxes
function modRectangle(x, y, w, h, options) {

}