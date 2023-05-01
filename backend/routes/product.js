const express=require('express');
const product = require('../models/product');

const router=express.Router();

module.exports=router;

const multer= require('multer');

filename='';

const myStorage = multer.diskStorage({
    destination:'./images',
    filename: (req,file,redirect)=>{
        let fl =Date.now()+'.'+file.mimetype.split('/')[1]
        redirect(null,fl);
        filename =fl;
    }
})

const upload=multer({storage:myStorage});

router.post('/ajout',upload.any('image'),(req,res)=>{
    let data = req.body;
    let myProduct = new product(data);
    myProduct.image = filename;
    myProduct.save()
    .then(
        (result)=>{
            res.send(result);
            filename='';
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
    product.findByIdAndDelete({_id:myid})
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
    product.find()
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
    product.findOne({_id:myid})
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

router.get('/getbycategorie/:categorie' , (req,res)=>{
    let mycat = req.params.categorie;
    product.find({categorie:mycat})
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


router.put('/update/:id', upload.any('image'), (req,res)=>{
    let myid = req.params.id;
    let newdata = req.body;
    if(filename.length>0){
        newdata.image=filename}

    product.findOneAndUpdate({_id:myid},newdata)
    .then(
        (result)=>{
            res.send(result);
            filename='';
        }
    )
    .catch(
        (error)=>{
            res.send(error)
        }
    )

});