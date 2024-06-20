document.getElementById('categoryButton').addEventListener('click', function () {
    document.getElementById('inventorySection').style.display = 'none';
    document.getElementById('categorySection').style.display = 'block';
});

document.getElementById('inventoryButton').addEventListener('click', function () {
    document.getElementById('categorySection').style.display = 'none';
    document.getElementById('inventorySection').style.display = 'block';
});

document.getElementById('dashboardButton').addEventListener('click', function () {
    document.getElementById('categorySection').style.display = 'none';
    document.getElementById('inventorySection').style.display = 'none';
});

//agregar imagen en categoria

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
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
                const modifyImageDisplay = document.getElementById('modifyImageDisplay');
                if(imgDisplay){
                    imgDisplay.src = imageDataUrl;
                    imgDisplay.style.display = 'block';
                }

                if(modifyImageDisplay){
                    modifyImageDisplay.src = imageDataUrl;
                    modifyImageDisplay.style.display = 'block';
                }
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
    // const modifyCategoryModal = document.getElementById('modifyCategoryModal');
    const createProductModal = document.getElementById('createProductModal');



    // Event listener para cerrar el modal de creación de inventario
    closeProductModalButton.addEventListener('click', function () {
        createProductModal.style.display = 'none';
        // Restaurar la imagen por defecto
        imgDisplay.src = 'assets/Image placeholder.png';
    });

    // Event listener para abrir el modal de creación de inventario
    document.getElementById('openModalProductButton').addEventListener('click', function () {
        createProductModal.style.display = 'flex';
    });

    // Event listener para cerrar el modal de creación
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
        // Restaurar la imagen por defecto
        imgDisplay.src = 'assets/Image placeholder.png';
    });

    // Event listener para abrir el modal de creación
    document.getElementById('openModalButton').addEventListener('click', function () {
        modal.style.display = 'flex';
    });

    // Event listener para crear una nueva categoría
    createCategoryButton.addEventListener('click', function () {
        const nombreCategoria = nombreInput.value;
        // Aquí puedes manejar la lógica para procesar la imagen si es necesario
        const imagenCategoria = document.getElementById('imageDisplay').src; // Obtener la imagen del display

        crearCategoria(generarIdUnico(), nombreCategoria, imagenCategoria);

        // Cerrar el modal
        modal.style.display = 'none';

        // Limpiar campos del modal si es necesario
        nombreInput.value = '';
        imgDisplay.src = 'assets/Image placeholder.png';
    });
}

// Generar un ID único para cada categoría (puedes usar una función más robusta según tus necesidades)
let ultimoId = 8;

// Función para generar un ID único secuencial
function generarIdUnico() {
    return ultimoId++;
}

// Ejecutar la función para inicializar el modal cuando se cargue la página
document.addEventListener('DOMContentLoaded', inicializarModal);

// Clase Categoria
class Categoria {
    constructor(IdCategoria, NombreCategoria, ImagenCategoria) {
        this.IdCategoria = IdCategoria;
        this.NombreCategoria = NombreCategoria;
        this.ImagenCategoria = ImagenCategoria;
    }
}

// Arreglo para almacenar las categorías
let categorias = [];

// Crear (Add) una nueva categoría
function crearCategoria(IdCategoria, NombreCategoria, ImagenCategoria) {
    const nuevaCategoria = new Categoria(IdCategoria, NombreCategoria, ImagenCategoria);
    categorias.push(nuevaCategoria);
    actualizarCategoriaDOM();
}

// Leer (Read) todas las categorías
function leerCategorias() {
    return categorias;
}

// Leer (Read) una categoría por su ID
function leerCategoriaPorId(IdCategoria) {
    return categorias.find(categoria => categoria.IdCategoria === IdCategoria);
}

// Actualizar (Update) una categoría por su ID
function actualizarCategoria(IdCategoria, nuevoNombre, nuevaImagen) {
    const categoria = categorias.find(categoria => categoria.IdCategoria === IdCategoria);
    if (categoria) {
        categoria.NombreCategoria = nuevoNombre;
        categoria.ImagenCategoria = nuevaImagen;
        actualizarCategoriaDOM();
        return true;
    }
    return false;
}

// Eliminar (Delete) una categoría por su ID
function eliminarCategoria(IdCategoria) {
    const indice = categorias.findIndex(categoria => categoria.IdCategoria === IdCategoria);
    if (indice !== -1) {
        categorias.splice(indice, 1);
        actualizarCategoriaDOM();
        return true;
    }
    return false;
}

// Función para actualizar el DOM con los datos del arreglo de categorías
function actualizarCategoriaDOM() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = ''; // Limpiar la lista actual

    categorias.forEach(categoria => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('product-item');

        categoryItem.innerHTML = `
            <div class="product-details">
                <img src="${categoria.ImagenCategoria}" alt="${categoria.NombreCategoria}">
                <span class="product-name">${categoria.NombreCategoria}</span>
            </div>
            <div class="product-actions">
                <button class="image-button" onclick="abrirModificarCategoria(${categoria.IdCategoria})">
                    <img src="assets/pencil.png" alt="Editar">
                </button>
                <button class="image-button" onclick="confirmarEliminarCategoria(${categoria.IdCategoria})">
                    <img src="assets/trash.png" alt="Eliminar">
                </button>
            </div>
        `;

        categoryList.appendChild(categoryItem);
    });
}

// Función para confirmar y eliminar una categoría
function confirmarEliminarCategoria(IdCategoria) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    if (confirmar) {
        eliminarCategoria(IdCategoria);
    }
}

// Crear categorías
crearCategoria(1, "Alimentos", "assets/Alimentos icon.png");
crearCategoria(2, "Bebidas", "assets/Bebidas icon.png");
crearCategoria(3, "Embutidos", "assets/Embutidos icon.png");
crearCategoria(4, "Helados", "assets/Helados icon.png");
crearCategoria(5, "Higiene", "assets/higiene icon.png");
crearCategoria(6, "Lacteos", "assets/lacteos icon.png");
crearCategoria(7, "Limpieza", "assets/limpieza icon.png");


// // Leer todas las categorías
// console.log(leerCategorias());

// // Leer una categoría por su ID
// console.log(leerCategoriaPorId(2));

// // Actualizar una categoría
// actualizarCategoria(2, "Ropa y Accesorios", "nueva-imagen-ropa.jpg");

// // Leer todas las categorías después de la actualización
// console.log(leerCategorias());

// // Eliminar una categoría
// eliminarCategoria(1);

// // Leer todas las categorías después de la eliminación
// console.log(leerCategorias());


// Función para abrir el modal de modificar categoría
function abrirModificarCategoria(IdCategoria) {
    const categoria = leerCategoriaPorId(IdCategoria);
    if (categoria) {
        const modifyImageDisplay = document.getElementById('modifyImageDisplay');
        const modifyCategoryId = document.getElementById('modifyCategoryId');
        const modifyCategoryName = document.getElementById('modifyCategoryName');

        // Llenar los campos del modal con los datos de la categoría seleccionada
        modifyImageDisplay.src = categoria.ImagenCategoria;
        modifyCategoryId.value = categoria.IdCategoria;
        modifyCategoryName.value = categoria.NombreCategoria;

        // Mostrar el modal de modificar categoría
        const modifyCategoryModal = document.getElementById('modifyCategoryModal');
        modifyCategoryModal.style.display = 'flex';
    }
}

// Función para cerrar el modal de modificar categoría
function cerrarModificarCategoriaModal() {
    const modifyCategoryModal = document.getElementById('modifyCategoryModal');
    modifyCategoryModal.style.display = 'none';
}

// Evento para cerrar el modal de modificar categoría al hacer clic en el botón de cerrar
const closeModifyModalButton = document.getElementById('closeModifyModalButton');
if (closeModifyModalButton) {
    closeModifyModalButton.addEventListener('click', cerrarModificarCategoriaModal);
}

// Evento para cerrar el modal de modificar categoría al hacer clic fuera del modal
window.onclick = function(event) {
    const modifyCategoryModal = document.getElementById('modifyCategoryModal');
    if (event.target == modifyCategoryModal) {
        modifyCategoryModal.style.display = 'none';
    }
};

// Evento para actualizar categoría
const updateButton = document.querySelector('#modifyCategoryModal .update-button');
if (updateButton) {
    updateButton.addEventListener('click', function() {
        const modifyCategoryId = document.getElementById('modifyCategoryId').value;
        const modifyCategoryName = document.getElementById('modifyCategoryName').value;
        const modifyCategoryImage = document.getElementById('modifyImageDisplay').src;
        const imgDisplay = document.getElementById('imageDisplay');

        // Lógica para actualizar la categoría en el arreglo y en el DOM
        const updated = actualizarCategoria(Number(modifyCategoryId), modifyCategoryName, modifyCategoryImage);
        if (updated) {
            cerrarModificarCategoriaModal();
            imgDisplay.src = 'assets/Image placeholder.png';
        } else {
            alert('No se pudo actualizar la categoría. Inténtalo de nuevo.');
        }
    });
}















// Clase Producto del Inventario
class Inventario {
    constructor(IdInventario, NombreInventario, CantidadInventario, CosteInventario, PrecioInventario, ImagenInventario) {
        this.IdInventario = IdInventario;
        this.NombreInventario = NombreInventario;
        this.CantidadInventario = CantidadInventario;
        this.CosteInventario = CosteInventario;
        this.PrecioInventario = PrecioInventario;
        this.ImagenInventario = ImagenInventario;
    }
}

// Arreglo para almacenar los productos del inventario
let inventario = [];

// Función para generar un ID único para cada producto
let ultimoIdProducto = 1;
function generarIdUnicoProducto() {
    return ultimoIdProducto++;
}

// Crear (Add) un nuevo producto en el inventario
function crearProducto(NombreInventario, CantidadInventario, CosteInventario, PrecioInventario, ImagenInventario) {
    const nuevoId = generarIdUnicoProducto();
    const nuevoProducto = new Inventario(nuevoId, NombreInventario, CantidadInventario, CosteInventario, PrecioInventario, ImagenInventario);
    inventario.push(nuevoProducto);
    actualizarInventarioDOM();
}

// Leer (Read) todos los productos del inventario
function leerProductos() {
    return inventario;
}

// Leer (Read) un producto por su ID en el inventario
function leerProductoPorId(IdInventario) {
    return inventario.find(producto => producto.IdInventario === IdInventario);
}

// Actualizar (Update) un producto por su ID en el inventario
function actualizarProducto(IdInventario, nuevoNombre, nuevaCantidad, nuevoCosto, nuevoPrecio, nuevaImagen) {
    const producto = inventario.find(producto => producto.IdInventario === IdInventario);
    if (producto) {
        producto.NombreInventario = nuevoNombre;
        producto.CantidadInventario = nuevaCantidad;
        producto.CosteInventario = nuevoCosto;
        producto.PrecioInventario = nuevoPrecio;
        producto.ImagenInventario = nuevaImagen;
        actualizarInventarioDOM();
        return true;
    }
    return false;
}

// Eliminar (Delete) un producto por su ID en el inventario
function eliminarProducto(IdInventario) {
    const indice = inventario.findIndex(producto => producto.IdInventario === IdInventario);
    if (indice !== -1) {
        inventario.splice(indice, 1);
        actualizarInventarioDOM();
        return true;
    }
    return false;
}

// Función para actualizar el DOM con los datos del arreglo de productos del inventario
function actualizarInventarioDOM() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista actual

    inventario.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <div class="product-details">
                <img src="${producto.ImagenInventario}" alt="${producto.NombreInventario}">
                <span class="product-name">${producto.NombreInventario}</span>
                <span class="product-quantity">${producto.CantidadInventario}</span>
                <span class="product-cost">${producto.CosteInventario}</span>
                <span class="product-price">${producto.PrecioInventario}</span>
            </div>
            <div class="product-actions">
                <button class="image-button" data-product-id="${producto.IdInventario}">
                    <img src="assets/pencil.png" alt="Editar">
                </button>
                <button class="image-button" onclick="confirmarEliminarProducto(${producto.IdInventario})">
                    <img src="assets/trash.png" alt="Eliminar">
                </button>
            </div>
        `;

        productList.appendChild(productItem);
    });

    // Volver a vincular los eventos de edición después de actualizar el DOM
    const editButtons = document.querySelectorAll('.product-actions .image-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productId = event.target.dataset.productId;
            abrirModificarProducto(Number(productId));
        });
    });
}



// Función para abrir el modal de modificación de producto en el inventario
function abrirModificarProducto(IdInventario) {
    const producto = leerProductoPorId(IdInventario);
    if (producto) {
        const modifyProductModal = document.getElementById('modifyProductModal');
        const modifyProductImageDisplay = document.getElementById('modifyProductImageDisplay');
        const modifyProductName = document.getElementById('modifyProductName');
        const modifyProductQuantity = document.getElementById('modifyProductQuantity');
        const modifyProductCost = document.getElementById('modifyProductCost');
        const modifyProductPrice = document.getElementById('modifyProductPrice');

        modifyProductImageDisplay.src = producto.ImagenInventario;
        modifyProductName.value = producto.NombreInventario;
        modifyProductQuantity.value = producto.CantidadInventario;
        modifyProductCost.value = producto.CosteInventario;
        modifyProductPrice.value = producto.PrecioInventario;
        document.getElementById('modifyProductId').value = producto.IdInventario;

        modifyProductModal.style.display = 'flex';
    }
}

// Función para cerrar el modal de modificación de producto en el inventario
function cerrarModificarProductoModal() {
    const modifyProductModal = document.getElementById('modifyProductModal');
    modifyProductModal.style.display = 'none';
}

// Función para confirmar y eliminar un producto del inventario
function confirmarEliminarProducto(IdInventario) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmar) {
        eliminarProducto(IdInventario);
    }
}

// Event listener para el botón de crear producto en el modal
document.getElementById('createProductModal').addEventListener('click', function () {
    const productFileInput = document.getElementById('productFileInput');
    const productImageDisplay = document.getElementById('productImageDisplay');
    const productCanvas = document.getElementById('productCanvas');
    const productNameInput = document.getElementById('productNameInput');
    const productQuantityInput = document.getElementById('productQuantityInput');
    const productCostInput = document.getElementById('productCostInput');
    const productPriceInput = document.getElementById('productPriceInput');

    const file = productFileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const side = Math.min(img.width, img.height);
                canvas.width = side;
                canvas.height = side;

                const offsetX = (img.width - side) / 2;
                const offsetY = (img.height - side) / 2;

                ctx.drawImage(img, offsetX, offsetY, side, side, 0, 0, side, side);

                const imageDataUrl = canvas.toDataURL('image/png');
                productImageDisplay.src = imageDataUrl;
                productImageDisplay.style.display = 'block';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Event listener para el botón de guardar cambios en el modal de modificación de producto
document.getElementById('modifyProductModal').addEventListener('click', function () {
    const modifyProductFileInput = document.getElementById('modifyProductFileInput');
    const modifyProductImageDisplay = document.getElementById('modifyProductImageDisplay');
    const modifyProductCanvas = document.getElementById('modifyProductCanvas');

    const file = modifyProductFileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const side = Math.min(img.width, img.height);
                canvas.width = side;
                canvas.height = side;

                const offsetX = (img.width - side) / 2;
                const offsetY = (img.height - side) / 2;

                ctx.drawImage(img, offsetX, offsetY, side, side, 0, 0, side, side);

                const imageDataUrl = canvas.toDataURL('image/png');
                modifyProductImageDisplay.src = imageDataUrl;
                modifyProductImageDisplay.style.display = 'block';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Función para inicializar los modales al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const createProductModal = document.getElementById('createProductModal');
    const closeCreateModalButton = document.getElementById('closeCreateModalButton');
    const modifyProductModal = document.getElementById('modifyProductModal');
    const closeModifyModalButton = document.getElementById('closeModifyModalButton');

    closeCreateModalButton.addEventListener('click', cerrarCrearProductoModal);
    closeModifyModalButton.addEventListener('click', cerrarModificarProductoModal);
});


// Ejemplos de uso

// Crear productos del inventario
crearProducto("Producto 1", 8, 25, 30, "assets/Image placeholder.png");
crearProducto("Producto 2", 10, 30, 40, "assets/Image placeholder.png");
crearProducto("Producto 3", 5, 15, 20, "assets/Image placeholder.png");

// // Leer todos los productos del inventario
// console.log(leerProductos());

// // Leer un producto por su ID
// console.log(leerProductoPorId(2));

// // Actualizar un producto del inventario
// actualizarProducto(2, "Producto 2 Actualizado", 12, 35, "C$45", "assets/Nueva imagen.png");

// // Leer todos los productos del inventario después de la actualización
// console.log(leerProductos());

// // Eliminar un producto del inventario
// eliminarProducto(1);

// // Leer todos los productos del inventario después de la eliminación
// console.log(leerProductos());
