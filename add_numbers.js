var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter a number to add: ", function(numString) {
      var num = parseInt(numString);
      addNumbers(sum + num, --numsLeft, completionCallback);
    });
  } else {
    reader.close();
    completionCallback(sum);
  }
};

// test
addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});