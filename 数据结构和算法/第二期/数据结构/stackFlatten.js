// 数组展平
// 用递归实现
// function flatten(arr) {
//     return [].concat(...arr.map(item=>{
//         return Array.isArray(item)?flatten(item):item
//     }))
// }
const arr = [1,2,3,[10,1,2,7,5,],[1,2,3]]
// console.log(flatten(arr))
// 用迭代器实现(也用了递归)
// function *flatten(arr) {
//     for(let i = 0;i<arr.length;i++) {
//         if(Array.isArray(arr[i])){
//             yield * flatten(arr[i])
//         } else {
//             yield arr[i]
//         }
//     }
// }
// console.log([...flatten(arr)])

// 用非递归实现
// function flatten(arr) {
//     let stack = arr.slice()
//     const r = []
//     while(stack.length) {
//         const item = stack.shift()
//         if(Array.isArray(item)) {
//             stack = [].concat(item,stack)
//         }else{
//             r.push(item)
//         }
//     }
//     return r
// }
// console.log(flatten(arr))

// 用迭代器的非递归实现
function *flatten(arr) {
    let stack = arr.slice()
    while(stack.length) {
        const item = stack.shift()
        // 在V8里面item.constructor === Array比Array.isArray(item)这样写更快
        if(item.constructor === Array) {
            stack = [].concat(item,stack)
        }else{
            yield item
        }
    }
}
// console.log([...flatten(arr)])
