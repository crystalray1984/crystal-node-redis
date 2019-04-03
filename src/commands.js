'use strict'

module.exports = [
    {
        cmd: "append",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "auth",
        scope: ['single']
    },
    {
        cmd: "bgrewriteaof",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "bgsave",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "bitcount",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "bitop",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "blpop",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "brpop",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "brpoplpush",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: 'client',
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "config",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "dbsize",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "debug",
        scope: ['single']
    },
    {
        cmd: "decr",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "decrby",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "del",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "discard",
        scope: ['multi']
    },
    {
        cmd: "dump",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "echo",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "eval",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "evalsha",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "exec",
        scope: ['multi']
    },
    {
        cmd: "exists",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "expire",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "expireat",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "flushall",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "flushdb",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "get",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "getbit",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "getrange",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "getset",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hdel",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hexists",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hget",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hgetall",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hincrby",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hincrbyfloat",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hkeys",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hlen",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hmget",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hmset",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hscan",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hset",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hsetnx",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "hvals",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "incr",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "incrby",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "incrbyfloat",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "info",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "keys",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lastsave",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lindex",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "linsert",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "llen",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lpop",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lpush",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lpushx",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lrange",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lrem",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "lset",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "ltrim",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "mget",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "migrate",
        scope: ['pool', 'multi', 'single']
    },
    // {
    //     cmd: "monitor",
    //     scope: ['pool', 'multi', 'single']
    // },
    {
        cmd: "move",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "mset",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "msetnx",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "multi",
        scope: ['single']
    },
    {
        cmd: "object",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "persist",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "pexpire",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "pexpireat",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "ping",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "psetex",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "psubscribe",
        scope: ['single']
    },
    {
        cmd: "psync",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "pttl",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "publish",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "pubsub",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "punsubscribe",
        scope: ['single']
    },
    {
        cmd: "quit",
        scope: ['single']
    },
    {
        cmd: "randomkey",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "rename",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "renamenx",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "restore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "rpop",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "rpoplpush",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "rpush",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "rpushx",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sadd",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "save",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "scan",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "scard",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "script",
        scope: ['pool', 'single']
    },
    {
        cmd: "sdiff",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sdiffstore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "select",
        scope: ['single']
    },
    {
        cmd: "set",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "setbit",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "setex",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "setnx",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "setrange",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "shutdown",
        scope: ['single']
    },
    {
        cmd: "sinter",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sinterstore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sismember",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "slaveof",
        scope: ['single']
    },
    {
        cmd: "slowlog",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "smembers",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "smove",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sort",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "spop",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "srandmember",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "srem",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sscan",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "strlen",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "subscribe",
        scope: ['single']
    },
    {
        cmd: "sunion",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sunionstore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "sync",
        scope: ['single']
    },
    {
        cmd: "time",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "ttl",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "type",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "unsubscribe",
        scope: ['single']
    },
    {
        cmd: "unwatch",
        scope: ['multi']
    },
    {
        cmd: "watch",
        scope: ['multi']
    },
    {
        cmd: "zadd",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zcard",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zcount",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zincrby",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zinterstore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zrange",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zrangebyscore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zrank",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zrem",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zremrangebyrank",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zremrangebyscore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zrevrange",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zrevrangebyscore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zrevrank",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zscan",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zscore",
        scope: ['pool', 'multi', 'single']
    },
    {
        cmd: "zunionstore",
        scope: ['pool', 'multi', 'single']
    }
]