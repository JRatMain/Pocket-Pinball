function detectCol(bodyA, bodyB) {
    var collision = Matter.Collision.collides(bodyA, bodyB);
    if (collision) {
        return true
    }
    return false
}

function sensorRect(x, y, w, h, sensorName, rotation = 0) {
      var options = {
    isSensor: true,
    label: sensorName
  }
    this.body = Bodies.rectangle(x, y, w, h, options);
    Matter.Body.setAngle(this.body, rotation)
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;

    Matter.Composite.add(world, this.body);

}