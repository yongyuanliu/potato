/*
    8.4.1 类定义
    类定义主要有 2 种方式：类定义和类表达式
 */
//类定义
class Person {};
//类表达式
const Animal = class {};
//类的实际类型
console.log(typeof Person); // 仍然是 function

/*
    与函数表达式类似，类表达式在它们求值前也不能引用。
    不过与函数定义不同的是，虽然函数声明可以提升，但是类定义不能。
    此外，函数受函数作用域限制，而类受块作用域限制。
 */

/*
    类构成：类可以包含构造函数、实例方法、获取，设置函数和静态方法。
    默认情况下，类定义中的代码都在严格模式下执行。
 */
// 空类定义
class Foo{}

// 有构造函数的类
class Baz{
    constructor(){}
}

// get，set 函数
class Bar{
    set myCar(v){}
    get myCar(){}
}

//静态类方法 
class Qux{
    static myQux(){}
}

/* 
    类表达式的名称是可选的，在把类表达式赋值变量后
    可以通过 name 属性来取得类表达式名称字符串。但不能在类表达式作用域外部访问这个标识符。
 */
let Car = class CarName{
    identity(){
        console.log(Car.name, CarName.name);
    }
}
let carInstance = new Car();
carInstance.identity();
console.log(Car.name);
console.log(CarName);//ReferenceError: CarName is not defined