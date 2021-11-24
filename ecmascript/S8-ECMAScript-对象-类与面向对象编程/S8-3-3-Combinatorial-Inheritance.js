/**
 * 8.3.3 组合继承
 * 组合继承综合了原型链和盗用构造函数，将两者的优点集中了起来。
 * 基本思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。
 * 这样既可以把方法定义在原型上以实现重用，又可以让每个实例都又自己的属性。
 */
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}
SuperType.prototype.superSayName = function(){
    console.log('super', this.name);
}
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.subSayName = function(){
    console.log('sub', this.name);
}
let x1 = new SubType('o', 25);
console.log(x1);

/*
    组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中使用最多的继承模式。
    而组合继承也保留了 instaceof 操作符和 isPrototypeOf 方法识别合成对象的能力。
 */