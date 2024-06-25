document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('crearCuenta').addEventListener('click', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const email = document.getElementById('email').value.trim();
        const usuario = document.getElementById('usuario').value.trim();
        const password = document.getElementById('password').value;
    
        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
    
        if (localStorage.getItem(usuario)) {
            alert('El nombre de usuario ya está en uso. Por favor, elija otro.');
            return;
        }
    
        const existingUser = Object.keys(localStorage).find(key => {
            const userInfo = JSON.parse(localStorage.getItem(key));
            return userInfo.email === email;
        });
    
        if (existingUser) {
            alert('El correo electrónico ya está registrado con otra cuenta. Por favor, utilice otro correo electrónico.');
            return;
        }
    
        const userInfo = {
            nombre,
            apellidos,
            email,
            password
        };
    
        localStorage.setItem(usuario, JSON.stringify(userInfo));
        alert('Cuenta creada exitosamente. Por favor, inicia sesión.');
    
        localStorage.setItem('LoginVer', '1'); // Cambiado a cadena para consistencia
        window.location.href = 'Login.html';
    });
});