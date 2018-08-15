// 递归
// 当事物用它本身定义自己，就会发生递归

//例027 - 阶乘
//  function factorial(n) {
//      return n === 0 ? 1 : factorial(n-1) * n
//  }
//  console.log(factorial(5)) // ->120


 // 例28 - 斐波那数列
 // 1,1,2,3,6,13,21,34,55,89,144,...
 // 指数级
//  function fibonacci(n) {
//      return n === 1 || n === 2 ? 1 : fibonacci(n-1) + fibonacci(n-2)
//  }
//  console.log(fibonacci(7)) //->13

// 对性能的思考- 斐波那数列的递归，使用的递归的方法写的时候递归的次数非常的多

// 例28 - 从低端构造递归(斐波那数列)
// 线性
// function fibonacci(n) {
//     let [a,b] = [0,1]
//     for(let i = 0;i < n ; i++) {
//         [a,b] =[b,a+b]
//     }
//     return b
// }
// console.log(fibonacci(7)) // 21  因为这里是从0开始的，所以和上面的相比较，会往后推一个



// reduce和for循环的两种写法，本质一样
// function fibonacci(n) {
//     // 这种reduce是写法自己要注意下
// return Array(n).fill().reduce(([a,b],_) => {
//     return [b,a+b]
//     // 因为这里在reduce函数执行完成之后返回的函数是亮相，这里表示的是拿的是第一项所以用[1],如果不用[1]的话这里返回的是[a,a + b],[a,a + b].[1]相当于是拿了a这一项
//   },[0,1])[1]
// }
// console.log(fibonacci(7)) // -> 21
// console.log(Array(10).fill(1)) // ->[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]



// 例29 -DOM节点的绝对位置
// function get_layout(ele) {
    //     const layout = {
    //         width: ele.offsetWidth,
    //         height: ele.offsetHeight,
    //         left: ele.offsetLeft,
    //         top: ele.offsetTop
    //     }
    //     if (ele.offsetParent) {
    //         const parentLayout = get_layout(ele.offsetParent)
    //         layout.left += parentLayout.left
    //         layout.top += parentLayout.top
    //         console.log("123123")
    //     }
    //     return layout
    // }
    // console.log(get_layout(getBox))


    // function getLayout(ele) {
    //     let left = ele.offsetLeft,
    //         top = ele.offsetTop
    //     let p = ele.offsetParent
    //     while (p) {
    //         left += p.offsetLeft
    //         top += p.offsetTop
    //         p = p.offsetParent
    //     }
    //     return {
    //         width: ele.offsetWidth,
    //         height: ele.offsetHeight,
    //         left: left,
    //         top: top
    //     }
    // }


    // 例30-深度拷贝
    // function clone(obj) {
    //     if(obj == null || typeof obj !== 'object') return obj
    //     // new obj.constructor() 这里表示返回obj对应的构造函数，如果obj是一个数组则返回一个空数组，如果obj是一个对象则返回一个空对象
    //     const newObj = new obj.constructor()
    //     // Object.getOwnPropertyDescriptors(obj) 保证obj里面的成员不在原型链上面
    //     for(let key in Object.getOwnPropertyDescriptors(obj)) {
    //         newObj[key] = clone(obj[key])
    //     }
    //     return newObj
    // }
    // let obj = {1:1,2:2,3:3}
    // console.log(clone(obj), 'obj')

    

    // 例31 - 深度比较
    // function deepCompare(a,b) {
    //     if(a === null || typeof a !== 'object' || b === null || typeof b!== 'object') {
    //         return a === b
    //     }
    //     const propsA = Object.getOwnPropertyDescriptors(a)
    //     const propsB = Object.getOwnPropertyDescriptors(b)
    //     if(Object.keys(propsA).length !== Object.keys(propsB).length) {
    //         return false
    //     }
    //     return Object.keys(propsA).every(
    //         key => deepCompare(a[key],b[key])
    //     )
    // }

    // console.log(deepCompare({a:1,b:3},{a:1,b:3})) //->true
    // console.log(deepCompare({a:1,b:3},{a:1,b:4})) //->false





    // 例32 - 树的递归表示
    // T:v,[T1，...，Tk]含有值v和一个子树的列表
    class Tree {
        constructor(v,children) {
            this.v = v
            this.children = children || null
        }
    }
    const tree = new Tree(10,[
        new Tree(5),
        new Tree(3,[
            new Tree(7),
            new Tree(11,[
                new Tree(3),
                new Tree(2)
            ])
        ]),
        new Tree(2)
    ])

    // 例子33 - 树的遍历(先序)
    // function tree_transerse(tree) {
    //     console.log(tree.v)
    //     // forEach后面可以直接跟函数，就直接和递归连用了，这种写法写起来比较省事
    //     tree.children && tree.children.forEach(tree_transerse)
    // }
    // tree_transerse(tree) //10 5 3 7 11 2

    // 例子33-树的遍历(后序)
    // function tree_transverse_l(tree) {
    //     tree.children && tree.children.forEach(tree_transverse_l)
    //     console.log(tree.v)
    // }
    // tree_transverse_l(tree) // 5 7 11 3 2 10

    // 33- 树的遍历(中序)
    // function tree_transverse_m(tree,ord = 0) {
    //     let transversed = false
    //     if(!tree.children) {
    //         console.log(tree.v)
    //         return
    //     }
    //     tree.children.array.forEach((child,i) => {
    //         if(i === ord ) {
    //            transversed = true
    //            console.log(tree.v) 
    //         }
    //         tree_transverse_m(child,ord)
    //     });
    //     // 下面这行代码还是没有看懂到底是什么意思
    //     !transversed && console.log(tree.v)
    // }

    // 例 34-树的遍历(回掉)
    // function tree_transverse(tree,ord = 0,callback) {
    //     let transversed = false
    //     if(!tree.children) {
    //         callback(tree.v)
    //         return
    //     }
    //     tree.children.forEach((child,i) => {
    //         if(i === ord ) {
    //            transversed = true
    //            callback(tree.v) 
    //         }
    //         tree_transverse_m(child,ord)
    //     });
    //     // 下面这行代码还是没有看懂到底是什么意思
    //     !transversed && callback(tree.v)
    // }




    // 例35 - 树的遍历（基于Generator）
    // 使用Generator可以将遍历操作变成一个数组结构
    // const nodes = [...tree_transverse(tree)]
    // // 或
    // for (let node of tree) {
    //     // ...
    // }

    // function* tree_transverse(tree,ord=0) {
    //     let transversed = false
    //     if(!tree.children) {
    //         yield tree
    //         return
    //     }
    //     for(let i =0;i < tree.children.length;i++) {
    //         if(i === ord) {
    //             transversed = true
    //             yield tree
    //         }
    //         yield *tree_transverse(tree.children[i],ord)
    //     }
    //     if(!transversed) {
    //         yield tree
    //     }
    // }

    //36 -树的查找
    // function  find(tree,prediction) {
    //     return [...tree_transverse(tree)].find(prediction)
    // }


    // 例子37-树的路径
    // 通常我们会用路径来描述一个子节点
    // 比如
    // Css的选择器:#app ul li a
    //XML的xpath:/bookstore/book[price>35.00]
    //这样我们只需要直到根节点和路径就可以定位一个或多个后代


    // 构造一个先序遍历，除了返回节点外，还返回路径
    // function* tree_transverse(tree,path = []) {
    //     yield {tree,path}
    //     if(tree.chidlren) {
    //         for(let i =0;i<tree.children.length;i++) {
    //             yield *tree_transverse(tree.children[i],[...path,i])
    //         }
    //     }
    // }


    // 当然我们可以根据路径反查节点(选择器)
    // function find_by_path(tree,path) {
    //     return path.length ===0 ? tree : find_by_path(tree.children[path[0]],path.slice(1))
    // }
    // console.log(find_by_path(tree,[1,1])) //Tree { v: 11, children: null }


//例38-选择器
// 扩展例37中的find_by_path的语法，比如支持:
// select([1,'[>5]']) =>[7,11] =>[{child:1},{op:(x) =>x.v >5}]
// 标准化的选择器函数
// function select(node,path) {
//     if(path.length ===0 ) {return [node]}
//     const p = path.shift()
//     if(p.child) {
//         return select(node.children[p.child],[...path])
//     } else if(p.op) {
//         return [...tree_transverse(node)]
//         .filter(_n => p.op(_n.node))
//         .map(n =>n.node)
//     }
// }

// 解析选择表达式:1 [>5] =>[{child:1},{op:x =>x.v >5}]
// function parse_selection_exp(expr) {
//     return expr.split(' ')
//     .map(p => {
//         if(p.match(/^\d+$/)){
//             return {child: parseInt(p)}
//         } else {
//             return {
//                 op: eval(`(x) => x.v ${p.replace(/[\[\]]/g, '')}`)
//             }
//         }
//     })
// }


// function select_easy(tree,expr){
//     return select(tree,parse_selection_exp(expr))
// }
// console.log(select_easy(tree,'1 [>5]'))//这行代码还是不能够运行


// 节点的遍历/查找方法
function *transverse(node) {
    yield node
    if(node.children) {
        for(let i =0;i<node.children.length;i++) {
            yield *transverse(node.children[i])
        }
    }
}

function findByClassName(node,className) {
    return [...transverse(node).filter(node => node.className == className)]
}
function findByTagName(node,tagName) {
    return [...transverse(node)].filter(node => node.tag == tagName)
}

// 表达式解析
function selection_expr_parse(expr) {
    return expr.split(' ').map(x =>{
        if(x[0] === '.'){
            return {className: x.substr(1)}
        } else {
            return {tagName:x}
        }
    })
}
// '.content tr td'=>
// [{className: 'content},{tagNameL:'tr},{tagName: 'td'}]


function select(node,path) {
    if(path.length ===0) {return [nod]}
    const p = path.shift()
    let nodes =[]
    if(p.className) {
        nodes = findByClassName(node,p.className)
    } else {// p.tag
        nodes = findByTagName(node,p.className)
    }
    return [].concat(
        ...nodes.map(n =>select(n,[...path]))
    )
}


// 性能和思考
// 对className和tagName进行倒排，获得索引对象
function index(tree) {
  const classes = {}
  const nodes = [...transverse(tree)]
  nodes.forEach(node => {
      if(node.className){
        if(!classes[node.className]) {
            classes[node.className] = []
        }
        classes[node.className].push(node)
      }
  })
  return classes
}