import { Redis } from 'ioredis';

export const redisConnection = {
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
};

const redisClient = new Redis(redisConnection);
export default redisClient
