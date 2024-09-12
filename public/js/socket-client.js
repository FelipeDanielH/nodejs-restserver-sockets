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
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123 asbc',
        fecha: new Date().getTime()
    }

    socket.emit( 'enviar-mensaje', payload );
});