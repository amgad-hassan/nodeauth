const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('welcome');
});

router.get('/dashbaord',(req,res)=>{
    res.render('dashbaord');
});

module.exports = router ; 