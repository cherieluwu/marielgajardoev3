

//variable global
var g_id_usuario="";

function agregarUsuario() {
  // variables con datos de formulario
  var fechaFormateada = obtenerFechaHora();
  var id_usuario = document.getElementById("txt_id_usuario").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email= document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  var username = document.getElementById("txt_username").value;
  var password = document.getElementById("txt_password").value;


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_usuario": id_usuario,
  "dv": dv, 
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular,
  "username" : username,
  "password" : password,
  "fecha_registro": fechaFormateada
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
.then((response) => {
if (response.status === 200)
  //MODAL EXITO AGREGAR
 {
const modal = new bootstrap.Modal(document.getElementById("exitoModalAgregar"));
modal.show();
  //MODAL ERROR AGREGAR
} else if (response.status === 400) {
const modal = new bootstrap.Modal(document.getElementById("errorModalAgregar"));
modal.show();
}
})
.then((result) => console.log(result))
.catch((error) => console.error(error));
}

function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element, index, arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);
  document.querySelector("#tbl_usuario tbody").innerHTML +=
  `<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td> 
  <td>${element.celular}</td>
  <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${fechaFormateada}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a> 
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);
}

function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);
}

function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/" + p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/" + p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiqueta(element, index, arr){
  var username = element.username;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar al usuario <b> " + username + "?" +"</b>";
}

function completarFormulario(element, index, arr){
  var id_usuario = element.id_usuario;
  var dv = element.dv
  var nombre_usuario = element.nombres;
  var apellido_usuario = element.apellidos;
  var correo_usuario = element.email;
  var telefono_usuario = element.celular; 
  var username = element.username; 
  var password = element.password; 
  document.getElementById('txt_id_usuario').value = id_usuario;
  document.getElementById('txt_dv').value = dv;
  document.getElementById('txt_nombres').value = nombre_usuario;
  document.getElementById('txt_apellidos').value = apellido_usuario;
  document.getElementById('txt_email').value = correo_usuario;
  document.getElementById('txt_celular').value = telefono_usuario;
  document.getElementById('txt_username').value =username;
  document.getElementById('txt_password').value = password;
}

function actualizarUsuario(){
  // Obtenemos valor del usuario desde el formulario
  var id_usuario = document.getElementById("txt_id_usuario").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email= document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  var username = document.getElementById("txt_username").value;
  var password = document.getElementById("txt_password").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "dv": dv, 
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "username" : username,
    "password" : password,
    "fecha_registro": fechaFormateada
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        location.href="listar.html";
        //MODAL DE EXITO ACTUALIZACION
        const modal = new bootstrap.Modal(document.getElementById("exitoModalActualizar"));
        modal.show();
      }
      //MODAL DE ERROR ACTUALIZACION
      if (response.status == 400){
        const modal = new bootstrap.Modal(document.getElementById("errorModalActualizar"));
        modal.show();
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

//Función para eliminar usuario 
// Valida si el usuario existe o no 

function eliminarUsuario(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      if(json.length === 0){
        alert("El usuario no existe");
      } else {
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow"
        };

        fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
          .then((response) => {
            if(response.status == 200){
                   //MODAL EXITO AL ELIMINAR
                   const modal = new bootstrap.Modal(document.getElementById("exitoModalEliminar"));
                   modal.show();
                 } //MODAL DE ERROR AL ELIMINAR
                 if (response.status == 400) {
                   const modal = new bootstrap.Modal(document.getElementById("errorModalEliminar"));
                   modal.show();
              location.href="listar.html";
            }
          })
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      }
    })
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


