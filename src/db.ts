import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});


const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      instructions TEXT NOT NULL,
      image_url TEXT NOT NULL
    );
  `);


  await pool.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      instructions TEXT NOT NULL,
      image_url TEXT NOT NULL
    );
  `);

};

createTables().catch(console.error);

export default pool;
