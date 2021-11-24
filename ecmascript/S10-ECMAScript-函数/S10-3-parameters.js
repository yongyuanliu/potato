/*
    10.3 理解参数
    ECMAScript 函数的参数在内部表现为一个数组，函数被调用时总会接收一个数组，但函数并不关心这个数组中包含什么
    在使用 function 关键字（非箭头）函数时，可以在函数内部访问 arguments 对象，从中取得传进来的每个参数值。
 */

/*
    arguments 对象时一个类数组对象（但不是 Array 但实例）
 */
function sayHi(name, message) {
    console.log('Hello', name, ',',message);//Hello o , paramemters
    console.log(arguments);//Arguments { 0: "o", 1: "paramemters", … }
    console.log(arguments[0], arguments[1]);//o paramemters
}
sayHi('o', 'paramemters');

/*
    1. 可以使用中括号语法访问其中的元素
    2. arguments.length 属性返回传入的参数个数
    3. arguments 中的参数值与命名参数不是同一个地址，但是会同步，这种同步时单向的。
        修改命名参数的值，不会影响 arguments 对象中相应的值 （经测试会影响）
    4. arguments 对象的长度时根据传入的参数个数，而不是命名参数个数确定的，因此设置了未传入的参数
        不会影响到命名参数
    5. 对于命名参数而言，调用函数时没有传入这个参数其值为 undefined 类似于定义了未初始化的变量
    6. 严格模式下，主动设置 arguments 中的值不会进行同步（不影响命名参数），在函数重写 arguments 对象会导致语法错误。
 */
function howManyArgs(){
    console.log(arguments.length);
}
howManyArgs();
howManyArgs(1);// 1
howManyArgs(1, 2, 3);//3

function changeParameter(name, v) {
    console.log(name, v, arguments[0], arguments.length);
    name = 'x';
    arguments[1] = 2;
    console.log(name, arguments[0], arguments.length);
    console.log(arguments);
}
changeParameter('o');

/*
    7. 箭头函数只能使用命名参数，不能使用 arguments 对象
 */
let arrowF = () => console.log(arguments);
arrowF();//Uncaught ReferenceError: arguments is not defined
/* 想要使用可以这样 */
function foo() {
    let bar = () => console.log(arguments);
    bar();
}
foo(1);
