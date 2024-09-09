function a(i,h,f) {
    swal.fire({
        title: `Agendar para el dia: ${f}  a las: ${h}`,
        showCancelButton: true,
        confirmButtonText: 'aceptar',
        cancelButtonText: 'cancelar',
        confirmButtonColor: "#65a30d",
        cancelButtonColor: "#dc2626"
    }).then((willDelete) => {
        if (willDelete.isConfirmed) {
            rut = document.getElementById('rut').innerText
            nombre = document.getElementById('nombre').innerText
            apellidos = document.getElementById('apellido').innerText
            telefono = document.getElementById('telefono').innerText
            email = document.getElementById('email').innerText
            nacionalidad = document.getElementById('nacionalidad').innerText
            fetch(`/horario/create/${i}`, {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({respuesta:'si', id: rut, nombre: nombre, apellidos: apellidos, telefono: telefono, email: email, nacionalidad: nacionalidad})
            })
            .then((response) => response.json())
            .then((data)=>{
                if(data.message != 200){
                    swal.fire({
                        title: 'Error 1',
                        text: data.message,
                        icon: 'error',
                        confirmButtonColor: "#65a30d",
                        timer: 1500,
                        timerProgressBar: true
                    }).then((b) => {
                        window.location.reload()
                })}else{
                    swal.fire({
                        title: "Hora agendada",
                        icon: "success",
                        confirmButtonColor: "#65a30d",
                        timer: 1500,
                        timerProgressBar: true
                    }).then((b) => {
                        window.location.replace('/usuario')
                    });
                }})
            .catch((error) => {
                swal.fire({
                    title: 'Error 1',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: "#65a30d",
                    timer: 1500,
                    timerProgressBar: true
                }).then((b) => {
                    window.location.reload()
                });
            })
        } else {
            swal.fire({
                title: "Operacion cacelada",
                icon: "info",
                confirmButtonColor: "#65a30d",
                timer: 1500,
                timerProgressBar: true
            }).then((b) => {
                window.location.reload()
            });
        }
      });
}

// setInterval(() => {
//     window.location.reload()
// }, 300000);
