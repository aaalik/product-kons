import express from 'express';
import * as db from '../lib/db';
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/product', async(req, res, next) => {
    const tbl = 'produk';
    const rows = await db.query(`SELECT produk.*, kategori.nama_kategori FROM ${tbl} JOIN kategori ON produk.id_kategori = kategori.id_kategori`); 
    await res.render('user/product', { 
        title: 'Express',
        data: rows
    });
});

router.get('/testdb', async (req, res, next) => {
    const rows = await db.testConnect();
    res.send(rows);
});

module.exports = router;
