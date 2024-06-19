document.getElementById('categoryButton').addEventListener('click', function() {
    document.getElementById('inventorySection').style.display = 'none';
    document.getElementById('categorySection').style.display = 'block';
});

document.getElementById('inventoryButton').addEventListener('click', function() {
    document.getElementById('categorySection').style.display = 'none';
    document.getElementById('inventorySection').style.display = 'block';
});

document.getElementById('dashboardButton').addEventListener('click', function() {
    document.getElementById('categorySection').style.display = 'none';
    document.getElementById('inventorySection').style.display = 'none';
});

//crear categoria

// document.getElementById('openModalButton').addEventListener('click', function() {
//     document.getElementById('createCategoryModal').style.display = 'flex';
// });

// document.getElementById('closeModalButton').addEventListener('click', function() {
//     document.getElementById('createCategoryModal').style.display = 'none';
// });

//agregar imagen en categoria

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                
                // Determinar el tamaño del recorte (el lado más corto de la imagen)
                const side = Math.min(img.width, img.height);

                // Establecer el tamaño del canvas al tamaño del recorte
                canvas.width = side;
                canvas.height = side;

                // Calcular la posición para centrar el recorte
                const offsetX = (img.width - side) / 2;
                const offsetY = (img.height - side) / 2;

                // Dibujar la imagen recortada en el canvas
                ctx.drawImage(img, offsetX, offsetY, side, side, 0, 0, side, side);

                // Obtener la URL de datos del canvas y establecerla como fuente de la imagen
                const imageDataUrl = canvas.toDataURL('image/png');
                const imgDisplay = document.getElementById('imageDisplay');
                imgDisplay.src = imageDataUrl;
                imgDisplay.style.display = 'block';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});




// Función para inicializar el modal y configurar el event listener
function inicializarModal() {
    const modal = document.getElementById('createCategoryModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const createCategoryButton = document.querySelector('.create-button');
    const nombreInput = modal.querySelector('input[type="text"]');
    const imagenInput = modal.querySelector('#fileInput');
    const imgDisplay = document.getElementById('imageDisplay');

    // Event listener para cerrar el modal
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
        // Restaurar la imagen por defecto
        imgDisplay.src = 'assets/Image placeholder.png'; // Ruta de tu imagen por defecto
    });

    // Event listener para abrir el modal
    document.getElementById('openModalButton').addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    // Event listener para crear una nueva categoría
    createCategoryButton.addEventListener('click', function() {
        const nombreCategoria = nombreInput.value;
        // Aquí puedes manejar la lógica para procesar la imagen si es necesario
        const imagenCategoria = document.getElementById('imageDisplay').src; // Obtener la imagen del display

        // Crear objeto de categoría
        const nuevaCategoria = new Categoria(generarIdUnico(), nombreCategoria, imagenCategoria);

        // Obtener categorías del localStorage
        let categoriasGuardadas = JSON.parse(localStorage.getItem('Categorias')) || [];

        // Agregar nueva categoría al array
        categoriasGuardadas.push(nuevaCategoria);

        // Guardar en localStorage
        localStorage.setItem('Categorias', JSON.stringify(categoriasGuardadas));

        // Cerrar el modal
        modal.style.display = 'none';

        // Limpiar campos del modal si es necesario
        nombreInput.value = '';
        console.log(imagenCategoria);
        imgDisplay.src = 'assets/Image placeholder.png';
    });
}

// Generar un ID único para cada categoría (puedes usar una función más robusta según tus necesidades)
function generarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Clase Categoria
class Categoria {
    constructor(IdCategoria, NombreCategoria, ImagenCategoria) {
        this.IdCategoria = IdCategoria;
        this.NombreCategoria = NombreCategoria;
        this.ImagenCategoria = ImagenCategoria;
    }
}

// Ejecutar la función para inicializar el modal cuando se cargue la página
document.addEventListener('DOMContentLoaded', inicializarModal);
