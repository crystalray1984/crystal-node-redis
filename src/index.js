'use strict'

const Redis = require('redis')
const Pool = require('./pool')
const Client = require('./client')

function createPool(options) {
    return new Pool(options)
}

function createClient(options) {
    //const client = Redis.createClient(options)
    return new Client(Redis.createClient(options))
}

module.exports = createPool
module.exports.createPool = createPool
module.exports.createClient = createClient
Object.defineProperty(module.exports, 'debug_mode', {
    get() {
        return Redis.debug_mode
    },
    set(v) {
        Redis.debug_mode = v
    }
})