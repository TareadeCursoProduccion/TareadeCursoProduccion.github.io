// Validar formulario antes de enviar
document.getElementById('loginForm').addEventListener('submit', function(event) {
    var usuario = document.getElementById('usuario').value;
    var contrasena = document.getElementById('contrasena').value;
    
    if (!usuario || !contrasena) {
        event.preventDefault();
        alert('Por favor, complete todos los campos.');
    }
});

// Cambiar color del botón de inicio de sesión al pasar el ratón
var loginButton = document.getElementById('loginButton');
loginButton.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#FFC107';
});
loginButton.addEventListener('mouseout', function() {
    this.style.backgroundColor = '#FFD589';
});
