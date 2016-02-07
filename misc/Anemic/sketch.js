var angle = 0;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    background(0);
    c = 255;
    push();
    translate(width / 2, height / 2);
    scale(min(width, height) / 500 * 0.8);
    var rSub = map(mouseX, 0, width, 5, 20);
    var aAdd = map(mouseY, 0, height, PI / 2.0, PI / 48.0);
    cic(250, rSub, angle, aAdd);
    angle += PI / 64.0;
    pop();


    fill(255, 180);
    stroke(0, 180);
    // text("Anemic Cinema Interactive", 5, height - 20);
}

function cic(radius, rSub, angle, aAdd) {
    push();
    do {
        fill(c);
        c = 255 - c;
        ellipse(0, 0, radius * 2, radius * 2);
        radius -= rSub;
        angle += aAdd;
        var r = rSub * 1;
        var v = p5.Vector.fromAngle(angle + aAdd).mult(r);
        translate(v.x, v.y);
    } while (radius >= 1);
    pop();
}