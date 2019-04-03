'use strict'

const promiseCall = require('./promise-call')
const commands = require('./commands')

/**
 * 提供基础查询方法的类
 */
class Connection {
    constructor(client) {
        this.client = client
    }

    __query(name, ...args) {
        while (args.length > 0 && (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'undefined')) {
            args.pop()
        }

        return promiseCall(this.client, name, ...args)
    }
}

commands.forEach(item => {
    Connection.prototype[item.cmd] = function (...args) {
        return this.__query(item.cmd, ...args)
    }
})

module.exports = Connection