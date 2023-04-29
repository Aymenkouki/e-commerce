const mongoose = require('mongoose');

const product = mongoose.model('product',{
    titre : String,
    prix : Number,
    description : String,
    categorie : String,
    stock : Number,
    image : String

})

module.exports= product;