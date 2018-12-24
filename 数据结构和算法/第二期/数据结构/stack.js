// 什么是数据结构
// .一种组织和存储数据的方式
// .让数据更方便的被获取和修改
// 数据结构包括:数据的结合、数据之间的关系和应用在数据上的方法和操作



// 堆栈的性质 
// .两个操作PUSH/POP
// .LIFO
// POP(栈顶) Underflow
// Push(栈顶) Overflow


// 堆栈(先入后出)
class Stack{

	constructor(max=1000) {
		// 空间
		this.data = new Array(max)

		// 栈顶(栈指针)
        this.top = -1
        this.max = max
	}
	push(x) {
		if(this.top === this.max-1){
			throw 'overflow'
		}
		this.top++
		this.data[this.top] = x
	}

	pop() {
		if(this.top === -1){throw 'underflow'}
		const x = this.data[this.top]
        this.top --
        return x
	}

    get length() {
        return this.top + 1
    }

}

module.exports = Stack