'use strict';

const mongoose = require('mongoose');//Importando mongoose
const Product = mongoose.model('Product') //Importando o Model
const ValidationContract = require('../validators/fluent-validator') //importando validações
const repository = require('../repositories/product-repository') // importando Repositorio

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}


exports.getById = async(req,res,next) => {
    try{
   const data = await repository.getById(req.params.id) 
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falah ao processar sua requisição'
        });
    }
}

exports.getBySlug = async(req,res,next) => {
    try{
        const data = await  repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falah ao processar sua requisição'
        });
    }

}

exports.getByTag = async(req,res,next) => {
    try{
        const data = await repository.getByTag(req.params.tag)  
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falah ao processar sua requisição'
        });
    }
}

exports.post = async(req,res,next) => {
    //Fazendo validações
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title,3, 'o titulo deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug,3, 'o titulo deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description,3, 'o titulo deve ter pelo menos 3 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(req.body)
            res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
    });
    } catch(e){
        res.status(500).send({
            message: 'Falah ao processar sua requisição'
        });
    }
};

exports.put = async(req,res,next) => {

        try{
            await repository.update(req.params.id, req.body)
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        } catch(e){
            res.status(500).send({
                message: 'Falah ao processar sua requisição'
            });
        }
       
};

exports.delete = async (req,res,next) => {
   await repository.delete(req.body.id)
    try{
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        } catch(e){
            res.status(500).send({
                message: 'Falah ao processar sua requisição'
            });
        }
};