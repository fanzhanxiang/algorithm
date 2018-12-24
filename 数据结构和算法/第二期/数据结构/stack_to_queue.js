const Stack = require('./stack')
// const Queue = require('./queue')

// stack1:用于入队
// stack2:用于出队


class Queue{
    constructor(max) {
        this.s1 = new  Stack(max)
        this.s2 = new Stack(max) 
    }
    enqueue(x) {
        this.s1.push(x)
    }
    dequeue() {
        if(this.s2.length>0){return this.s2.pop()}// 这行代码主要是用来做性能优化
        while(this.s1.length) {
            this.s2.push(this.s1.pop())
        }
        
        return this.s2.pop()
    }
}

module.exports = Queue