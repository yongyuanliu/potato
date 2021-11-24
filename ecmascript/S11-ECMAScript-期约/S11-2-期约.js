/*
    3. 
    通过 resolve, reject 更改期约状态
 */
let p1 = new Promise( (resolve, reject) => resolve());
setTimeout(console.log, 0, p1);

let p2 = new Promise( (resolve, reject) => reject() );
setTimeout(console.log, 0, p2);

let p3 = new Promise( (resolve, reject) => {
    setTimeout( () => {
        console.log(`fulfilled`);
        resolve(100);
    }, 1000);
} ).then( (v) => console.log(v) );
setTimeout(console.log, 0, p3);


let p4 = new Promise( (resolve, reject) => {
    setTimeout( () => {
        console.log(`fulfilled`, p4);
        resolve(100);
        reject();
    }, 1000);
} ).then( (v) => console.log(v) );
setTimeout(console.log, 0, p4);

/*
    4. Promise.resolve
    初始化一个期约，且设置期约状态为 fulfilled 的函数
 */
let x1 = Promise.resolve([1,2,3]).then( (...values) => console.log(values) );
console.log(x1);

/*
    5. Promise.reject
 */
let x2 = Promise.reject(3);
console.log(x2);
x2.then( 
    fulfilledValue => console.log(`success`,fulfilledValue), 
    rejectReason => console.log(`rejected`,rejectReason)  
);