/*
    8.4.4 类继承
    ES6 支持单继承，使用 extends 就可以继承任何拥有 [[Constructor]] 和 原型对象
    这也意味着可以继承普通的构造函数
 */


/*
    1. 继承基础
 */
class Vehicle{}
// 继承类
class Bus extends Vehicle{}

function Person(){}
//继承普通函数
class Engineer extends Person{}


/*
    2. 构造函数、HomeObject 和 super()
    派生类能用 super 关键字引用它们的原型。
    super 只能在派生类中使用，仅限于构造函数，实例方法，静态方法内部

    [[HomeObject]] ES6给类构造函数和静态方法添加了内部特性，该特性是一个指针，指向定义该方法的对象。
    这个指针是自动赋值的，只能在 JavaScript 引擎内部访问。
    super 始终定义为[[HomeObject]]的原型。
 */
class Vehicle{
    constructor(){
        this.hasEngine = true;
    }
}
class Bus extends Vehicle{
    constructor(){
        //不要在调用 super 之前引用 this，否则会抛出异常
        super();
        console.log(this instanceof Vehicle);
        console.log(this);
    }
}
new Bus();

/* 在静态方法中可以通过 super 调用继承的类上定义的静态方法 */
class Vehicle{
    constructor(){
        this.hasEngine = true;
    }
    static identity(){
        console.log(Vehicle.name);
    }
}
class Bus extends Vehicle{
    constructor(){
        //不要在调用 super 之前引用 this，否则会抛出异常
        super();
    }
    static identity(){
        super.identity();
    }
}
Bus.identity();

/*
    super 只能在派生类构造函数和静态方法中使用。
 */
class Vehicle{
    constructor(){
        super();//SyntaxError: super() is only valid in derived class constructors
    }
}

/*
    不能单独引用 super 关键字
 */
class Vehicle {}
class Bus extends Vehicle{
    constructor(){
        // console.log(super);//SyntaxError: invalid use of keyword 'super'
    }
}

/*
    调用 super() 会调用父类构造函数，并将返回的实例赋值给 this
 */
class Vehicle {}
class Bus extends Vehicle{
    constructor(){
        super();
        console.log(this instanceof Vehicle);
    }
}
new Bus();

/*
    super() 向父构造函数传递参数，必须手动传入
 */
class Vehicle {
    constructor(licensePlate){
        this.licensePlate = licensePlate;
    }
}
class Bus extends Vehicle{
    constructor(licensePlate){
        super(licensePlate);
    }
}
console.log(new Bus('1337H4X'));

/*
    如果没有定义类的构造函数，在实例化派生类时会调用 super()，而且传入所有参数
 */
class Vehicle {
    constructor(licensePlate){
        this.licensePlate = licensePlate;
    }
}
class Bus extends Vehicle{
}
console.log(new Bus('1337H4X'));

/*
    在类构造函数中，不能在调用 super 前引用 this
 */
class Vehicle {
    constructor(licensePlate){
        this.licensePlate = licensePlate;
    }
}
class Bus extends Vehicle{
    constructor(licensePlate){
        //ReferenceError: must call super constructor before using 'this' in derived class constructor
        console.log(this);
    }
}
console.log(new Bus('1337H4X'));

/*
    如果派生类显示定义了构造函数，那么必须在其中调用 super(), 要么必须返回一个新对象
 */
class Vehicle{}
class Car extends Vehicle {}
class Bus extends Vehicle {
    constructor(){
        super();
    }
}
class Van extends Vehicle{
    constructor(){
        return {};
    }
}
console.log(new Car());
console.log(new Bus());
console.log(new Van());

/*
    3. 抽象基类
    new.target 用于返回实例化的目标类型。
    有时候可能需要定义这样一个类，它可供其他类继承，但本身不会被实例化。
    ECMAScript 虽然没有专门但支持这类但语法，但是通过 new.target 也很容易实现。
    new.target 保存通过 new 关键字调用但类或函数。通过在实例化时检测 new.target 是不是抽象基类，可以阻止对抽象基类对实例化。
 */
class Vehicle{
    constructor(){
        console.log(new.target);
        if(Object.is(new.target, Vehicle)){
            throw new Error(`${Vehicle.name} cannot be directly instantiated`);
        }
    }
}
new Vehicle();

/*
    4. 继承内置类型
    ES6 类为继承内置引用类型提供了顺畅对机制，开发者可以方便地扩展内置类型.
 */
class SuperArray extends Array{
    shuffle(){
        for(let i = this.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
}
let a = new SuperArray(1, 2, 3, 4, 5);
a.shuffle();
console.log(a);

/*
    5. 类混入
    把不同类对行为几种到一个类是一种常见对 JavaScript 模式。
    ES6 没有显示支持多类继承，但通过现有特性可以轻松地模拟这种行为，
    extends 关键字后面是一个 JavaScript 表达式因此可以方便的实现自己的原型链

    注意：Object.assign 是为了混入对象行为而设计的。
 */
class Vehicle {}

let FooMixin = (Superclass) => class extends Superclass{
    foo(){
        console.log(FooMixin.name);
    }
}

let BarMixin = (Superclass) => class extends Superclass{
    bar(){
        console.log(BarMixin.name);
    }
}

let BazMixin = (Superclass) => class extends Superclass{
    baz(){
        console.log(BazMixin.name);
    }
}

class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))){}

let b = new Bus();
b.foo();
b.bar();
b.baz();

/* 通过一个辅助函数，可以把嵌套调用展开 */
function classMixin(BaseClass, ...Mixins) {
    return Mixins.reduce( (accumlator, current) => current(accumlator), BaseClass);
}

class Vehicle {}

let FooMixin = (Superclass) => class extends Superclass{
    foo(){
        console.log(FooMixin.name);
    }
}

let BarMixin = (Superclass) => class extends Superclass{
    bar(){
        console.log(BarMixin.name);
    }
}

let BazMixin = (Superclass) => class extends Superclass{
    baz(){
        console.log(BazMixin.name);
    }
}

class Bus extends classMixin(Vehicle, FooMixin, BarMixin, BazMixin){}

let b = new Bus();
b.foo();
b.bar();
b.baz();
