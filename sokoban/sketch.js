/*
    Sokoban Clone
    Implemented by: Jacob Joaquin
    GitHub: https://github.com/jacobjoaquin
    Tumblr: http://jacobjoaquin.tumblr.com/
*/

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
    '11#|#@-$5-.#|11#',
    '--3#|3#.#|#.$$##|##@$.#|-5#',
    '3-4#|3-#--#|3-#--#|3-#-$##|5#--3#|#-*5-+#|#3-6#|5#',
    '7#|#--.--#|#-$.--#|#--#$-#|#-$#--#|#--.$-#|#@-.--#|7#',
    '8#|#--@#-.#|#-3#--#|#-#.#$-#|#3-#--#|3#$#--#|--#-$--#|--#--.-#|--#--3#|--4#',
    '5#|#3-7#|#-#-##--..#|#-$--$-.*.#|3#--#-*..#|--#-7#|--#-#4-#|--#-#-$$-#|--#-$-$@-#|--#3-4#|--5#',
    '8#|#@-#3-#|##$#3-#|#--#3-#|#--##$##|#-.--.-#|#--#3-#|8#',
    '-6#|##4-#|#--##$#|#5-3#|##-#-..+#|-#$7#|-#-#5-#|##-#-#$#-#|#--#5-#|#5-4#|#3-3#|5#',
    '7#|#3.$-##|#3.3-#|##-$-$-#|-3#-3#|-#@$-$-#|-#-$3-#|-#4-##|-6#',
    '12#|#@-#--$-3.#|##$#$-$-3.#|#3-$6-#|#9-$#|8#3-#|7-5#',
    '6#|#.#-@#|#.#$-##|#.#-$-#|#-$3-#|#3-3#|5#',
    '9#|#3.$3-#|#3.$3-#|5#-$##|4-#--#|4-#$-#|4-#-$#|4-#$-#|4-#@-#|4-4#',
    '12-5#|12-#3-#|-12#-#-#|-#.10-*--#|-12#-3#|5-#3-#--#-#|5-#-$@#--#-#|5-#3-#--#-#|8#$4#-3#|#--*9-*--#|#-#-4#--3#-#-#|#3-#--#.-#-#3-#|5#--4#-5#',
    '4-5#|5#3.#|#-$5-#|#3-#$--#|5#--##|#-@-#$$#|#3-#--#|#3-#$-##|##--$3-#|#3.#3-#|9#',
    '10#|#.#4-@-#|#.#$$#-$-#|#.#--#$-##|#.$--#-$#|#.#--#--#|#.#5-#|#4-#--#|#--6#|4#',
    '7#|#.#3-#|#.#-$-#|#@--$-#|#.-$$-#|#.#-$-#|#.#3-#|7#',
    '6#|#4-#|#-$--#|#-$@-#|#-#*##-4#|#-#.##-#--#|#--*-#-#$-#|#-#.-#-#--#|#-#.-#-#-3#|#-#.-3#3-#|#8-$-#|3#--7#|--4#',
    '3-4#|3-#--7#|3-#3-$4-#|3-#--3#-$-#|-3#--#-#$--#|-#@3-#-#-$-#|-##$$-#-#--$#|##-$--#-#--.#|#.-#--#-5#|#5.#|#-.4#|4#',
    '12#|#@9-#|#--$-$-$-$-#|#--##$3#$-#|#3-6.-#|12#',
    '-7#|##-.--@#|#-.-#.-#|#-$##--#|#-$--$-#|#--##--#|8#',
    '10#|#3-.4-#|#-##$3#-#|#-#3-.#-#|#-#-##-#-#|#-#-@#$$-#|#-4#-#-#|#--.3-#-#|#-#$#--#-#|#--*3-#.#|10#',
    '5#--5#|#3-#--#3-#|#-@-#--#-$-#|#3-#--#3-#|##$##--#3-#|#3-#--#3-#|#3-5#$##|#3-.*..3-#|#3-4#3-#|#3-4#3-#|12#',
    '11#|#@3-#4-#|#-$-.$.-$-#|#4-#4-#|#-.-3#-.-#|##$##*##$##|#-.-3#-.-#|#4-#4-#|#-$-.$.-$-#|#4-#4-#|11#',
    '-4#|-#--4#|-#5-#|##-##--#|#--##-##|#5-.#|5#-##|#@3-$#|4#--#|3-4#',
    '--4#|3#--#|#3-$##|#3-$.#|4#+-#|3-4#',
    '--4#--4#|3#--#--#--#|#3-$4#$-3#|#3-$.*6-#|4#.@##-#.--#|3-5#3-3#|7-5#',
    '-8#|-#--##--##|##7-#|#-*-3#--#|#-*-#-#--#|#-*-#-#$-#|#-*-#-#--#|#-*-#-4#|#@*-#|#-.-#|5#',
    '5#|#..@#|#..-#|#..-5#|#3.#3-#--5#|##-##$#-4#3-#|-#-$5-#-$-#-#|-#4-#-$6-#|-6#-$#$$4#|6-#-$-$-#|6-#5-#|6-7#',
    '5#-9#|#3-#-#3-#3-#|#-#-3#$#3-$-#|#4-$5-#--#|3#$3#$5#-#|--#--.--#3-#-#|--#$5.-$3-#|--#--.$-#3-3#|--3#.7#|4-#.#|4-#$#|4-#@#|4-3#',
    '10#|#@--$-.--##|#3-##-#--#|##--.#-##-#|-#$$##-.#-#|-#-.-##$#-#|-#3-.-$--#|-##$##-$--#|-#-.##3-##|-#-.3-3#|-7#',
    '9-7#|4-6#5-3#|-4#4-$7-#|-#6-#-$--3#$##|-#6-#.#--#4-#|3#$5#.4#$3-#|#@5-5.$4-##|4#$-3#.5#--#|3-#--#-#.#3-##$#|3-4#-#-3#-#--#|8-#3-3#-##|8-#$#5-#|8-#3-5#|8-5#',
    '8#|#6-#|#--$3-#|#-$$-$-#|#-@##$-#|3#--$-#|#3.-$-#|#4.3#|6#',
    '9#|#-5.-#|#-$3#$-#|#3-$3-#|#-$-@-$-#|4#$4#|#--$-$--#|#7-#|#-$3#$-#|#-5.-#|9#',
    '6-5#|6-#3-4#|7#-#.3-#|#--#--#-##3-#|#-$3-#--$--##|#--##-4#$-#|#@-#3-.-.--#|#-$#-4#-3#|#-$5-$3.#|13#'
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
DisplayableList.prototype.getItem = function(x, y) {
    for (var i = 0; i < this.length; i++) {
        var w = this[i];
        if (w.position.x === x && w.position.y === y) {
            return w;
        }
    }
    return null;
}

function Sokoban() {
    this.currentLevel = 0;
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
    this.walls = new Walls();
    this.goals = new DisplayableList();
    this.boxes = new DisplayableList();
    this.player = new Player();
    encodedLevel = levels[this.currentLevel];
    var x = 0;
    var y = 0;
    var i = 0;

    while (i < encodedLevel.length) {
        var e = encodedLevel[i++];
        if (!isNaN(e)) {
            // Check and get more than single digit
            var e1 = encodedLevel[i++];
            while (!isNaN(e1)) {
                e += e1;
                e1 = encodedLevel[i++];
            }

            // Create multiple tiles
            e = parseInt(e);
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
Sokoban.prototype.movePlayer = function(x, y) {
    var x1 = x + this.player.position.x;
    var y1 = y + this.player.position.y;
    var didMove = false;
    if (!this.walls.getItem(x1, y1)) {
        var box = this.boxes.getItem(x1, y1);
        if (!box) {
            this.player.position.set(x1, y1);
            didMove = true;
        } else {
           var x2 = x1 + x;
           var y2 = y1 + y;
           if (!this.walls.getItem(x2, y2) && !this.boxes.getItem(x2, y2)) {
                this.player.position.set(x1, y1);
                didMove = true;
                box.position.x += x;
                box.position.y += y;
           }
        }
    }

    if (didMove && this.didWin()) {
        this.nextLevel();
    }
}
Sokoban.prototype.processKey = function(k) {
    k = k.toLowerCase();

    // Handle player moves
    if (k === "w") {
        this.movePlayer(0, -1);
    } else if (k === "a") {
        this.movePlayer(-1, 0);
    } else if (k === "s") {
        this.movePlayer(0, 1);
    } else if (k === "d") {
        this.movePlayer(1, 0);
    }

    // Handle changing levels
    else if (k === "n") {
        this.nextLevel();
    } else if (k === "p") {
        this.previousLevel();
    }
    redraw();
}
Sokoban.prototype.nextLevel = function() {
    this.currentLevel++;
    this.currentLevel = min(this.currentLevel, levels.length - 1);
    this.initLevel(this.currentLevel);
}
Sokoban.prototype.previousLevel = function() {
    this.currentLevel--;
    this.currentLevel = max(this.currentLevel, 0);
    this.initLevel(this.currentLevel);
}
Sokoban.prototype.didWin = function() {
    for (var i = 0; i < this.goals.length; i++) {
        var goal = this.goals[i];
        if (!this.boxes.getItem(goal.position.x, goal.position.y)) {
            return false;
        }
    }
    return true;
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
    fill(255, 0, 0);
    rect(0, 0, 0.5, 0.55);
    pop();
}
