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
    var c = createCanvas(500, 500);
    c.parent("game-canvas");
    sokoban = new Sokoban();
    sokoban.initLevel();
}

function draw() {
    background(180);
    sokoban.update();
    sokoban.display();
}

function keyPressed() {
    sokoban.processKey(keyCode);
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
DisplayableList.prototype.getItem = function(position) {
    for (var i = 0; i < this.length; i++) {
        var w = this[i];
        if (w.position.equals(position)) {
            return w;
        }
    }
    return null;
}

function Sokoban() {
    this.currentLevel = 0;
    this.moves = 0;
    this.pushes = 0;
    this.tileSize = (width - 1) / 10;
    this.floors = new DisplayableList();
    this.walls = new Walls();
    this.goals = new DisplayableList();
    this.boxes = new DisplayableList();
    this.player = new Player();
    this.levelOffset = createVector(0, 0);
    this.scale = 1;
    this.UP = createVector(0, -1);
    this.LEFT = createVector(-1, 0);
    this.DOWN = createVector(0, 1);
    this.RIGHT = createVector(1, 0);
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
Sokoban.prototype.fillFloors = function(position) {
    var directions = [this.RIGHT, this.DOWN, this.LEFT, this.UP];
    var floor = this.floors.getItem(position);
    var wall = this.walls.getItem(position);

    if (floor || wall) {
        return;
    } else {
        // Create floor
        this.floors.push(new Floor(position.x, position.y));

        for (var i = 0; i < directions.length; i++) {
            var d = directions[i];
            var p = position.copy().add(d);
            this.fillFloors(p);
        }
    }
}
Sokoban.prototype.initLevel = function() {
    this.floors = new DisplayableList();
    this.walls = new Walls();
    this.goals = new DisplayableList();
    this.boxes = new DisplayableList();
    this.player = new Player();
    this.undo = [];
    this.moves = 0;
    this.pushes = 0;
    var encodedLevel = levels[this.currentLevel];
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

    this.fillFloors(this.player.position);
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
    this.floors.update();
    this.walls.update();
    this.goals.update();
    this.boxes.update();
    this.player.update();
}
Sokoban.prototype.setLevelText = function(v) {
    document.getElementById("sokoban-level").innerHTML = v;
}
Sokoban.prototype.setMovesText = function(v) {
    document.getElementById("sokoban-moves").innerHTML = v;
}
Sokoban.prototype.setPushesText = function(v) {
    document.getElementById("sokoban-pushes").innerHTML = v;
}
Sokoban.prototype.updateScoreBoard = function() {
    this.setLevelText(this.currentLevel);
    this.setMovesText(this.moves);
    this.setPushesText(this.pushes);
}
Sokoban.prototype.display = function() {
    this.updateScoreBoard();

    push();
    scale(this.scale);
    translate(this.levelOffset.x, this.levelOffset.y);
    this.floors.display();
    this.goals.display();
    this.boxes.display();
    this.player.display();
    this.walls.display();
    pop();
}
Sokoban.prototype.movePlayer = function(direction) {
    var v1 = direction.copy().add(this.player.position);
    var didMove = false;
    var move = {};
    if (!this.walls.getItem(v1)) {
        var box = this.boxes.getItem(v1);
        if (!box) {
            didMove = true;
        } else {
            var v2 = v1.copy().add(direction);
            if (!this.walls.getItem(v2) && !this.boxes.getItem(v2)) {
                didMove = true;
                box.position.add(direction);
                move.box = box;
                this.pushes++;
            }
        }
    }

    if (didMove) {
        move.direction = direction.copy();
        this.undo.push(move);
        this.player.position = v1;
        this.moves++;
        if (this.didWin()) {
            this.nextLevel();
        }
    }
}
Sokoban.prototype.processKey = function(k) {
    var s = String.fromCharCode(k).toLowerCase();
    // Handle player moves
    if (s === "w" || k === UP_ARROW) {
        this.movePlayer(this.UP);
    } else if (s === "a" || k === LEFT_ARROW) {
        this.movePlayer(this.LEFT);
    } else if (s === "s" || k === DOWN_ARROW) {
        this.movePlayer(this.DOWN);
    } else if (s === "d" || k === RIGHT_ARROW) {
        this.movePlayer(this.RIGHT);
    }

    // Handle undo
    else if (s === "u") {
        this.undoMove();
    }

    // Handle changing levels
    else if (s === "n") {
        this.nextLevel();
    } else if (s === "p") {
        this.previousLevel();
    } else if (s === "r") {
        this.resetLevel();
    }
}
Sokoban.prototype.undoMove = function() {
    if (this.undo.length) {
        var move = this.undo.pop();
        move.direction.mult(-1);
        this.player.position.add(move.direction);
        if (move.box) {
            move.box.position.add(move.direction);
            this.pushes--;
        }
        this.moves--;
    }
}
Sokoban.prototype.nextLevel = function() {
    this.currentLevel += this.currentLevel < levels.length - 1 ? 1 : 0;
    this.initLevel();
}
Sokoban.prototype.previousLevel = function() {
    this.currentLevel -= this.currentLevel > 0 ? 1 : 0;
    this.initLevel();
}
Sokoban.prototype.resetLevel = function() {
    this.initLevel();
}
Sokoban.prototype.didWin = function() {
    for (var i = 0; i < this.goals.length; i++) {
        var goal = this.goals[i];
        if (!this.boxes.getItem(goal.position)) {
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
    fill(0, 0, 255, 96);
    if (sokoban.boxes.getItem(this.position)) {
        fill(0, 0, 255, 180);
    }
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
function Floor(x, y) {
    this.position = createVector(x, y);
}
Floor.prototype.update = function() {}
Floor.prototype.display = function() {
    push();
    translate(this.position.x, this.position.y);
    fill(128, 0, 128, 80);
    noStroke();
    rect(0, 0, 1, 1);
    strokeCap(SQUARE);
    stroke(255, 128);
    strokeWeight(0.01);
    line(0, 0.5, 1, 0.5);
    line(0.5, 0, 0.5, 1);
    pop();
}
