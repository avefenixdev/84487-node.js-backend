const contenedorProductos = document.querySelector('#contenedor-productos');

contenedorProductos.addEventListener('click', (e) => {
  //console.log(e);
  //console.log(e.target.classList.contains('eliminar-producto'));
  if (e.target.classList.contains('eliminar-producto')) {
    console.log('Hicieron click sobre el bóton');
    console.log(e.target.dataset.id);

    Swal.fire({
      title: '¿Estás seguro que querés eliminar el producto?',
      text: 'No se va a poder volver atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡borralo!',
      cancelButtonText: 'Nooooo',
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          title: 'Borrado...',
          text: 'El producto fue borrado',
          icon: 'success',
        });
    });
  } /*  else {
    console.log('Fuera del botón');
  } */
});
