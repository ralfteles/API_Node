'use strict';

const express = require('express');
const bodyParser = require('body-parser'); /*Converter o corpo da requisição para Json */

const mongoose = require('mongoose'); /*Configurando MongoDB */

const app = express();
const router = express.Router();


//Conexão Mongo
mongoose.connect('mongodb://rafael:rafael@ds241658.mlab.com:41658/ndstr');

//Carrega os Models
const Product = require('./models/products');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregando as Rotas
const indexRoute = require('./routes/index-route'); 
const productRoute = require('./routes/products-route'); 


/*Configuração para converter para json (Body Parser) */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Atribuindo Rotas
app.use('/', indexRoute);
app.use('/products', productRoute);

/*Exportando esse arquivo para ser visualizado no server.js*/
module.exports = app;