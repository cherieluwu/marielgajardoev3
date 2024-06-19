//variable global
var g_id_cliente="";

function agregarCliente() {
// variables con datos de formulario
var fechaFormateada = obtenerFechaHora();
var id_cliente = document.getElementById("txt_id_cliente").value;
var dv = document.getElementById("txt_dv").value;
var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email= document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_cliente": id_cliente,
  "dv": dv,
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular,
  "fecha_registro": fechaFormateada
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
.then((response) => {
  if (response.status === 200) {
    //MODAL DE EXITO AL AGREGAR
  const modal = new bootstrap.Modal(document.getElementById("exitoModalAgregar"));
  modal.show();
  //MODAL DE ERROR AL AGREGAR
  } else if (response.status === 400) {
  const modal = new bootstrap.Modal(document.getElementById("errorModalAgregar"));
  modal.show();
  }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element, index, arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);
document.querySelector("#tbl_cliente tbody").innerHTML +=
  `<tr>
  <td>${element.id_cliente}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${fechaFormateada}</td>
  <td>
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a> 
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);
}

function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);
}

function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/" + p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function obtenerDatosActualizar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/" + p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiqueta(element, index, arr){
  var nombre_cliente = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este cliente?<b> " + nombre_cliente + "</b>";
}

function completarFormulario(element, index, arr){
  var id_cliente = element.id_cliente;
  var dv = element.dv
  var nombre_cliente = element.nombres;
  var apellido_cliente = element.apellidos;
  var correo_cliente = element.email;
  var telefono_cliente = element.celular; 
  document.getElementById('txt_id_cliente').value = id_cliente;
  document.getElementById('txt_dv').value = dv;
  document.getElementById('txt_nombres').value = nombre_cliente;
  document.getElementById('txt_apellidos').value = apellido_cliente;
  document.getElementById('txt_email').value = correo_cliente;
  document.getElementById('txt_celular').value = telefono_cliente;
}

function actualizarCliente(){
  // Obtenemos valor del tipo de gestion desde el formulario
  var id_cliente = document.getElementById("txt_id_cliente").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email= document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_cliente": id_cliente,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
  .then((response)=>{
    if (response.status == 400){
    //Si hay error, se reproduce modal de error
            const modal = new bootstrap.Modal(document.getElementById("errorModalActualizar"));
            modal.show();
          }
    //Si no hay error, se reproduce error de confirmación
    else { 
    const modal = new bootstrap.Modal(document.getElementById("exitoModalActualizar"));
    modal.show();
         }})

    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function eliminarCliente(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
  .then((response) => {
    if (response.status == 200) {
      //MODAL EXITO AL ELIMINAR
      const modal = new bootstrap.Modal(document.getElementById("exitoModalEliminar"));
      modal.show();
    } //MODAL DE ERROR AL ELIMINAR
    if (response.status == 400) {
      const modal = new bootstrap.Modal(document.getElementById("errorModalEliminar"));
      modal.show();
}
})
.then((result) => console.log(result))
.catch((error) => console.error(error));
}


function obtenerFechaHora() {
  var fechaHoraActual = new Date();
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+),\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');

  return fechaFormateada;
}

function formatearFechaHora(fecha_registro) {
  var fechaHoraActual = new Date(fecha_registro);
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+),\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');

  return fechaFormateada;
}
