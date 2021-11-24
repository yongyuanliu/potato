/*
    10.9 函数内部
    ES5 中函数内部存在两个特殊对象：arguments 和 this
    ES6 中新增了 new.target 属性
 */

/*
    10.9.1 arguments
    arguments 对象有一个 callee 属性，是一个指向 arguments 对象所在函数的指针。
    可以利用该指针完成自我调用
 */
/*
    利用 callee 属性完成阶乘
 */
function factorial(num){
    if(num <= 1){
        return 1;
    }
    return num * arguments.callee(num - 1);
}
console.log(factorial(3));

/*
    10.9.2 this
    在标准函数和箭头函数中有不同的行为。
    在标准函数中 this 引用的是把函数当成方法调用的上下文对象，这个时候通常称为 this 值，谁调用函数，this 指向谁
 */
window.color = 'red';
let o = {
    color: 'blue'
};
function sayColor() {
    console.log(this.color);
}
sayColor();//red

sayColor.call(o, null);//blue

o.sayColor = sayColor;
o.sayColor(); //blue

/*
    箭头函数中，this 引用的是定义箭头函数的上下文。
    定义 sayColor 时 this 就是 window
 */
window.color = 'red';
let o = {
    color: 'blue'
};
let sayColor = () => console.log(this.color);

sayColor();//red

sayColor.call(o, null);//red

o.sayColor = sayColor;
o.sayColor(); //red

/*
    在事件回调或定时回调中调用某个函数时，this 值指向的并非是想要到的对象。此时将函数写成箭头函数就可以解决问题。
    因为箭头函数中的 this 会保留定义该函数时的上下文
 */
function King(){
    this.royaltyName = 'Henry';
    setTimeout( () => console.log(this, this.royaltyName), 1000 );
}
new King();//Henry

/* setTimeout 普通函数 */
function Queen() {
    this.royaltyName = 'X';
    setTimeout(function() {
        console.log(this.royaltyName);
    }, 1000);
}
new Queen();//undefined

/*
    10.9.3 caller
    ES5 给函数对象添加的属性：caller
    该函数引用的是调用当前函数的函数，在全局作用域中调用的则为 null

    严格模式下访问：
        arguments.callee 报错
        arguments.callee.caller 报错
 */
function outer() {
    inner();
}
function inner(){
    console.log(inner.caller);
}
outer();

/*
    10.9.4 new.target
    ES6 新增了检测函数是否使用 new 关键字调用的 new.target 属性
    普通函数调用 new.target 为 undefined
    使用 new 关键字。new.target 将引用被调用的构造函数
 */
function King() {
    if(Object.is(new.target, King)){
        throw 'King must be instantiated using "new"';
    }
    console.log(`${new.target.name}`);
}
function XW(){
    King.call(this, null);
}
XW.prototype = Object.create(King.prototype);

//new King();
//new XW();
class XX extends King{
    constructor(){
        super();
    }
}
new XX();