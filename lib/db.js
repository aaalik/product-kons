import mysql from 'promise-mysql';

// setting up directly to .env
require('dotenv').config();

const configDb = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}

// create pool mysql
const pool = mysql.createPool(configDb);

// method for test the connection to database
const testConnect = async() => {
    const status = await pool.query('SELECT 1 + 1 AS solution')
    .then(() => 'Database connected')
    .catch(() => 'Database disconnected');
    return status;
}

// method for put raw query
const query = async(text) => {
    const rows = await pool.query(text)
    .catch(err => console.log(err));
    return rows;
}


// method for insert query
const insertRow = async(tableField, tableValue, response) => {
    const client = await pool.getConnection();
    try{
        const baseSql = `INSERT INTO ${tableField} SET ?`;
        await client.beginTransaction();
        await client.query(baseSql, tableValue);
        const result = await client.commit();
        return result;
    }catch(err){
        await client.rollback();
        console.log(err);
        response.status(400);
        return err;
    }finally{
        pool.releaseConnection(client);
    }
}

// method for update query
const updateRow = async(tableField, tableValue, condition, response) => {
    const client = await pool.getConnection();
    try{
        const baseSql = `UPDATE ${tableField} SET ? WHERE ?`
        await client.beginTransaction();
        await client.query(baseSql, [tableValue, condition]);
        const result = await client.commit();
        return result;
    }catch(err){
        await client.rollback();
        console.log(err);
        response.status(400);
        return err;
    }finally{
        pool.releaseConnection(client);
    }
}

export {
    testConnect,
    query,
    insertRow,
    updateRow
};
