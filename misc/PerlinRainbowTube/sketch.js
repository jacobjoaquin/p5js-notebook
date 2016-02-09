var nx = 0,
    ny = 1000,
    nz = 2000,
    nInc = 0.008;

function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
}

function draw() {
    fill(frameCount % 256, 255, 255);
    var x = noise(nx) * width;
    var y = noise(ny) * height;
    var z = map(noise(nz), 0, 1, 0, 75);
    ellipse(x, y, z, z);
    nx += nInc;
    ny += nInc;
    nz += nInc;
}