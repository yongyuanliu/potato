/*
   26.2 凑合的模块系统
   在 ES6 以前是通过 IIFE 将模块定义封装在闭包内
 */
var Foo = (function(){})();

// 通过 IIFE 返回一个对象，暴露公共成员
var Foo = (function(){
  return {
    bar: 'bar',
    baz: 'baz'
  }
})();

// 泄漏模块模式 也叫特权方法
var Foo = (function(){
  var bar = 'bar';
  var baz = function(){
    console.log(bar);
  }
  return {
    bar,
    baz
  }
})();
Foo.baz();//bar

// 在模块内部定义模块，实现命名空间嵌套
Foo.qux = (function(){
  return {
    fux: function(){
      console.log('bar');
    }
  }
})();
Foo.qux.fux();//bar


// 为了让模块正确使用外部的值，可以将它们作为参数传递给 IIFE （也可以用于锁定参数）
var globalBar = 'bar';
var Foo = (function(bar){
  const baz = function(){
    console.log(bar);
  }
  return {
    bar,
    baz
  }
})(globalBar);
Foo.baz();//bar

globalBar = 'xz1';
Foo.baz();//bar

// 扩展模块
var Foo = (function(FooModule){
  FooModule.x1 = function() {
    console.log(FooModule.x1.name);
  }
  return FooModule;
})(Foo);
Foo.x1();

// 无需担心模块是否存在，配置扩展以执行扩展
var Foo = (function(FooModule){
  FooModule.bar = 'bar';
  FooModule.baz = function(){
    console.log(FooModule.bar);
  }
  return FooModule;
})(Foo || {});

var Foo = (function(FooModule){
  FooModule.qux = function(){
    Foo.baz();
  }
  return FooModule;
})(Foo || {});

Foo.qux();
Foo.baz();
console.log(Foo);