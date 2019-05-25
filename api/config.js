const DB_HOST = "192.168.99.100";
const DB_PORT = "27017";
const DB_NAME = "testing"

const DB_USER_NAME = "admin";
const DB_USER_PASS = "password";

const DB_URL = `mongodb://${DB_USER_NAME}:${DB_USER_PASS}@${DB_HOST}:${DB_PORT}`;



module.exports.DB_URL = DB_URL;




