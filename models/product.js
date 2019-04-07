import * as db from '../lib/db';

const getProduct = async() => {
    const tbl = 'produk';
    const rows = await db.query(`SELECT produk.*, kategori.nama_kategori FROM ${tbl} JOIN kategori ON produk.id_kategori = kategori.id_kategori`);
    return rows;
}

export {
    getProduct
}
