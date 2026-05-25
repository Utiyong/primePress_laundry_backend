const {createClient} = require('redis');

const redisClient = createClient({
    username: process.env.redisUsername,
    password: process.env.redisPassword,
    socket: {
        host: process.env.redisHost,
        port: process.env.redisPort
    }
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
});

module.exports = redisClient;