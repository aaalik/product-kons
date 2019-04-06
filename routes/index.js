import express from 'express';
import * as db from '../lib/db';
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/product', async(req, res, next) => {
    // const tbl = 'user';
    // const rows = await db.query(`SELECT user_id, email, name, level, status FROM ${tbl}`); 
    await res.render('user/product', { 
        title: 'Express'
    });
});

router.get('/alik', async (req, res, next) => {
    const rows = await db.testConnect();
    res.send(rows);
});


module.exports = router;
