document.addEventListener("DOMContentLoaded", function() {

const subtotal = localStorage.getItem('cestaSubTotal');

const productoPedido = document.getElementById('ProductoPedido');
const productoEnvio = document.getElementById('EnvioPedido');
const productoIVA = document.getElementById('IVAPedido');
const productoTotal = document.getElementById('TotalPedido');


// Calcula el IVA y el total
let iva = subtotal * 0.15;
let total = parseInt(subtotal)+parseInt("75")+iva;

// Actualiza el HTML de los elementos correspondientes
productoPedido.innerHTML = 'C$' + subtotal;
productoEnvio.innerHTML = 'C$' + 75;
productoIVA.innerHTML = 'C$' + iva.toFixed(2); // Asegura que el IVA tenga dos decimales
productoTotal.innerHTML = 'C$' + total;

  // Función de validación
  function validarFormulario() {
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDay = document.getElementById('expiry-day').value;
    const expiryYear = document.getElementById('expiry-year').value;
    const cvv = document.getElementById('cvv').value;
    const address = document.getElementById('address').value;

    if (!email || !cardNumber || !expiryDay || !expiryYear || !cvv || !address) {
        alert('Por favor, complete todos los campos.');
        return false;
    }
    return true;
}

document.getElementById('mostrarMapa').addEventListener('click', function(event) {
    const mapa = document.getElementById('mapa');
    if (mapa.style.display === 'none') {
        mapa.style.display = 'block';
    } else {
        mapa.style.display = 'none';
    }
});


var verification = 0;
var cvvInput = document.getElementById('cvv');
var cardNumberInput = document.getElementById('card-number');

cvvInput.addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, '');
});

cardNumberInput.addEventListener('keyup', (e) => {
const logoMarca = document.getElementById('logo-marca');   
    let valorInput = e.target.value;

cardNumberInput.value = valorInput
// Eliminamos espacios en blanco
.replace(/\s/g, '')
// Eliminar las letras
.replace(/\D/g, '')
// Ponemos espacio cada cuatro numeros
.replace(/([0-9]{4})/g, '$1 ')
// Elimina el ultimo espaciado
.trim();



if(valorInput == ''){

    verification = 0;
logoMarca.innerHTML = '';
}

if(valorInput[0] == 4){
logoMarca.innerHTML = '';
const imagen = document.createElement('img');
imagen.src = 'assets/visa.png';
imagen.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.3)";
imagen.style.backgroundColor = "#828079";
verification = 1;
logoMarca.appendChild(imagen);
} else if(valorInput[0] == 5){
logoMarca.innerHTML = '';
const imagen = document.createElement('img');
imagen.src = 'assets/mastercard.png';
imagen.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.3)";
verification = 1;
logoMarca.appendChild(imagen);
}

  
});

// Evento click para el botón de Realizar Pago
document.getElementById('realizar-pago').addEventListener('click', function(event) {
    if (validarFormulario()) {
        if(verification === 1)
        {
            window.location.href = 'EstadoPedido.html';
        }
        else
        {
            alert("Tarjeta no valida! Porfavor ingrese una tarjeta de credito valida.");
        }
    } else {
        event.preventDefault(); // Previene la redirección si el formulario no es válido
    }
});

// Manejadores de entrada para eliminar caracteres no válidos
var cvvInput = document.getElementById('cvv');
var cardNumberInput = document.getElementById('card-number');

cvvInput.addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, '');
});

cardNumberInput.addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, '');
});

});