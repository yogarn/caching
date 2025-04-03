import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DSN
})

export default pool;
