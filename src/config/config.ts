import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  maxPoolSize: 50,
  autoIndex: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'iTest_Kanon_user';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'iTest1234';
const MONGO_HOST = process.env.MONGO_URL || `itestkanon.xr42i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const MONGO ={
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
  }

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 7000;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'adedayoadegboye';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'roycetechencryptpassword!@';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
  mongo: MONGO,
  server: SERVER
};

export default config
