/**
 * 内置对象
 * ECMA-262 对内置对象对定义是任何由 ECMAScript 实现提供与宿主环境无关，并在 ECMAScript 程序开始执行时就存在的对象
 */


/**
 * 1. Global
 * ECMAScript 规定 Global 对象是一个兜底对象，在全局作用域中定义的变量和函数，都是它的属性。
 */
/**
 * URL 编码方法
 */
let g1 = "https://some.com/github-project/ecma262/out/index.html#sec-array.of";
let g1encode = encodeURI(g1), g1encodeURIComponenet = encodeURIComponent(g1);
let g1decode = decodeURI(g1encode), g1decodeURIComponent = decodeURIComponent(g1encodeURIComponenet);
console.log(g1encode, g1decode);//https://some.com/github-project/ecma262/out/index.html#sec-array.of https://some.com/github-project/ecma262/out/index.html#sec-array.of
console.log(g1encodeURIComponenet, g1decodeURIComponent);//https%3A%2F%2Fsome.com%2Fgithub-project%2Fecma262%2Fout%2Findex.html%23sec-array.of https://some.com/github-project/ecma262/out/index.html#sec-array.of

/**
 * 2. eval
 * 完整的的 ECMAScript 的解释器
 */

/**
 * 3. Global 对象的属性
 * undefined, NaN, Infinity, Object, Array, Function
 * Boolean, String, Number, Date, RegExp, Symbol, Error
 * EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
 */

/**
 * 4. window 对象
 * ECMA 没有规定直接访问 Global 对象的方式
 * 浏览器将 window 对象实现为 Global 对象的代理，因此在全局变量中定义变量和函数都成了 window 的属性。
 */
let x1 = window.parseInt(10),
    x2 = window.parseFloat('20.20'),
    x3 = window.isNaN(x2),
    x4 = window.isFinite(x1);
console.log(x1, x2, x3, x4);