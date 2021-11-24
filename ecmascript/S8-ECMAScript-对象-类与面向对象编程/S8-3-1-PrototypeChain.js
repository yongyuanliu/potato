/**
 * S8 - 3 继承
 * 实现继承是 ECMAScript 唯一支持的继承方式，而这主要是通过原型链实现的
 */

/*
  8.3.1 原型链
  
  ECMA-262 把原型链定义为 ECMAScript 的主要继承方式，其基本思想就是通过原型继承多个引用类型的属性和方法。
  每个构造韩素和都有一个原型对象，原型有一个属性指回构造函数，而实例内部有一个指针指向原型。
  如果原型是另一个类型的实例，意味着该原型本身有一个内部指针指向另一个原型，相应的另一个原型也有一个指针指向另一个构造函数。
   这样就在实例和原型之间构造了一条原型链，这就是原型链的基本思想。
 */
function XSuperType() {
    this.superProperty = true;
}
XSuperType.prototype.getSuperValue = function() {
    console.log(this.superProperty);
}

function XSubType() {
    this.subProperty = false;
}

/**
 * 此时 SubType.prototype 指向了 SuperType 实例。
 * SuperType 实例的实例属性，实例方法也就成为了 SubType 的原型属性，原型方法。
 * SuperType 实例内部的原型对象指向 [[Prototype]] 特性，该原型对象有 constructor 属性 指向了 SuperType 函数。
 * 因此也就可以沿着 SubType 搜索 SuperType 
 */
XSubType.prototype = new XSuperType();

XSubType.prototype.getSubValue = function(){
    console.log(this.subProperty);
}

let xInstance1 = new XSubType();
console.log(XSubType.prototype.superProperty); // true
xInstance1.getSuperValue();//true
console.log(xInstance1);

/*
    1. 默认原型
    默认情况下，所有引用类型都继承自 Object 这也是通过原型链实现都
 */


/*
    2. 原型于继承关系
    原型与实例都关系有两种方式来确定
        instanceOf 操作符
            从技术上讲， instance 是 Object、SuperType、SubType 的实例，因为 instance 的原型链中包含这些构造函数的原型。

        isPrototypeOf 函数
            原型链中每个原型都可以调用这个方法，只要原型链中包含这个原型，就返回 true
 */
console.log(xInstance1 instanceof XSubType);    //true
console.log(xInstance1 instanceof XSuperType);  //true
console.log(xInstance1 instanceof Object);      //true

console.log(XSubType.prototype.isPrototypeOf(xInstance1));  //true
console.log(XSuperType.prototype.isPrototypeOf(xInstance1));    //true
console.log(Object.prototype.isPrototypeOf(xInstance1));    //true


/*
    3. 关于方法
    子类有时需要覆盖父类方法或者增加父类没有的方法，为此这些方法必须在原型赋值后在添加到原型上。
    使用相同名称会覆盖已有方法（遮蔽父类）方法
 */
XSubType.prototype.getType = function(){
    console.log('XSubType')
}

XSubType.prototype.superProperty = 'SuperType';

let xInstance2 = new XSubType();
xInstance2.getSubValue();
xInstance2.getType();
xInstance2.getSuperValue();

/*
    4. 原型链的问题
    1. 当原型链中包含引用值的内容发生变更时，影响微妙而深远
    2. 子类型在实例话时不能向父构造函数传递参数
 */