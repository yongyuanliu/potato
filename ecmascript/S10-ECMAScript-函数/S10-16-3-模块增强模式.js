/*
    10.6.3 模块增强模式
    利用模块模式在返回对象之前增强对象。
    例如单例对象需要是某个特点类型的实例，但又必须给它添加额外属性或方法但场景。
 */
function BaseComponent(name){
    this.name = name;
}
    
let application = function(){
    //私有变量和私有函数
    let components = new Array();

    //初始化
    components.push(new BaseComponent('application'));

    //指定类型，增强对象
    let app = new BaseComponent('applicationModule');
    app.getComponentCount = function(){
        return components.length;
    }
    app.registerComponent = function(component){
        if(typeof component == "object"){
            components.push(component);
        }
    }

    //返回实例
    return app;
}();
application.registerComponent(new Object());
console.log(application.getComponentCount());

application.registerComponent(1);
application.registerComponent(new Object());
console.log(application.getComponentCount());