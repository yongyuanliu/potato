async function foo() {
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    let x = await p;     // 等同于 p.then(console.log);
    console.log(x);
    console.log('1');
}
foo();