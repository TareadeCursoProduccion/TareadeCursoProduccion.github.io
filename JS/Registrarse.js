
document.querySelector('.form')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.querySelector('#nombre + input').value.trim();
    const email = document.getElementById('email').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    const imagen = document.getElementById('imagen');
 
    if(!imagen)
    {
      alert('No has seleccionado ninguna imagen! porfavor selecciona una imagen');
      return;
    }

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
        password,
        imagen
    };
       localStorage.setItem(usuario, JSON.stringify(userInfo));
//       var canvas = document.createElement('canvas');
//canvas.width = img.width;
//canvas.height = img.height;

//var ctx = canvas.getContext('2d');
//ctx.drawImage(img, 0, 0);

//var base64Img = canvas.toDataURL('image/png'); // Cambiar a 'image/png' si es PNG

// Guardar en localStorage
//localStorage.setItem('profileImage', base64Img);
    alert('Cuenta creada exitosamente. Por favor, inicia sesión.');
    window.location.href = 'Login.html'; 
});

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('contrasena').value;
    

    if (usuario === 'Admin' && password === 'admin2024') {
        
        alert('Inicio de sesión como administrador exitoso.');
        localStorage.setItem('currentUser',usuario);
        if(localStorage.getItem('LoginVer' === 1))
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

    if (userInfo && userInfo.password === password) {
        
        alert('Inicio de sesión exitoso.');
        localStorage.setItem('currentUser',usuario);
       
        if(localStorage.getItem('LoginVer' === 1))
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

