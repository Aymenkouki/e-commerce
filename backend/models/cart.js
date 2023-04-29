const mongoose = require('mongoose');

const cart = mongoose.model('cart',{
    client : String,
    ids : String,
    quants : String
})

module.exports= cart;