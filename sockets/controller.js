


const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', ( payload, callback ) => { // para escuchar cuando el cliente emite 'enviar-mensaje'. El primer argumento es el payload que envia el cliente desde el frontend (socket-client.js) y el segundo es el callback (revisar implementacion en socket-client.js)
        const id = 123456;

        callback(id);

        socket.broadcast.emit('enviar-mensaje', payload); // para mandar un mensaje a todos lo clientes conectados se utiliza el emit() (el servidor de sockes lo envia)
        // antes se utilizaba el io en la linea de arriba pero no es necesario a no ser que sean casos muy especificos (como mandar mensajes en otros lugares del servidor como por ej una peticion REST)
    });
}

module.exports = {
    socketController
}