// 递归
// 当事物用它本身定义自己，就会发生递归

//例027 - 阶乘
 function factorial(n) {
     return n === 0 ? 1 : factorial(n-1) * n
 }
//  console.log(factorial(5)) // ->120


 // 例28 - 斐波那数列
 // 1,1,2,3,6,13,21,34,55,89,144,...
 // 指数级
 function fibonacci(n) {
     return n === 1 || n === 2 ? 1 : fibonacci(n-1) + fibonacci(n-2)
 }
//  console.log(fibonacci(7)) //->13

// 对性能的思考- 斐波那数列的递归，使用的递归的方法写的时候递归的次数非常的多

// 例28 - 从低端构造递归(斐波那数列)
// 线性
function fibonacci(n) {
    let [a,b] = [0,1]
    for(let i = 0;i < n ; i++) {
        [a,b] =[b,a+b]
    }
    return b
}
// console.log(fibonacci(7)) // 21  因为这里是从0开始的，所以和上面的相比较，会往后推一个



// reduce和for循环的两种写法，本质一样
function fibonacci(n) {
    // 这种reduce是写法自己要注意下
    return Array(n).fill().reduce(([a,b],_) => {
        return [b,a+b]
    // 因为这里在reduce函数执行完成之后返回的函数是亮相，这里表示的是拿的是第一项所以用[1],如果不用[1]的话这里返回的是[a,a + b],[a,a + b].[1]相当于是拿了a这一项
    },[0,1])[1]
}
// console.log(fibonacci(7)) // -> 21
// console.log(Array(10).fill(1)) // ->[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]



// 例29 -DOM节点的绝对位置
    function get_layout(ele) {
        const layout = {
            width: ele.offsetWidth,
            height: ele.offsetHeight,
            left: ele.offsetLeft,
            top: ele.offsetTop
        }
        if (ele.offsetParent) {
            const parentLayout = get_layout(ele.offsetParent)
            layout.left += parentLayout.left
            layout.top += parentLayout.top
            console.log("123123")
        }
        return layout
    }
    // console.log(get_layout(getBox))


    function getLayout(ele) {
        let left = ele.offsetLeft,
            top = ele.offsetTop
        let p = ele.offsetParent
        while (p) {
            left += p.offsetLeft
            top += p.offsetTop
            p = p.offsetParent
        }
        return {
            width: ele.offsetWidth,
            height: ele.offsetHeight,
            left: left,
            top: top
        }
    }


    // 例30-深度拷贝
    function clone(obj) {
        if(obj == null || typeof obj !== 'object') return obj
        // new obj.constructor() 这里表示返回obj对应的构造函数，如果obj是一个数组则返回一个空数组，如果obj是一个对象则返回一个空对象
        // const newObj = new obj.constructor()
        let newObj = null
        // 时间对象有特殊性
        if(obj.constructor === Date) {
            newObj = new obj.constructor(obj)
        }else{
            newObj= obj.constructor()
        }
        // Object.getOwnPropertyDescriptors(obj) 保证obj里面的成员不在原型链上面
        for(let key in Object.getOwnPropertyDescriptors(obj)) {
            newObj[key] = clone(obj[key])
        }
        return newObj
    }
    // let obj = {1:1,2:2,3:3}
    // console.log(clone(obj), 'obj')

    

    // 例31 - 深度比较
    function deepCompare(a,b) {
        if(a === null || typeof a !== 'object' || b === null || typeof b!== 'object') {
            return a === b
        }
        const propsA = Object.getOwnPropertyDescriptors(a)
        const propsB = Object.getOwnPropertyDescriptors(b)
        if(Object.keys(propsA).length !== Object.keys(propsB).length) {
            return false
        }
        // 数组every函数的用法是数组的每一项都满足every里面的条件
        return Object.keys(propsA).every(
            key => deepCompare(a[key],b[key])
        )
    }

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
    function tree_transersef(tree) {
        console.log(tree.v)
        // forEach里面可以直接跟函数，就直接和递归连用了，这种写法写起来比较省事
        tree.children && tree.children.forEach(tree_transerse)
    }
    // tree_transersef(tree) //10 5 3 7 11 3 2 2

    // 例子33-树的遍历(后序)
    function tree_transverse_l(tree) {
        tree.children && tree.children.forEach(tree_transverse_l)
        // 如果树有孩子就把它的孩子都遍历完之后再来把tree.v打出来
        console.log(tree.v)
    }
    // tree_transverse_l(tree) // 5 7 3 2 11 3 2 10

    // 33- 树的遍历(中序[主要解决什么时候打上一个根节点的问题])
    function tree_transverse_m(tree,ord = 0) {
        let transversed = false
        if(!tree.children) {
            console.log(tree.v)
            return
        }
        tree.children.forEach((child,i) => {
            if(i === ord ) {
               transversed = true
               console.log(tree.v) 
            }
            tree_transverse_m(child,ord)
        });
        // 这里和上面的先序或者后序是同样的道理，主要是看父级tree在遍历的时候前面有没有打出来过->
        // 如果打出来过了，就不执行了，如果没有打出来过，就执行
        !transversed && console.log(tree.v)
    }
    // tree_transverse_m(tree)

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
    // console.log([...tree_transverse(tree)],'test')

    //36 -树的查找
    // function  find(tree,prediction) {
    //     // find里面放的是一个方法,这里只能够返回一个
    //     // 想返回多个用filter
    //     return [...tree_transverse(tree)].filter(prediction)
    // }

    // function find(tree,prediction){
    //     for(let node of tree_transverse(tree)) {
    //         if(prediction(node)){return node}
    //     }
    // }
    // console.log(find(tree,node=>node.v === 2))
    // 例子37-树的路径
    // 通常我们会用路径来描述一个子节点
    // 比如
    // Css的选择器:#app ul li a
    //XML的xpath:/bookstore/book[price>35.00]
    //这样我们只需要直到根节点和路径就可以定位一个或多个后代


    // 构造一个先序遍历，除了返回节点外，还返回路径,比如[1,1]
    function* tree_transverse(tree,path = []) {
        yield {tree,path}
        if(tree.children) {
            for(let i =0;i<tree.children.length;i++) {
                yield *tree_transverse(tree.children[i],[...path,i])
            }
        }
    }
    // console.log([...tree_transverse(tree)])
    // 我们可以通过上述遍历查询一个节点的路径
    function find_path(y,v) {
        // {tree,path}得到的是tree_transverse这个方法执行的yield值，并且两者的变量名必须是一一对应的
        // 还有就是变量名不能喝tree_transverse里面的变量名一样，不然会报错
        for(let {tree,path} of tree_transverse(y)) {
            if(tree.v === v) {
                return path
            }
        }
    }
    // console.log(find_path(tree,2))
    // 当然我们可以根据路径反查节点(选择器)
    function find_by_path(tree,path) {
        return path.length ===0 ? tree : find_by_path(tree.children[path[0]],path.slice(1))
    }
    // console.log(find_by_path(tree,[1,1])) //Tree { v: 11, children: [ Tree { v: 3, children: null }, Tree { v: 2, children: null } ] }


//例38-选择器
// 扩展例37中的find_by_path的语法，比如支持:
// select(1,'[>5]') =>[7,11] =>[{child:1},{op:(x) =>x.v >5}]
// 标准化的选择器函数
function select(node,path) {
    if(path.length ===0 ) {return [node]}
    const p = path.shift()
    if(p.child) {
        return select(node.children[p.child],[...path])
    } else if(p.op) {
        return [...tree_transverse(node)]
        .filter(_n => p.op(_n.tree))
        .map(n =>n.tree.v)
    }
}

// 解析选择表达式:1 [>5] =>[{child:1},{op:x =>x.v >5}]
function parse_selection_exp(expr) {
    return expr.split(' ')
    // 数组的map的用法这里就用的比较灵活了
    .map(p => {
        if(p.match(/^\d+$/)){
            return {child: parseInt(p)}
        } else {
            return {
                op: eval(`(x) => x.v ${p.replace(/[\[\]]/g, '')}`)
            }
        }
    })
}

// console.log(parse_selection_exp('1 [>5]')) // [{child:1},{op:x =>x.v >5}]

function select_easy(tree,expr){
    return select(tree,parse_selection_exp(expr))
}
// console.log(select_easy(tree,'1 [>5]')) // [7,11]