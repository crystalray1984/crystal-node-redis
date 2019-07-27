'use strict'

const promiseCall = require('./promise-call')
const Connection = require('./connection')
const Multi = require('./multi')
const { EventEmitter } = require('events')

class Client extends Connection {
    get connected() {
        return this.client.connected
    }

    get command_queue_length() {
        return this.client.command_queue_length
    }

    get offline_queue_length() {
        return this.client.offline_queue_length
    }

    get retry_delay() {
        return this.client.retry_delay
    }

    get retry_backoff() {
        return this.client.retry_backoff
    }

    get command_queue() {
        return this.client.command_queue
    }

    get offline_queue() {
        return this.client.offline_queue
    }

    get connection_id() {
        return this.client.connection_id
    }

    get server_info() {
        return this.client.server_info
    }

    get stream() {
        return this.client.stream
    }

    auth(...args) {
        return promiseCall(this.client, 'auth', ...args)
    }

    debug(...args) {
        return promiseCall(this.client, 'debug', ...args)
    }

    monitor(...args) {
        return promiseCall(this.client, 'debug', ...args)
    }

    psubscribe(...args) {
        return promiseCall(this.client, 'psubscribe', ...args)
    }

    punsubscribe(...args) {
        return promiseCall(this.client, 'punsubscribe', ...args)
    }

    async quit() {
        await promiseCall(this.client, 'quit', ...args)
        this.client.end()
    }

    select(...args) {
        return promiseCall(this.client, 'select', ...args)
    }

    shutdown(...args) {
        return promiseCall(this.client, 'shutdown', ...args)
    }

    slaveof(...args) {
        return promiseCall(this.client, 'slaveof', ...args)
    }

    subscribe(...args) {
        return promiseCall(this.client, 'subscribe', ...args)
    }

    sync(...args) {
        return promiseCall(this.client, 'sync', ...args)
    }

    unsubscribe(...args) {
        return promiseCall(this.client, 'unsubscribe', ...args)
    }

    multi() {
        return new Multi(this.client.multi())
    }
}

Object.getOwnPropertyNames(EventEmitter.prototype).forEach(name => {
    if (typeof EventEmitter.prototype[name] === 'function') {
        Client.prototype[name] = function (...args) {
            return this.client[name].call(this.client, ...args)
        }
    }
})

module.exports = Client