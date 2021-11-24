/*
    S11.3.3 异步函数策略
 */

/*
    1. 实现 sleep
    在程序中非阻塞的暂停，该需求基本上都通过 setTimeout 利用 JavaScript 运行时的行为实现。
 */
async function sleep(delay){
    return new Promise( (resolve, reject) => setTimeout(resolve, delay) );
}

async function foo(){
    console.log(Date.now());
    await sleep(1500);
    console.log(Date.now());
}

foo();

/* 
    2. 利用平行执行
    如果使用 await 时不留心，则很有可能错误平行加速的机会。
 */
async function randomDelay(id){
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout( () => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}
async function foo(){
    const t0 = Date.now();
    await randomDelay(0);
    await randomDelay(1);
    await randomDelay(2);
    await randomDelay(3);
    await randomDelay(4);
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 0 finished debugger eval code:4:17
// 1 finished debugger eval code:4:17
// 2 finished debugger eval code:4:17
// 3 finished debugger eval code:4:17
// 4 finished debugger eval code:4:17
// 2691ms elapsed


async function randomDelay(id){
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout( () => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}
/*
    foo 循环重写
 */
async function foo(){
    const t0 = Date.now();
    for(let i = 0; i < 5; i++){
        await randomDelay(i);
    }
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 0 finished debugger eval code:4:17
// 1 finished debugger eval code:4:17
// 2 finished debugger eval code:4:17
// 3 finished debugger eval code:4:17
// 4 finished debugger eval code:4:17
// 2067ms elapsed

async function randomDelay(id){
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout( () => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}
/*
    一次性执行所有异步函数，再 await 值，保证值顺序就行。
 */
async function foo(){
    const t0 = Date.now();
    let x0 = randomDelay(0);
    let x1 = randomDelay(1);
    let x2 = randomDelay(2);
    let x3 = randomDelay(3);
    let x4 = randomDelay(4);

    await x0;
    await x1;
    await x2;
    await x3;
    await x4;
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();

// 0 finished debugger eval code:4:17
// 1 finished debugger eval code:4:17
// 3 finished debugger eval code:4:17
// 4 finished debugger eval code:4:17
// 2 finished debugger eval code:4:17
// 821ms elapsed debugger eval code:24:13

async function randomDelay(id){
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout( () => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}
/*
    一次性执行所有异步函数，再 await 值，保证值顺序就行。
    使用数组和 for 循环包装
 */
async function foo(){
    const t0 = Date.now();
    let delays = Array(5).fill(null).map((v, i) => randomDelay(i));
    for(const x of delays){
        await x;
    }
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 0 finished debugger eval code:4:17
// 2 finished debugger eval code:4:17
// 1 finished debugger eval code:4:17
// 3 finished debugger eval code:4:17
// 4 finished debugger eval code:4:17
// 702ms elapsed

async function randomDelay(id){
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout( () => {
        console.log(`${id} finished`);
        resolve(id);
    }, delay));
}
/*
    尽管异步函数执行顺序不能保证，但是 await 的值是有序的
 */
async function foo(){
    const t0 = Date.now();
    let delays = Array(5).fill(null).map((v, i) => randomDelay(i));
    for(const x of delays){
        console.log(`awaited ${await x}`);
    }
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();

// 4 finished debugger eval code:4:17
// 2 finished debugger eval code:4:17
// 3 finished debugger eval code:4:17
// 1 finished debugger eval code:4:17
// 0 finished debugger eval code:4:17
// awaited 0 debugger eval code:16:17
// awaited 1 debugger eval code:16:17
// awaited 2 debugger eval code:16:17
// awaited 3 debugger eval code:16:17
// awaited 4 debugger eval code:16:17
// 587ms elapsed debugger eval code:18:13

/*
    3. 串行执行期约
 */
let addTwo = x => x + 2;
let addThree = x => x + 3;
let addFive = x => x + 5;

async function addTen(x){
    for(const fn of [addTwo, addThree, addFive]){
        x = await fn(x);
    }
    return x;
}

addTen(10).then(console.log); // 20

/*
    4. 栈追踪与内存管理
    期约与异步函数的功能有相当于程度的重叠，但它们在内存中的表示则差别很大。
 */
function fooPromiseExecutor(resolve, reject) {
    setTimeout(reject, 1000, 'bar');
}

function foo(){
    new Promise(fooPromiseExecutor);
}

foo();

//Uncaught (in promise) bar 不清晰的调试信息


function fooPromiseExecutor(resolve, reject) {
    setTimeout(reject, 1000, 'bar');
}

//使用异步函数时，调试更清晰s
async function foo(){
   await new Promise(fooPromiseExecutor);
}

foo();

// Uncaught (in promise) bar debugger eval code:6:10
// foo debugger eval code:6
// AsyncFunctionThrow self-hosted:694
// (Async: async)
{/* <anonymous> debugger eval code:9 */}
// getEvalResult resource://devtools/server/actors/webconsole/eval-with-debugger.js:243
// evalWithDebugger resource://devtools/server/actors/webconsole/eval-with-debugger.js:167
// evaluateJS resource://devtools/server/actors/webconsole.js:1120
// evaluateJSAsync resource://devtools/server/actors/webconsole.js:1012
// makeInfallible resource://devtools/shared/ThreadSafeDevToolsUtils.js:103
