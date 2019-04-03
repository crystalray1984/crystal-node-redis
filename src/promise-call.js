'use strict'

/**
 * @param {any} obj
 * @param {string} func
 * @param {any[]} args
 */
module.exports = function promiseCall(obj, func, ...args) {
    return new Promise((resolve, reject) => {
        obj[func].call(obj, ...args, (err, resp) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(resp)
            }
        })
    })
}