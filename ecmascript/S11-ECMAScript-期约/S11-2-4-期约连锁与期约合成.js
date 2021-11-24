/*
    11.2.4 期约连锁与期约合成
    多个期约组合在一起可以构成强大的代码逻辑。这种组合可以通过两种方式实现：期约连锁与期约合成。
    前者就是一个期约接着一个期约地拼接，后者则是将多个期约组合为一个期约。
 */
/*
    1. 期约连锁
 */
let p1 = new Promise( ( resolve, reject ) => {
    console.log(`p1 executor`);
    setTimeout(resolve('1'), 1000);
} );
p1.then( (value) => {
    console.log(`p2 executor, pre value ${value}`);
    let p = new Promise( (resolve, reject) => {
        setTimeout(resolve('2'), 1000);
    } )
    return p;
} )
.then( (value) => {
    console.log(`p3 executor, pre value ${value}`);
    let p = new Promise( (resolve, reject) => {
        setTimeout(resolve('3'), 1000);
    } )
    return p;
} )
.then( (value) => {
    console.log(`p4 executor, pre value ${value}`);
    let p = new Promise( (resolve, reject) => {
        setTimeout(resolve('4'), 1000);
    } )
    return p;
} );
// p1 executor
// p2 executor, pre value 1 
// p3 executor, pre value 2
// p4 executor, pre value 3

/*
    2. 期约图
    期约的处理程序是先添加到消息队列，然后诸葛执行，因此构成了顺序遍历
        A
    B       C
   D E     F G
 */
let A = new Promise( (resolve, reject) => {
    console.log('A');
    resolve('A');
} );
let B = A.then(() => console.log('B'));
let C = A.then(() => console.log('C'));

B.then( () => console.log('D'));
B.then( () => console.log('E'));
C.then( () => console.log('F'));
C.then( () => console.log('G'));

// A debugger eval code:2:13
// B debugger eval code:5:30
// C debugger eval code:6:30
// D debugger eval code:8:23
// E debugger eval code:9:23
// F debugger eval code:10:23
// G


/*
    3.Promise.all() 和 Promise.race()
    两个函数都是将多个期约实例组合成一个期约的静态方法，而合成后的期约取决于内部期约的行为。
 */
/*
    Promise.all()
    静态方法创建的期约会在一组期约全部解决之后在解决。
    该方法接收一个可迭代对象，返回一个新的期约实例
 */
let p1 = Promise.all([ Promise.resolve('a'), Promise.resolve('b') ]);
console.log(p1);

//可迭代对象中的元素通过 Promise.resolve() 转换为期约
let p2 = Promise.all([3, 4]);

//空的可迭代对象等价于 Promise.resolve
let p3 = Promise.all([]);

//必须要有可迭代对象, 这是个无效的语法
let p4 = Promise.all();

//合成期约只会在每个期约解决后解决
let p5 = Promise.all([ Promise.resolve(1) ]);
setTimeout(console.log, 0, p5);//Promise { <state>: "fulfilled", <value>: (1) […] }

//合成期约中有一个等待，则合成期约等待
let p6 = Promise.all( [ Promise.resolve(1), new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);// 1000 毫秒以后落定通过
}), Promise.resolve('3') ] );
setTimeout(console.log, 0, p6);//Promise { <state>: "pending" }
setTimeout(console.log, 1200, p6);//Promise { <state>: "fulfilled", <value>: Array(3) [ 1, undefined, "3" ] }

//拒绝也一样，有一个拒绝则合成期约拒绝
let p7 = Promise.all( [ Promise.resolve(1), new Promise((resolve, reject) => {
    setTimeout(reject, 1000);// 1000 毫秒以后落定状态
}), Promise.resolve('3') ] );
setTimeout(console.log, 0, p7);//Promise { <state>: "pending" }
setTimeout(console.log, 1200, p7);//Promise { <state>: "rejected", <reason>: undefined }

//合成期约的值是一个数组，包含所有解决的期约返回值
let p8 = Promise.all([ Promise.resolve('a'), Promise.resolve('b') ]);
p8.then( value => console.log(value) );//Array [ "a", "b" ]

//被拒绝的期约第一个的理由会被当作合成期约拒绝的理由（之后再拒绝不会覆盖）
//不影响期约拒绝后的处理(then, catch)
let p9 = Promise.all( [ Promise.resolve(1), new Promise((resolve, reject) => {
    setTimeout(reject('error'), 1000);// 1000 毫秒以后落定状态
}), Promise.reject('3') ] );
setTimeout(console.log, 0, p9);//Promise { <state>: "pending" }
p9.catch(reason => console.log(reason));//error
setTimeout(console.log, 1200, p9);//Promise { <state>: "rejected", <reason>: "error" }


/*
    Promise.race() 静态方法返回一个包装期约
    是一组集合中最先解决或拒绝的期约镜像。这个方法接收一个数组，返回一个新期约
    基本上和 Promise.all 相同
    区别：race() 不会对解决或拒绝的期约区别对待，只要是落定的期约，第一个就会被包装其解决值或拒绝理由并返回新期约。
 */
let p1 = Promise.race([ Promise.resolve('a'), Promise.resolve('b') ]);
setTimeout(console.log, 0, p1);//Promise { <state>: "fulfilled", <value>: "a" }

//可迭代对象中的元素通过 Promise.resolve() 转换为期约
let p2 = Promise.race([3, 4]);
setTimeout(console.log, 0, p2);//Promise { <state>: "fulfilled", <value>: 3 }

//空的可迭代对象等价于新期约对象
let p3 = Promise.race([]);
setTimeout(console.log, 0, p3);//Promise { <state>: "pending" }

//必须要有可迭代对象, 这是个无效的语法
let p4 = Promise.race();

//不会对解决或拒绝的期约区别对待，只要是落定的期约，第一个就会被包装其解决值或拒绝理由并返回新期约。
let p5 = Promise.race([ Promise.resolve(1), Promise.reject('error') ]);
setTimeout(console.log, 0, p5);//Promise { <state>: "fulfilled", <value>: 1 }


let p6 = Promise.race( [ new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);// 1000 毫秒以后落定通过
}), Promise.resolve('3') ] );
setTimeout(console.log, 0, p6);//Promise { <state>: "fulfilled", <value>: "3" }
setTimeout(console.log, 1200, p6);//Promise { <state>: "fulfilled", <value>: "3" }

let p7 = Promise.race( [ Promise.reject(1), Promise.resolve('3') ] );
setTimeout(console.log, 0, p7);//Promise { <state>: "rejected", <reason>: 1 }


/*
    4. 串行期约合成
    基于后续期约使用之前期约的返回值来串联期约是基本功能，很像函数合成，即多个函数合成一个函数
 */
let addTwo = (x) => x + 2;
let addThree = x => x + 3;
let addFive = x => x + 5;

//函数合成
let addTen = x => addTwo(addThree(addFive(x)));
console.log(addTen(10));// 20

//类似的，期约也可以像这样合成起来，渐进地消费一个值，并返回一个结果
let promiseAddTen = x => Promise.resolve(x).then(addTwo).then(addThree).then(addFive);
promiseAddTen(10).then(console.log);//20

//使用 Array.reduce 更简单
let promiseAddTenReduce = x => [addTwo, addThree, addFive].reduce( (promise, fn) => promise.then(fn), Promise.resolve(x) );
promiseAddTenReduce(10).then(console.log);// 20

// 通用的串行期约合成
let compose = (...fns) => { 
    return x => fns.reduce( (promise, fn) => promise.then(fn), Promise.resolve(x) );
};
let addTenCompose = compose(addTwo, addThree, addFive);
addTenCompose(10).then(console.log);//20