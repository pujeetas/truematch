import "dotenv/config";
import pg from "pg";

console.log("Testing connection...");
console.log("Connection string:", process.env.DATABASE_URL?.substring(0, 50) + "...");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
  } else {
    console.log('✅ Connected successfully!', res.rows[0]);
  }
  pool.end();
});