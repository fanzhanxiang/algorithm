// O(n)的算法-桶排序(需要对数据有了解的情况下才能进行使用，不然会有有很多坑，就像自己今天碰到的找不到二维数组中的其中一项一样)
// 这里的这个堆排序还没有写完，写完整的话内部还需要用到sort方法
function bucket_sort(A) {
    // a-桶的数量
    const a = 100

    // 桶- a项的二维数组
    const B = [...Array(a+1)]
        .map(x=>[])


    // 下标算法
    const indexFunc = (value) => {
        const key = Math.floor(value/100)
        // 0-99:存放0-10000的数字
        // 100:存放其他数字
        if(key>100){return 100}
        return key
    }

    A.forEach(value=>{
        // B的每一项都是数组
        const idx = indexFunc(value)
        if(!B[idx]) {
            throw new Error('桶角标没有命中' + idx)
        }
        B[indexFunc(value)].push(value)
    })


    // 这里有三种写法
    // 写法1
    // let arr = []
    //     B
    //         .forEach(bucket => {
    //             bucket.forEach(value => {
    //                 arr.push(value)
    //             })
    //         })
    //     return arr

    // 写法2
    return [].concat(...B)

    // 写法3
    // return B
    // .filter(bucket=> {
    //     return bucket.length > 0
    // }) // O(n)
    // .reduce((result,bucket)=>{
    //     return result.concat(bucket) // O(n)
    // },[])

}

console.log(bucket_sort([500,800,10000,3000]))