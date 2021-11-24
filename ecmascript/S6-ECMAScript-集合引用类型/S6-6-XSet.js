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