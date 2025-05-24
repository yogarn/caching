import { createClient } from 'redis';

// connect to redis as client

async function setCache(key, expiration = 60, data) {
    try {
       // set cache here
    } catch (err) {
        console.error('error setting cache:', err);
    }
}

async function getCache(key) {
    try {
        // return json of cached data
    } catch (err) {
        console.error('error getting cache:', err);
        return null;
    }
}

export default {
    setCache,
    getCache
}
