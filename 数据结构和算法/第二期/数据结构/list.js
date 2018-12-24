// 链表节点

class ListNode{
    // constrcutor里面的参数是listNode这个函数执行的时候传入的
    constructor(key) {
        // 指向上一个节点的指针
        this.prev = null

        // 指向下一个节点的指针
        this.next = null

        // 节点的数据(用于查找的键)
        this.key = key
    }
}


// 链表(双向列表)
// double-link
 
class List  {
    constructor() {
        // 总是指向第一个数据节点，如果没有第一个数据节点，则指向null
        this.head = null
    }
    // static 是把createNode挂在List这个方法上，相当于把List这个方法作为一个对象，想拿到他只需要 List.createNode
    // 并不需要实例化List之后才能拿到他
    static createNode(key) {
        return new ListNode(key)
    }
    // 链表操作-插入-分三步
    // 1、头指针指向新节点
    // 2、新节点的NEXT指针指向原本的第一个节点
    // 3、原本第一个节点的PREV指针指向新节点
    /**
     * 将一个节点插入到头指针后面
     * @param {ListNode} node 
     */
    insert(node) {
        // 这种插法类似于数组的unshift方法，从前面加入表中
        // node.prev = null
        // 通过这行代码把整个链起来
        node.next = this.head
        if(this.head) {
            // 双向链表 
            this.head.prev = node
        }
        this.head = node
    }

    // 不用迭代器直接利用链表的关系写
    // search(key) {
    //     let node = this.head
    //     while(node!==null && node.key !==key) {
    //         node = node.next
    //     }
    //     return node
    // }

    // 用迭代器写
    search(key) {
        return [...this.transerve()].find(node =>node.key === key)
    }
    /**
     * 
     *顺序遍历链表 
     */
    *transerve() {
        let node = this.head
        while(node) {
            yield node
            node = node.next
        }
    }

    remove(node) {
        const {prev,next} = node
        // 建议:在不同的JS引擎内存回收机制不同
        // 这两个删除操作做也行不做也行
        delete node.prev
        delete node.next

        if(node === this.head) {
            this.head = next
        }
        // 如果前面有节点则把后面的节点往前面指、如果后面有节点则把前面的节点往后指
        if(prev){
            next.prev = prev
        }
        if(next){
           prev.next = next
        }
    }
}

module.exports = List


// 时间复杂度
// 链表
   // 插入O(1)
   // 删除O(1)
   // 遍历、搜索O(n)
   // 合并O(1)

// 数组
    // 插入O(n)
    // 删除O(n)
    // 遍历/查找O(n)
    // 合并0(n)