
'use strict'

/*Arquivo criado só para testar se a API esta funcionado de boa */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller') //Referenciando Controller Criado

//Rotas
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById); //Foi adicionado /admin/ e /tags/ para não ter conflito com a rota acima obs: add como exemplo
router.get('/tags/:tag', controller.getByTag);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

/*Exportando Module */
module.exports = router;