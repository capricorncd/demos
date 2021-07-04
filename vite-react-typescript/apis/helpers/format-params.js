/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-29 20:05 (GMT+0900)
 */
function formatParams(input) {
    if (!input) return {}
    try {
        return JSON.parse(input)
    } catch (e) {
        return input
    }
}

module.exports = {
    formatParams,
}
