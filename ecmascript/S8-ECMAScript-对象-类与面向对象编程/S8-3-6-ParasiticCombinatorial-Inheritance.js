/**
 * 8.3.6 寄生式组合继承
 * 
 * 组合继承存在效率问题，主要问题就是在弗雷构造函数始终会被调用两次，一次是创建子类原型时调用，
 * 另一次是调用子类构造函数中使用。
 * 
 * 在组合继承中：
 *  1. 子类原型时调用
 *      会将弗雷构造函数属性作为原型属性
 *  2. 构造函数调用
 *      当前实例拥有父类构造函数的属性
 * 因此当前实例也会有与原型对象重叠的属性，有些属性并不是必要的。
 * 
 * 为了解决这些问题，使用寄生式组合继承，通过盗用构造函数继承属性，使用混合式原型链继承方法。
 * 基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的副本。
 * 说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。
 */

/*
    寄生式继承
    在该函数内增强原型对象的属性

    从而实现了寄生式组合继承
 */
function inheritPrototype(SubType, SuperType) {
    /*
        原型式继承
        以 SuperType.prototype 为原型对象的实例函数
     */
    let prototypeClone = Object.create(SuperType.prototype);

    /*
        原型链
        SubType 的内部属性 [[Prototype]] 的 constructor 指向 SubType，
        然后将 SubType.prototype 重写为 SuperType.prototype 原型对象， 形成原型链

        此刻原型链与盗用构造函数形成了组合式继承
     */
    prototypeClone.constructor = SubType;
    SubType.prototype = prototypeClone;   
}

function SuperType(name){
    this.name = name;
    this.colors = ['red'];
}
SuperType.prototype.mark = function(){
    this.colors = this.colors.concat(this.colors);
}
function SubType(name, age){
    //盗用构造函数
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayName = function(){
    console.log(this.name);
}
let x1 = new SubType('p', 25);
x1.mark();
x1.sayName();
console.log(x1);