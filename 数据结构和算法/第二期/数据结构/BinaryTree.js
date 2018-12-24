const BinaryTreeNode = require('./BinaryTreeNode')
class BinaryTree {
    constructor() {
        // root指针
        this.root = null
    }

    insert(key,value) {
        const node = new BinaryTreeNode(key,value)
        let p = this.root

        // 尾指针(用来决定在插入的时候在哪里开始插入)
        let tail = this.root
        while(tail) {

            p = tail // p是跟着节点变的，决定后面再插入的时候在那里开始插入

            if(tail && key < tail.key) {
                tail = tail.left
            } else {
            // if(tail.right && key > tail.key) {
                tail = tail.right
            // }
            }
        }
        if(!p) {
           this.root = node
           return
        }

        //插入
        if(p.key < key) {
            p.right = node
        } else {
            p.left = node
        }
        // 不管往做插入还是右插入，node.p=p ;即他的父节点都应该指向这个节点
        node.p = p
        node.level = (p.level + 1) // 这里是给这棵树加一个层级

    }

    // 用中序迭代
    transverse() {
        return this._transverse(this.root)
    }

    // 用中序迭代(迭代出来的是一个有序数组)
    *_transverse (node) {
        if(!node) {return}
        // 先迭代左边，返回的是node
        yield * this._transverse(node.left)
        yield  node
        // 再迭代右边，返回的也是node
        yield * this._transverse(node.right)
    }
}
module.exports = BinaryTree