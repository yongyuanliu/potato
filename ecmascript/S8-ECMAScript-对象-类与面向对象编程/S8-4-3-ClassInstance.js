/*
    8.4.3 实例、原型和类乘以
 */

/**
 * 1. 实例成员
 * 类构造函数中的属性会成为类实例的属性
 */
class Person{
    constructor(name){
        this.name = name;
    }

    
    sayName(){
        console.log(this.name);
    }
}
let x1 = new Person('x1');
let x2 = new Person('x2');
console.log(x1.name, x2.name, Person.prototype.name);
console.log(Object.is(x1.name, x2.name));

/**
 * 2. 原型方法和访问起
 * 类的方法会成为原型方法
 * get set 设置支持访问起属性
 */
 class Person{
    constructor(){
    }

    sayName(){
        console.log(this.name_);
    }

    set name(v){
        this.name_ = v;
    }
    get name(){
        return this.name_;
    }
}
let x3 = new Person();
x3.name = 'x';
x3.sayName();


/**
 * 3. 静态类方法
 * 这些方法通常用于执行不特定于实例的操作，也不要求存在类的实例。
 */
 class Person{
    constructor(){
    }

    sayName(){
        console.log(this.name_);
    }

    set name(v){
        this.name_ = v;
    }
    get name(){
        return this.name_;
    }

    static create(){
        return new Person();
    }
}

/**
 * 4. 非函数原型和类成员
 * 在类外部可以手动显示的添加原型属性和实例方法
 */
Person.prototype.age = 25;
Person.prototype.sayAge = function(){
    console.log(this.age);
}
let x4 = new Person();
x4.sayAge();