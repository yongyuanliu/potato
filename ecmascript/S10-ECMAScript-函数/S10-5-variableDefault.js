/*
    10.5 默认参数值
    ES6 支持显示定义默认参数，只要在参数定义中的参数后面使用 = 就可以为参数赋一个默认值
 */
function make(name = 'o') {
    console.log(name);
}
console.log(make('x'), make());//x o

/*
    1. 使用默认参数时，arguments 对象不会反映参数的默认值，只反映传入的参数
    2. 默认参数时 javascript 表达式，会返回求值的结果
    3. 函数默认值只在调用时（未传参数）时才会调用
 */
function makeAge(){
    return 1 * 25;
}
function make(name = 'o', age = makeAge(), sux = Date.now()) {
    console.log(arguments.length, name);//0 o
    console.log(name, age, sux);//o 25 1620634792820
}
make();

let xMake = (name = 'xmake') => console.log(name);
xMake(); //xmake

/*
    4. 默认参数作用域类似 let 关键字
    有序且被一次初始化
    因此后面的默认值可以引用签名定义的变量
    参数初始化顺序遵循 暂时性死区
 */
function logx(v1 = 'name', v2 = v1){
    console.log(v1, v2);//name name
}
logx();