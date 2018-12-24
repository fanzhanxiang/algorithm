// 例子39-css选择器(无聊的时候可以写一个)
// 树的抽象表示
class DOMtree{
    constructor(tag,className,children=[]) {
        this.tag = tag
        this.className = className
        this.children = children
    }
}
const tree = new DOMtree('div','',[
    new DOMtree('div','content',[
        new DOMtree('table','content',[
            new DOMtree('tr','',[
                new DOMtree('td','',[
                    new DOMtree('text','',null,'1')
                ]),
                new DOMtree('td','',[
                    new DOMtree('text','',null,'2')
                ]),
                new DOMtree('td','',[
                    new DOMtree('text','',null,'2')
                ])
            ])
        ])
    ])
])

// 节点的遍历/查找方法(可以随便用这个方法在随便一个页面上查找一下比如[...transverse(document.body)].length)
function *transverse(node) {
    yield node
    if(node.children) {
        for(let i =0;i<node.children.length;i++) {
            yield *transverse(node.children[i])
        }
    }
}
// console.log([...transverse(tree)])
function findByClassName(node,className) {
    return [...transverse(node)].filter(node => node.className == className)
}
// console.log(findByClassName(tree,'content'))
function findByTagName(node,tagName) {
    return [...transverse(node)].filter(node => node.tag == tagName)
}
// console.log(findByTagName(tree,'td'))
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
// console.log(selection_expr_parse('.content tr td'))
// '.content tr td'=>
// [{className: 'content'},{tagName:'tr'},{tagName: 'td'}]


function select(node,path) {
    // 最终这个select方法的出口在这里
    if(path.length ===0) {return [node]}
    const p = path.shift()
    let nodes =[]
    if(p.className) {
        nodes = findByClassName(node,p.className)
    } else {
        nodes = findByTagName(node,p.tagName)
        console.log(nodes)
    }
    return [].concat(
        ...nodes.map(n =>select(n,[...path]))
    )
}
// select(tree,[{className: 'content'},{tagName:'tr'},{tagName: 'td'}])
// console.log(select(tree,[{className: 'content'},{tagName:'tr'},{tagName: 'td'}]))
// select这个方法最终打出六个td是因为有两个className是content元素，每一个元素执行了一一次select方法
// 每一个返回的都是三个相同的td，最后通过concat拼接在了一起，所以最后打出了六个td，实际上应该打出的是三个
// 所以这个算法的设计是存在一些问题的


// 性能和思考
// 对className和tagName进行倒排，获得索引对象，相当于是先拿到某个有className的或者是tagName的
function index(tree) {
  const classes = {}
  const nodes = [...transverse(tree)]
  nodes.forEach(node => {
      // 这里面还可以做很多判断、比如说是tagName或者是id等等
      if(node.className){
        if(!classes[node.className]) {
            classes[node.className] = []
        }
        classes[node.className].push(node)
      }
  })
  return classes
}
// console.log(index(tree))