import express from 'express';
import * as db from '../lib/db';
import * as model from '../models/product';
import * as model2 from '../models';
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/product', async(req, res, next) => {
    const rows = await model.getProduct(); 
    await res.render('user/product', { 
        title: 'Express',
        data: rows
    });
});

router.get('/login', async(req, res, next) => {
    await res.render('login', {title: 'Login'});
});

router.get('/testdb', async(req, res, next) => {
    const rows = await db.testConnect();
    res.send(rows);
});

router.post('/validate', async(req, res, next) => {
    const {email, password} = req.body;
    const rows = await model2.checkUser(email);
    console.log(rows[0].password)
    if(password === rows[0].password){
        req.session.loggedIn = true;
    }
    res.redirect('/users');
});

module.exports = router;
