import * as db from '../lib/db';

const checkUser = async(email) => {
    const tbl = 'user';
    const rows = await db.query(`SELECT nama, email, password FROM ${tbl} WHERE email = '${email}'`);
    return rows;
}

export {
    checkUser
}
