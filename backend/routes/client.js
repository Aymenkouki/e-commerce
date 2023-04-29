const express=require('express');
const client = require('../models/client');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const router=express.Router();

module.exports=router;


router.post('/register', (req,res)=>{
    let data = req.body;
    let cl = new client(data);
    let salt =bcrypt.genSaltSync(10);
    let cryptedPass = bcrypt.hashSync(data.password , salt);
    cl.password = cryptedPass;
    cl.save()
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


router.post('/login', (req,res)=>{
    let data = req.body;
    client.findOne({email : data.email})
    .then(
        (result)=>{
            if(!result){
                res.send('email or password invalid');
            }else{
                let validpass = bcrypt.compareSync(data.password,result.password);
                if(!validpass){
                    res.send('email or password invalid');
                }else{
                    let payload = {
                        _id : result.id,
                        email : result.email,
                        name : result.name,
                        lastname : result.lastname
                    }
                    let token = jwt.sign(payload , '123456');
                    res.status(200).send({token});
                }
            }
        }
    )
    .catch(
        (error)=>{
            res.send(error);
        }
    )
})


router.put('/update/:id', (req,res)=>{
    let myid = req.params.id;
    let newdata = req.body;

    client.findByIdAndUpdate({_id:myid},newdata)
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

router.get('/getbyid/:id' , (req,res)=>{
    let myid = req.params.id;
    client.findOne({_id:myid})
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