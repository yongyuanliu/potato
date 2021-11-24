/**
 * 6.5 WeakMap
 * ECMAScript 6 中新增的类型，WeakMap（弱映射）是一种新的集合类型，为这门语言带来了增强的键/值对存储机制。
 * WeakMap 是 Map 的 “兄弟” 类型，其 API 也是 Map 的子集。
 * WeakMap 中的“Weak”（弱），描述的是 JavaScript 垃圾回收程序对待 “弱映射”中键的方式。
 */
/**
 * 弱映射中的键只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置键会抛出 TypeError
 */
/**
 * 1. 基本 API
 */
let x1 = new WeakMap();
let x1_key1 = { id : 1 };
let x1_key2 = new String('key');
x1.set(x1_key1, 'val1').set(x1_key2, 'val2');
x1.has(x1_key1);
x1.get(x1_key1);
x1.delete(x1_key1);

/**
 * 2. 弱键
 * WeakMap 中的 Weak 表示弱映射的键是“弱弱地拿着”。
 * 意思是这些键不属于正式的引用，不阻止垃圾回收。
 * 只要键存在，键/值对就会存在映射中，并被当作值对引用，因此也就不会被当作垃圾回收。
 */
const x2 = new WeakMap();
x2.set({}, 'v1'); //会被垃圾回收，因为 {} 该键没有引用

/**
 * 3. 不可迭代键
 * WeakMap 中对键/值可能随时被回收，也就没有必要提供迭代键/值的能力了
 */

/**
 * 4. 使用弱映射
 */
/**
 * 私有变量s
 */
const wm = new WeakMap();
class User{
    constructor(id){
        this.id = Symbol('id');
        this.setId(id);
    }
    setPrivate(property, value){
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
    }
    getPrivate(property){
        return wm.get(this)[property];
    }
    setId(id){
        console.log(id, this.id);
        this.setPrivate(this.id, id);
    }
    getId(){
        return this.getPrivate(this.id);
    }
}
const user = new User(123);
console.log(user.getId());
user.setId(234);
console.log(user.getId());
console.log(wm.get(user)[user.id]); // 依旧可以通过 vm 来访问到具体值
/**
 * 只需要使用闭包，就可以隐藏 weakmap
 */
const User = (() => {
    const wm = new WeakMap();
    class User{
        constructor(id){
            this.id = Symbol('id');
            this.setId(id);
        }
        setPrivate(property, value){
            const privateMembers = wm.get(this) || {};
            privateMembers[property] = value;
            wm.set(this, privateMembers);
        }
        getPrivate(property){
            return wm.get(this)[property];
        }
        setId(id){
            console.log(id, this.id);
            this.setPrivate(this.id, id);
        }
        getId(){
            return this.getPrivate(this.id);
        }
    }
    return User;
})();
const user = new User(123);
console.log(user.getId());
user.setId(234);
console.log(user.getId());
console.log(wm.get(user)[user.id]); // vm is undefined