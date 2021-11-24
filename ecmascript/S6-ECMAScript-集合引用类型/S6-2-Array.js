/**
 * Array
 * 能自动增长的有序的数组。
 */

/**
 * 1. 创建方式
 * new 操作符
 * 字面量
 * 
 * ES6新特性 from，of
 */
let x1 = new Array(); // new 操作符
let x2 = [];          // 字面量

//ES6 新API,转换数据为数组
let x3 = Array.from('Only');    // ['O', 'n', 'l', 'y']
const x3_map = new Map()
                        .set(1, 2)
                        .set(3, 4);
let x3_map_array = Array.from(x3_map);//[ [1, 2], [3, 4] ]
console.log(x3_map_array);

//ES6 新API
//把一组参数转换为数组，用于替代 ES6 以前的常用的 Array.prototype.slice.call(arguments)
let x4 = Array.of(1, 2, 3);//[1, 2, 3]

/**
 * 2. 数组空位
 * ES6 新特性，使用一串逗号来创建空位。ECMAScript 会将逗号之间相应所以位置的值当成空位。
 */
const m2 = [,,,,,]; //创建包含5个元素的数组
console.log(Array.of(...m2));//Array(5) [ undefined, undefined, undefined, undefined, undefined ]

/**
 * 3. 数组索引
 * 减少数组索引 length 属性将会导致元素被删除，增加 length 属性会新增槽位
 */
let m3 = ['red', 'blue', 'green'];
console.log(m3.length, m3);// 3, ['red', 'blue', 'green']

/**
 * 4. 数组检测
 */
let m4 = new Array();
let m4Object = new Object();
console.log(m4 instanceof Array, m4Object instanceof Array);//true false
console.log(Array.isArray(m4), Array.isArray(m4Object));// true false

/**
 * 5. 迭代器方法
 * keys()
 * values()
 * entries()
 */
const j5 = ['foo', 'bar', 'baz'];
const j5Keys = Array.from(j5.keys());
console.log(j5Keys);//Array(3) [ 0, 1, 2 ]
const j5Values = Array.from(j5.values());
console.log(j5Values);// Array(3) [ "foo", "bar", "baz" ]
const j5Entries = Array.from(j5.entries());
console.log(j5Entries);//[[0, 'foo], [1, 'bar'], [2, 'baz']]
for(const [idx, element] of j5.entries()){
    console.log(idx, element);//0 foo, 1 bar, 2 baz
}

/**
 * 6. 复制，填充方法
 * fill 复制数组内元素
 * copyWithin 填充数组内元素
 */
const z6 = [0, 0, 0];
z6.fill(5); //[5, 5, 5]
z6.fill(5, 1);//[0, 5, 5]
z6.fill(5, 1, 2);//[0, 5, 0]

// 从开始复制数据并从该下标开始填充
const z7 = [1, 2, 3, 4, 5];
z7.copyWithin(2);
console.log(z7);// Array(5) [ 1, 2, 1, 2, 3 ]

/**
 * 7. 数组转换
 * toString, toLocaleString, valueOf, join
 * 所有对象都有 toString，toLocaleString，valueOf 方法。
 * 调用数组的该方法，都将调用对象的对应方法，并以字符串形式返回。
 * 
 * toString，toLocaleString 都会使用逗号分割每项字符串
 * join 方法可以指定分割每项字符的字符串
 */
let k7 = ['red', 'blue', 'green'];
console.log(k7.valueOf());//Array(3) [ "red", "blue", "green" ]
console.log(k7.toString());//red,blue,green
console.log(k7.toLocaleString());//red,blue,green
console.log(k7.join('-'));//red-blue-green

/**
 * 8. 栈方法
 * 栈（LIFO，Last-In-First-Out）后进先出。 
 * 像操作栈一样操作数据，push 进数组，pop 弹出后一项
 */
let e1 = new Array();
e1.push('red', 'gree');
console.log(e1);//[red, green]
let e1Item = e1.pop(); //green
console.log(e1, e1Item);//[red] green

/**
 * 9. 队列方法
 * 队列（FIFO，First-In-First-Out）
 * 像操作队列一样操作数据，push 进数组，shift 弹出数组顶的元素
 */
let e2 = new Array();
e2.push('red', 'green');
console.log(e2);
let e2Item = e2.shift();
console.log(e2, e2Item); //['red','green'] red

/**
 * ECMAScript 还提供了 unshift 方法，用于在数组头部添加元素。
 * 通过 unshift 和 pop 可以在相反方向模拟队列
 */
let e3 = new Array();
e3.push('red');//[red]
e3.push('green');//[red, green]
e3.unshift('yellow');//[red, green, yellow]
let e3Item = e3.pop();
console.log(e3, e3Item);//Array [ "yellow", "red" ] green


/**
 * 10. 排序方法
 * reverse 反向数据
 * sort 指定排序顺序
 */
let f1 = [0, 1, 3, 5, 10, 100, 1998];
f1.reverse();
console.log(f1);//[ 1998, 100, 10, 5, 3, 1, 0 ]
f1.sort();
console.log(f1);//[ 0, 1, 10, 100, 1998, 3, 5 ]

function f1Compare(v1, v2) {
    if(v1 === v2){
        return 0;
    }
    return v1 > v2 ? 1 : -1;
}
f1.sort(f1Compare);
console.log(f1);//[ 0, 1, 3, 5, 10, 100, 1998 ]


/**
 * 11. 操作数组
 * concat 把元素添加到当前数组副本末尾再返回
 * slice 返回指定开始/结束下表间的元素并返回一个新的数组
 * splice 有多种使用场景，删除，插入，替换
 */
let o1 = [1, 2, 3];
let o2 = o1.concat(Array.of(3, 4));//[1,2,3,3,4]
console.log(o1, o2);//Array(3) [ 1, 2, 3 ]  Array(5) [ 1, 2, 3, 3, 4 ]

let o3 = ['i', 'm', 'o', 'k'];
console.log(o3.slice(1));// m, o , k
console.log(o3.slice(1, 3));// m, o


let o4 = ['s', 'p', 'l', 'i', 'c', 'e'];
let o4_delete = o4.splice(0, 1);// ['s]
console.log(o4_delete, o4);//[ "p", "l", "i", "c", "e" ]
let o4_insert = o4.splice(1, 0, 's');
console.log(o4_insert, o4);//[ "p", "s", "l", "i", "c", "e" ]

/**
 * 12. 搜索方法
 * ECMAScript 提供了两类搜索数组的方法：按严格相等搜索，按断言函数搜索
 * 严格相等：indexOf，lastIndexOf，includes
 * 断言函数搜索：find，findIndex
 */
let g1 = [1, 2, 3, 4, 5, 6, 4, 3, 2, 1];
console.log(g1.indexOf(4));// 3
console.log(g1.lastIndexOf(4));//6
console.log(g1.includes(4));//true
let g1find = g1.find((v, index, array) => {
    return v == 6;
});// 返回数据值
console.log(g1find);

let g1findIndex = g1.findIndex((v, index, array) => {
    return v == 4;
});
console.log(g1findIndex);//返回数据下标


/**
 * 13. 迭代方法
 * 接收两个参数，以每一项为参数运行的函数，以及可选的作为函数上下文的作用域对象。
 * 传给每个方法的函数有 3 个参数，元素，下标，数组对象。
 * 
 * every 对每一项都运行传入的函数，如果每一项都为 true 则该方法返回 true
 * filter 对每一项都运行传入的函数，函数返回 true 的项会组成一个数组之后返回
 * forEach 对每一项都运行传入的函数，没有返回值
 * map 对每一项都运行传入的函数，返回每次函数调用的结果构成的数组
 * some 对数组每一项都运行函数，有一项为 true 则该方法返回为 true
 */
let u1 = [0, 0, 0];
let u1Every = u1.every((v, idx, array) => v === 0);
console.log(u1Every); //true

let u1Filter = u1.filter((v, idx, array) => v === 0);
console.log(u1Filter); //Array(3) [ 0, 0, 0 ]

u1.forEach((v, idx, array) => console.log(v));// 0 0 0

let u1Map = u1.map((v, idx, array) => idx);
console.log(u1Map); //Array(3) [ 0, 1, 2 ]

let u1some = u1Map.some((v, idx, array) => v === 2);
console.log(u1some);// true