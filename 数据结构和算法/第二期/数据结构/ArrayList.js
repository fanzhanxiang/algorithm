/**
 * 用数组存储链表、同时保持数组和链表的特性
 * (内存的分配)
 */

class ArrayList {
    constructor(max = 1000) {
        this.data = new Array(max * 3)

        // 头指针
        this.head = null

        // 初始化free链表
        this.free = 0
        // 每隔三个设置一个值(用于拿到后面的free)
        for (let i = 0; i < max - 1; i++) {
            this.data[i * 3] = (i + 1) * 3
        }

        // free链表最后一个节点的next指向null
        this.data[(max - 1) * 3] = null
    }

    malloc() {
        if(this.free === null) {
            // 内存溢出
            throw 'out of memory'
        }
        const x = this.free

        // this.data[0]->3
        this.free = this.data[this.free]
        return x
    }

    mfree(addr) {
        // 下次再插入的时候吧这个内存地址在利用起来，
        //  因为删除的时候为了不删除改变数组的结构是没有删除原来的数组对应的索引的
        // 那怎么利用起来了，就是把原来free的值放在这里，把新的free值设置为addr，方便在insert的时候拿到
        this.data[addr] = this.free
        this.free = addr
    }

    insert(key) {
        const addr = this.malloc()
        this.data[addr] = this.head // node.next = head
        this.data[addr + 2] = null // node.prev = null
        this.data[addr + 1] = key

        // 如果头节点存在,则拿到下一个节点的索引
        if(this.head !== null) {
            this.data[this.head + 2] = addr
        }

        this.head = addr
    }

    search(key) {
        // 模板代码
        return [...this.transverse()].find(k => k === key)
    }
    *transverse() {
        let p = this.head

        while(p !== null) {
            yield this.data[p + 1]
            p = this.data[p]
        }
    }


    delete(addr) {

        // 维护链表关系， 通过数组的索引的关系来维持链表关系
        // 链表后面插入的元素都是从头的下一个元素开始插的，所以按照查找的逻辑的来说最先插入的元素在链表的最后，
        const next = this.data[addr]
        const prev = this.data[addr + 2]
         
        if(prev !== null) {
            this.data[prev] = next
        }

        if(next !== null) {
            this.data[next + 2] = prev
        }

        // 内存回收
        this.mfree(addr)
    }

}
module.exports = ArrayList