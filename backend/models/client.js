const mongoose = require('mongoose');

const client = mongoose.model('client',{
    name : String,
    lastname:String,
    email : String,
    password : String,
    favorite : String,
    chart : String,
    adm : String

})

module.exports= client;