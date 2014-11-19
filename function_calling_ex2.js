Function.prototype.myBind = function(context) {
  var fn = this;
  return function(fn, context) {
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
c.cuteStatement();

c.cuteStatement.myBind(new Cat("Sam", 2))();


