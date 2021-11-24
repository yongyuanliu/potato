
/*
    11.1.2 以往的异步编程模式
 */
/*
    一个简单对异步函数
    直接对异步结果作处理
 */
function double(value){
    //生成异步任务
    setTimeout( () => console.log(value * 2), 1000 );

    //上面的异步逻辑不阻塞当前任务
    console.log(`double used`);
}
double(2);

/*
    11.1.2.1 异步返回值
    指定回调函数，待异步任务求值后进行回调，把求值结果作为参数传递给指定对回调函数
 */
function double(value, callback) {
    setTimeout( () => {
        if(callback){
            callback(value * 2);
        }
    }, 1000 );
    console.log(`double used`);
}
double(2, (x) => console.log(x));

/*
    11.1.2.2 失败处理
    在一个异步任务执行过程中，往往需要对执行失败和执行完毕作两套逻辑处理，通过 try-catch 可以进行异常捕获控制流程
 */
function double(value, success, failure) {
    setTimeout( () => {
        try {
            success(value * 2);
        } catch (error) {
            failure(error);
        }
    }, 1000 );

    console.log(`double used`);
}
const successCallback = (x) => console.log(`Success Callback ${x}`);
const failureCallback = (x) => console.log(`double executor error`, x);
double(2, successCallback, failureCallback);

/*
    11.1.2.3 嵌套异步回调
    在对结果处理完成后，还需要再进行异步回调返回值处理。就产生了嵌套对异步回调
 */
function double(value, success, failure) {
    setTimeout( () => {
        try {
            success(value * 2);
        } catch (error) {
            failure(error);
        }
    }, 1000 );

    console.log(`double used`);
}
const successCallback = (x) => {
    //执行成功后打印返回值
    console.log(`Success Callback ${x}`);

    //再一次执行异步任务，并设置了回调函数，形成了嵌套对回调
    double(x, (y) => {
        console.log(`对值再次进行异步任务结束，值为 ${y}`);
    }, failureCallback);
};
const failureCallback = (x) => console.log(`double executor error`, x);
double(2, successCallback, failureCallback);