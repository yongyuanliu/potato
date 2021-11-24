var maxUncrossedLines = function(nums1, nums2) {
  const crossed = new Map();
  let lastValue = -1;

  for(let i = 0 ; i < nums1.length; i++){
    compare:
    for(let j = lastValue + 1; j < nums2.length; j++){
      console.log(i, j, nums1[i], nums2[j])
      console.log('========');
      if(nums1[i] === nums2[j]){
          crossed.set(i, j);//值复制
          lastValue = j;
          break compare;
      }
    }
  }
  return crossed.size;
};
console.log('========');
console.log(maxUncrossedLines([1,1,2,1,2], nums2 = [1,3,2,3,1]));


// console.log(maxUncrossedLines([1,4,2], nums2 = [1,2,4]));
// console.log('========');

// console.log(maxUncrossedLines([2,5,1,2,5], nums2 = [10,5,2,1,5,2]));
// console.log('========');

// console.log(maxUncrossedLines([1,3,7,1,7,5], nums2 = [1,9,2,5,1]));
// console.log('========');