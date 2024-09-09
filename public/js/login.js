form = document.getElementById('login')
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form)

    fetch('/login/auth', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username: data.get('username'), password: data.get('password')})
    })
    .then((response) => {
        if(response.status != 200){
            return response.json()
        }else{
            window.location.replace('/horas')
        }
    })
    .then((data) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            iconColor: 'white',
            customClass: {
              popup: '!bg-red-400 text-white text-nowrap overflow-hidden',
            },
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: data.message
          });
    })
    .catch(error => {
      console.error(error);
    });
})