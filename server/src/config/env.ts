import * as dotenv from 'dotenv';
dotenv.config();

export default {
  mongodb: {
    url: process.env.MONGODB_URL,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASS,
    cluster: process.env.MONGODB_CLUSTER,
  },
  app: {
    port: process.env.PORT,
  },
};
