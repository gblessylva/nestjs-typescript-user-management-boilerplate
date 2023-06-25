import { IEConfig } from '../base.interface';
require('dotenv').config();

export const EnvironmentConfig: IEConfig = {
  MONGOOSE_DB_URL: process.env.MONGODB_HOST,
} as const;
