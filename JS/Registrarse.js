document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('contrasena').value;
    

    if (usuario === 'Admin' && password === 'admin2024') {
        
        alert('Inicio de sesión como administrador exitoso.');
        localStorage.setItem('currentUser',usuario);
        if(localStorage.getItem('LoginVer') === '1')
            {
                window.location.href = 'index.html';
            }
            else
            {
                window.history.back();
            }
        return;
    }

    const userInfo = JSON.parse(localStorage.getItem(usuario));

    const newPassword =  localStorage.getItem('currentPassword');
    if (userInfo && newPassword === password) {
        
        alert('Inicio de sesión exitoso.');
        localStorage.setItem('currentUser',usuario);
        localStorage.setItem('currentPassword',password);
        if(localStorage.getItem('LoginVer') === '1')
        {
            window.location.href = 'index.html';
        }
        else
        {
            window.history.back();
        }
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

// Capturar evento cuando se selecciona una imagen
document.getElementById('imagen').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = function(event) {
        const preview = document.getElementById('preview');
        preview.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});


const adminUser = 'Admin';
const adminPassword = 'admin2024';

if (!localStorage.getItem(adminUser)) {
    const adminInfo = {
        nombre: 'Administrador',
        apellidos: 'Principal',
        email: 'admin@example.com',
        password: adminPassword
    };
    
    localStorage.setItem(adminUser, JSON.stringify(adminInfo));
}

