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

router.get('/getall' , (req,res)=>{
    cart.find()
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

router.delete('/supprimer/:id', (req,res)=>{
    let myid = req.params.id;
    cart.findByIdAndDelete({_id:myid})
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