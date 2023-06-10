const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://koukiaymendhs:gogogo@cluster0.ugozy62.mongodb.net/?retryWrites=true&w=majority')
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
