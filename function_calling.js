Function.prototype.myBind = function(context) {
  var fn = this;
  return function() {
    fn.apply(context);
  };
};

var Cat = function(name, age) {
  this.name = name;
  this.age = age;
};

Cat.prototype.cuteStatement = function() {
  console.log("I am " + this.name + ", meow..");
};

var c = new Cat("Jade", 2);

wrong_cute = c.cuteStatement;
right_cute = c.cuteStatement.myBind(c);

wrong_cute();
right_cute();