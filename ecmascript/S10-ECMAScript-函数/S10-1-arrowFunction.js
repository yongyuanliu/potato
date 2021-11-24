/*
    10.1 箭头函数(arrow function)
    ES6 新增的胖箭头（ => ）语法定义函数表达式的能力，任何可以使用函数的地方都可以使用箭头函数。
    箭头函数虽然语法简洁，但也有很多场合不适用，箭头函数不能使用 arguments，super 和 new.target 也不能用作构造函数，
        此外箭头函数也没有 prototype 属性
 */
let arrowSum = (a, b) => {return a + b};

//只有一个参数可以省略括号
let triple = x => {return x};

//没有参数，多个参数必须要括号
let none = () => {};
let multiply = (a, b) => { console.log(a, b) };

//也可以省略大括号，但只允许执行一行代码
let print = s => console.log(s);