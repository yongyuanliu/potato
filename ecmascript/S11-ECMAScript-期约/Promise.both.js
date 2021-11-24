const both = async (...promises) => {
    try{
        let values = new Array();
        for(const p of promises){
            values.push( await p );
        }
        console.log(values.length, values);
        return Promise.resolve(values);
    }catch(e){
        console.log("x");
        return Promise.reject(e);
    }
}

let x = both(Promise.resolve(1), Promise.resolve(2), Promise.resolve(5));
x.then(result => console.log(`resolve, ${result}`) ).catch(e => console.log(e));

let x1 = both(Promise.resolve(1), Promise.reject(2), Promise.resolve(5));
x1.then(result => console.log(`resolve, ${result}`) ).catch(e => console.log(e));

let x2 = both(Promise.resolve(1), new Promise( (resolve, reject) => {} ), Promise.resolve(5));
x.then(result => console.log(`resolve, ${result}`) ).catch(e => console.log(e));
console.log(`x is race`,x);

const both = (...promises) => {
    return new Promise( (resolve, reject) => {
        let idx = 0;
        let array = new Array();
        promises.forEach( promise => {
            console.log(promise);
            promise.then( value => {
                array[idx] = value;
                if( ++idx === promises.length){
                    resolve(array);
                }
            } ).catch( reason => { 
                console.log('xx');
                reject(reason) 
                array[idx] = reason;
                array.forEach( (item, index) => {
                    if(!item){
                        promises[item];
                    }
                } );
            } )
        } );
    } )
}
let x = both(Promise.resolve(1), Promise.resolve(2), Promise.resolve(5));
x.then(result => console.log(`resolve, ${result}`) ).catch(e => console.log(e));

let x1 = both(Promise.resolve(1), Promise.reject(2), Promise.resolve(5));
x1.then(result => console.log(`resolve, ${result}`) ).catch(e => console.log(e));

let x2 = both(Promise.resolve(1), new Promise( (resolve, reject) => {} ),new Promise( (resolve, reject) => {} ), Promise.resolve(5));
x2.then(result => console.log(`resolve, ${result}`) ).catch(e => console.log(e));
console.log(`x is race`,x2);

Promise.all( [ Promise.resolve(1).then(console.log).then( () => '1 and then'),
     Promise.reject(2), 
     Promise.resolve('x').then(console.log).then( () => 3)  ] ).then(console.log).catch(console.log);
    
let both = function (...promises){
    return new Promise( (resolve, reject) => {
        let array = new Array();
        for(const p of promises){
            p.then(value => {
                //入队
                array.push(value);
                //所有值均获取到了
                if(Object.is(array.length, promises.length)){
                    resolve(array);
                }
            })
             .catch(reason => reject(reason));
        }
    } );
}
let x = both(Promise.resolve(1), Promise.resolve(2), Promise.resolve(5));
x.then(result => console.log(`resolve, ${result}`) ).catch(e => console.log(`error`, e));