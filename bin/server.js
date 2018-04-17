
'use strinct' /*Força a te ajudar se esta tudo escrito corretamente*/


const app = require('../src/app'); /*Importando o app.js */
const http = require('http');
const debug = require('debug')('balta:server');

/*Configurando a porta em que vai rodar o servidor*/
const port =  '3000';
app.set('port',port);

 /*Criando o servidor */
const server = http.createServer(app);

server.listen(port);
server.on('error',onError);
console.log('API rodando na porta'+port);

//Função para tratar erros de acesso ao servidor
function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
    'pipe ' + port :
    'port ' + port;

    switch (error.code){
    case 'EACCES':
        console.error(bind + 'requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind +' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
        
    }
}
