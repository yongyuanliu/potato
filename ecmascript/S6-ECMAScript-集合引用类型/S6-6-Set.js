/**
 * 6.6 Set
 * ECMAScript 6 新增的 Set 是一种新集合类型，为这门语言带来集合数据结构。
 * Set 集合内不会出现相同的数据。
 */

/**
 * 1. 基本API
 * 创建 Set 对象实例
 * 新增，查询，删除，获取
 */
const s1 = new Set();
const sx = new Set(['a', 'b', 'c']);

s1.add(1).add(1).add('b').add('c');

console.log(s1.size);//3
console.log(s1);//Set(3) [ 1, "b", "c" ]

console.log(s1.has(1));//true
console.log(s1.delete(1));//true
console.log(s1.size);//2


/**
 * 2. 顺序与迭代
 * 
 * Set 会维护值插入时的顺序，因此支持按顺序迭代
 */
 const s2 = new Set(['a', 'b', 'c']);
 for(let value of s2.values()){
     console.log(value);
 }
 console.log(Array.of(...s2.values()));
 for(const pair of s2.entries()){
    console.log(pair);
 }

 /**
  * 3. 定义正式集合操作
  * 从各方面来看，Set 跟 Map 都很相似，只是 API 稍作调整。
  * 唯一需要强调都就是集合的 API 只支持自引用操作。很多开发者都喜欢使用 Set 操作，但需要手动实现：活着是子类化 Set，活着是定义一个实用函数库。
  * 要把两种方式合二为以，可以在子类上实现静态方法，然后在实例方法中实用这些静态方法。在实现这些操作时，需要考虑几个地方。
  *     某些 Set 操作是有关联性但，因此最好让实现但方法能支持处理任意多个集合实例。
  *     Set 保留插入顺序，所有方法返回但集合必须保证顺序。
  *     尽可能搞笑地实用内存。扩展操作符但语法很简介，但尽可能避免集合和数组间但相互转换能够节省对象初始化成本
  *     不要修改已有的集合实例。union(a, b) 或 a.union(b) 应该返回包含结果的新集合实例。
  */
 class XSet extends Set{
     union(...sets){
         return XSet.union(this, ...sets);
     }
     intersection(...sets){
         return XSet.intersection(this, ...sets);
     }
     difference(set){
         return XSet.difference(this, set);
     }
     symmetricDifference(set){
         return XSet.symmetricDifference(this, set);
     }
     cartesianProduct(set){
         return XSet.cartesianProduct(this, set);
     }
     powerSet(){
         return XSet.powerSet(this);
     }
     /**
      * 返回两个或更多集合的并集
      * @param {*} a 作用域，一般为 this 
      * @param  {...any} bSets 
      * @returns 多个 Set 的 values 并集
      */
     static union(a, ...bSets){
         const unionSet = new XSet(a);
         for(const b of bSets){
             for(const bValue of b){
                 unionSet.add(bValue);
             }
         }
         return unionSet;
     }
     /**
      * 返回两个或更多集合的交集
      * @param {*} a 
      * @param  {...any} bSets 
      * @returns 
      */
     static intersection(a, ...bSets){
         const intersectionSet = new XSet(a);
         for(const aValue of intersectionSet){
             for(const b of bSets){
                 if(!b.has(aValue)){
                     intersectionSet.delete(aValue);
                 }
             }
         }
         return intersectionSet;
     }
     /**
      * 返回两个集合的差集
      * @param {*} a 
      * @param {*} b 
      * @returns 
      */
     static difference(a, b){
         const differenceSet = new XSet(a);
         for(const bValue of b){
             if(a.has(bValue)){
                 differenceSet.delete(bValue);
             }
         }
         return differenceSet;
     }
     /**
      * 返回两个集合的对称差集
      * @param {*} a 
      * @param {*} b 
      * @returns 
      */
     static symmetricDifference(a, b){
         return a.union(b).difference(a.intersection(b));
     }
     /**
      * 返回两个集合（数组对形式）的笛卡尔积
      * 必须返回数组集合，因为笛卡尔积可能包含相同值的对
      * @param {*} a 
      * @param {*} b 
      * @returns 
      */
     static cartesianProduct(a, b){
         const cartesianProductSet = new XSet();
         for(const aValue of a){
             for(const bValue of b){
                cartesianProductSet.add([aValue, bValue]);
             }
         }
         return cartesianProductSet;
     }
     /**
      * 返回一个集合的幂集
      * @param {*} a 
      * @returns 
      */
     static powerSet(a){
         const powerSet = new XSet().add(new XSet());
         for(const aValue of a){
             for(const set of new XSet(powerSet)){
                 powerSet.add(new XSet(set).add(aValue));
             }
         }
         return powerSet;
     }
 }
 let s1 = new XSet([1, 2, 3]);
 let s2 = new XSet([1, 5, 6, 3]);
 s1.union(s2);//Set(5) [ 1, 2, 3, 5, 6 ]
 s1.intersection(s2);//Set [ 1, 3 ]
 s1.difference(s2);//Set [ 2 ]s
 s1.symmetricDifference(s2);//Set(3) [ 2, 5, 6 ]

 /**
  * Set(8) [ Set [], Set(1), Set(1), Set(2), Set(1), Set(2), Set(2), Set(3) ]
​
size: 8
<entries>
0: Set []
1: Set [ 1 ]
2: Set [ 2 ]
3: Set [ 1, 2 ]
4: Set [ 3 ]
5: Set [ 1, 3 ]
6: Set [ 2, 3 ]
7: Set(3) [ 1, 2, 3 ]
  */
 s1.powerSet();