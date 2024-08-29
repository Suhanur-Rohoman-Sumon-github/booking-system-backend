import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_Env: process.env.Node_Env,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.bcrypt_salt_round,
  default_password: process.env.default_password,
  JWT_ACCESS_SECRET_KEY: process.env.Jwt_Secret_Access_Key,
  JWT_REFRESH_SECRET_KEY: process.env.Jwt_Secret_refresh_Key,
  JWT_ACCESS_TOKEN_EXPIRE_IN: process.env.Jwt_Access_expireIn,
  JWT_REFRESH_TOKEN_EXPIRE_IN: process.env.Jwt_refresh_expireIn,
  STRIPE_SECRET_KEY: process.env.stripe_access_key,
};
