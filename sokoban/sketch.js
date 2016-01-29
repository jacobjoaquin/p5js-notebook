var elements = {
    '#': 'wall',
    '@': 'player',
    '+': 'player on goal',
    '$': 'box',
    '*': 'box on goal',
    '.': 'goal',
    '-': 'floor'
}

var global = {
    'playerPosition': 0,
    'map': ''
}

var tileSize = 50;

var levels = [
    '7#|#.@-#-#|#$*-$-#|#3-$-#|#-..--#|#--*--#|7#'
];

function setup() {
    createCanvas(500, 500);
    initLevel();
}

function draw() {
    background(180);
    noLoop();
    displayLevel();
}


function initLevel() {
    encodedLevel = levels[0];

    var m = [];
    var x = 0;
    var y = 0;
    var s = tileSize;

    var row = [];

    var i = 0;
    while (i < encodedLevel.length) {
        var e = encodedLevel[i++];
        if (!isNaN(e)) {
            var e1 = encodedLevel[i++];
            for (var j = x; j < x + e; j++) {
                row.push(e1)
            }
        } else if (e === '|') {
            m.push(row);
            row = [];
            x = 0;
            y++;
        } else {
            row.push(e);
        }
    }
    m.push(row);

    global.map = m;
}

var drawElements = {
    '#': function(x, y) {
        noStroke();
        rect(0, 0, tileSize, tileSize);
    },
    '@': function() {
        translate(tileSize * 0.25, tileSize * 0.25);
        fill(0, 255, 0);
        rect(0, 0, tileSize * 0.5, tileSize * 0.55);
    },
    '+': function() {
        drawElements['.'](x, y);
        drawElements['@'](x, y);
    },
    '$': function() {
        translate(tileSize * 0.25, tileSize * 0.25);
        ellipseMode(CORNER);
        fill(255, 220, 0);
        ellipse(0, 0, tileSize * 0.5, tileSize * 0.5);
    },
    '*': function() {
        drawElements['.'](x, y);
        drawElements['$'](x, y);
    },
    '.': function() {
        ellipseMode(CORNER);
        noStroke();
        fill(0);
        ellipse(0, 0, tileSize, tileSize);
    },
    '-': function(x, y) {},
    'INSIDE': function() {
        push();
        stroke(255, 64);
        line(0, tileSize / 2, tileSize, tileSize / 2);
        line(tileSize / 2, 0, tileSize / 2, tileSize);
        pop();
    },
}


function displayLevel() {
    for (y = 0; y < global.map.length; y++) {
        var row = global.map[y];
        for (x = 0; x < row.length; x++) {
            var tile = row[x];
            push();
            translate(x * tileSize, y * tileSize);
            if (tile !== '#') {
                drawElements['INSIDE']();
            }
            drawElements[tile]();
            pop();
        }
    }
}