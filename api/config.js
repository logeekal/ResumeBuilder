const DB_HOST = "192.168.99.100";
const DB_PORT = "27017";

const SESSION_DB_PORT = '6379'
const SESSION_DB_PASS = 'R3D1SP@ssword'
const SESSION_DB_USER = "dummy"
const SESSION_DB_URL = `redis://${SESSION_DB_USER}:${SESSION_DB_PASS}@${DB_HOST}:${SESSION_DB_PORT}`;



const DB_NAME = "resumebuilder";

const JWT_SECRET = 'secret';

const DB_USER_NAME = "resumeadmin";
const DB_USER_PASS = encodeURIComponent("resume@admin@password");

const DB_URL = `mongodb://${DB_USER_NAME}:${DB_USER_PASS}@${DB_HOST}:${DB_PORT}`;

const USER_COLLECTION= 'users';
const PROFILE_COLLECTION = 'profiles';
const IMAGE_COLLECTION = 'user_images'

const CLIENT_URL = "http://localhost:3000";

//Keywords used
const DUPLICATE = 'DUPLICATE'

module.exports = {SESSION_DB_URL,DB_HOST,IMAGE_COLLECTION,DB_URL, DB_NAME,USER_COLLECTION,PROFILE_COLLECTION, JWT_SECRET , CLIENT_URL, DUPLICATE}






