/**
 * 最优化问题:
 * 简单说，最优化问题，就是在所有可能的解中求出最有可能的解。比如
 * .快递员通过地图上若干地点的最短路径
 * .骑手寻找最好的走法
 * .前端框架寻找dom树A->don树B最节省性能开销的方法
 * .工厂寻找最优的原料配比
 * 
 * 这些生活中常见的场景，会涉及一类算法问题，就是死最优化问题
 * 
 */




/**
 * N皇后问题
 * .在N*N的棋盘上又N个皇后，求一个解，让皇后不互相攻击
 * 暴力搜索
 * 四皇后问题有多少种可能的组合?
 * (16)  
 * (4)
 * ->  16!/(12!4!) = 1820
 * 
 * 八皇后问题有多少种可能的组合
 * (64)
 * (8)
 * ->  64!/(8!56!) = 247865260608
 */

function search(N) {
    return _search(0, N, [])
}

function is_solution(queens, N) {
    const v = [] // 竖直方向
    const h = [] // 水平方向
    const a1 = [] // 斜线\
    const a2 = [] // 斜线/
    for (let j = 0; j < queens.length; j++) {
        const i = queens[j]
        const x = i % N
        const y = Math.floor(i / N)
        const v1 = x + y
        const v2 = x - y + N
        v[x] = v[x] ? v[x] + 1 : 1
        h[y] = h[y] ? h[y] + 1 : 1
        a1[v1] = a1[v1] ? a1[v1] + 1 : 1
        a2[v2] = a2[v2] ? a2[v2] + 1 : 1

        if (v[x] > 1) {
            return false
        }
        if (h[y] > 1) {
            return false
        }
        if (a1[v1] > 1) {
            return false
        }
        if (a2[v2] > 1) {
            return false
        }
    }
    return true
}
/**
 * _search返回的是所有可能的解 ->[[]]
 * 
 * 
 */


function _search(start, N, queens) {
    if (queens.length === N) {
        if (is_solution(queens, N)) {
            return [queens]
        } else {
            return []
        }
    }
    let solutions = []
    for (let i = start; i < N * N; i++) {
        const _q = [...queens, i]
        solutions = solutions.concat(_search(start, N, _q))
    }
    return solutions
}

// 优化_search
function _search2(start, N, queens) {
    if (queens.length === N) {
        if (is_solution(queens, N)) {
            return [queens]
        } else {
            return []
        }
    }
    let solutions = []
    // 行号
    let j = Math.floor(start / N)

    for (let i = j * N; i < (j + 1) * N; i++) {
        const _q = [...queens, i]
        solutions = solutions.concat(_search2(i + N, N, _q))
    }
    return solutions
}

// 用迭代器写
function* _search_iterator(start, N, queens) {
    if (queens.length === N) {
        if (is_solution(queens)) {
            yield [queens]
        }
        return
    }
    for (let i = start; i < N * N; i++) {
        const _q = [...queens, i]
        yield* _search(start, N, _q)
    }
}


module.exports = search