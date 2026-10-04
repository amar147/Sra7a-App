import { createClient } from "redis"
import { REDIS_URI } from './../config.js';

export const client = createClient({
  url: REDIS_URI
});

export const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Redis connected successfully");
    }catch (error) {
        console.log(`Redis connection error: ${error.message}`);
    }
}

