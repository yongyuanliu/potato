/*
    11.2.3 期约的实例方法
 */
/*
    2. Promise.prototype.then
    then 函数接收两个参数，onResolved 和 onRejected 处理程序。
    这两个参数都是可选的，都提供的话，会在期约状态分别进入“兑现”或“拒绝”状态时执行。

    如果传入的参数不是函数则会被忽略
 */
let onResolved = function(id){
    setTimeout(console.log, 0, `${id} resolved`);
}

let onRejected = function(id){
    setTimeout(console.log, 0, `${id} rejected`);
}

let p1 = new Promise( (resolve, reject) => setTimeout(resolve, 1000) );
let p2 = new Promise( (resolve, reject) => setTimeout(reject, 1000) );
//p1,p2 处理 fulfilled 以及 rejected 示例
p1.then( value => onResolved(`p1`), reason => onRejected(`p1`) );
p2.then( value => onResolved(`p2`), reason => onRejected(`p2`) );

//非函数参数，会被忽略
p1.then(3).then(4);

//不传 onResolved 处理程序的规范写法
p2.then( null, reason => onRejected(reason));


// 期约 与 期约.protoype.then 返回的期约不是同一个实例
let p1 = new Promise( () => {} );
let p2 = p1.then();
setTimeout(console.log, 0, p1);//Promise { <state>: "pending" }
setTimeout(console.log, 0, p2);//Promise { <state>: "pending" }
setTimeout(console.log, 0, Object.is(p1, p2));//false

let p1 = Promise.resolve('foo');
//若调用 then() 时不传处理程序，则原样往后传
let p2 = p1.then();
setTimeout(console.log, 0, p2);//Promise { <state>: "fulfilled", <value>: "foo" }

let p3 = p1.then().then();
setTimeout(console.log, 0, p3);//Promise { <state>: "fulfilled", <value>: "foo" }

//在 then() 中处理了程序
let p4 = p1.then( value => { 
    console.log(value);
    return '3';
} );//Promise { <state>: "fulfilled", <value>: "3" }

let p5 = p1.then( value => {
    console.log(value);
} );//Promise { <state>: "fulfilled", <value>: undefined }

let p6 = p1.then( () => {} );//Promise { <state>: "fulfilled", <value>: undefined }
let p7 = p1.then( () => undefined );//Promise { <state>: "fulfilled", <value>: undefined }
let p8 = p1.then( () => Promise.resolve() );//Promise { <state>: "fulfilled", <value>: undefined }
setTimeout(console.log, 0, p4, p5, p6, p7, p8);

//拥有返回值的 then 处理程序员
let p1 = Promise.resolve('foo');
let p6 = p1.then( (v) => { 
    console.log(v); //foo
    return 'bar'; 
} );
let p7 = p1.then( () => Promise.resolve('bar') );
setTimeout(console.log, 0, p6);//Promise { <state>: "fulfilled", <value>: "bar" }
setTimeout(console.log, 0, p7);//Promise { <state>: "fulfilled", <value>: "bar" }

// Promise.resolve 保留返回的期约
let p8 = p1.then( () => new Promise(() => {}));
let p9 = p1.then( () => Promise.reject());
setTimeout(console.log, 0, p8);// Promise { <state>: "pending" }
setTimeout(console.log, 0, p9);// Promise { <state>: "rejected", <reason>: undefined }

// 抛出异常会返回拒绝的期约
let p10 = p1.then( () => { throw 'baz'; } );
setTimeout(console.log, 0, p10);//Promise { <state>: "rejected", <reason>: "baz" }

let p11 = p1.then( () => Error('x123') );
setTimeout(console.log, 0, p11);//Promise { <state>: "fulfilled", <value>: Error }

/*
    3.Promise.prototype.catch
    该函数用于处理期约拒绝程序，只接收一个参数 onRejecte 的处理程序。
    该方法是一个语法糖义 相当于 Promise.prototype.then(null, reason => {xxx}) 一样。
 */
Promise.reject('error').catch(reason => console.log(reason));

/*
    4. Promise.prototype.finally
 */
let p1 = Promise.resolve();
let p2 = Promise.reject();
let onFinally = function(id){
    setTimeout(console.log, 0, `${id} Finally`);
}
//finally 处理程序
p1.finally( () => onFinally('p1') );
p2.catch(reason => console.log(reason)).finally( () => onFinally('p2') );


let p1 = Promise.resolve('foo');

//finally 返回的期约实例与 then 和 catch 不同，该期约实例普通情况下返回父样期约
let p2 = p1.finally();
let p3 = p1.finally( () => undefined );
let p4 = p1.finally( () => {} );
let p5 = p1.finally( () => Promise.resolve());
let p6 = p1.finally( () => Promise.resolve('bar') );
let p7 = p1.finally( () => 'bar');
let p8 = p1.finally( () => Error('qux') );

setTimeout(console.log, 0, p2);//Promise { <state>: "fulfilled", <value>: "foo" }
setTimeout(console.log, 0, p3);//Promise { <state>: "fulfilled", <value>: "foo" }
setTimeout(console.log, 0, p4);//Promise { <state>: "fulfilled", <value>: "foo" }
setTimeout(console.log, 0, p5);//Promise { <state>: "fulfilled", <value>: "foo" }
setTimeout(console.log, 0, p6);//Promise { <state>: "fulfilled", <value>: "foo" }
setTimeout(console.log, 0, p7);//Promise { <state>: "fulfilled", <value>: "foo" }
setTimeout(console.log, 0, p8);//Promise { <state>: "fulfilled", <value>: "foo" }

//如果返回一个 pending 或 rejected 期约，则会更改返回的期约
let p9 = p1.finally( () => new Promise( () => {} ) );
let p10 = p1.finally( () => Promise.reject('ox') );
let p11 = p1.finally( () => { throw 'ox2' } );
setTimeout(console.log, 0, p9);//Promise { <state>: "rejected", <reason>: "ox" }
setTimeout(console.log, 0, p10);//Promise { <state>: "rejected", <reason>: "ox" }
setTimeout(console.log, 0, p11);//Promise { <state>: "rejected", <reason>: "ox" }

let p1 = Promise.resolve('p1');
p1.finally( () => new Promise( (resolve, reject) => setTimeout( () => resolve('a new promise'), 100) ) );
setTimeout(console.log, 0, p1);
setTimeout( () => setTimeout(console.log, 0, p1) , 200);

/*
    5. 非重入
    non-reentrancy
    当期约进入落定状态时，与该状态相关当处理程序仅仅会被排期，而非立即执行。
    跟在添加这个处理程序之后当代码一定会在处理程序之前执行。即使期约一开始就是与附加处理程序关联的状态，执行顺序也是这样的。

    这个特性由 JavaScript 运行时包装，被称为 “非重入”(non-reentrancy) 特性
 */
let synchrousResolve;
let p = new Promise( (resolve, reject) => {
    //创建期约实例，运行执行器
    //输出 1
    console.log('1');
    //为变量赋值一个函数，在该函数内，落定期约状态为 fulfilled
    synchrousResolve = function(){
        resolve();
    }
    //输出2
    console.log('2');
} );
synchrousResolve(); //执行函数
p.then( () => console.log('3'));// 落定状态后 then 方法排期，之后被执行时才输出 3
console.log(4);// 执行上面的 synchrousResolve 方法后直接输出 4
// 1
// 2
// 4
// 3

let p1 = Promise.resolve();
p1.then( value => console.log(`p1.then() onResolved`) );
console.log(`p1.then() returns`);

let p2 = Promise.reject();
p2.then( null, () => console.log(`p2.then() onRejected`) );
console.log(`p2.then() returns`);

let p3 = Promise.reject();
p3.then(null, ()=> console.log(`p3.then() onRejected`));
console.log(`p3.then() returns`);

let p4 = Promise.resolve();
p4.then(value => console.log(`p4.then() onResolved`));
console.log(`p4.then() returns`);

// p1.then() returns debugger eval code:3:9
// p2.then() returns debugger eval code:7:9
// p3.then() returns debugger eval code:11:9
// p4.then() returns debugger eval code:15:9
// p1.then() onResolved debugger eval code:2:27
// p2.then() onRejected debugger eval code:6:30
// p3.then() onRejected debugger eval code:10:28
// p4.then() onResolved debugger eval code:14:26

/*
    6. 邻近处理程序的执行顺序
    如果给期约添加了多个处理程序，期约状态变化后，相关处理程序会按照添加它们的顺序一次执行。
    无论是 then、catch、finally 都一样
 */
let p = Promise.resolve('foo');
p.then( value => {
    console.log(value);
    return 'bar';
})
.then( value => {
    console.log(value);
    return 'baz';
}).finally( () => {
    console.log(`is finally`, p);
});
// foo debugger eval code:3:13
// bar debugger eval code:7:13
// is finally 
// Promise { <state>: "fulfilled", <value>: "foo" }

/*
    7. 传递值 和 拒绝理由
 */
// 1. 在期约中执行函数 resolve（值）或 reject（理由）
new Promise( (resolve, reject) => resolve('value') );
new Promise( (resolve, reject) => reject('reason') );

// 2. 在 then 中设置对应的处理程序
new Promise( (resolve, reject) => resolve('value') )
    .then( value => console.log(value));
new Promise( (resolve, reject) => reject('reason') )
    .then( null, reason => console.log(reason));

// 3. Promise.resolve，Promise.reject函数
Promise.resolve('value');
Promise.reject('reason');

/*
    8. 拒绝期约与拒绝错误处理
 */
new Promise( (resolve, reject) => reject('reason') );
new Promise( (resolve, reject) => { throw 'x' } )
Promise.reject('reason');
Promise.resolve('value').then( (value) => { throw value; })

//拒绝期约处理程序，由能处理 onRejected 参数的函数来完成（一般是then，或者 catch）
Promise.reject('reason').then( null, reason => console.log(reason) );
Promise.reject('reason').catch( reason => console.log(reason));