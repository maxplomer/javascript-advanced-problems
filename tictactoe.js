Array.prototype.transpose = function () {
  var columns = [];
  for (var i = 0; i < this[0].length; i++) {
    columns.push([]);
  }

  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[i].length; j++) {
      columns[j].push(this[i][j]);
    }
  }

  return columns;
};

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Board = function() {
  this.rows = [ [ null, null, null ],
                [ null, null, null ],
                [ null, null, null ] ];
};

Board.prototype.cols = function() {
  return this.rows.transpose();
};

Board.prototype.diagonals = function() {
  topleftbottomright = [this.rows[0][0], this.rows[1][1], this.rows[2][2]];
  bottomlefttopright = [ this.rows[0][2], this.rows[1][1], this.rows[2][0]];
  return [topleftbottomright, bottomlefttopright];
};

Board.prototype.winner = function() {
  for (var i = 0; i < 3; i++) {
    if (this.rowEq(this.rows[i], ['x', 'x', 'x'])) { return 'x'; }
    if (this.rowEq(this.rows[i], ['o', 'o', 'o'])) { return 'o'; }
    if (this.rowEq(this.cols()[i], ['x', 'x', 'x'])) { return 'x'; }
    if (this.rowEq(this.cols()[i], ['o', 'o', 'o'])) { return 'o'; }
  }

  for (var i = 0; i < 2; i++) {
    if (this.rowEq(this.diagonals()[i], ['x', 'x', 'x'])) { return 'x'; }
    if (this.rowEq(this.diagonals()[i], ['o', 'o', 'o'])) { return 'o'; }
  }
};

Board.prototype.rowEq = function(row1, row2) {
  for (var i = 0; i < row1.length; i++) {
    if (row1[i] !== row2[i]) { return false; }
  }

  return true;
};

Board.prototype.won = function() {
  return !!this.winner();
};

Board.prototype.tied = function() {
  if (this.won) {return false }

  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      if (row[i][j] == null){ return false}
    }
  }

  return true
};

Board.prototype.isOver = function() {
  return this.won() || this.tied()
};

Board.prototype.display = function() {
  for (var i = 0; i < this.rows.length; i++){
    console.log(this.rows[i]);
  }
};

Board.prototype.placeMark = function(x, y, mark) {
  if (this.rows[y][x]) {
    return false;
  }
  this.rows[y][x] = mark;

  return true;
};

var Game = function() {
  this.board = new Board();
  this.players = ['x', 'o'];
};

Game.prototype.run = function() {
  this.playTurn(0);
};

Game.prototype.playTurn = function(player) {
  console.log(this.board.winner());

  var that = this;
  this.board.display();
  if (this.board.isOver()) {
    this.endGame();
  } else {
    reader.question(this.players[player] + ", make a move: ",
    function(coordInput) {
      var coords = coordInput.split(',');
      var x = parseInt(coords[0]);
      var y = parseInt(coords[1]);
      if (that.board.placeMark(x, y, that.players[player])) {
        that.playTurn((player + 1) % 2);
      } else {
       console.log("Occupied space!");
       that.playTurn(player);
      }
    });
  }
};

Game.prototype.endGame = function() {
  if (this.board.won) {
    var winner = this.board.winner();
    console.log(winner + " wins!");
  } else {
    console.log("No one wins!");
  }

  reader.close();
};

var ttt = new Game();
ttt.run();

