/*
    S11.3.2 停止和恢复执行
    使用 await 关键字之后的区别其实闭看上去的还要更微妙一些。
 */
async function foo() {
    console.log(await Promise.resolve('foo'));
}

async function bar(params) {
    console.log(await 'bar');
}

async function baz(params) {
    console.log('baz');
}

foo();
bar();
baz();

//baz
//foo
//bar

/*
    async/await 中真正起作用的是await。async关键字，无论从哪一方面来看，都不过是一个标识符。
    毕竟，异步函数如果不包含 await 关键字，其执行基本上跟普通函数没什么区别
 */
async function foo(params) {
    console.log(2);
}
console.log(1);
foo();
console.log(3);

// 1
// 2
// 3

/*
    JavaScript 运行时在碰到 await 关键字时，会记录在哪里暂停执行。
    等到 await 右边的值可用了，JavaScript 运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。
    因此，即使 await 后面跟着一个立即可用的值，函数的其余部分也会被异步求求值。
 */
async function foo(){
    console.log(2);
    await null;
    console.log(4);
}
console.log(1);
foo();
console.log(3);

// 1
// 2
// 3
// 4
/*
    控制台中输出结果的顺序很好地解释了运行时的工作过程：
    1, 打印1 
    2，调用异步函数 foo()
    3，在 foo() 中打印2
    4，在 foo 函数 await 关键字暂停执行，为立即可用的值 null 向消息队列中添加一个任务
    5，foo 函数退出
    6，打印 3
    7，同步线程代码执行完毕
    8，JavaScript 运行时从消息队列中取出任务，恢复异步函数执行
    9，foo 恢复执行，await 取得 null 值
    10，foo 打印4
    11，foo 返回
 */

async function foo(){
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
}
async function bar(){
    console.log(4);
    console.log(await 6);
    console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
// 1
// 2
// 3
// 4
// 5
// 8
// 9
// 6
// 7
/*
    1，打印 1
    2，执行异步函数 foo
    3，foo 中打印 2
    4，foo 函数 await 关键字暂停执行，向消息队列中添加一个期约在落定之后执行的任务
    5，foo 函数退出
    6，打印 3
    7，执行异步函数 bar
    9，bar 中打印 4
    10，bar 函数 await 关键字暂停执行，为立即可用的值 6 向消息队列中添加一个任务
    11，bar 函数退出
    12，打印 5
    13，同步代码执行完成
    14，JavaScript 运行时从消息队列中取出任务，恢复任务
    15，foo 恢复执行，await 取得 期约落定后的值 8
    16，foo 中打印 8
    17，foo 中打印 9
    18，bar 恢复执行，await 取得立即可用值 6
    19，bar 中打印 6
    20，bar 中打印 7
    21，bar 返回
 */