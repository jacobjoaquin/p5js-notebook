var tank;
var gravity;
var button;
var animations = [];

function setup() {
    createCanvas(800, 500);
    tank = new Tank(50, 450);
    gravity = p5.Vector.fromAngle(HALF_PI).mult(0.1);
    button = document.getElementById("game-button");
    button.addEventListener("click", function(e) {
        tank.fire();
    })
}

function draw() {
    background(0);
    tank.update();
    tank.display();

    for (var i = animations.length - 1; i >= 0; i--) {
        var a = animations[i];
        a.update();
        if (a.isComplete()) {
            animations.splice(i, 0);
        }
    }

    for (var i = 0; i < animations.length; i++) {
        var a = animations[i];
        a.display();
    }
}

function keyPressed() {
    tank.fire();
}

function Tank(x, y) {
    this.position = createVector(x, y);
    this.w = 20;
    this.h = 10;
    this.barrelLength = 12;
    this.barrel0 = createVector(this.position.x + this.w / 2, this.position.y + 2);
    this.barrel1 = this.barrel0.copy();
    this.color = color(255);
}
Tank.prototype.update = function() {
}
Tank.prototype.display = function() {
    push();
    fill(this.color);
    rect(this.position.x, this.position.y, this.w, this.h);
    pop();

    // Draw barrel
    push();
    stroke(this.color);
    strokeWeight(2);
    line(this.barrel0.x, this.barrel0.y, this.barrel1.x, this.barrel1.y);
    pop();
}   
Tank.prototype.fire = function() {
    // Add Projectile
    var angle = parseFloat(document.getElementById("game-angle").value);
    angle = -angle / 360 * TWO_PI;
    var force = parseFloat(document.getElementById("game-force").value);

    // set barrel
    this.barrel1 = p5.Vector.fromAngle(angle);
    this.barrel1.mult(this.barrelLength).add(this.barrel0);
    // add projecticle
    animations.push(new Projectile(this.barrel1.copy(), angle, force));
}

function Projectile(position, angle, force) {
    this.completed = false;
    this.position = position.copy();
    this.lastPosition = position.copy();
    this.angle = p5.Vector.fromAngle(angle);
    this.angle.mult(force);
    this.velocity = this.angle.copy().mult(force);

}
Projectile.prototype.update = function() {
    this.lastPosition = this.position.copy();
    this.velocity.add(gravity);
    this.position.add(this.velocity);
    if (this.position.y >= height) {
        this.completed = true;
    }
}
Projectile.prototype.display = function() {
    push();
    stroke(255, 64, 64);
    line(this.position.x, this.position.y, this.lastPosition.x, this.lastPosition.y);
    pop();
}
Projectile.prototype.isComplete = function() {
    return this.completed;
}
