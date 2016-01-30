// var elements = {
//     '#': 'wall',
//     '@': 'player',
//     '+': 'player on goal',
//     '$': 'box',
//     '*': 'box on goal',
//     '.': 'goal',
//     '-': 'floor'
// }

var sokoban;
// var walls;
var tileSize = 50;
var processGlyph;
var levels = [
    '-3#-#|#.@-#-#|#$*-$-#|#3-$-#|#-..--#|#--*--#|-5#'
];

function init() {
    // walls = new DisplayableList();
    sokoban = new Sokoban();
    processGlyph = {
        '#': function(x, y) {
            sokoban.walls.push(new Wall(x, y));
        },
        '@': function(x, y) {
            sokoban.player.position.x = x;
            sokoban.player.position.y = y;
        },
        '+': function(x, y) {
            sokoban.player.position.x = x;
            sokoban.player.position.y = y;
            sokoban.goals.push(new Goal(x, y));
        },
        '$': function(x, y) {
            sokoban.boxes.push(new Box(x, y));
        },
        '*': function(x, y) {
            sokoban.boxes.push(new Box(x, y));
            sokoban.goals.push(new Goal(x, y));
        },
        '.': function(x, y) {
            sokoban.goals.push(new Goal(x, y));
        },
        '-': function(x, y) {}
    }
}

function setup() {
    createCanvas(500, 500);
    init();
    initLevel();
    noLoop();
}

function draw() {
    background(180);
    sokoban.update();
    sokoban.display();
}

function keyTyped() {
    sokoban.processKey(key);
}

function initLevel() {
    encodedLevel = levels[0];
    var x = 0;
    var y = 0;
    var i = 0;

    while (i < encodedLevel.length) {
        var e = encodedLevel[i++];
        if (!isNaN(e)) {
            e = parseInt(e);
            var e1 = encodedLevel[i++];
            var t = x + e;
            while (x < t) {
                processGlyph[e1](x++, y);
            }
        } else if (e === '|') {
            x = 0;
            y++;
        } else {
            processGlyph[e](x++, y);
        }
    }
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


function DisplayableList() {};
DisplayableList.prototype = new Array;
DisplayableList.prototype.update = function() {
    for (var i = 0; i < this.length; i++) {
        this[i].update();
    }
};
DisplayableList.prototype.display = function(self) {
    var l = this.length;
    for (var i = 0; i < l; i++) {
        this[i].display();
    }
};

function Sokoban() {
    this.walls = new DisplayableList();
    this.goals = new DisplayableList();
    this.boxes = new DisplayableList();
    this.player = new Player();
}
Sokoban.prototype.update = function() {
    this.walls.update();
    this.goals.update();
    this.boxes.update();
    this.player.update();
}
Sokoban.prototype.display = function() {
    this.walls.display();
    this.goals.display();
    this.boxes.display();
    this.player.display();
}
Sokoban.prototype.processKey = function(k) {
    if (k === "w") {
        this.player.position.y--;
    } else if (k === "a") {
        this.player.position.x--;
    } else if (k === "s") {
        this.player.position.y++;
    } else if (k === "d") {
        this.player.position.x++;
    }

    redraw();
}

function Wall(x, y) {
    this.position = createVector(x, y);
}
Wall.prototype.update = function() {}
Wall.prototype.display = function() {
    push();
    translate(this.position.x * tileSize, this.position.y * tileSize);
    rect(0, 0, tileSize, tileSize);
    pop();
}

function Goal(x, y) {
    this.position = createVector(x, y);
}
Goal.prototype.update = function() {}
Goal.prototype.display = function() {
    push();
    translate(this.position.x * tileSize, this.position.y * tileSize);
    ellipseMode(CORNER);
    noStroke();
    fill(0);
    ellipse(0, 0, tileSize, tileSize);
    pop();
}

function Box(x, y) {
    this.position = createVector(x, y);
}
Box.prototype.update = function() {}
Box.prototype.display = function() {
    push();
    translate(this.position.x * tileSize, this.position.y * tileSize);
    translate(tileSize * 0.25, tileSize * 0.25);
    ellipseMode(CORNER);
    fill(255, 220, 0);
    ellipse(0, 0, tileSize * 0.5, tileSize * 0.5);
    pop();
}

function Player(x, y) {
    this.position = createVector(x, y);
}
Player.prototype.update = function() {}
Player.prototype.display = function() {
    push();
    translate(this.position.x * tileSize, this.position.y * tileSize);
    translate(tileSize * 0.25, tileSize * 0.25);
    fill(0, 255, 0);
    rect(0, 0, tileSize * 0.5, tileSize * 0.55);
    pop();
}