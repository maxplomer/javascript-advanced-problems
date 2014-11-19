var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var TowersOfHanoiGame = function() {
  this.stacks = [[3,2,1],[],[]];
};

TowersOfHanoiGame.prototype.display = function() {
  console.log(this.stacks);
};

TowersOfHanoiGame.prototype.doMove = function(fromStackNum, toStackNum) {
  fromStack = this.stacks[fromStackNum];
  toStack = this.stacks[toStackNum];
  if (fromStack.length === 0) {
    console.log("cannot move from empty stack");
  } else if (!   (toStack.length === 0 ||
             toStack.slice(-1) > fromStack.slice(-1))  ) {
      console.log("cannot move onto smaller disk");
  } else {
    toStack.push(fromStack.pop());
  }

  this.display();

  if (this.gameWon()) {
    this.endGame();
  } else {
    this.getMove();
  }
};

TowersOfHanoiGame.prototype.gameWon = function() {
  return this.stacks[0].length === 0 &&
  (this.stacks[1].length === 0 || this.stacks[2].length === 0)
};

TowersOfHanoiGame.prototype.getMove = function() {
  var that = this;
  reader.question("From: ", function(fromStackString) {
    var fromStackNum = parseInt(fromStackString);
    reader.question("To: ", function(toStackString) {
      var toStackNum = parseInt(toStackString);

      that.doMove(fromStackNum, toStackNum);
    });
  });
};

TowersOfHanoiGame.prototype.endGame = function() {
  console.log("You win!!!");
  reader.close();
};

TowersOfHanoiGame.prototype.beginGame = function() {
  this.display();
  this.getMove();
};

var hanoi = new TowersOfHanoiGame();
hanoi.beginGame();