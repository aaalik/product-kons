import express from 'express';
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

module.exports = router;
