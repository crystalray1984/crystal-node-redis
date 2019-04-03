'use strict'

const Redis = require('../src')

const pool = Redis({})
pool.ping().then(resp => {
    console.log(resp)
})

pool.hlen()