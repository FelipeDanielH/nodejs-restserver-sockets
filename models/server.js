const express = require('express');
const cors = require('cors');
const http = require('http')
const socket = require('socket.io');

class Server {
    constructor() {

        this.app = express(); 
        this.port = process.env.PORT;
        this.server = http.createServer(this.app); // crea servidor
        this.io = socket(this.server) // io es toda la informacion de sus sockets conectados 

        this.paths = {}

        this.middlewares();

        this.routes();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        // No se usaran rutas pero se deja una como referencia
        // this.app.use(this.paths.auth, require('../routes/auth'));
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