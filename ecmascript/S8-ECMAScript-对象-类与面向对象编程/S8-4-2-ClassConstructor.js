/*
    8.4.2 类构造函数
    constructor 关键字用于在类定义块内部创建类构造函数。
    constructor 会告诉解释器在使用 new 操作符创建类但新实例时，应该调用这个函数。
    构造函数不是必须的，不定义构造函数相当于将构造函数定义为空构造函数。
 */

/*
    1. 实例化
    使用 new 操作符实例化 Person 的操作等于使用 new 调用其构造函数。
    唯一可感知的不同之处就是，JavaScript 解释器知道使用 new 和 类意味着应该使用 constructor 函数进行实例化。
    使用 new 调用类的构造函数会执行如下操作。
        · 在内存中创建一个新对象。
        · 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数的 prototype 属性。
        · 构造函数内部的 this 被赋值为这个新对象。
        · 执行构造函数内部的代码。
        · 如果构造函数返回了非空对象，则返回该对象；否则返回刚创建的新对象。
 */
class Animal{}

class Person{
    constructor(name){
        this.name = name;
    }
}
let p = new Person('x');
console.log(p);

/*
    类构造函数与构造函数的主要区别是，调用类构造函数必须使用 new 操作符。
    而普通构造函数如果不使用 new 调用，那么就会以全局的 this 作为内部对象。
    调用类构造函数时如果忘了使用 new 则会抛出错误
 */
let x = Person('x');//class constructors must be invoked with 'new'
console.log(x);


/*
    2. 把类当成构造函数
    类是一种特殊函数，ECMAScript 中没有正式定义这个类型。
    通过 typeof 操作符会返回 function
 */
console.log(Person.prototype);
console.log(Object.is(Person, Person.prototype.constructor));
console.log(typeof Person);

/*
    类中定义的 constructor 方法不会被当成构造函数，在对它使用 instanceOf 操作符时会返回 false。
    但是创建实例时直接将类构造函数当成普通构造函数来使用，那么 instanceOf 操作符的返回值会反转。
 */
let p1 = new Person();

// true true false
console.log(Object.is(p1.constructor, Person), p1 instanceof Person, p1 instanceof Person.constructor);

let p2 = new Person.constructor();

// false false true
console.log(Object.is(p2.constructor, Person), p2 instanceof Person, p2 instanceof Person.constructor);