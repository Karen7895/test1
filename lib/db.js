const mysql = require("mysql2/promise")

const sslEnabled = String(process.env.DB_SSL || "").toLowerCase() === "true"

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params)
  return rows
}

module.exports = {
  pool,
  query,
}
