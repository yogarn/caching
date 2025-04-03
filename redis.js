import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

async function setCache(key, expiration = 60, data) {
    try {
        await client.set(key, JSON.stringify(data), {
            EX: expiration,
        });
    } catch (err) {
        console.error('error setting cache:', err);
    }
}

async function getCache(key) {
    try {
        const data = await client.get(key);

        if (!data) {
            return null;
        }

        return JSON.parse(data);
    } catch (err) {
        console.error('error getting cache:', err);
        return null;
    }
}

export default {
    setCache,
    getCache
}
