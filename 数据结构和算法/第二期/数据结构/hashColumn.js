// v8运行环境如果发现数组是稀疏的，就会用一个散列结构去存储粗数组;
// 如果发现数组是连续的，就会用连续的内部实现

/**
 * 
 * 散列函数的特点
 * 一致性:对同一个k，散列值相同
 * 高效性:计算快
 * 均匀性:能够所有键平均分配到[0.M-1]间
 * 
 */

/**
 * 常用的散列函数
 * 1、处理函数: k=>k % M
 * 2、处理浮点数: k=>binary_value(k) % M
 * 处理字符串:
 */
function h_str(str,M) {
    return [...str].reduce((hash,c) => {
        // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
        // stringObject.charCodeAt(index)：index必须；表示字符串中某个位置的数字，即字符在字符串中的下标。
        // var str = "Hello world"
        // console.log(str.charCodeAt(2))->108
        hash=(31*hash + c.charCodeAt(0))%M
        return hash
    },0)
}

function binary_value(val) {
    // byte = 8bit
    // Number : 4byte 32bit
    const farr = new Float32Array(1)
    farr[0] = val
    const intBytes = new Int8Array(farr.buffer)
    const view = new DataView(intBytes.buffer)
    return view.getUint32()
}
