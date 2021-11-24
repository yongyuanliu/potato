/*
    10.6 参数扩展与收集
    ECMAScript 6 新增了扩展操作符，使用它可以非常简洁地操作和组合集合数据。扩展操作符最有用的场景就是函数定义中的
        参数列表，在这里它可以充分利用这门语言的弱类型及参数长度可变的特点。
    扩展操作符既可以用于调用函数时传参，也可以用于定义函数参数。
 */

/*
    扩展参数：对可迭代对象应用扩展操作符，并将其作为一个参数传入，可以将可迭代一些拆分，并将迭代返回的每个值单独传入
    1. 在使用扩展操作符传参，不影响传参数
    2. arguments 对象只是消费扩展操作符的一种方式，它根本不知道扩展操作符的存在，会按照传入的参数接收每个值
 */
let numbers = [1, 2, 3, 4, 5];
function getSum(){
    return Array.from(arguments).reduce( (prev, curv, index, array) => prev + curv );
}
console.log(getSum(...numbers)); // 15
console.log(getSum(1, ...numbers));// 16
console.log(getSum(...numbers, -5));// 10
console.log(getSum(...numbers, ...[1,2,3]));//21

let getProduct = (a, b, c = 1) => a * b * c;
console.log(getProduct(...numbers));//6
console.log(getProduct(...[2, 3]));//6

/*
    收集参数：在构思函数定义时，使用扩展操作符把不同长度的独立参数组合为一个数组
    1. 收集参数的前面如果还有命名参数，则只会收集其余参数，如果没有则会得到空数组
    2. 不影响 arguments 它仍然反映调用时传递的参数
 */
function getSum(...values) {
    return values.reduce( (x, y) => x + y, 0 );
}
console.log(getSum(1, 2, 3));//6