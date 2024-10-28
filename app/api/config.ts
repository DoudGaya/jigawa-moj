// src/app/api/config.ts

import { config } from 'dotenv';

// Load .env file if we're running locally
if (process.env.NODE_ENV !== 'production') {
  config();
}

// Validate environment variables
const requiredEnvVars = [
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_BUCKET_NAME'
] as const;

export const validateEnvVars = () => {
  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please ensure these are set in your .env file or environment.'
    );
  }
};

// Export configured environment variables
export const envVars = {
  aws: {
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    bucketName: process.env.AWS_BUCKET_NAME!
  }
};