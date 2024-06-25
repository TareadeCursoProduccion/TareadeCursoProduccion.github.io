document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('crearCuenta').addEventListener('click', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const email = document.getElementById('email').value.trim();
        const usuario = document.getElementById('usuario').value.trim();
        const password = document.getElementById('password').value;
    
        localStorage.setItem('nombreUser', nombre);
        localStorage.setItem('apellidosUser', apellidos);
        localStorage.setItem('emailUser', email);
        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
    
        if (localStorage.getItem(usuario)) {
            alert('El nombre de usuario ya está en uso. Por favor, elija otro.');
            return;
        }
    
        function isValidJSON(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        
        // Encuentra el usuario existente basado en el email
        const existingUser = Object.keys(localStorage).find(key => {
            const item = localStorage.getItem(key);
            if (isValidJSON(item)) {
                const userInfo = JSON.parse(item);
                return userInfo.email === email;
            }
            return false;
        });
        
        localStorage.setItem('currentPassword',password);
        if (existingUser) {
            console.log("Usuario existente:", existingUser);
        } else {
            console.log("Usuario no encontrado");
        }
    
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