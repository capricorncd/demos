/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-29 20:05 (GMT+0900)
 */
function formatParams(input) {
    if (!input) return {}
    const result = {}
    let temp
    // a=1&b=222
    decodeURIComponent(input).split('&').forEach(str => {
        const [key, value] = str.split('=')
        if (!key) return
        // post array
        if (/(\w+)\[\]/.test(key)) {
            temp = RegExp.$1
            if (!result[temp]) {
                result[temp] = []
            }
            result[temp].push(value)
        } else {
            result[key] = value
        }
    })
    return result
}

module.exports = {
    formatParams,
}
