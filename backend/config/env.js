// backend/config/env.js

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const env = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI ,
  SESSION_SECRET: process.env.SESSION_SECRET ,
  JWT_SECRET: process.env.JWT_SECRET ,
};

export default env;
