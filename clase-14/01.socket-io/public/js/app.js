console.log(io); // Librería emisor/receptor de socket.io

/* let socket = io.connect(); */ // Este se conecta al receptor

// Generar en el cliente un indentificador único que luego llegue al backend

const socket = io({
  auth: {
    userId: crypto.randomUUID(),
  },
});

socket.on('nombre', (nombre) => {
  console.log(nombre);
});

socket.on('clientes', (clientes) => {
  console.log(clientes);
});

socket.emit('is-active', true);
// Recibir los mensajes

const render = (mensajes) => {
  let html = mensajes
    .map((msg) => {
      return `
        <div>
          <strong>${msg.usuario}</strong>
          <em>${msg.mensaje}</em
        </div>
      `;
    })
    .join(' ');
  console.log(html);

  document.getElementById('mensajes').innerHTML = html;
};

socket.on('mensajes', (mensajes) => {
  console.log(mensajes);
  render(mensajes);
});

const chatFormu = document.getElementById('chat-formu');

function agregarMensaje(e) {
  e.preventDefault();

  console.log('Se agrega un mensaje');
  console.log(e);

  const nodoInputNombre = e.target[0];
  const nodoInputMensaje = e.target[1];

  console.log(nodoInputNombre);
  console.log(nodoInputMensaje);

  const objNuevoMensaje = {
    [nodoInputNombre.name]: nodoInputNombre.value,
    [nodoInputMensaje.name]: nodoInputMensaje.value,
  };

  console.log(objNuevoMensaje);
  socket.emit('nuevo-mensaje', objNuevoMensaje);

  chatFormu.reset();
}

chatFormu.addEventListener('submit', agregarMensaje);
