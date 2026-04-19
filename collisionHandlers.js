function detectCol(bodyA, bodyB) {
    const collision = Matter.Collison.collides(bodyA, bodyB);
    if (collision) {
        console.log("Collision!!!")
    }
}

function sensorRect(x, y, w, h, rotation = 0) {
      var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: Math.PI
  }
    this.body = Bodies.rectangle(x, y, w, h, {isStatic: true, isSensor: true});
    Matter.Body.setAngle(this.body, rotation)
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;

    Matter.Composite.add(world, this.body);

}