// 例37-树的最长同值[路径]

class BinaryTree{
    constructor(value,left=null,right=null) {
        this.value =value
        this.left = left
        this.right = right
    }
}

const tree = new BinaryTree(
    5,
    new BinaryTree(
        6,
        new BinaryTree(
            6
        ),new BinaryTree(
            6
        )
    ),
    new BinaryTree(
        8,
        new BinaryTree(
            7
        ),
        new BinaryTree(
            9
        )
    )
)

// 统计节点到叶子的所有路径，找到最大的节点个数
function max_longest_level(node,val) {
    return (node && node.value === val)?
        Math.max(max_longest_level(node.left,val),max_longest_level(node.right,val))
            +1:0
}


function* transverse(node) {
    yield node
    if(node.left) {
        yield* transverse(node.left)
    }
    if(node.right) {
        yield* transverse(node.right) 
    }
}

function solve(node) {
    return [...transverse(node)].reduce((max,o)=>{
        return Math.max(max_longest_level(o.left,o.value)+max_longest_level(o.right,o.value),max)
    },0)
}

// 全排列简单解
// a1 并上P(A-a1)的全排列
//P(A) = a1P(A-a1) U a2P(A-a2)U...UanP(A-an)
// 数组的并集就用[].concat
//P[1,2,3,4] = 1P [2,3,4] U 2P[1,3,4] 3P[1,2,4]U 4 P[1,2,3]
//A.slice(0,i).concat(A.slice(i+1))) // 这行代码表示的是我想要拿到[1,2,3],[1,3,4]这类的数组用这种方式来拿
// function perm(A) {
//     if(A.length ===1) {return [A]}
//     return [].concat(...A.map((a,i)=>
//         perm(A.slice(0,i)
//             .concat(A.slice(i+1))).map(p=>[a].concat(p))
//     ))
// }
// console.log(perm([1,2]))
// console.log(perm([1,2,3,4,5,6,7,8,9]))