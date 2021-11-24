/**
 * 8.1 理解对象
 * 
 * 对象的创建方式
 */
let x1 = new Object(); // new
let x1P = {};//字面量

/**
 * 1. 属性的类型
 * 对象的属性，这些属性的类型。
 * ECMAScript-262 使用了一些内部特性来访问这些属性。为了将某个特性标识为内部特性，规范会用两个中括号把特性的名称括起来。例如[[Value]]
 * 属性分为两种：数据属性和访问器属性
 */

/**
 * 1.1 数据属性
 * 数据属性定义数据的值，是否可以枚举，值是否可以修改，是否可以定义属性这四方面
 * 
 * [[Configurable]] 属性是否可以定义
 * [[Enumerable]]   属性是否可以枚举
 * [[Writable]] 属性是否可以修改
 * [[Value]]    数据值
 * 
 * 通过 Object.defineProperty 来设定数据属性
 */
let d1 = { name: 'Only' };
Object.defineProperty(d1, 'age', {
    configurable: true,
    enumerable:   true,
    writable:     false,
    value: 24
});
d1.age = 25; //不起效，writable 为 false
console.log(d1); //Object { name: "Only", age: 24 }

/**
 * 1.2 访问器属性
 * 访问器属性包含两个函数 getter，setter
 * [[Get]]  获取函数，读取属性值调用
 * [[Set]]  设置函数，设置属性值调用
 */
let d2 = {
    age_: 24,
    name: 'O'
};
Object.defineProperty(d2, 'age', {
    get(){
        return this.age_;
    },
    set(value){
        console.log('age changed', this.age_, '=>', value);
        this.age_ = value;
    }
});
d2.age = 25; //age changed 24 => 25
console.log(d2);

/**
 * 2 定义多个属性
 * 在一个对象上同时定义多个属性。
 */
let f1 = {};
Object.defineProperties(f1, {
    age: {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 25
    },
    id_:{
        configurable: true,
        enumerable: true,
        writable: true,
        value: 25
    },
    id: {
        get(){
            return this.id_;
        },
        set(v){
            this.id_ = v;
        }
    }
});
f1.age = 26;
console.log(f1, f1.id);
f1.id = 909;
console.log(f1, f1.id);

/**
 * 3. 读取属性的特性
 * 使用 Object.getOwnPropertyDescriptor 方法可以取得指定属性的属性描述符。
 * 使用 Object.getOwnPropertyDescriptors 方法可以获取对象的所有属性特性
 */
 let g1 = {};
 Object.defineProperties(g1, {
     age: {
         configurable: false,
         enumerable: false,
         writable: true,
         value: 25
     },
     id_:{
         configurable: true,
         enumerable: true,
         writable: true,
         value: 25
     },
     id: {
         get(){
             return this.id_;
         },
         set(v){
             this.id_ = v;
         }
     }
 });
 let d1IdDescriptor = Object.getOwnPropertyDescriptor(g1, 'id');
 console.log(d1IdDescriptor);//Object { get: get(), set: set(v), enumerable: false, configurable: false }

 let d1PropertyDescriptors = Object.getOwnPropertyDescriptors(g1);
 console.log(d1PropertyDescriptors);

 // Object { age: {…}, id_: {…}, id: {…} }
 // age: Object { value: 25, writable: true, enumerable: false, … }
 // id: Object { get: get(), enumerable: false, configurable: false, … }
 // id_: Object { value: 25, writable: true, enumerable: true, … }


 /**
  * 4. 合并对象
  * mixin(混入)：把源对象的所有本地属性一起复制到目标属性上。这种操作称为混入。因为目标对象通过混入源对象的属性得到了增强。
  * 
  * ECMAScript 6 专门为合并对象提供了 Object.assign 方法。该方法接收一个目标对象和一个或多个愿对象作为参数，然后将
  *     每个源对象可枚举（Object.propertyIsEnumerable() 返回为 true ）和自有（Object.hasOwnProperty() 返回 true）属性复制到目标对象。
  *     以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标对象傻姑娘的[[Set]]设置属性的值
  */
 let mixinDest, mixinSrc, mixinResult;
 mixinDest = {};
 mixinSrc = { id : 'src'};
 mixinResult = Object.assign(mixinDest, mixinSrc);
 console.log(mixinDest === mixinResult); //true
 console.log(mixinDest!== mixinSrc);//true
 console.log(mixinResult);//Object { id: "src" }
 console.log(mixinDest);//Object { id: "src" }
 /**
  * 多个源对象
  */
 mixinDest = {};
 mixinResult = Object.assign(mixinDest, { a: 'foo' }, { b: 'bar' });
 console.log(mixinResult); //Object { a: "foo", b: "bar" }
 console.log(mixinResult === mixinDest); //true

 /**
  * 获取函数与设置函数
  */
 mixinDest = {
     set a(val){
         console.log(`invoked dest setter with param ${val}`);
     }
 }
 mixinSrc = {
     get a(){
         console.log(`invoked src getter`);
         return 'a';
     }
 }
 Object.assign(mixinDest, mixinSrc);
 console.log(mixinDest, mixinDest === mixinSrc);//Object { a: Setter }      false

 /**
  * 5. 对象标识及相等判定
  * 
  * 在 ECMAScript 6 以前，有些特殊情况是 === 操作符也无能为力:
  */
 console.log(true === 1);//false
 console.log({} === {});//false
 console.log("2" === 2);//false


 console.log(NaN === NaN); //false
 console.log(isNaN(NaN));//true

 //ES6 新增了 Object.is 方法。与 === 很相似也考虑到了边界值的情况
 console.log(Object.is(NaN, NaN));//true
 console.log(Object.is('2', 2));//false
 console.log(Object.is(true, 1));//false

 function recursivelyCheckEqual(x, ...rest) {
     return Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest));
 }
 console.log(recursivelyCheckEqual(NaN, NaN), recursivelyCheckEqual(NaN, NaN, NaN));

 /**
  * 6. 增强的对象语法
  * ES6 为定义和操作对象新增了很多及其有用的语法糖特性。
  *     这些特性都没有改变现有引擎都行为，但极大的提高了处理对象的方便程度。
  */
 /**
  * 6.1 属性简写
  * 简写属性只要使用变量名就会自动被解释为同名的属性键。
  */
 let g1Name = 'Only';
 let g1Person = {
     g1Name
 }
 console.log(g1Person); // Object { g1Name:'Only' }
 function G1GetPerson(name) {
     return { name };
 }

 /**
  * 6.2 可计算属性
  * 能在对象字面量中直接动态命名属性。
  * 在可计算属性之前，想要使用变量的值作为属性，那么必须先声明对象，然后使用中括号语法来添加属性。
  */
 const g2Key = 'name';
 const g2Person = {};
 g2Person[g2Key] = 'Only'; //可计算属性之前

 const g3NameKey = 'name';
 /**
  * 有了可计算属性，就可以在对象字面量中完成动态属性赋值。中括号包围的对象属性键告诉运行时将其作为 JavaScript 表达式而不是字符串来求值
  */
 const g3Person = {
     [g3NameKey] : 'Only'
 }
 /**
  * 因为是 JavaScript 表达式求值，所以可计算属性本身是可以复杂的表达式
  */
 const g4Key = 'key';
 let uniqueToken = 0;
 function getUniqueToken(key) {
     return `${key}_${uniqueToken++}`;
 }
 let g4Person = {
     [getUniqueToken(g4Key)] : "o"
 };

 /**
  * 6.3 简写方法名
  * 在给对象定义方法时，通常要写一个方法名，冒号，然后再引用一个匿名函数表达式
  */
 let y1 = {
     sayName: function(name){
         console.log(`${name}`);
     }
 }
 y1.sayName('o');
 /**
  * 简写方法名
  */
 let y2 = {
     sayName(name){
        console.log(`${name}`);
     }
 }
 y2.sayName('o');
 /**
  * 简写方法名可计算表达式
  */
 const y3FName = 'sayName';
 let y3 = {
     [y3FName](name){
         console.log(`${name}`);
     }
 }
 y3.sayName('o');