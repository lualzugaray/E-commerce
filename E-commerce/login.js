function iniciarSesion() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword && password === storedPassword) {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
        }).then(() => {
            sessionStorage.setItem("usuarioLogeado", username);
            window.location.href = "index.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
        });
    }
}