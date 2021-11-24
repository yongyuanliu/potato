const arr = [
    { id: 1, value: "节点1", p_id: 0 },
    { id: 2, value: "节点2", p_id: 1 },
    { id: 3, value: "节点3", p_id: 1 },
    { id: 4, value: "节点4", p_id: 2 },
    { id: 5, value: "节点5", p_id: 0 },
    { id: 6, value: "节点6", p_id: 5 },
    { id: 7, value: "节点7", p_id: 6 },
    { id: 8, value: "节点8", p_id: 6 },
];

const parents = arr.filter( v => Object.is(v.p_id, 0) );
parents.forEach( v1 => factorial(v1));

function factorial(parent){
    let childrens = arr.filter( v => Object.is(v.p_id, parent.id) );
    if(childrens.length > 0){
        childrens.forEach( children => factorial(children) );
    }
    parent.children = childrens;
}

console.log(parents);