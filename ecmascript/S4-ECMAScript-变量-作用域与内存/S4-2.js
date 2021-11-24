/**
 * S4-2
 * JavaScript 中的执行上下文与作用域
 */

/**
 * 1. 执行上下文，作用域
 *  执行上下文和作用域不是同一个概念
 *  作用域致命了函数，参数的使用范围，并且允许访问上级作用域中的参数和函数
 * window
 *  n1 = blue
 *  changeColor(x){
 *      n1 = red
 *  }
 */
function changeColor(params) {
    
    let pid = 10;
    changePid(params);

    function changePid(params) {
        pid = params;
        console.log(pid);
    }

    params = 'red';
    console.log(params);
}
let n1 = 'blue';
changeColor(n1);
console.log(n1);


/**
 * 2. 作用域链增强
 * 虽然执行上下文主要有全局上下文和函数上下文两种，但是通过下面方式可以在作用域链前端临时添加一个上下文，这个上下文在代码执行后删除
 *  try-catch-finally 的 catch 语句块
 *  with 语句
 */
try{

}catch(e){
    
}finally{

}

function buildUrl() {
    let qs = "?debug=true";
    with(location){
        let url = href +qs;
    }
    return url;
}


/**
 * 3. 变量声明
 * let, var, const
 * 优先使用 let, const
 */