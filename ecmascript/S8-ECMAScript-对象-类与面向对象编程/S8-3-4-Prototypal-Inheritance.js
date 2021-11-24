/**
 * 8.3.4 原型式继承
 * 2006年，Douglas Crockford 写了一篇蚊帐：《JavaScript 中的原型式继承》（“Prototypal Inheritance in JavaScript”）。
 * 这篇蚊帐介绍了一种不涉及严格意义傻姑娘的构造函数继承方法。
 * 他的出发点是即使不自定义类型也可以通过原型实现对象之间的信息共享。
 * 
 * object 函数会创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个临时类型的一个实例。
 * 本质上，object() 是对传入的对象执行了一次浅复制。
 */
function object(o) {
    function F(){};
    F.prototype = o;
    return new F();
}
let x1 = {
    name: 'x1',
    age: 25
}
let x2 = object(x1);
x2.name = 'x2';
console.log(x2.name, x2.__proto__.name);


/*
    ECMAScript 5 通过增加 Object.create 方法将原型式继承的概念化规范了
 */
let x3 = {
    name:'x',
    sayName(){
        console.log(this.name);
    }
}
let x4 = Object.create(x3);
x4.name = 'x4';
x4.sayName();

let x5 = Object.create(x3, {
    name: {
        value: 'x5'
    }
});
x5.sayName();

/*
    原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息但场合。
    但要记住，属性中包含但引用值始终会在相关对象间共享，跟使用原型模式是一样的。
 */