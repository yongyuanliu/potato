/**
 * S8.2 创建对象
 * 使用 Object 构造函数或字面量创建对象，在创建具有相同接口的多个对象需要重复编码
 */

/**
 * 8.2.1 概述
 * 
 * ES6 正式支持类和继承
 * ES5.1 尚未支持，在 ES6 以前可使用原型继承完成
 */

/**
 * 8.2.2 工厂模式
 * 抽象创建特定对象的过程
 * 没法知道函数具体指向
 */
function x1CreatePerson(name, age){
    return {
        name, 
        age,
        sayName(){
            console.log(this.name);
        }
    }
}
let x1Person1 = x1CreatePerson('o', 24);
console.log(x1Person1);

let x1Person2 = x1CreatePerson('x', 25);
console.log(x1Person2);

/**
 * 8.2.3 构造函数模式
 * 以函数的形式为自己的对象类型定义属性和方法
 */
function MPerson(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log(this.name);
    }
}
let m1 = new MPerson('o', 24);
m1.sayName();
console.log(m1);
/**
 * 跟工厂模式有如下区别：
 * 1. 没有显示的创建对象
 * 2. 属性和方法直接赋值给了 this
 * 3. 没有 return
 */

/**
 * 要创建 MPerson 实例，应使用 new 操作符，以这种方式调用构造函数会执行如下操作：
 * 1. 在内存中创建一个新对象
 * 2. 这个对象内部的 [[Prototype]] 特性赋值为构造函数的 prototype 属性
 * 3. 构造函数内部的 this 赋值为这个新对象
 * 4. 执行函数内部的代码
 * 5. 如果函数 return 非空对象则返回该对象，否则 return 刚创建的新对象
 */
console.log(m1 instanceof MPerson);// true
console.log(MPerson.prototype.constructor === MPerson);

/**
 * 1. 构造函数也是函数
 * 在调用一个函数而没有明确设置 this 值的情况下（即没有作为对象的方法调用，或者没有使用 call()/apply() 调用）
 * this 始终指向 Global 对象（在浏览器中就是 window 对象）
 */
let m2 = new MPerson('m2', 25);
m2.sayName();

MPerson('winx', 99); // 指向了 window
window.name;

/**
 * 2. 构造函数的问题
 * 主要问题在于构造函数内部的 function 不是同一个
 * 每个 function 都是对象，相当于每个对象都拥有自己的 function 实例，无法共用 sayName 函数
 */
function M2Person() {
    this.sayName = function() {
        //...
    }
}
let m2m = new M2Person();
let m2m2 = new M2Person();
console.log(Object.is(m2m, m2m2)); // false
console.log(Object.is(m2m.sayName, m2m2.sayName));// false