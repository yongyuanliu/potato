/*
    S11.3.1 异步函数
    异步函数，也称 async/await（语法关键字）是 ES6 期约模式在 ECMAScript 函数中的应用。
    async/await 是 ES8 新增的规范，让同步写的代码在异步执行。
    文中说如果使用 Promise 的值，必须把处理的代码塞在期约处理过程中，很不方便。
    就算把就代码提取成一个方法还是需要把函数放进期约处理顺序中。
    ES8 为此提供了 async/await 关键字
 */

/*
    1.async
    async 怎么使用，async 可以用在函数声明，函数表达式，箭头函数和方法中
 */
async function foo(){}
let bar = async function(){}
let baz = async () => {}
class Person{
    async qux(){}
}

/* 
    在异步函数中 使用了 return 关键字
    值会被 Promise.resolve 包装成一个期约对象，异步函数始终返回期约对象。
    在函数外部调用函数可以得到它返回的期约，也就是说使用了 async 关键字返回值是有格式的，该格式是一个期约实例
 */
async function foo(){
    return 'value';
}
foo().then(value => console.log(value));//value

let bar = async () => Promise.resolve('bar');
bar().then(v => console.log(v));//bar


/*
    异步函数可以接收一个实现了 thenable 接口的对象。
    该对象可以由提供给 then() 的处理程序解包，如果不是 thenable 接口对象返回值就被当作以及解决的期约
 */
//返回原始值
async function foo(){
    return 'foo';
}
foo().then(console.log);

// 返回一个数组
async function bar() {
    return ['bar'];
}
bar().then(console.log);

// 实现 thenable 接口并返回
async function baz(){
    const thenable = {
        then(callback){
            callback('baz');
        }
    }
    return thenable;
}
baz().then(console.log);

// 返回一个期约
async function qux() {
    return Promise.resolve('qux');
}
qux().then(console.log);

// 在异步函数中抛出错误会返回拒绝的期约，与期约处理程序一样，这是一种异常处理机制
async function foo(){
    console.log('1');
    throw Error('x');
}
foo().catch(e => console.log(e));

// 在异步函数中，拒绝期约的错误不会被异常捕获
async function foo(){
    console.log('1');
    Promise.reject('x');
    return 1;
}
foo().then(console.log);

// 返回拒绝期约，其 reason 需要被处理 
async function foo(){
    return Promise.reject('x');
}
foo().catch(console.log);

/*
    2. await 关键字
    await 关键字用于暂停异步函数的执行，等待期约解决
 */
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
p.then(console.log);

// 可以变成这样
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
let x = await p;
console.log(x);//等待 promise.resolve 的返回值
console.log(1);// 再输出 1 

// await resolve
async function foo() {
    console.log(await Promise.resolve('foo'));//foo
}
foo();

// 直接将 await 返回值 返回，该返回值会经过 Promise.resolve 包装
async function bar() {
    return await Promise.resolve('bar');
}
bar().then(console.log);//bar

// reject 会直接在函数中抛出异常，这样就能通过 try catch 捕获了
async function reject(){
    try{
        await Promise.reject('Error');
    }catch(e){
        console.log(e);
    }finally{
        console.log('3');
    }
    // let x = await Promise.reject('Error');
    // console.log(`3`, x); // 不会返回 reason
    // x.catch(console.log);// 不会输出
}
reject();

// await 一个引用值
async function bar(){
    console.log(await ['bar']);//Array [ "bar" ]
}
bar();

// await 一个实现了 thenable 接口的对象实例
async function baz(){
    const thenable = {
        then(callback) { callback('baz'); }
    }
    return await thenable;
}
baz().then(console.log);

//等待会抛出错误的同步操作，会返回拒绝的期约
async function foo(){
    console.log('3');
    await ( () => { throw Error('x') } );
}
foo().catch( e => console.log(e));// 3

// Promise.reject 不会被异常函数捕获，而是会抛出未捕获的异常。
async function foo(){
    console.log(1);
    try{
        await Promise.reject(3);
    }catch(e){
        console.log(3);
    }
    
    console.log(4);
}
foo();
console.log(2);

/*
    3. await 的限制
    await 必须出现在异步函数中使用
 */
async function foo(){
    return await 'foo';
}
foo().then(console.log);// foo

//也可以在 IIFE 中使用
(async function(){
    let x = await new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    console.log(x);// 3
})();

/*
    异步函数的特质不会扩展到嵌套函数中，因此 await 关键字也只能出现在异步函数定义中。
 */
// 不允许同步函数中出现
function foo() {
    let x = await 'foo';
    console.log(x);
}

// 嵌套函数不允许
async function foo(){
    let asyncFn = function(){
        let x = await 'foo';
        console.log(x);
    }
}
foo();

// 箭头函数不允许
async function foo(){
    const asyncFn = () => {
        let x = await 'foo';
        return x;
    }
    console.log(asyncFn());
}
foo();

function qux() {
    (function(){
        let x = await Promise.resolve('p');
        console.log(x);
    })();// no

    (() => {
        let x = await Promise.resolve('p');
        console.log(x);
    });// no

    (async () => {
        let x = await Promise.resolve('p');
        console.log(x);// p
    })(); // yes
}
qux();