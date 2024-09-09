const express = require('express');
const cors = require('cors');

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

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
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;