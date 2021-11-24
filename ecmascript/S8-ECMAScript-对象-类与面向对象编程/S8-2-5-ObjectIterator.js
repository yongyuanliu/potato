/**
 * 8.2.5 对象迭代
 */

//Object.values, Object.entries 符号会被忽略
function Humanity(name, gender) {
    this.name = name;
    this.gender = gender;
    this.sym = Symbol('x');
    this[Symbol('h')] = 1;
}
Humanity.prototype.type = 'humanity';
Humanity.prototype.sym = Symbol('sym');
let h1 = new Humanity('h1', 1);
console.log(Object.values(h1)); //Array(3) [ "h1", 1, Symbol("x") ]
console.log(Object.entries(h1)); //Array(3) [ (2) […], (2) […], (2) […] ]

/**
 * 1. 其他原型语法
 * 在前面例子中，每次定义一个原型属性或方法，都会把 Humanity.prototype 重写一遍
 *  为了便利，直接通过一个包含所有属性和方法的对象字面量来重写原型。
 */
function Person() {}
Person.prototype = {
    name: 'o'
};
/*
    在这个例子中，Person.prototype 被设置为等于一个通过对象字面量创建的对象，
    最终结果是一样的，只有一个问题：这样重写以后，Person.prototype 的 constructor 属性就不指向 Person 了
    在创建函数时就会创建它的 prototype 属性并设置 constructor 属性指向该函数，而上面的写法完全重写了 prototype 属性
    因此其 constructor 属性也指向了完全不同的新对象（Object）不再指向原来的构造函数
 */
console.log(Object.is(Person, Person.prototype.constructor));// false

let p1 = new Person();
console.log(p1 instanceof Person); // true... 是的，是为 true 值

/*
    如果 consturctor 属性很重要，那么可以重写 constructor 属性
    但是要注意，在字面量中重写 constructor 属性是可以被枚举的，因此还要设置其不可枚举
 */
Person.prototype = {
    constructor: Person,
    age: 25
}
let p2 = new Person();
Object.keys(Person.prototype);

Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});
let p3 = new Person();
Object.keys(Person.prototype);


/**
 * 2. 原型的动态性
 * 实例只有指向原型的指针，没有指向构造函数的指针
 * 
 * 重写构造函数傻姑娘的原型之后，在创建新的实例才会引用新的原型，而在此前创建实例仍然会引用最初的原型
 */
function DP() {}
DP.prototype.name = 'DP';
let ldp1 = new DP();
console.log(ldp1.name); //DP

DP.prototype = {
    name: 'newx'
};
console.log(ldp1.name); //dp
let ldp2 = new DP();
console.log(ldp2.name); //dp


/**
 * 3.原生对象模型
 * 所有原生引用类型的构造函数都在原型上定义了实例方法
 */


/**
 * 4. 原型的问题
 * 1. 弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值。
 * 2. 共享特性，原型上所有的属性是在实例间共享的，原始值还好，如果是引用类型意味着所有实例访问的引用类型都会发生变更
 */