/*
    11.2.5 期约扩展
    本章讲了基于期约的扩展，期约取消和进度追踪
 */

/*
    1. 期约取消
    ES6 期约被认为是：“激进的”：只要开始执行，就没有办法组织它执行到完成。

    实际上，可以在现有实现基础上提供一种临时性封装，以实现取消期约的功能。
 */
class CancelToken{
    constructor(cancelFn){
        this.promise = new Promise( (resolve, reject) => {
            cancelFn(resolve);
        });
    };
};

// 功能实现
<button id="start">Start</button>
<button id="cancel">Cancel</button>

const startButton = document.querySelector("#start");
const cancelButton = document.querySelector("#cancel");

function cancellableDelayedResolve(delay) {
    setTimeout(console.log, 0, 'set delay');

    return new Promise( (resolve, reject) => {
        const id = setTimeout( () => {
            setTimeout(console.log, 'delayed resolve');
            resolve();
        }, delay);
    })
}
const cancelToken = new CancelToken( (cancelCallback) => cancelButton.addEventListener('click', cancelCallback) );
cancelToken.promise.then( () => clearTimeout(id));
startButton.addEventListener('click', () => cancellableDelayedResolve(1000));

/*
    2. 期约进度通知
    期约进度通知的目的是，在执行中的期约可能会有不少离散的“阶段”，在最终解决之前必须依次经过。
    ES6 并不支持进度追踪
 */
class TrackablePromise extends Promise{
    constructor(executor){
        const notifyHandlers = [];
        super( (resolve, reject) => {
            return executor(resolve, reject, status => {
                notifyHandlers.map( (handler) => handler(status) );
            })
        } );

        this.notifyHandlers = notifyHandlers;
    }
    notify(notifyHandler){
        this.notifyHandlers.push(notifyHandler);
        return this;
    }
}

let p = new TrackablePromise( (resolve, reject, notify) => {
    function countDown(x) {
        if(x > 0){
            notify(`${20 * x}% remaining`);
            setTimeout( ()=> countDown(x - 1), 1000);
        }else{
            resolve();
        }
    }
    countDown(5);
} );
p.notify( x => setTimeout(console.log, 0, `progress: ${x}`));
p.then( () => setTimeout(console.log, 0, `completed`) );