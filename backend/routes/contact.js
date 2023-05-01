const express=require('express');
const contact = require('../models/contact');

const router=express.Router();

module.exports=router;


router.post('/ajout', (req,res)=>{
    let data = req.body;
    let mycontact = new contact(data);
    mycontact.save()
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
    contact.find()
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
    contact.findByIdAndDelete({_id:myid})
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