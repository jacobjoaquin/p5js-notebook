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
var processGlyph;
var levels = [
    '-3#-#|#.@-#-#|#$*-$-#|#3-$-#|#-..--#|#--*--#|-5#',
    '-3#-#####|#.@-#-#|#$*-$-#|#3-$-#|#-..--#|#--*--#|-5#',
    '-3#-#|#.@-#-#|#$*-$-#|#3-$-#|#-..--#|#--*--#|#--*--#|#--*--#|-5#',
];

function setup() {
    createCanvas(500, 500);
    sokoban = new Sokoban();
    sokoban.initLevel();
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
    this.tileSize = (width - 1) / 10;
    this.walls = new Walls();
    this.goals = new DisplayableList();
    this.boxes = new DisplayableList();
    this.player = new Player();
    this.levelOffset = createVector(0, 0);
    this.scale = 1;
}
Sokoban.prototype.loadTileMap = {
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
Sokoban.prototype.loadTile = function(tile, x, y) {
    this.loadTileMap[tile](x, y);
}
Sokoban.prototype.initLevel = function() {
    encodedLevel = levels[2];
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
                this.loadTile(e1, x++, y);
            }
        } else if (e === '|') {
            x = 0;
            y++;
        } else {
            this.loadTile(e, x++, y);
        }
    }

    this.updateViewport();
}
Sokoban.prototype.updateViewport = function() {
    var borderSize = 1;
    var b = this.walls.getBoundaries();
    var m = max(b[1].x, b[1].y);
    this.levelOffset.set(borderSize / 2 + (m - b[1].x) / 2, borderSize / 2 + (m - b[1].y) / 2);
    this.scale = (width - 1) / (m + 1 + borderSize);
}
Sokoban.prototype.update = function() {
    this.walls.update();
    this.goals.update();
    this.boxes.update();
    this.player.update();
}
Sokoban.prototype.display = function() {

    push();
    scale(this.scale);
    translate(this.levelOffset.x, this.levelOffset.y);
    this.walls.display();
    this.goals.display();
    this.boxes.display();
    this.player.display();
    pop();
}
Sokoban.prototype.processKey = function(k) {
    k = k.toLowerCase();
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

function Walls() {}
Walls.prototype = new DisplayableList;
Walls.prototype.getBoundaries = function() {
    var left = this[0].position.x,
        top = this[0].position.y,
        right = this[0].position.x,
        bottom = this[0].position.y;

    for (var i = 1; i < this.length; i++) {
        var w = this[i];
        if (w.position.x < left) {
            left = w.position.x;
        }
        if (w.position.x > right) {
            right = w.position.x;
        }
        if (w.position.y < top) {
            top = w.position.y;
        }
        if (w.position.y > bottom) {
            bottom = w.position.y;
        }
    }
    return [createVector(left, top), createVector(right, bottom)];
}

function Wall(x, y) {
    this.position = createVector(x, y);
}
Wall.prototype.update = function() {}
Wall.prototype.display = function() {
    push();
    translate(this.position.x, this.position.y);
    strokeWeight(0.1);
    rect(0, 0, 1, 1);
    pop();
}

function Goal(x, y) {
    this.position = createVector(x, y);
}
Goal.prototype.update = function() {}
Goal.prototype.display = function() {
    push();
    translate(this.position.x, this.position.y);
    ellipseMode(CORNER);
    noStroke();
    fill(0);
    ellipse(0, 0, 1, 1);
    pop();
}

function Box(x, y) {
    this.position = createVector(x, y);
}
Box.prototype.update = function() {}
Box.prototype.display = function() {
    push();
    translate(this.position.x, this.position.y);
    translate(0.25, 0.25);
    ellipseMode(CORNER);
    noStroke();
    fill(255, 220, 0);
    ellipse(0, 0, 0.5, 0.5);
    pop();
}

function Player(x, y) {
    this.position = createVector(x, y);
}
Player.prototype.update = function() {}
Player.prototype.display = function() {
    push();
    translate(this.position.x, this.position.y);
    translate(0.25, 0.25);
    noStroke();
    fill(0, 255, 0);
    rect(0, 0, 0.5, 0.55);
    pop();
}
