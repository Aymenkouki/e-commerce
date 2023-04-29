const express=require('express');
const cart = require('../models/cart');

const router=express.Router();

module.exports=router;


router.post('/ajout', (req,res)=>{
    let data = req.body;
    let mycart = new cart(data);
    mycart.save()
    .then(
        (result)=>{
            res.send(result);
        }
    )
    .catch(
        (error)=>{
            res.send(error)
        }
    )
});