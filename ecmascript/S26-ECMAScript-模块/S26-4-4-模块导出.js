/*
  S26.4.4 模块导出
  ES6 模块的公共导出系统与 CommonJs 相似，控制模块的哪些不发对外部科技对是 export 关键字
  ES6模块支持两种导出：命名导出和默认导出，不同的导出对于不同的导入方式。
  
  export 关键字用于声明一个值为命名导出，导出语句必须在模块顶级，不能嵌套在某个块中
 */
export const foo = 'foo';//可以
if(true){
  export const bar = 'bar';//不行
}

/*
  导出值对模块内部 JavaScript 的执行没有直接影响，因此 export 语句与导出值的相对位置
  或者 export 关键字在模块出现顺序没有限制，export 甚至可以在它要导出的值之前
*/
// 正常导出
const foo = 'foo';
export { foo };

// 与位置没有关系，先 export 导出后面声明的变量是可以的
export { bar };
const bar = 'bar';

/*
  命名导出（named export）就好像模块是被导出值的容器行内命名导出，顾名思义，可以在同一行内执行变量声明
 */
export const foo = 'foo';

// export 子句中执行声明并将标识符导出到模块的其他地方
const foo = 'foo';
export { foo }; // export { } 大括号就是子句

/*
  导出是可以提供别名，别名必须在 export 子句的大括号语法中指定，因此，声明值，导出值和为导出值提供别名不能在一行完成。
 */
const foo = 'foo';
export { foo as myFoo };// myFoo 就是 foo 的别名

/*
  ES6 命名导出可以将模块作为容器，所以可以在一个模块中声明多个命名导出
  导出的值可以在导出语句中声明，也可以在导出之前声明
 */
export const foo = 'foo';
export const bar = 'bar';

// 先声明再导出
const foo = 'foo', bar = 'bar';
export { foo, bar };

/*
  ES6 模块也支持对导出声明分组，可以同时为部分或全部导出值指定别名
 */
export { foo, foo as qux, bar };

/*
  默认导出（default export）就好像模块与被导出的值是一回事，默认导出使用 default 关键字将一个值声明为默认导出
  每个模块只能有一个默认导出，重复的默认导出会导致 syntax error
 */
export default foo;

/*
  ES6 模块系统会识别作为别名提供的 default 关键字。
  此时虽然使用命名语法导出，但会是作为默认导出
 */
export {foo as default};

/*
  命名导出与默认导出不会出现冲突，所以可以在一个模块中同时定义这两种导出
 */
export { foo, bar as default, qux as baz };

/*
  ES6 规范对不同形式对 export 语句中可以使用什么，可以不使用什么规定了限制。
 */
// 错误的导出语法
export const foo = 'foo' as myFoo; //不能在命名行内导出时提供别名
export { 123 as key }; //export 子句中只能是标识符
export default const foo = 'foo'; //不能在命名行内导出时使用默认导出

// 正确的语法
// 命名行内导出
export const baz ='baz', foo = 'foo';
export function foo(){}
export function* foo(){}
export class A{}

// 命名子句导出
export { a };
export { a , b };
export { a as B};

// 默认导出
export default 'foo';
export default {foo: 'foo'};
export { foo as default };
export default foo;
export default function(){}
export default function* f(){}
export default class {};
export default class A{};