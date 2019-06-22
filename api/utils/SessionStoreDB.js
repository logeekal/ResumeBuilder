const SESSION_DB_URL = require('../config').SESSION_DB_URL;
const redis = require('redis');

const redisOpts = {
    url: SESSION_DB_URL

}


RedisClient = redis.createClient(redisOpts);


RedisClient.on('connect', function(){
    console.log(`Successfully connected to Redis Session Store`);
    console.log(RedisClient);
    
})

RedisClient.on('error', function(err){
    console.log(`Error connecting to Redis :  ${err}`);
    throw err;
})


module.exports = {RedisClient,redisOpts};