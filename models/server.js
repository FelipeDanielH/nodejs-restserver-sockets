const express = require('express');
const cors = require('cors');
const http = require('http')
const socket = require('socket.io');

class Server {
    constructor() {

        this.app = express(); 
        this.port = process.env.PORT;
        this.server = http.createServer(this.app); // crea servidor
        this.io = socket(this.server) // io es toda la informacion de sus sockets conectados (es el servidor de sockets)

        this.paths = {};

        this.middlewares();

        this.routes();

        // Eventos de sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        // No se usaran rutas pero se deja una como referencia
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socket => {
            console.log('Cliente conectado', socket.id);
            // socket.disconect();
            //para desconectar en caso de qe haya algun error
            socket.on('disconnect', () => {
                console.log('cliente desconectado', socket.id);
            });

            socket.on('enviar-mensaje', ( payload ) => { // para escuchar cuando el cliente emite 'enviar-mensaje'
                console.log('payload:', payload );
                this.io.emit('enviar-mensaje', payload); // para mandar un mensaje a todos lo clientes conectados se utiliza el emit() (el servidor de sockes lo envia)
            });
        });
    }

    listen() {
        this.server.listen( this.port, () => { // normalmente es app.listen pero ahora es server.listen
            console.log( 'Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;

/* 
Consideraciones:
    - con esta configuracion se habilita un path en 'localhost:8080/socket.io/socket.io.js' que contiene toda la informacion que la libreria nos provee para usar por el cliente

*/