/*
    10.14.2 内存泄漏
    在 IE9 之前对 JScript对象和 COM 对象使用了不同的垃圾回收机制，所以闭包在这些旧版本 IE 中可能会导致问题。
 */
function assignHandler() {
    let element = document.getElementById('ex');
    element.onclick = () => console.log(element.id);
}

/*
    在 assignHandler 函数中
    element 元素事件处理程序，创建了一个循环引用。箭头函数引用着 assignHandler 的活动对象，阻止了对 element 的引用计数归零。
    只要该 箭头函数存在，element 的引用计数至少等于 1 ，也就是说不会被回收。
    
    改成下面这样可以避免这种情况
 */
function assignHandler() {
    let element = document.getElementById('ex');
    let id = element.id;
    element.onclick = () => console.log(id);
}