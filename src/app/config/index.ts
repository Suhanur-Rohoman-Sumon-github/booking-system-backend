import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_Env: process.env.Node_Env,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.bcrypt_salt_round,
  default_password: process.env.default_password,
  access_secret_key: process.env.Secret_Access_Key,
};
