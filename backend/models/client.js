const mongoose = require('mongoose');

const client = mongoose.model('client',{
    name : String,
    lastname:String,
    email : String,
    password : String,
    favorite : String,
    chart : String

})

module.exports= client;