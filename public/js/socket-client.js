/* 
    Por si existe alguna confusion:
        toodos los metodos que aparecen aqui relacionados con sockets son del lado del front end, no confundir con los metodos utilizados en server.js porque estos son relacionados con el servidor
*/


// Referencias HTML

const lblOnline   = document.querySelector('#lblOnline'); // seleccionamos la clase de index.html
const lblOffline  = document.querySelector('#lblOffline');
const txtMensaje  = document.querySelector('#txtMensaje');
const btnEnviar   = document.querySelector('#btnEnviar');

// Para ver el cliente conectado, hay que hacer uso de un obejeto que expone la libreria de socket.io (en el html se puede apreciar como se incluye la libreria)
const socket = io() // socket del cliente. El io() es lo que dispone la importacion antes mencionada (del index.html)


socket.on('connect', () => { // el socket.on practicamente es como un eventListener, el 'connect' hace referencia a cuando inicia la conexion (esto succede en el server o app.js) y gracias a que esta importado en el HTML se puede llegar y escribir aqui sin necesidad de exportarlo
    console.log('conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123 abc',
        fecha: new Date().getTime()
    };

    socket.emit( 'enviar-mensaje', payload, (id) => { // el primer argumento es el nombre del socket a enviar al servidor, el segudo es el payload (puede ser cualquier tipo de dato pero por lo general es un objeto) y finalmente un callback (o funcion)
        console.log('Desde el server', id ); // lo que hay dentro del callback, el servidor (server.js) tiene que mandarlo a ejecutar en algun punto
    });

});