/**
 * 8.3.2 盗用构造函数（constructor stealing）
 * 这种技术也称为 对象伪装，或者经典继承。
 * 基本思路很简单，在子类构造函数中调用父类构造函数，因为毕竟函数就是在特定上下文中执行代码的简单对象，
 * 所以可以使用 apply 和 call 方法以新创建的对象为上下文执行构造函数。
 */
function XSuperType() {   
    this.colors = ['red', 'blue'];
}

function XSubType() {
    //继承 SuperType 
    XSuperType.call(this);
}

let xSubInstance = new XSubType();
console.log(xSubInstance.colors.pop()); //blue
console.log(xSubInstance.colors); //['red']
console.log(XSubType.prototype); //Object, 此刻的 SubType 的原型指向的仍然是 Object

let xSuperInstance = new XSuperType();
console.log(xSuperInstance.colors); //['red', 'blue']

/*
    1. 传递参数
    相比起原型链，盗用构造函数的一个优点在于子类构造函数可以向父类构造函数传递参数
 */
function SuperType(name) {   
    this.name = name;
    this.colors = ['red', 'blue'];
}

function SubType(name, age) {
    //继承 SuperType 
    SuperType.call(this, name);
    this.age = age;
}
let subInstance = new SubType('o', 25);
subInstance.colors.shift();
console.log(subInstance.name, subInstance.age, subInstance.colors);//o 25 Array [ "blue" ]

let superInstance = new SuperType('s');
console.log(superInstance.colors);//Array [ "red", "blue" ]

/*
    2. 盗用构造函数的问题
    主要缺点，也是使用构造函数模式自定义类型的问题：
        1. 必须在构造函数中定义方法，因此函数不能重用
        2. 子类不能访问父原型上的方法，因此所有类型只能使用构造函数模式
*/