const express = require('express');
const app = express();

app.use(express.json());

const cors=require('cors');
app.use(cors());

require('./config/connect');

const product = require ('./models/product');

const productRoute=require('./routes/product');
app.use('/product',productRoute);

const contact = require ('./models/contact');

const contactRoute=require('./routes/contact');
app.use('/contact',contactRoute);

const client = require ('./models/client');

const clientRoute=require('./routes/client');
app.use('/client',clientRoute);

const cart = require ('./models/cart');

const cartRoute=require('./routes/cart');
app.use('/cart',cartRoute);


app.use('/getimage',express.static('./images'));

app.listen(3000,()=>{
    console.log('server works');
})