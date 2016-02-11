var nx = 0,
    ny = 1000,
    nz = 2000,
    nInc = 0.005,
    nzInc = 0.05;

function setup() {
    createCanvas(500, 500).id("test");
    noStroke();
    background(128);
}

function draw() {
    var c = 0;
    
    for (var i = 0; i < 5; i++) {
        fill(c);
        c = 255 - c;

        var x = map(noise(nx), 0, 1, -width, width * 2);
        var y = map(noise(ny), 0, 1, -height, height * 2);
        var z = map(noise(nz), 0, 1, 0, 100);
        ellipse(x, y, z, z);
        nx += nInc;
        ny += nInc;
        nz += nzInc;
    }
}
