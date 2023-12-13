// config.js

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/INSYS';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'mRI8pVico3oQaaBbwLJLxL7IrxPlBaF1S6oOdY/7weo=';
