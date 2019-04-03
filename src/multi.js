'use strict'

const Connection = require('./connection')
const promiseCall = require('./promise-call')

/**
 * 事务查询对象
 */
class Multi extends Connection {
    watch(...args) {
        return promiseCall(this.client, 'watch', ...args)
    }

    unwatch(...args) {
        return promiseCall(this.client, 'unwatch', ...args)
    }

    exec() {
        return promiseCall(this.client, 'exec')
    }

    discard() {
        return promiseCall(this.client, 'discard')
    }
}

module.exports = Multi