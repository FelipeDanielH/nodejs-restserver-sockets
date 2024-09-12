// Referencias HTML

const lblOnline = document.querySelector('#lblOnline'); // seleccionamos la clase de index.html
const lblOffline = document.querySelector('#lblOffline');

// Para ver el cliente conectado, hay que hacer uso de un obejeto que expone la libreria de socket.io (en el html se puede apreciar como se incluye la libreria)
const socket = io() // socket del cliente. El io() es lo que dispone la importacion antes mencionada (del index.html)


socket.on('connect', () => {
    console.log('conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');    
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
});

