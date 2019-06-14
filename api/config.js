const DB_HOST = "192.168.99.100";
const DB_PORT = "27017";
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

module.exports = {IMAGE_COLLECTION,DB_URL, DB_NAME,USER_COLLECTION,PROFILE_COLLECTION, JWT_SECRET , CLIENT_URL, DUPLICATE}






