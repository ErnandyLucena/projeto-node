// src/utils/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // ou a porta que você estiver usando
});

export default pool;
