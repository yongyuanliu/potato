/**
 * 8.2.4 原型模式
 * 每个函数都会创建一个 prototype 属性，该属性是一个对象包含应该由特定引用类型的实例共享的属性和方法。
 * 实际上这个对象就是通过调用构造函数创建的对象原型，
 * 使用原型对象的好处在于，在它上面定义的方法和属性可以被对象共享。
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
    // 之前采用的 sayName
    // this.sayName = function(){
    //     console.log(this.name);
    // }
}
//使用原型的 sayName
Person.prototype.sayName = function(){
    console.log(this.name);
}

let x1 = new Person('o', 25),
    x2 = new Person('x', 25);
x1.sayName();
x2.sayName();

/**
 * 1. 理解原型
 * 无论何时，只要创建一个函数，就会按照特定规则为该函数创建一个 prototype 属性（指向原型  [[Prototype]] ）
 * 所有原型都的对象都会自动获得一个 constructor 属性，该属性指回与之关联的函数。
 * 
 * 在自定义构造函数时，原型对象默认只获得 constructor 属性，其他所有方法都继承自 Object
 * 每次调用构造函数创建一个实例，这个实例内部 [[Prototype]] 指针就会被赋值为构造函数的原型对象。
 * 脚本中没有访问 [[Prototype]] 特性的标准，但浏览器会在每个对象上暴露 __proto__ 属性，通过该属性访问实例所属对象的原型对象
 */


console.log(Object.is(Person.prototype.constructor, Person));

console.log(x1 instanceof Person);

console.log(Object.is(Person.prototype, x1.__proto__));

// 正常的原型链都会终止于 Object 的原型对象, Object 的原型对象是 null
let b1 = Object.is(Person.prototype.__proto__, Object.prototype);//true
let b2 = Object.is(Person.prototype.__proto__.__proto__, null); //true

//构造函数，原型对象，实例是 3 个完全不同的对象
let hb1 = Object.is(x1, Person.prototype);// 实例 不是 原型对象
let hb2 = Object.is(x1, Person.prototype.constructor);//实例 不是 构造函数
let hb3 = Object.is(Object.prototype, Object.prototype.constructor); // 原型对象 不是 s构造函数
console.log(hb1, hb2, hb3);

//检查实例是是否拥有该原型对象的指向
let hb4 = Person.prototype.isPrototypeOf(x1);
console.log(hb4);

//获取实例的原型对象
let hb5 = Object.getPrototypeOf(x1);
console.log(hb5);

/**
 * 设置对象的原型对象
 * 1. Object.setPrototypeOf
 * 2. Object.create
 */
function X1Person() {
}
let x3 = new Person('x3', 25);
Object.setPrototypeOf(x3, X1Person.prototype);
console.log(x3);

let x4 = new X1Person();

/**
 * 产生新的原型对象并指向 Object。 在该实例添加属性，在该实例添加原型属性都不会影响到 x4
 * Object { name: "x5" }
    name: "x5"
    <prototype>: Object {  }
        <prototype>: Object { … }
            constructor: function X1Person()
            <prototype>: Object { … }
 */
let x5 = Object.create(x4);
x5.name = 'x5';

console.log(x4, x5);

/**
 * 2. 原型层级
 * 在通过对象访问属性时，会按照这个属性的名称开始搜索。
 * 搜索开始于对象实例本身,如果在这个对象实例上发现了给定的名称，则返回该名称对应的值，
 * 如果没有找到这个属性，则搜索沿着指针进入原型对象，然后在原型对象上找到属性后，再返回对应的值
 */
function Humanity(name, gender) {
    this.name = name;
    this.gender = gender;
    this.sym = Symbol('x');
    this[Symbol('h')] = 1;
}
Humanity.prototype.type = 'humanity';
Humanity.prototype.sym = Symbol('sym');
let h1 = new Humanity('h1', 1);
console.log(h1.type);

/**
 * 只要给对象实例添加一个属性，这个属性就会遮罩（shadow）原型对象上的同名属性，也就是虽然不会修改它，但会屏蔽它的访问
 * 
 * delete 操作符可以删除 shadow 属性
 * hasOwnProperty 方法可以用于确定某个属性属于实例
 */

delete h1.type;
console.log(h1);

console.log(h1.hasOwnProperty('type'), h1.hasOwnProperty('gender'));// false, true

/**
 * 3. 原型和 in 操作符
 * 单独使用 in 操作符会在可以通过对象访问指定属性时返回 true，无论上在原型上还是实例上
 * 只要通过对象可以访问 in 操作符就会返回 true，而 hasOwnProperty 只有存在实例上的属性才会返回 true
 * 因此 in 为 true 而 hasOwnProperty 为 false 时则说明该属性存在原型对象上
 */
function hasPrototypeProperty(o, key) {
    return !o.hasOwnProperty(key) && (key in o);
}
hasPrototypeProperty(h1, 'type');

/**
 * 获取对象的属性
 * keys：获取对象属性键， 获取不到符号键
 * getOwnPropertyNames：获取对象属性键不论是否可迭代，获取不到符号键
 * getOwnPropertySymbols：获取对象符号属性键不论是否可迭代
 */
// 所有可迭代的属性
let h1Keys = Object.keys(h1);
console.log(h1Keys); // Array(3) [ "name", "gender", "sym" ]

//原型所有属性名称，不论是否可以迭代
let humanityPrototypePropertyNames = Object.getOwnPropertyNames(Humanity.prototype);
console.log(humanityPrototypePropertyNames);// Array(3) [ "constructor", "type", "sym" ]

//获取符号为键的属性
let humanityPrototypePropertSymbols = Object.getOwnPropertySymbols(h1);
console.log(humanityPrototypePropertSymbols);// Array [ Symbol("h") ]

let hxo = {
    [Symbol('x')]: 1,
    [Symbol('x')]: 2
}
let hxoSymbols = Object.getOwnPropertySymbols(hxo);
console.log(hxoSymbols);//Array [ Symbol("x"), Symbol("x") ]

/**
 * 4. 属性枚举顺序
 * for-in、Object.keys 的枚举顺序上不确定的
 * Object.getOwnPropertyNames, Object.getOwnPropertySymbols 和 Object.assign 是有序的
 *  先升序枚举数值键，然后以插入顺序枚举字符串和符号键
 */