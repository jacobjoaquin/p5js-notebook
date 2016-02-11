var P5Spade = function(id, data) {
    this.id = id;
    this.data = data;
    this.editor;
    this.p5;
    this.$id = $('#' + this.id);

    this.create(this.id);
    this.play();
}

P5Spade.prototype.create = function() {
    this.$id
        .append($('<div>').addClass('p5canvas'))
        .append(
            $('<div>').addClass('editorcontainer')
            .append($('<div>').addClass('editor'))
        );

    var editor = this.$id.find('.editor').get(0);
    this.editor = ace.edit(editor);
    this.editor.setValue(this.data);
    this.editor.setTheme("ace/theme/tomorrow");
    this.editor.getSession().setMode("ace/mode/javascript");
}

P5Spade.prototype.play = function() {
    var canvas = this.$id.find('.p5canvas').get(0);

    var editor = this.editor;
    this.p5 = new p5(function(p) {
        p.setup = function() {
            if (typeof setup == 'function') {
                setup();
            }
        }
        p.draw = function() {
            draw();
        }
        p.keyPressed = function() {
            if (typeof keyPressed == 'function') {
                keyPressed();
            }
        }
        with (p) {
            var v = editor.getValue();
            try {
                eval(v);
            }
            catch(err) {
                console.log(err);
            }
        }
    }, canvas);
}

P5Spade.prototype.reset = function() {
}
