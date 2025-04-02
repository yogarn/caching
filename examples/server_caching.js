import express from 'express';
import { createClient } from 'redis';

const APP_PORT = 3000;

const app = express();

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

app.get('/movie', async (req, res) => {
  const cacheKey = 'movie_data';

  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    console.log('returning cached data');
    return res.json(cachedData);
  }

  const data = { message: 'Hello world!' };
  await setCache(cacheKey, 3600, data);

  res.json(data);
});

app.listen(APP_PORT, () => {
  console.log(`up and running on port ${APP_PORT}`);
});
