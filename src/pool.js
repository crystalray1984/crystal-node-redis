'use strict'

const Redis = require('redis')
const PoolFactory = require('generic-pool')
const Connection = require('./connection')
const Client = require('./client')

/**
 * 连接池
 */
class Pool extends Connection {
    constructor(options) {
        super()
        this.options = options
        this.pool = PoolFactory.createPool({
            create: async () => {
                return Redis.createClient(options)
            },

            destroy: async client => {
                client.end()
            },

            validate: client => {
                return new Promise((resolve) => {
                    client.ping('OK', (err, resp) => {
                        if (err) {
                            resolve(false)
                        }
                        else {
                            resolve(resp === 'OK')
                        }
                    })
                })
            }
        }, options)
    }

    async quit() {
        await this.pool.clear()
        return 'OK'
    }

    __query(name, ...args) {
        return new Promise((resolve, reject) => {
            this.pool.acquire().then(async client => {
                const conn = new Connection(client)
                let resp, error
                try {
                    resp = await conn.__query(name, ...args)
                }
                catch (err) {
                    error = err
                }
                finally {
                    await this.pool.release(client)
                }

                if (error) {
                    reject(error)
                }
                else {
                    resolve(resp)
                }
            }).catch(reject)
        })
    }

    createClient() {
        return new Client(Redis.createClient(this.options))
    }
}

module.exports = Pool