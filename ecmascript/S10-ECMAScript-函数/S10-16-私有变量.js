/*
    S10.16 私有变量
    严格来讲，JavaScript 没有私有成员的概念，所有对象属性都共有的。
    不过倒是有私有变量的概念。任何定义在函数或块中 变量，都可以认为是私有的，因为在这个函数或块的外部无法访问其中的变量。
    私有变量包括函数参数、局部变量，以及函数内部定义的其他函数。
 */
function add(n1, n2){
    let sum = n1 + n2;
    return sum;
}
/*
    在 add 函数中 sum 变量只能在函数内部使用，不能在函数外部访问。
    如果这个函数中创建了一个闭包，则这个闭包能通过其作用域链访问其外部的 3 个变量。基于这一点就能创建出能够访问私有变量的公有方法。
 */

/*
    特权方法（privileged method）是能够访问函数私有变量（及私有函数）的公有方法。
    在 MyObject 中 privateVariable 和 privateFunction 都只能通过 publicFunction 来访问。
    在创建 MyObject 实例后无法直接访问 privateVariable 和 privateFunction
 */
function MyObject(){
    let privateVariable = 10;

    function privateFunction(){
        return false;
    }

    this.publicFunction = function(){
        privateVariable ++;
        return privateFunction();
    }
}
new MyObject().publicFunction();

/*
    Person 暴露两个特权方法，getName，setName
    通过两个方法，设置命名参数 name 的值，命名参数是私有的，name 值也就无法被外部访问，而通过特权方法设置值获取值
    则可以完成对 name 命名参数的修改。因此达成了私有变量的目的。
 */
function Person(name){
    this.getName = function(){
        return name;
    }
    this.setName = function(v){
        console.log(this, this.name);
        name = v;
    }
}
let x1 = new Person('o');
console.log(x1.getName());
x1.setName('x');
console.log(x1.getName());