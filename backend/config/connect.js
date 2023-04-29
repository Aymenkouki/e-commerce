const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
.then(
    ()=>{
        console.log('connected to db !!');
    }
)
.catch(
    ()=>{
        console.log(erreur);
    }
)

module.exports=mongoose;
