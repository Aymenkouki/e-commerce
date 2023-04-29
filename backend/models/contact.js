const mongoose = require('mongoose');

const contact = mongoose.model('contact',{
    name : String,
    email : String,
    subject : String,
    message : String


})

module.exports= contact;