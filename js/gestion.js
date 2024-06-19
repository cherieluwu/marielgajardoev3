var g_id_gestion = "";

function agregarGestion(){
  var fechaFormateada = obtenerFechaHora();
  var id_usuario      = document.getElementById("txt_id_usuario").value;
  var id_cliente      = document.getElementById("txt_id_cliente").value;
  var id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
  var id_resultado    = document.getElementById("txt_id_resultado").value;
  var comentarios     = document.getElementById("txt_comentarios").value;

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_usuario": id_usuario,
  "id_cliente": id_cliente,
  "id_tipo_gestion": id_tipo_gestion,
  "id_resultado": id_resultado,
  "comentarios": comentarios,
  "fecha_registro": fechaFormateada
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/gestion", requestOptions)
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

//Agregar un nuevo método para listar los datos ingresados
function listarGestion() {

    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json"); 
    var raw = JSON.stringify({ "query": "select ges.id_gestion as id_gestion,cli.id_cliente, ges.comentarios as comentarios,CONCAT(cli.nombres, ' ',cli.apellidos) as nombre_cliente,CONCAT(usu.nombres,' ' ,usu.apellidos) as nombre_usuario,tge.nombre_tipo_gestion as nombre_tipo_gestion,res.nombre_resultado as nombre_resultado,ges.fecha_registro as fecha_registro from gestion ges,usuario usu,cliente cli,tipo_gestion tge,resultado res where ges.id_usuario = usu.id_usuario and ges.id_cliente = cli.id_cliente and ges.id_tipo_gestion = tge.id_tipo_gestion and ges.id_resultado = res.id_resultado " }); 
    var requestOptions = { 
        method: 'POST', 
        headers: myHeaders, 
        body: raw, 
        redirect: 'follow' 
      }; 

    fetch("http://144.126.210.74:8080/dynamic", requestOptions)
    .then(response => response.json())
    .then((json) => {
        json.forEach(completarFila);
        $('#tbl_gestion').DataTable();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function completarFila(element,index,arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);
arr[index] = document.querySelector("#tbl_gestion tbody").innerHTML += 
`<tr>
<td>${element.id_gestion}</td>
<td>${element.nombre_cliente}</td>
<td>${element.nombre_usuario}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${element.nombre_resultado}</td>
<td>${element.comentarios}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_gestion}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}

function obtenerDatosActualizacion(id_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch(`http://144.126.210.74:8080/api/gestion/` + id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_gestion = parametros.get('id');
  g_id_gestion = p_id_gestion;

  obtenerDatosActualizacion(p_id_gestion);

}
function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_gestion = parametros.get('id');
  g_id_gestion = p_id_gestion;

  obtenerDatosEliminacion(p_id_gestion);
}
function obtenerDatosEliminacion(id_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/gestion/"+id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerDatosActualizacion(id_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/gestion/", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var nombreGestion = element.nombre_gestion;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar esta gestión con el id de <b>"+ id_gestion + " ? </b>";
   }
function completarFormularioActualizar(element,index,arr){
 var id_gestion = element.id_gestion;
 document.getElementById('txt_id_gestion').value = id_gestion;
  }
  function actualizarGestion() {
    // Obtener el ID de la gestión a actualizar
    const id_gestion = document.getElementById("txt_id_gestion").value;

    // Obtener los nuevos valores de los campos del formulario
    const fechaFormateada = obtenerFechaHora();
    const id_usuario = document.getElementById("txt_id_usuario").value;
    const id_cliente = document.getElementById("txt_id_cliente").value;
    const id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
    const id_resultado = document.getElementById("txt_id_resultado").value;
    const comentarios = document.getElementById("txt_comentarios").value;

    // Crear el objeto JSON con los datos actualizados
    const datosActualizados = {
        id_usuario,
        id_cliente,
        id_tipo_gestion,
        id_resultado,
        comentarios,
        fecha_registro: fechaFormateada
    };

    // Configurar las opciones de la solicitud
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados),
        redirect: "follow"
    };

    // Realizar la solicitud a la API para actualizar la gestión
    fetch(`http://144.126.210.74:8080/api/gestion/${id_gestion}`, requestOptions)
    .then(response => {
        if (response.ok) {
            // MODAL DE ÉXITO AL ACTUALIZAR
            const modal = new bootstrap.Modal(document.getElementById("exitoModalActualizar"));
            modal.show();
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.message || "Error al actualizar la gestión. Los datos están siendo utilizados por otras tablas.");
            });
        }
    })
  
    }


  
  function eliminarGestion(id_gestion) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
  
    fetch("http://144.126.210.74:8080/api/gestion/" + id_gestion, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          // MODAL DE EXITO AL ELIMINAR
          const modal = new bootstrap.Modal(document.getElementById("exitoModalEliminar"));
          modal.show();
          // Recargar la lista de gestiones después de eliminar
          listarGestion();
        } else if (response.status === 400) {
          // MODAL DE ERROR AL ELIMINAR
          const modal = new bootstrap.Modal(document.getElementById("errorModalEliminar"));
          modal.show();
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  

function cargarListasDesplegables(){
  cargarSelectResultado();
  cargarSelectCliente();
  cargarSelectUsuario();
}
function cargarSelectResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionResultado);
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionResultado(element,index,arr){
arr[index] = document.querySelector("#sel_id_resultado").innerHTML += 
`<option value='${element.id_resultado}'> ${element.nombre_resultado} </option>` 
}
function cargarSelectCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionCliente);
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionCliente(element,index,arr){
arr[index] = document.querySelector("#sel_id_cliente").innerHTML += 
`<option value='${element.id_cliente}'> ${element.apellidos} ${element.nombres} </option>` 
}
function cargarSelectUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionUsuario);
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionUsuario(element,index,arr){
arr[index] = document.querySelector("#sel_id_usuario").innerHTML += 
`<option value='${element.id_usuario}'>  ${element.apellidos} ${element.nombres}  </option>` 
}

function cargarSelectGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionGestion);
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionGestion(element,index,arr){
arr[index] = document.querySelector("#sel_id_tipo_gestion").innerHTML += 
`<option value='${element.id_gestion}'>  ${element.nombre_gestion}  </option>` 
}

function obtenerFechaHora(){
  var fechaHoraActual = new Date();
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit', 
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit', 
    second:'2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');

 return fechaFormateada;
}

function formatearFechaHora(fecha_registro){
  var fechaHoraActual = new Date(fecha_registro);
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit', 
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit', 
    second:'2-digit',
    timeZone: 'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');

 return fechaFormateada;
}