/*
  S26.4.5 模块导入
  模块可以通过使用 import 关键字使用其他模块导出的值
  与 export 类似，import 必须出现在模块顶级
 */
import { A, a } from './S26-4-4-模块导出'; //允许
if(true){
  import { b } from './S26-4-4-模块导出'; //错误
}

/*
  import 语法被提升到模块顶部，因此与 export 关键字类似 import 语句与使用导入值的语句的相对位置并不重要
 */
//先使用再 import
console.log(a);
import { a } from './S26-4-4-模块导出';

/*
  模块标识符必须是纯字符串，不能是动态计算的结果，如果在浏览器中通过标识符原生加载模块，文件必须是 .js 扩展名
  通过第三方打包解析的 ES6 模块，可能不需要包含文件扩展名
 */
import { foo } from './S26-4-4-模块导出.js'; //浏览器必须要 .js
import { bar } from './S26-4-4-模块导出';// 第三方打包解析的 ES6 模块，可能不需要

// 只想加载模块，利用其副作用
import './S26-4-4-模块导出.js';

/*
  导入对模块而言是只读对，不能修改模块地址，只能修改模块对公共属性(特权属性)
 */
import foo, * as Foo from './S26-4-4-模块导出.js';
foo = 'foo'; //错误
Foo.foo = 'foo';//错误
foo.bar = 'bar'; //正确

/*
  使用 * 符号批量获取并赋值给保存导出集合对别名。
 */
export const foo = 'foo', bar = 'bar'; //foo.js
import * as Foo from './foo.js'; 
Foo.bar;//bar
Foo.foo;//foo

/*
  在导出时 默认导出就好像整个模块就是导入值一样，可以使用 default 关键字
  并提供别名来导入，也可以不实用大括号此时指定对标识符就是默认导出对别名。
 */
import { default as Foo } from './foo.js';
import Foo from './foo.js';

/*
  在导出时如果模块同时导出了命名导出和默认导出，则可以在 import 语句中同时取得它们。
  可以依次列出特定对导出对标识符也可以使用 * 来取得。
 */
import foo, {bar, baz} from './foo.js';
import foo, * as Foo from './foo.js';
import {default as foo, bar, baz} from './foo.js';