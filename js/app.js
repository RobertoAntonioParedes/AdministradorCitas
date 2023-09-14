//Campos del formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCitas(cita){
        this.citas = [...this.citas, cita];
    };

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map(cita.id === citaActualizada.id ? citaActualizada : cita);
    }
    

};

class UI{
    mostrarAlerta(mensaje, tipo){

        //Crear el DIV
        const alertaDiv = document.createElement('DIV');
        alertaDiv.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase de acuerdo al tipo de alerta
        if(tipo === 'error'){
            alertaDiv.classList.add('alert-danger');
        }else{
            alertaDiv.classList.add('alert-success');
        };
        
        //Mensaje de alerta
        alertaDiv.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(alertaDiv, document.querySelector('.agregar-cita'));

        setTimeout(()=>{
            alertaDiv.remove();
        }, 3500);
    };

    imprimirCitas({citas}){
        this.limpiarHtml();
        citas.forEach(cita=>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const citaDiv = document.createElement('DIV');
            citaDiv.classList.add('cita', 'p-3');
            citaDiv.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('H2');
            mascotaParrafo.classList.add('card-title' , 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;
            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML =  `
            <span class= "font-weight-bolder">Propietario: </span> ${propietario}
            `;
            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
            <span class= "font-weight-bolder">Teléfono: </span> ${telefono}
            `;
            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
            <span class= "font-weight-bolder">Fecha: </span> ${fecha}
            `;
            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML =  `
            <span class= "font-weight-bolder">Hora: </span> ${hora}
            `;
            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML =  `
            <span class= "font-weight-bolder">Fecha: </span> ${sintomas}
            `;

            //Boton eliminar la cita
            const btnEliminar = document.createElement('BUTTON');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>';

            btnEliminar.onclick = ()=> eliminarCita(id);

            const btnEditar = document.createElement('BUTTON');
            btnEditar.classList.add('btn', 'btn-info','mr-2');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>'

            btnEditar.onclick= ()=> editarCita(cita);


            //Agregar los parrafos a citaDiv
            citaDiv.appendChild(mascotaParrafo); 
            citaDiv.appendChild(propietarioParrafo);
            citaDiv.appendChild(telefonoParrafo); 
            citaDiv.appendChild(fechaParrafo);
            citaDiv.appendChild(horaParrafo); 
            citaDiv.appendChild(sintomasParrafo);
            citaDiv.appendChild(btnEliminar);
            citaDiv.appendChild(btnEditar);
            
            //Agregar las citas al Html
            contenedorCitas.appendChild(citaDiv);
        });
    };
    //Limpiar HTML
    limpiarHtml(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    };

};

const administrarCitas = new Citas();
const ui = new UI();

//Registrar eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCitas);
    propietarioInput.addEventListener('input', datosCitas);
    telefonoInput.addEventListener('input', datosCitas);
    fechaInput.addEventListener('input', datosCitas);
    horaInput.addEventListener('input', datosCitas);
    sintomasInput.addEventListener('input', datosCitas);

    formulario.addEventListener('submit', nuevaCita);
};

//Objeto con la información de la cita
const citaObj ={
    mascota: '',
    propietario: '',
    telefono: '',
    fecha:'',
    hora: '',
    sintomas:''
}

//Agrega datos al objeto de cita
function datosCitas(e){
    citaObj[e.target.name] = e.target.value;

};

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    //extraer la informacion del objeto citaObj
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar
    if(mascota === '' ||propietario === '' || telefono === '' || fecha === ''||hora === '' ||sintomas === '' ){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    if(editando){
        ui.mostrarAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        //Regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitar modo edicion
        editando = false;


    }else{
        //Generar un id unico
        citaObj.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agregarCitas({...citaObj});

        //Generar un mensaje de creado correctamente
        ui.mostrarAlerta('Agregado correctamente');

    };



//Reiniciar el objeto para la validacion
reiniciarObjeto();

//Reinicia el formulario
formulario.reset();

//Mostrar el HTML
ui.imprimirCitas(administrarCitas);
};


function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
};

function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre un mensaje
    ui.mostrarAlerta('La cita se eliminó correctamente');

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
};

//Carga los datos y el modo de edicion
function editarCita(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas,id} = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas,
    citaObj.id = id;

    //Cambiar el texto del boton 
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

};

