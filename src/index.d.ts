import Redis from 'redis'
import { EventEmitter } from 'events'
import { Duplex } from 'stream'
import * as GenericPool from 'generic-pool'

declare namespace NodeRedis {
    interface OverloadedCommand<T, U> {
        (...args: T[]): Promise<U>
    }

    interface OverloadedKeyCommand<T, U> {
        (key: string, ...args: T[]): Promise<U>
    }

    interface OverloadedListCommand<T, U> {
        (...args: T[]): Promise<U>
    }

    interface OverloadedSetCommand<T, U> {
        (key: string, ...args: Array<T>): Promise<U>
    }

    interface OverloadedLastCommand<T1, T2, U> {
        (arg1: T1, last_arg: T2): Promise<U>
        (arg1: T1, arg2: T1, last_arg: T2): Promise<U>
        (arg1: T1, arg2: T1, arg3: T1, last_arg: T2): Promise<U>
        (arg1: T1, arg2: T1, arg3: T1, arg4: T1, last_arg: T2): Promise<U>
        (...args: Array<T1 | T2>): Promise<U>
    }

    type CommandInfo = [string, number, string[], number, number, number]

    interface Connection {
        /**
         * Append a value to a key
         */
        append(key: string, value: string): Promise<number>

        /**
         * Asynchronously rewrite the append-only file.
         */
        bgrewriteaof(): Promise<'OK'>

        /**
         * Asynchronously save the dataset to disk.
         */
        bgsave(): Promise<string>

        /**
         * Count set bits in a string
         */
        bitcount(key: string): Promise<number>
        bitcount(key: string, start: number, end: number): Promise<number>

        /**
         * Perform arbitrary bitfield integer operations on strings.
         */
        bitfield: OverloadedKeyCommand<string | number, [number, number]>

        /**
         * Perform bitwise operations between strings.
         */
        bitop(operation: 'AND' | 'OR' | 'XOR', destkey: string, key: string, ...keys: string[]): Promise<number>
        bitop(operation: 'NOT', destkey: string, key: string): Promise<number>

        /**
         * Find first bit set or clear in a string.
         */
        bitpos(key: string, bit: number, start?: number, end?: number): Promise<number>

        /**
         * Remove and get the first element in a list, or block until one is available.
         */
        blpop: OverloadedLastCommand<string, number, [string, string]>

        /**
         * Remove and get the last element in a list, or block until one is available.
         */
        brpop: OverloadedLastCommand<string, number, [string, string]>

        /**
         * Pop a value from a list, push it to another list and return it; or block until one is available.
         */
        brpoplpush(source: string, destination: string, timeout: number): Promise<string>

        /**
         * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available
         */
        bzpopmin: OverloadedLastCommand<string, number, [string, string, string]>

        /**
         * Remove and return the member with the highest score from one or more sorted sets, or block until one is available
         */
        bzpopmax: OverloadedLastCommand<string, number, [string, string, string]>

        command(action: 'COUNT'): Promise<number>
        command(action: 'INFO', command_name: string, ...command_names: string[]): Promise<CommandInfo[]>
        command(): Promise<CommandInfo[]>
        command(command: string): Promise<string[]>

        config(action: 'GET', pattern: string): Promise<string[]>
        config(action: 'RESETSTAT'): Promise<'OK'>
        config(action: 'REWRITE'): Promise<'OK'>
        config(action: 'SET', key: string, value: string): Promise<'OK'>

        /**
         * Return the number of keys in the currently-selected database
         */
        dbsize(): Promise<number>

        /**
         * Decrement the integer value of a key by one.
         */
        decr(key: string): Promise<number>

        /**
         * Decrement the integer value of a key by the given number.
         */
        decrby(key: string, decrement: number): Promise<number>

        /**
         * Delete a key.
         */
        del: OverloadedCommand<string, number>

        /**
         * Return a serialized version of the value stored at the specified key.
         */
        dump(key: string): Promise<string>

        /**
         * Echo the given string.
         */
        echo(message: string): Promise<string>

        /**
         * Execute a Lua script server side.
         */
        eval(script: string, numkeys: number, ...key_arg: string[]): Promise<any>

        /**
         * Execute a Lue script server side.
         */
        evalsha(sha1: string, numkeys: number, ...key_arg: string[]): Promise<any>

        /**
         * Determine if a key exists.
         */
        exists: OverloadedCommand<string, number>

        /**
         * Set a key's time to live in seconds.
         */
        expire(key: string, seconds: number): Promise<number>

        /**
         * Set the expiration for a key as a UNIX timestamp.
         */
        expireat(key: string, timestamp: number): Promise<number>

        /**
         * Remove all keys from all databases.
         */
        flushall(async?: 'ASYNC'): Promise<'OK'>

        /**
         * Remove all keys from the current database.
         */
        flushdb(async?: 'ASYNC'): Promise<'OK'>

        /**
         * Add one or more geospatial items in the geospatial index represented using a sorted set.
         */
        geoadd: OverloadedKeyCommand<string | number, number>

        /**
         * Returns members of a geospatial index as standard geohash strings.
         */
        geohash: OverloadedKeyCommand<string, string>

        /**
         * Returns longitude and latitude of members of a geospatial index.
         */
        geopos: OverloadedKeyCommand<string, Array<[number, number]>>

        /**
         * Returns the distance between two members of a geospatial index.
         */
        geodist: OverloadedKeyCommand<string, string>

        /**
         * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.
         */
        georadius: OverloadedKeyCommand<string | number, Array<string | [string, string | [string, string]]>>

        /**
         * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member.
         */
        georadiusbymember: OverloadedKeyCommand<string | number, Array<string | [string, string | [string, string]]>>

        /**
         * Get the value of a key.
         */
        get(key: string): Promise<string>

        /**
         * Returns the bit value at offset in the string value stored at key.
         */
        getbit(key: string, offset: number): Promise<number>

        /**
         * Get a substring of the string stored at a key.
         */
        getrange(key: string, start: number, end: number): Promise<string>

        /**
         * Set the string value of a key and return its old value.
         */
        getset(key: string, value: string): Promise<string>

        /**
         * Delete on or more hash fields.
         */
        hdel: OverloadedKeyCommand<string, number>

        /**
         * Determine if a hash field exists.
         */
        hexists(key: string, field: string): Promise<number>

        /**
         * Get the value of a hash field.
         */
        hget(key: string, field: string): Promise<string>

        /**
         * Get all fields and values in a hash.
         */
        hgetall(key: string): Promise<{ [key: string]: string }>

        /**
         * Increment the integer value of a hash field by the given number.
         */
        hincrby(key: string, field: string, increment: number): Promise<number>

        /**
         * Increment the float value of a hash field by the given amount.
         */
        hincrbyfloat(key: string, field: string, increment: number): Promise<string>

        /**
         * Get all the fields of a hash.
         */
        hkeys(key: string): Promise<string[]>

        /**
         * Get the number of fields in a hash.
         */
        hlen(key: string): Promise<number>

        /**
         * Get the values of all the given hash fields.
         */
        hmget: OverloadedKeyCommand<string, string[]>

        /**
         * Set multiple hash fields to multiple values.
         */
        hmset: OverloadedSetCommand<string, 'OK'>

        /**
         * Set the string value of a hash field.
         */
        hset(key: string, field: string, value: string): Promise<number>

        /**
         * Set the value of a hash field, only if the field does not exist.
         */
        hsetnx(key: string, field: string, value: string): Promise<number>

        /**
         * Get the length of the value of a hash field.
         */
        hstrlen(key: string, field: string): Promise<number>

        /**
         * Get all the values of a hash.
         */
        hvals(key: string): Promise<string[]>

        /**
         * Increment the integer value of a key by one.
         */
        incr(key: string): Promise<number>

        /**
         * Increment the integer value of a key by the given amount.
         */
        incrby(key: string, increment: number): Promise<number>

        /**
         * Increment the float value of a key by the given amount.
         */
        incrbyfloat(key: string, increment: number): Promise<number>

        /**
         * Get information and statistics about the server.
         */
        info(section?: string): Promise<Redis.ServerInfo>

        /**
         * Find all keys matching the given pattern.
         */
        keys(pattern: string): Promise<string[]>

        /**
         * Get the UNIX time stamp of the last successful save to disk.
         */
        lastsave(): Promise<number>

        /**
         * Get an element from a list by its index.
         */
        lindex(key: string, index: number): Promise<string>

        /**
         * Insert an element before or after another element in a list.
         */
        linsert(key: string, dir: 'BEFORE' | 'AFTER', pivot: string, value: string): Promise<string>

        /**
         * Get the length of a list.
         */
        llen(key: string): Promise<number>

        /**
         * Remove and get the first element in a list.
         */
        lpop(key: string): Promise<string>

        /**
         * Prepend one or multiple values to a list.
         */
        lpush: OverloadedKeyCommand<string, number>

        /**
         * Prepend a value to a list, only if the list exists.
         */
        lpushx(key: string, value: string): Promise<number>

        /**
         * Get a range of elements from a list.
         */
        lrange(key: string, start: number, stop: number): Promise<string[]>

        /**
         * Remove elements from a list.
         */
        lrem(key: string, count: number, value: string): Promise<number>

        /**
         * Set the value of an element in a list by its index.
         */
        lset(key: string, index: number, value: string): Promise<'OK'>

        /**
         * Trim a list to the specified range.
         */
        ltrim(key: string, start: number, stop: number): Promise<'OK'>

        /**
         * Get the values of all given keys.
         */
        mget: OverloadedCommand<string, string[]>

        /**
         * Atomically tranfer a key from a Redis instance to another one.
         */
        migrate: OverloadedCommand<string, string>

        /**
         * Move a key to another database.
         */
        move(key: string, db: string | number): Promise<number>

        /**
         * Set multiple keys to multiple values.
         */
        mset: OverloadedCommand<string, 'OK'>

        /**
         * Set multiple keys to multiple values, only if none of the keys exist.
         */
        msetnx: OverloadedCommand<string, 'OK'>

        /**
         * returns the number of references of the value associated with the specified key
         */
        object(subcommand: 'REFCOUNT', key: string): Promise<number>

        /**
         * returns the number of seconds since the object stored at the specified key is idle (not requested by read or write operations).
         */
        object(subcommand: 'IDLETIME', key: string): Promise<number>

        /**
         * returns the kind of internal representation used in order to store the value associated with a key.
         */
        object(subcommand: 'ENCODING', key: string): Promise<string>

        /**
         * returns the logarithmic access frequency counter of the object stored at the specified key.
         */
        object(subcommand: 'FREQ', key: string): Promise<number>

        /**
         * returns a succint help text.
         */
        object(subcommand: 'HELP'): Promise<string>

        /**
         * Remove the expiration from a key.
         */
        persist(key: string): Promise<number>

        /**
         * Remove a key's time to live in milliseconds.
         */
        pexpire(key: string, milliseconds: number): Promise<number>

        /**
         * Set the expiration for a key as a UNIX timestamp specified in milliseconds.
         */
        pexpireat(key: string, millisecondsTimestamp: number): Promise<number>

        /**
         * Adds the specified elements to the specified HyperLogLog.
         */
        pfadd: OverloadedKeyCommand<string, number>

        /**
         * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
         */
        pfcount: OverloadedCommand<string, number>

        /**
         * Merge N different HyperLogLogs into a single one.
         */
        pfmerge: OverloadedKeyCommand<string, 'OK'>

        /**
         * Ping the server.
         */
        ping(message?: string): Promise<string>

        /**
         * Set the value and expiration in milliseconds of a key.
         */
        psetex(key: string, milliseconds: number, value: string): Promise<'OK'>

        /**
         * Get the time to live for a key in milliseconds.
         */
        pttl(key: string): Promise<number>

        /**
         * Lists the currently active channels.
         */
        pubsub(subcommand: 'CHANNELS', pattern?: string): Promise<number>

        /**
         * Returns the number of subscribers (not counting clients subscribed to patterns) for the specified channels.
         */
        pubsub(subcommand: 'NUMSUB', ...channels: string[]): Promise<string[]>

        /**
         * Returns the number of subscriptions to patterns (that are performed using the PSUBSCRIBE command).
         */
        pubsub(subcommand: 'NUMPAT'): Promise<number>

        /**
         * Post a message to a channel.
         */
        publish(channel: string, value: string): Promise<number>

        /**
         * Return a random key from the keyspace.
         */
        randomkey(): Promise<string>

        /**
         * Rename a key.
         */
        rename(key: string, newkey: string): Promise<'OK'>

        /**
         * Rename a key, only if the new key does not exist.
         */
        renamenx(key: string, newkey: string): Promise<number>

        /**
         * Create a key using the provided serialized value, previously obtained using DUMP.
         */
        restore(key: string, ttl: number, serializedValue: string): Promise<'OK'>

        /**
         * Return the role of the instance in the context of replication.
         */
        role(): Promise<[string, number, Array<[string, string, string]>]>

        /**
         * Remove and get the last element in a list.
         */
        rpop(key: string): Promise<string>

        /**
         * Remove the last element in a list, prepend it to another list and return it.
         */
        rpoplpush(source: string, destination: string): Promise<string>

        /**
         * Append one or multiple values to a list.
         */
        rpush: OverloadedKeyCommand<string, number>

        /**
         * Append a value to a list, only if the list exists.
         */
        rpushx(key: string, value: string): Promise<string>

        /**
         * Append one or multiple members to a set.
         */
        sadd: OverloadedKeyCommand<string, number>

        /**
         * Synchronously save the dataset to disk.
         */
        save(): Promise<string>

        /**
         * Get the number of members in a set.
         */
        scard(key: string): Promise<number>

        /**
         * Set the debug mode for executed scripts.
         */
        script(subcommand: 'DEBUG', value: 'YES' | 'SYNC' | 'NO'): Promise<'OK'>
        /**
         * Check existence of scripts in the script cache.
         */
        script(subcommand: 'EXISTS', ...sha1: string[]): Promise<number[]>
        /**
         * Remove all scripts from the script cache.
         */
        script(subcommand: 'FLUSH'): Promise<string>
        /**
         * Kill the script currently in execution.
         */
        script(subcommand: 'KILL'): Promise<string>
        /**
         * Load the specified Lua script into the script cache.
         */
        script(subcommand: 'LOAD', script: string): Promise<string>

        /**
         * Subtract multiple sets.
         */
        sdiff: OverloadedKeyCommand<string, string[]>

        /**
         * Subtract multiple sets and store the resulting set in a key.
         */
        sdiffstore(destination: string, key: string, ...otherkeys: string[]): Promise<number>

        /**
         * Set the string value of a key.
         */
        set(key: string, value: string): Promise<'OK'>
        set(key: string, value: string, flag: string): Promise<'OK'>
        set(key: string, value: string, mode: string, duration: number): Promise<'OK' | undefined>
        set(key: string, value: string, mode: string, duration: number, flag: string): Promise<'OK' | undefined>

        /**
         * Sets or clears the bit at offset in the string value stored at key.
         */
        setbit(key: string, offset: number, value: string): Promise<number>

        /**
         * Set the value and expiration of a key.
         */
        setex(key: string, seconds: number, value: string): Promise<string>

        /**
         * Set the value of a key, only if the key does not exist.
         */
        setnx(key: string, value: string): Promise<number>

        /**
         * Overwrite part of a string at key starting at the specified offset.
         */
        setrange(key: string, offset: number, value: string): Promise<number>

        /**
         * Intersect multiple sets.
         */
        sinter: OverloadedKeyCommand<string, string[]>

        /**
         * Intersect multiple sets and store the resulting set in a key.
         */
        sinterstore(destination: string, key: string, ...otherkeys: string[]): Promise<number>

        /**
         * Determine if a given value is a member of a set.
         */
        sismember(key: string, member: string): Promise<number>

        /**
         * Manages the Redis slow queries log.
         */
        slowlog: OverloadedCommand<string, Array<[number, number, number, string[]]>>

        /**
         * Get all the members in a set.
         */
        smembers(key: string): Promise<string[]>

        /**
         * Move a member from one set to another.
         */
        smove(source: string, destination: string, member: string): Promise<number>

        /**
         * Sort the elements in a list, set or sorted set.
         */
        sort: OverloadedKeyCommand<string, string[]>

        /**
         * Remove and return one or multiple random members from a set.
         */
        spop(key: string): Promise<string>
        spop(key: string, count: number): Promise<string[]>

        /**
         * Get one or multiple random members from a set.
         */
        srandmember(key: string): Promise<string>
        srandmember(key: string, count: number): Promise<string[]>

        /**
         * Remove one or more members from a set.
         */
        srem: OverloadedKeyCommand<string, number>

        /**
         * Get the length of the value stored in a key.
         */
        strlen(key: string): Promise<number>

        /**
         * Add multiple sets.
         */
        sunion: OverloadedKeyCommand<string, string[]>

        /**
         * Add multiple sets and store the resulting set in a key.
         */
        sunionstore(destination: string, key: string, ...otherkeys: string[]): Promise<number>

        /**
         * Return the current server time.
         */
        time(): Promise<[string, string]>

        /**
         * Get the time to live for a key.
         */
        ttl(key: string): Promise<number>

        /**
         * Determine the type stored at key.
         */
        type(key: string): Promise<string>

        /**
         * Add one or more members to a sorted set, or update its score if it already exists.
         */
        zadd: OverloadedKeyCommand<string | number, number>

        /**
         * Get the number of members in a sorted set.
         */
        zcard(key: string): Promise<number>

        /**
         * Count the members in a sorted set with scores between the given values.
         */
        zcount(key: string, min: number | string, max: number | string): Promise<number>

        /**
         * Increment the score of a member in a sorted set.
         */
        zincrby(key: string, increment: number, member: string): Promise<string>

        /**
         * Intersect multiple sorted sets and store the resulting sorted set in a new key.
         */
        zinterstore(destination: string, numkeys: number, key: string, ...otherkeys: string[]): Promise<number>

        /**
         * Count the number of members in a sorted set between a given lexicographic range.
         */
        zlexcount(key: string, min: string, max: string): Promise<number>

        /**
         * Remove and return members with the highest scores in a sorted set
         */
        zpopmax(key: string, count?: number): Promise<Array<number | string>>

        /**
         * Remove and return members with the lowest scores in a sorted set
         */
        zpopmin(key: string, count?: number): Promise<Array<number | string>>

        /**
         * Return a range of members in a sorted set, by index.
         */
        zrange(key: string, start: number, stop: number, withscores?: 'WITHSCORES'): Promise<string[]>

        /**
         * Return a range of members in a sorted set, by lexicographical range.
         */
        zrangebylex(key: string, min: string, max: string): Promise<string[]>
        zrangebylex(key: string, min: string, max: string, limit: string, offset: number, count: number): Promise<string[]>

        /**
         * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
         */
        zrevrangebylex(key: string, min: string, max: string): Promise<string[]>
        zrevrangebylex(key: string, min: string, max: string, limit: string, offset: number, count: number): Promise<string[]>

        /**
         * Return a range of members in a sorted set, by score.
         */
        zrangebyscore(key: string, start: number | string, stop: number | string, withscores?: 'WITHSCORES'): Promise<string[]>

        /**
         * Determine the index of a member in a sorted set.
         */
        zrank(key: string, member: string): Promise<number | undefined>

        /**
         * Remove one or more members from a sorted set.
         */
        zrem: OverloadedKeyCommand<string, number>

        /**
         * Remove all members in a sorted set between the given lexicographical range.
         */
        zremrangebylex(key: string, min: string, max: string): Promise<number>

        /**
         * Remove all members in a sorted set within the given indexes.
         */
        zremrangebyrank(key: string, start: number, stop: number): Promise<number>

        /**
         * Remove all members in a sorted set within the given indexes.
         */
        zremrangebyscore(key: string, min: string | number, max: string | number): Promise<number>

        /**
         * Return a range of members in a sorted set, by index, with scores ordered from high to low.
         */
        zrevrange(key: string, start: number, stop: number, withscores?: 'WITHSCORES'): Promise<string[]>

        /**
         * Return a range of members in a sorted set, by score, with scores ordered from high to low.
         */
        zrevrangebyscore(key: string, start: number | string, stop: number | string, withscores?: 'WITHSCORES'): Promise<string[]>

        /**
         * Determine the index of a member in a sorted set, with scores ordered from high to low.
         */
        zrevrank(key: string, member: string): Promise<number | undefined>

        /**
         * Get the score associated with the given member in a sorted set.
         */
        zscore(key: string, member: string): Promise<string>

        /**
         * Add multiple sorted sets and store the resulting sorted set in a new key.
         */
        zunionstore(destination: string, numkeys: number, ...keys: string[]): Promise<number>

        /**
         * Incrementally iterate the keys space.
         */
        scan: OverloadedCommand<string, [string, string[]]>

        /**
         * Incrementally iterate Set elements.
         */
        sscan: OverloadedKeyCommand<string, [string, string[]]>

        /**
         * Incrementally iterate hash fields and associated values.
         */
        hscan: OverloadedKeyCommand<string, [string, string[]]>

        /**
         * Incrementally iterate sorted sets elements and associated scores.
         */
        zscan: OverloadedKeyCommand<string, [string, string[]]>
    }

    interface Multi extends Connection {
        /**
         * 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断
         */
        watch: OverloadedCommand<string, 'OK'>

        /**
         * 取消 WATCH 命令对所有 key 的监视。
         */
        unwatch: OverloadedCommand<string, 'OK'>

        /**
         * 执行所有事务块内的命令。
         */
        exec(): Promise<any[]>

        /**
         * 取消事务，放弃执行事务块内的所有命令。
         */
        discard(): Promise<'OK'>
    }

    interface Client extends Connection, EventEmitter {
        readonly connected: boolean
        readonly command_queue_length: number
        readonly offline_queue_length: number
        retry_delay: number
        retry_backoff: number
        readonly command_queue: any[]
        readonly offline_queue: any[]
        readonly connection_id: number
        readonly server_info: Redis.ServerInfo
        readonly stream: Duplex

        auth(password: string): Promise<string>

        /**
         * KILL - Kill the connection of a client.
         * LIST - Get the list of client connections.
         * GETNAME - Get the current connection name.
         * PAUSE - Stop processing commands from clients for some time.
         * REPLY - Instruct the server whether to reply to commands.
         * SETNAME - Set the current connection name.
         */
        client(cmd: 'GETNAME'): Promise<string>
        client(cmd: 'KILL', ip: string, port: string | number): Promise<'OK'>
        client(cmd: 'LIST'): Promise<string>
        client(cmd: 'SETNAME', name: string): Promise<'OK'>
        client(cmd: 'ID'): Promise<number>
        client(cmd: 'PAUSE', timeout: number): Promise<'OK'>
        client(cmd: 'REPLY', value: 'ON' | 'OFF' | 'SKIP'): Promise<'OK'>
        client(cmd: 'UNBLOCK', client_id: number, type?: 'TIMEOUT' | 'ERROR'): Promise<'OK'>

        debug(action: 'OBJECT', ...keys: string[]): Promise<string>
        debug(action: 'SEGFAULT'): Promise<string>

        monitor(): Promise<void>

        /**
         * Listen for messages published to channels matching the given patterns.
         */
        psubscribe: OverloadedListCommand<string, string>

        /**
         * Stop listening for messages posted to channels matching the given patterns
         */
        punsubscribe: OverloadedListCommand<string, string>
        quit(): Promise<'OK'>

        /**
         * Enables read queries for a connection to a cluster slave node.
         */
        readonly(): Promise<string>

        /**
         * Disables read queries for a connection to cluster slave node.
         */
        readwrite(): Promise<string>

        /**
         * Change the selected database for the current connection
         */
        select(index: string | number): Promise<string>

        /**
         * Synchronously save the dataset to disk and then shut down the server
         */
        shutdown(option?: 'SAVE' | 'NOSAVE'): Promise<string>

        /**
         * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
         */
        slaveof(host: string, port: string | number): Promise<string>

        /**
         * Make the server a replica of another instance, or promote it as master.
         */
        replicaof(host: string, port: string | number): Promise<string>

        subscribe: OverloadedListCommand<string, string>


        unsubscribe: OverloadedListCommand<string, string>

        /**
         * Internal command used for replication
         */
        sync(): Promise<void>

        /**
         * Wait for the synchronous replication of all the write commands sent in the context of the current connection.
         */
        wait(numslaves: number, timeout: number): Promise<number>

        multi(): Multi

        on(event: 'message' | 'message_buffer', listener: (channel: string, message: string) => void): this
        on(event: 'pmessage' | 'pmessage_buffer', listener: (pattern: string, channel: string, message: string) => void): this
        on(event: 'subscribe' | 'unsubscribe', listener: (channel: string, count: number) => void): this
        on(event: 'psubscribe' | 'punsubscribe', listener: (pattern: string, count: number) => void): this
        on(event: string | symbol, listener: (...args: any[]) => void): this

        addListener(event: 'message' | 'message_buffer', listener: (channel: string, message: string) => void): this
        addListener(event: 'pmessage' | 'pmessage_buffer', listener: (pattern: string, channel: string, message: string) => void): this
        addListener(event: 'subscribe' | 'unsubscribe', listener: (channel: string, count: number) => void): this
        addListener(event: 'psubscribe' | 'punsubscribe', listener: (pattern: string, count: number) => void): this
        addListener(event: string | symbol, listener: (...args: any[]) => void): this

        once(event: 'message' | 'message_buffer', listener: (channel: string, message: string) => void): this
        once(event: 'pmessage' | 'pmessage_buffer', listener: (pattern: string, channel: string, message: string) => void): this
        once(event: 'subscribe' | 'unsubscribe', listener: (channel: string, count: number) => void): this
        once(event: 'psubscribe' | 'punsubscribe', listener: (pattern: string, count: number) => void): this
        once(event: string | symbol, listener: (...args: any[]) => void): this

        prependListener(event: 'message' | 'message_buffer', listener: (channel: string, message: string) => void): this
        prependListener(event: 'pmessage' | 'pmessage_buffer', listener: (pattern: string, channel: string, message: string) => void): this
        prependListener(event: 'subscribe' | 'unsubscribe', listener: (channel: string, count: number) => void): this
        prependListener(event: 'psubscribe' | 'punsubscribe', listener: (pattern: string, count: number) => void): this
        prependListener(event: string | symbol, listener: (...args: any[]) => void): this

        prependOnceListener(event: 'message' | 'message_buffer', listener: (channel: string, message: string) => void): this
        prependOnceListener(event: 'pmessage' | 'pmessage_buffer', listener: (pattern: string, channel: string, message: string) => void): this
        prependOnceListener(event: 'subscribe' | 'unsubscribe', listener: (channel: string, count: number) => void): this
        prependOnceListener(event: 'psubscribe' | 'punsubscribe', listener: (pattern: string, count: number) => void): this
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this

        removeListener(event: 'message' | 'message_buffer', listener: (channel: string, message: string) => void): this
        removeListener(event: 'pmessage' | 'pmessage_buffer', listener: (pattern: string, channel: string, message: string) => void): this
        removeListener(event: 'subscribe' | 'unsubscribe', listener: (channel: string, count: number) => void): this
        removeListener(event: 'psubscribe' | 'punsubscribe', listener: (pattern: string, count: number) => void): this
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this

        off(event: 'message' | 'message_buffer', listener: (channel: string, message: string) => void): this
        off(event: 'pmessage' | 'pmessage_buffer', listener: (pattern: string, channel: string, message: string) => void): this
        off(event: 'subscribe' | 'unsubscribe', listener: (channel: string, count: number) => void): this
        off(event: 'psubscribe' | 'punsubscribe', listener: (pattern: string, count: number) => void): this
        off(event: string | symbol, listener: (...args: any[]) => void): this

        removeAllListeners(event: 'message' | 'message_buffer' | 'pmessage' | 'pmessage_buffer' | 'subscribe' | 'unsubscribe' | 'psubscribe' | 'punsubscribe'): this
        removeAllListeners(event?: string): this
    }

    interface PoolOptions extends Redis.ClientOpts, GenericPool.Options {

    }

    interface Pool extends Connection {
        quit(): Promise<'OK'>

        createClient(options: Redis.ClientOpts): Client
    }

    function createPool(options: PoolOptions): Pool
    function createClient(options: Redis.ClientOpts): Client
    var debug_mode: boolean
}

declare function NodeRedis(options: NodeRedis.PoolOptions): NodeRedis.Pool

export = NodeRedis