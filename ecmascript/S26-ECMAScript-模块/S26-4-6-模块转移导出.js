/*
  导出所有 foo.js 的模块
 */
export * from './foo.js';

/*
  静默重写
 */
export const foo = 'foo'; //foo.js

export * from './foo.js'; //bar.js
export const foo = 'origin:bar'; //bar.js

import bar from './bar.js';//baz.js
bar.foo; //origin:bar

/*
  通过别名明确列出要从外部模块转移到本地导出的值
 */
export { foo, bar as myBar } from 'foo.js';

/*
  外部模块的默认导出可以重用为当前模块的默认导出
 */
export { default } from './foo.js';

/*
  命名导出为默认导出
 */
export { foo as default } from './foo.js';