function tipo_usuario() {
    var chl = document.getElementById("chl");
    var ext = document.getElementById("ext");

        if (ext.style.display === "block") {
            ext.style.display = "none";
            chl.style.display = "block";
        } else {
            ext.style.display = "block";
            chl.style.display = "none";
        }
}

function valid(i,r){
    document.getElementById(`check_ico${i}`).className =  `fa fa-check-circle absolute bottom-1/3 right-3 text-green-500`;
    document.getElementById(`${r}`).className = `peer block border border-green-500 rounded-md w-full text-lg p-2 my-2 focus:ring-0 focus:outline-none`
    document.getElementById(`err_${r}`).classList.replace('visible', 'hidden');
    document.getElementById(`label_${r}`).classList.replace('text-gray-500', 'text-green-500');
    document.getElementById(`label_${r}`).classList.replace('text-red-500', 'text-green-500');
}

function invalid(i,r) {
    document.getElementById(`check_ico${i}`).className =  `opacity-0`;
    document.getElementById(`${r}`).className = `peer block border border-red-500 rounded-md w-full text-lg p-2 my-2 focus:ring-0 focus:outline-none`
    document.getElementById(`err_${r}`).classList.replace('hidden', 'visible');
    document.getElementById(`label_${r}`).classList.replace('text-gray-500', 'text-red-500');
    document.getElementById(`label_${r}`).classList.replace('text-green-500', 'text-red-500'); 
}

function validar_rut(i) {
    let x = document.getElementById("rut").value;
    let rutv = x.replace(/[^kK0-9]/g,'');
    let largo = x.length
    
    //obtener digito verificador
    let dv = rutv.substring(rutv.length -1);
    //obtener numeros sin Digito Verificador
    let rutn = rutv.substring(0 , rutv.length -1);
    let numeros = rutn.split('').reverse();
    let total = 0;
    //formatear rut
    result = rutv.slice(-4, -1) + '-' + dv
    for (let i = 4; i < rutv.length; i += 3) {
      result = rutv.slice(-3 - i, -i) + '.' + result
    }
    i.value = result
    //se empieza la multiplicacion en 2 hasta el 7
    let mult = 2;
    //se crea un for para aumentar el mult hasta 7 y agregar el total
    for(let num of numeros){
        total += parseInt(num) * mult;

        if(mult == 7){
            mult = 2;
        }else{
            mult++;
        }
    }
    let dvr = 11 - (total % 11);
    if(dvr == 11){
        dvr = '0';
    }else if(dvr == 10){
        dvr = 'k';
    }
    if (dv == dvr){
        if (largo >= 10) {
            valid('','rut')
            chl.rut = true
        }        
        }else{
            chl.rut = false
            invalid('','rut')
        }
}

function num_doc() {
    let x = document.getElementById("num_doc").value;
    let expression = /^[0-9_.\s-]{4,40}$/
    let largo = x.length
    if(expression.test(x) && largo >= 4){
        valid('_ext','num_doc')
        ext.num_doc = true
    }else{
        invalid('_ext','num_doc')
        ext.num_doc = false
    }
}

const form = document.getElementById('chl')
const form_ext = document.getElementById('ext')
const inputs = document.querySelectorAll('#chl app-input input')
const inputs_e = document.querySelectorAll('#ext app-input input')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const chl = {
    rut: false,
	nombre: false,
	apellido: false,
	email: false,
	telefono: false
}

const ext = {
    num_doc : false,
	nombre_ext: false,
	apellido_ext: false,
	email_ext: false,
	telefono_ext: false
}

function a(expression, input, i, n) {
    if(expression.test(input.value)){
        document.getElementById(`check_ico_${i}`).className =  `fa fa-check-circle absolute bottom-1/3 right-3 text-green-500`;
        document.getElementById(`${i}`).className = `peer block border border-green-500 rounded-md w-full text-lg p-2 my-2 focus:ring-0 focus:outline-none`
        document.getElementById(`err_${i}`).classList.replace('visible', 'hidden');
        document.getElementById(`label_${i}`).classList.replace('text-gray-500', 'text-green-500');
        document.getElementById(`label_${i}`).classList.replace('text-red-500', 'text-green-500');
        n[i] = true;
    }else{
        document.getElementById(`check_ico_${i}`).className =  `opacity-0`;
        document.getElementById(`${i}`).className = `peer block border border-red-500 rounded-md w-full text-lg p-2 my-2 focus:ring-0 focus:outline-none`
        document.getElementById(`err_${i}`).classList.replace('hidden', 'visible');
        document.getElementById(`label_${i}`).classList.replace('text-gray-500', 'text-red-500');
        document.getElementById(`label_${i}`).classList.replace('text-green-500', 'text-red-500');
        n[i] = false;
    }
}

const validar = (e) => {
    switch (e.target.name) {
        case "run":
            e.target.addEventListener('keypress', (e) => {
                const exp = /[kK0-9]/;
                if (!exp.test(e.key)) e.preventDefault();
            })
            validar_rut(e.target);
        break;
        case "nombre":
            a(expresiones.nombre, e.target, 'nombre', chl)
        break;
        case "apellido":
            a(expresiones.nombre, e.target, 'apellido', chl)
        break;
        case "telefono":
            e.target.addEventListener('keypress', (e) => {
                const exp = /[0-9]/;
                if (!exp.test(e.key)) e.preventDefault();
            })
            a(expresiones.telefono, e.target, 'telefono', chl)
        break;
        case "email":
            a(expresiones.email, e.target, 'email', chl)
        break;
    }
}

const validar_ext = (e) => {
    switch (e.target.name) {
        case "numero_documento":
            num_doc();
        break;
        case "nombre":
            a(expresiones.nombre, e.target, 'nombre_ext', ext)
        break;
        case "apellido":
            a(expresiones.nombre, e.target, 'apellido_ext', ext)
        break;
        case "telefono":
            e.target.addEventListener('keypress', (e) => {
                const exp = /[0-9]/;
                if (!exp.test(e.key)) e.preventDefault();
            })
            a(expresiones.telefono, e.target, 'telefono_ext', ext)
        break;
        case "email":
            a(expresiones.email, e.target, 'email_ext', ext)
        break;
    }
}

const c = () => {
    if (chl.rut && chl.nombre && chl.apellido && chl.email && chl.telefono){
        document.getElementById(`save`).removeAttribute("disabled");
    }else{
        document.getElementById(`save`).setAttribute("disabled", true);
    }
}
const e = () => {
    if (ext.num_doc && ext.nombre_ext && ext.apellido_ext && ext.email_ext && ext.telefono_ext){
        document.getElementById(`save_ext`).removeAttribute("disabled");
    }else{
        document.getElementById(`save_ext`).setAttribute("disabled", true);
    }
}

inputs.forEach((input) => {
    input.addEventListener('input', validar)
    input.addEventListener('blur', validar)
    input.addEventListener('input', c)
})

inputs_e.forEach((input) => {
    input.addEventListener('input', validar_ext)
    input.addEventListener('blur', validar_ext)
    input.addEventListener('input', e)
})