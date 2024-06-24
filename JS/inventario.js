


// dashboard
function displayCategorias() {
  const categoriaContainer = document.getElementById('categoria-buttons');
  if (!categoriaContainer) {
    console.error('Elemento con id "categoria-buttons" no encontrado.');
    return;
  }
  categoriaContainer.innerHTML = ''; // Limpiar el contenido previo
  categorias.forEach(categoria => {
    const button = document.createElement('button');
    button.classList.add('button');
    button.innerText = categoria.NombreCategoria;
    button.onclick = () => {
      console.log(`Botón de categoría "${categoria.NombreCategoria}" clicado.`);
      displayInventarios(categoria.NombreCategoria);
    };
    categoriaContainer.appendChild(button);
  });
}

function displayInventarios(categoria) {
  const inventarioContainer = document.getElementById('inventario-items');
  if (!inventarioContainer) {
    console.error('Elemento con id "inventario-items" no encontrado.');
    return;
  }
  inventarioContainer.innerHTML = ''; // Limpiar el contenido previo
  const items = inventario.filter(item => {
    console.log(`Comparando ${item.CategoriaInventario.toLowerCase()} con ${categoria.toLowerCase()}`);
    return item.CategoriaInventario.toLowerCase() === categoria.toLowerCase();
  });
  if (items.length === 0) {
    inventarioContainer.innerHTML = '<p>No hay productos en esta categoría.</p>';
  } else {
    items.forEach(inventario => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      itemDiv.innerHTML = `
        <img src="${inventario.ImagenInventario}" alt="${inventario.NombreInventario}">
        <h3>${inventario.NombreInventario}</h3>
        <p>Categoría: ${inventario.CategoriaInventario}</p>
        <p>Cantidad: ${inventario.CantidadInventario}</p>
        <p>Coste: $${inventario.CosteInventario}</p>
        <p>Precio: $${inventario.PrecioInventario}</p>
      `;
      inventarioContainer.appendChild(itemDiv);
    });
  }
}

let myChart; // Variable global para almacenar la instancia de Chart

function generateChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) {
    console.error('Elemento con id "categoryChart" no encontrado.');
    return;
  }
  
  // Destruir la gráfica existente si hay una
  if (myChart) {
    myChart.destroy();
  }

  const context = ctx.getContext('2d');
  const categoryCounts = categorias.map(categoria => {
    return inventario.filter(item => item.CategoriaInventario.toLowerCase() === categoria.NombreCategoria.toLowerCase()).length;
  });

  console.log('Datos de la gráfica:', categoryCounts);

  myChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: categorias.map(categoria => categoria.NombreCategoria),
      datasets: [{
        label: 'Cantidad de Productos',
        data: categoryCounts,
        backgroundColor: ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8'],
        borderColor: ['#0056b3', '#5a6268', '#218838', '#c82333', '#e0a800', '#138496'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayCategorias();
  generateChart();
});

//otro

document
  .getElementById("categoryButton")
  .addEventListener("click", function () {
    document.getElementById("inventorySection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("categorySection").style.display = "block";
  });

document
  .getElementById("inventoryButton")
  .addEventListener("click", function () {
    document.getElementById("categorySection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("inventorySection").style.display = "block";
  });

document
  .getElementById("dashboardButton")
  .addEventListener("click", function () {
   // Mostrar la sección del dashboard y ocultar las demás
   document.getElementById("dashboardSection").style.display = "block";
   document.getElementById("inventorySection").style.display = "none";
   document.getElementById("categorySection").style.display = "none";
});

//agregar imagen en categoria

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.getElementById("canvas");
          const ctx = canvas.getContext("2d");

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
          const imageDataUrl = canvas.toDataURL("image/png");
          const imgDisplay = document.getElementById("imageDisplay");
          const modifyImageDisplay =
            document.getElementById("modifyImageDisplay");
          if (imgDisplay) {
            imgDisplay.src = imageDataUrl;
            imgDisplay.style.display = "block";
          }

          if (modifyImageDisplay) {
            modifyImageDisplay.src = imageDataUrl;
            modifyImageDisplay.style.display = "block";
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Función para inicializar el modal y configurar el event listener
function inicializarModal() {
  const modal = document.getElementById("createCategoryModal");
  const createProductModal = document.getElementById("createProductModal");
  const closeModalButton = document.getElementById("closeModalButton");
  const closeProductModalButton = document.getElementById(
    "closeProductModalButton"
  );
  const createCategoryButton = document.querySelector(".create-button");
  const createProductButton = document.querySelector(".create-product-button");
  const nombreInput = modal.querySelector('input[type="text"]');
  const nombreProductoInput =
    createProductModal.querySelector('input[type="text"]');
  const categoriaProductoInput = document.getElementById(
    "modifyProductCategory"
  );
  const cantidadInput = createProductModal.querySelector(
    'input[type="number"][placeholder="cantidad"]'
  );
  const costoInput = createProductModal.querySelector(
    'input[type="number"][placeholder="costo"]'
  );
  const precioInput = createProductModal.querySelector(
    'input[type="number"][placeholder="precio"]'
  );
  const imgDisplay = document.getElementById("imageDisplay");
  const productImgDisplay = document.getElementById("productImageDisplay");

  // Event listener para cerrar el modal de creación
  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
    // Restaurar la imagen por defecto
    imgDisplay.src = "assets/Image placeholder.png";
  });

  // Event listener para abrir el modal de creación
  document
    .getElementById("openModalButton")
    .addEventListener("click", function () {
      modal.style.display = "flex";
    });

  // Event listener para crear una nueva categoría
  createCategoryButton.addEventListener("click", function () {
    const nombreCategoria = nombreInput.value;
    // Aquí puedes manejar la lógica para procesar la imagen si es necesario
    const imagenCategoria = document.getElementById("imageDisplay").src; // Obtener la imagen del display

    if(nombreCategoria === "")
    {
      alert('Datos insuficientes, porfavor complete los campos e intentelo denuevo');
    }
    else
    {
    crearCategoria(generarIdUnico(), nombreCategoria, imagenCategoria);
    updateCategoryCount();
    llenarSelectCategorias();
    displayCategorias();
    generateChart();

    // Cerrar el modal
    modal.style.display = "none";

    // Limpiar campos del modal si es necesario
    nombreInput.value = "";
    imgDisplay.src = "assets/Image placeholder.png";
    }
  });

  //Inventario

  // Event listener para cerrar el modal de creación de inventario
  closeProductModalButton.addEventListener("click", function () {
    createProductModal.style.display = "none";
    // Restaurar la imagen por defecto
    productImgDisplay.src = "assets/Image placeholder.png";
  });

  // Event listener para abrir el modal de creación de inventario
  document
    .getElementById("openModalProductButton")
    .addEventListener("click", function () {
      createProductModal.style.display = "flex";
    });

  // Event listener para crear una nueva categoría
  createProductButton.addEventListener("click", function () {
    
    const nombreInventario = nombreProductoInput.value;
    const categoriaProducto = categoriaProductoInput.value;
    const cantidadInventario = cantidadInput.value;
    const costeInventario = costoInput.value;
    const precioInventario = precioInput.value;
    // Aquí puedes manejar la lógica para procesar la imagen si es necesario
    const imagenProducto = document.getElementById("productImageDisplay").src; // Obtener la imagen del display
    if(nombreInventario === "" || categoriaProducto === "" || cantidadInventario === "" || costeInventario === ""
      || precioInventario === "")
      {
alert('Datos insuficientes, porfavor complete los campos e intentelo denuevo');
      }
      else
      {
       
        crearProducto(
          nombreInventario,
          categoriaProducto,
          cantidadInventario,
          costeInventario,
          precioInventario,
          imagenProducto
        );
        updateProductCount();
        displayCategorias();
        generateChart();
    
        // Cerrar el modal
        createProductModal.style.display = "none";
    
        // Limpiar campos del modal si es necesario
        nombreProductoInput.value = "";
        categoriaProductoInput.value = "";
        cantidadInput.value = "";
        costoInput.value = "";
        precioInput.value = "";
        productImgDisplay.src = "assets/Image placeholder.png";
      
      }
    });
    
}

// Función para actualizar el contador de productos
function updateCategoryCount() {
  const categoryList = document.getElementById("categoryList");
  const categoriesCount = categoryList.children.length;
  const categoriesCountSpan = document.getElementById("categoriesCount");
  categoriesCountSpan.textContent = `${categoriesCount} Categoría${
    categoriesCount !== 1 ? "s" : ""
  }`;
}

// Función para actualizar el contador de productos
function updateProductCount() {
  const productList = document.getElementById("productList");
  const productCount = productList.children.length;
  const productCountSpan = document.getElementById("productCount");
  productCountSpan.textContent = `${productCount} Producto${
    productCount !== 1 ? "s" : ""
  }`;
}

// Llamar a updateProductCount al cargar la página para mostrar el conteo inicial si ya hay productos en el DOM
document.addEventListener("DOMContentLoaded", (event) => {
  updateProductCount();
  updateCategoryCount();
  llenarSelectCategorias();
});

// Generar un ID único para cada categoría (puedes usar una función más robusta según tus necesidades)
let ultimoId = 8;

// Función para generar un ID único secuencial
function generarIdUnico() {
  return ultimoId++;
}

// Ejecutar la función para inicializar el modal cuando se cargue la página
document.addEventListener("DOMContentLoaded", inicializarModal);

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
  const nuevaCategoria = new Categoria(
    IdCategoria,
    NombreCategoria,
    ImagenCategoria
  );
  categorias.push(nuevaCategoria);
  actualizarCategoriaDOM();
}

// Leer (Read) todas las categorías
function leerCategorias() {
  return categorias;
}

// Leer (Read) una categoría por su ID
function leerCategoriaPorId(IdCategoria) {
  return categorias.find((categoria) => categoria.IdCategoria === IdCategoria);
}

// Actualizar (Update) una categoría por su ID
function actualizarCategoria(IdCategoria, nuevoNombre, nuevaImagen) {
  const categoria = categorias.find(
    (categoria) => categoria.IdCategoria === IdCategoria
  );
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
  const indice = categorias.findIndex(
    (categoria) => categoria.IdCategoria === IdCategoria
  );
  if (indice !== -1) {
    categorias.splice(indice, 1);
    actualizarCategoriaDOM();
    return true;
  }
  return false;
}

// Función para actualizar el DOM con los datos del arreglo de categorías
function actualizarCategoriaDOM() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = ""; // Limpiar la lista actual

  categorias.forEach((categoria) => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("product-item");

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
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar esta categoría?"
  );
  if (confirmar) {
    eliminarCategoria(IdCategoria);
    updateCategoryCount();
    llenarSelectCategorias();
    displayCategorias();
    generateChart();
  }
}

// Crear categorías
crearCategoria(1, "Alimentos", "assets/Alimentos icon.png");
crearCategoria(2, "Bebidas", "assets/Bebidas icon.png");
crearCategoria(3, "Embutidos", "assets/Embutidos icon.png");
crearCategoria(4, "Helados", "assets/Helados icon.png");
crearCategoria(5, "Higiene", "assets/higiene icon.png");
crearCategoria(6, "Lacteos", "assets/Lacteos icon.png");
crearCategoria(7, "Limpieza", "assets/Limpieza icon.png");

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
    const modifyImageDisplay = document.getElementById("modifyImageDisplay");
    const modifyCategoryId = document.getElementById("modifyCategoryId");
    const modifyCategoryName = document.getElementById("modifyCategoryName");

    // Llenar los campos del modal con los datos de la categoría seleccionada
    modifyImageDisplay.src = categoria.ImagenCategoria;
    modifyCategoryId.value = categoria.IdCategoria;
    modifyCategoryName.value = categoria.NombreCategoria;

    // Mostrar el modal de modificar categoría
    const modifyCategoryModal = document.getElementById("modifyCategoryModal");
    modifyCategoryModal.style.display = "flex";
  }
}

// Función para cerrar el modal de modificar categoría
function cerrarModificarCategoriaModal() {
  const modifyCategoryModal = document.getElementById("modifyCategoryModal");
  modifyCategoryModal.style.display = "none";
}

// Evento para cerrar el modal de modificar categoría al hacer clic en el botón de cerrar
const closeModifyModalButton = document.getElementById(
  "closeModifyModalButton"
);
if (closeModifyModalButton) {
  closeModifyModalButton.addEventListener(
    "click",
    cerrarModificarCategoriaModal
  );
}

// Evento para cerrar el modal de modificar categoría al hacer clic fuera del modal
window.onclick = function (event) {
  const modifyCategoryModal = document.getElementById("modifyCategoryModal");
  if (event.target == modifyCategoryModal) {
    modifyCategoryModal.style.display = "none";
  }
};

// Evento para actualizar categoría
const updateButton = document.querySelector(
  "#modifyCategoryModal .update-button"
);
if (updateButton) {
  updateButton.addEventListener("click", function () {
    const modifyCategoryId = document.getElementById("modifyCategoryId").value;
    const modifyCategoryName =
      document.getElementById("modifyCategoryName").value;
    const modifyCategoryImage =
      document.getElementById("modifyImageDisplay").src;
    const imgDisplay = document.getElementById("imageDisplay");

    // Lógica para actualizar la categoría en el arreglo y en el DOM
    const updated = actualizarCategoria(
      Number(modifyCategoryId),
      modifyCategoryName,
      modifyCategoryImage
    );
    llenarSelectCategorias();
    generateChart();
    displayCategorias();
    if (updated) {
      cerrarModificarCategoriaModal();
      imgDisplay.src = "assets/Image placeholder.png";
    } else {
      alert("No se pudo actualizar la categoría. Inténtalo de nuevo.");
    }
  });
}

// Clase Producto del Inventario
class Inventario {
  constructor(
    IdInventario,
    NombreInventario,
    CategoriaInventario,
    CantidadInventario,
    CosteInventario,
    PrecioInventario,
    ImagenInventario
  ) {
    this.IdInventario = IdInventario;
    this.NombreInventario = NombreInventario;
    this.CategoriaInventario = CategoriaInventario;
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
function crearProducto(
  NombreInventario,
  CategoriaInventario,
  CantidadInventario,
  CosteInventario,
  PrecioInventario,
  ImagenInventario
) {
  const nuevoId = generarIdUnicoProducto();
  const nuevoProducto = new Inventario(
    nuevoId,
    NombreInventario,
    CategoriaInventario,
    CantidadInventario,
    CosteInventario,
    PrecioInventario,
    ImagenInventario
  );
  inventario.push(nuevoProducto);
  actualizarInventarioDOM();
}
function crearCategoria(IdCategoria, NombreCategoria, ImagenCategoria) {
  const nuevaCategoria = new Categoria(
    IdCategoria,
    NombreCategoria,
    ImagenCategoria
  );
  categorias.push(nuevaCategoria);
  actualizarCategoriaDOM();
}

// Leer (Read) todos los productos del inventario
function leerProductos() {
  return inventario;
}

// Leer (Read) un producto por su ID en el inventario
function leerProductoPorId(IdInventario) {
  return inventario.find((producto) => producto.IdInventario === IdInventario);
}

// Actualizar (Update) un producto por su ID en el inventario
function actualizarProducto(
  IdInventario,
  nuevoNombre,
  nuevaCategoria,
  nuevaCantidad,
  nuevoCosto,
  nuevoPrecio,
  nuevaImagen
) {
  const producto = inventario.find(
    (producto) => producto.IdInventario === IdInventario
  );
  if (producto) {
    producto.NombreInventario = nuevoNombre;
    producto.CategoriaInventario = nuevaCategoria;
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
  const indice = inventario.findIndex(
    (producto) => producto.IdInventario === IdInventario
  );
  if (indice !== -1) {
    inventario.splice(indice, 1);
    actualizarInventarioDOM();
    return true;
  }
  return false;
}

// Función para actualizar el DOM con los datos del arreglo de productos del inventario
function actualizarInventarioDOM() {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Limpiar la lista actual

  inventario.forEach((producto) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productItem.innerHTML = `
            <div class="product-details">
                <img src="${producto.ImagenInventario}" alt="${producto.NombreInventario}">
                <span style = "width: 100px; margin-right: 50px" class="product-name">${producto.NombreInventario}</span>
                <span style = "width: 100px; margin-left: 20px;text-transform: capitalize" class="product-category">${producto.CategoriaInventario}</span>
                <span style = "width: 100px" class="product-quantity">${producto.CantidadInventario}</span>
                <span class="product-cost">${producto.CosteInventario}</span>
                <span class="product-price">${producto.PrecioInventario}</span>
            </div>
            <div class="product-actions">
                <button class="image-button" data-product-id="${producto.IdInventario}" onclick="abrirModificarProducto(${producto.IdInventario})">
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
  const editButtons = document.querySelectorAll(
    ".product-actions .image-button"
  );
  editButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const productId = event.target.dataset.productId;
      abrirModificarProducto(Number(productId));
    });
  });
}

// Función para confirmar y eliminar un producto del inventario
function confirmarEliminarProducto(IdInventario) {
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar este producto?"
  );
  if (confirmar) {
    eliminarProducto(IdInventario);
    updateProductCount();
    displayCategorias();
    generateChart();
  }
}

// Event listener para el cambio en el input de archivo
document
  .getElementById("productFileInput")
  .addEventListener("change", function () {
    const productImageDisplay = document.getElementById("productImageDisplay");

    const file = this.files[0]; // Acceder al archivo seleccionado

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const side = Math.min(img.width, img.height);
          canvas.width = side;
          canvas.height = side;

          const offsetX = (img.width - side) / 2;
          const offsetY = (img.height - side) / 2;

          ctx.drawImage(img, offsetX, offsetY, side, side, 0, 0, side, side);

          const imageDataUrl = canvas.toDataURL("image/png");
          productImageDisplay.src = imageDataUrl;
          productImageDisplay.style.display = "block";
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Event listener para el botón de guardar cambios en el modal de modificación de producto
document
  .getElementById("modifyProductModal")
  .addEventListener("change", function () {
    const modifyProductFileInput = document.getElementById(
      "modifyProductFileInput"
    );
    const modifyProductImageDisplay = document.getElementById(
      "modifyProductImageDisplay"
    );
    const modifyProductCanvas = document.getElementById("modifyProductCanvas");

    const file = modifyProductFileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const side = Math.min(img.width, img.height);
          canvas.width = side;
          canvas.height = side;

          const offsetX = (img.width - side) / 2;
          const offsetY = (img.height - side) / 2;

          ctx.drawImage(img, offsetX, offsetY, side, side, 0, 0, side, side);

          const imageDataUrl = canvas.toDataURL("image/png");
          modifyProductImageDisplay.src = imageDataUrl;
          modifyProductImageDisplay.style.display = "block";
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Ejemplos de uso

// Crear productos del inventario
crearProducto(
  "Arroz Blanco 1kg",
  "alimentos",
  8,
  25,
  50,
  "https://images.piensavirtual.com/demogreen/core/images/8426904170267.JPG"
);
crearProducto(
  "Frijoles Rojos 560g",
  "alimentos",
  8,
  25,
  45,
  "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750101700436L.jpg"
);
crearProducto(
  "Aceite de Cocina 1L",
  "alimentos",
  8,
  25,
  70,
  "https://walmartni.vtexassets.com/arquivos/ids/358632/Aceite-Don-Juan-Vegetal-1000Ml-1-7023.jpg"
);
crearProducto(
  "Harina de Maíz Precocida 1kg",
  "alimentos",
  8,
  25,
  55,
  "https://m.media-amazon.com/images/I/71cnGp37afL._AC_UF1000,1000_QL80_.jpg"
);
crearProducto(
  "Aceitunas Verdes Rellenas 250g",
  "alimentos",
  8,
  25,
  60,
  "https://icbatunegocio.vteximg.com.br/arquivos/ids/157473/232700530.jpg?v=637414100809400000"
);
crearProducto(
  "Pasta de Trigo Integral 500g",
  "alimentos",
  8,
  25,
  40,
  "https://www.lasacacias.com.uy/lasacacias/wp-content/uploads/2019/12/pasta-de-trigo-duro-integral-500g-tirabuzon.jpg"
);
crearProducto(
  "Agua Mineral Natural 1.5L",
  "alimentos",
  8,
  25,
  20,
  "https://www.ubuy.com.ni/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFDTk9NRExGQ0wuX1NMMTUwMF8uanBn.jpg"
);
crearProducto(
  "Refresco de Cola 2L",
  "bebidas",
  8,
  25,
  30,
  "https://walmartni.vtexassets.com/arquivos/ids/329517/Gaseosa-Coca-Cola-regular-2-L-2-7640.jpg?v=638392773884170000"
);
crearProducto(
  "Jugo de Naranja 1L",
  "bebidas",
  8,
  25,
  40,
  "https://www.surtilag.com/cdn/shop/products/JUGO_NARANJA_JUMEX_f03e1464-676c-4e86-909d-0f03dd023bbd_600x.jpg?v=1585764445"
);
crearProducto(
  "Cerveza Artesanal 500ml",
  "bebidas",
  8,
  25,
  60,
  "https://organicmarketargentina.com/1207-large_default/cerveza-artesanal-blonde-ale-beer-500ml-beepure.jpg"
);
crearProducto(
  "Café Colombiano Tostado 250g",
  "alimentos",
  8,
  25,
  55,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRws-c1mYPl1E_uVwbKfpfIMYwF3rTIZUT8bg&s"
);
crearProducto(
  "Té Verde Orgánico 100 bolsitas",
  "alimentos",
  8,
  25,
  35,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKs3D6kOZaFlDzXNNBR4GUEmwknqmIUvrnxQ&s"
);
crearProducto(
  "Jamón Serrano 100g",
  "embutidos",
  8,
  25,
  90,
  "https://clientes.sigmafoodservice.com/medias/515Wx515H-180.jpg?context=bWFzdGVyfGltYWdlc3wyNjU0Njl8aW1hZ2UvcG5nfGFEY3lMMmd6TVM4NU9EQTBPVFV3TURRME56QXlMelV4TlZkNE5URTFTRjh4T0RBdWFuQm58ZWZmYTVmZGZmODk4ZGNhMDUwMWFhZTdlMjQ5N2YzOGVmMGNmOWFkNTM2YTFiOTUyNjRmYzY4OWNlZmM4OTk1ZA"
);
crearProducto(
  "Salchichón Ibérico 200g",
  "embutidos",
  8,
  25,
  120,
  "https://www.supermercadoseljamon.com/documents/10180/892067/11030468_G.jpg"
);
crearProducto(
  "Chorizo Picante 250g",
  "embutidos",
  8,
  25,
  80,
  "https://www.supermercadosplaza.es/documents/10180/10467/010516_G.jpg"
);
crearProducto(
  "Mortadela Italiana 150g",
  "embutidos",
  8,
  25,
  70,
  "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202108/17/00118394300596____4__600x600.jpg"
);
crearProducto(
  "Salami Tipo Milano 300g",
  "embutidos",
  8,
  25,
  110,
  "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750222158020L.jpg"
);
crearProducto(
  "Pastrami de Pavo 250g",
  "embutidos",
  8,
  25,
  95,
  "https://jumbocolombiaio.vtexassets.com/arquivos/ids/184834-800-800?v=637813975764570000&width=800&height=800&aspect=true"
);
crearProducto(
  "Helado de Vainilla 1L",
  "helados",
  8,
  25,
  100,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFyrOj5H_gBlrGRB2K0LJrRKXjU77Kw3O6KQ&s"
);
crearProducto(
  "Paleta de Mango y Chile",
  "helados",
  8,
  25,
  25,
  "https://www.kokoeurope.pl/cdn/shop/files/ezgif.com-webp-to-jpg_1.jpg?v=1686635941"
);
crearProducto(
  "Helado de Chocolate Amargo 500ml",
  "helados",
  8,
  25,
  120,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEP0d9LDPcZiOwEtrU0NQFEwZGmCZFoviV-g&s"
);
crearProducto(
  "Sundae de Fresa y Nata",
  "helados",
  8,
  25,
  80,
  "https://www.laneveria.com.sv/wp-content/uploads/2017/04/WEB-LLEVAR-LITROFRESA.png"
);

crearProducto(
  "Helado de Crema Irlandesa 750ml",
  "helados",
  8,
  25,
  150,
  "https://www.conaprole.uy/wp-content/uploads/2018/12/97252-PolipapelCIrlandyChoc900ml-1-600x600.png"
);
crearProducto(
  "Jabón Líquido Antibacterial 500ml",
  "limpieza",
  8,
  25,
  35,
  "https://walmartni.vtexassets.com/arquivos/ids/370071/Jab-n-L-quido-Antibacterial-Protex-Avena-Prebi-tico-500-ml-2-9982.jpg?v=638451958286030000"
);
crearProducto(
  "Shampoo Restauración Capilar 400ml",
  "higiene",
  8,
  25,
  50,
  "https://walmartni.vtexassets.com/arquivos/ids/379759/Shampoo-Pantene-Pro-V-Restauraci-n-400ml-1-8724.jpg?v=638478963195100000"
);
crearProducto(
  "Papel Higiénico Ultra Suave (Pack 6 rollos)",
  "higiene",
  8,
  25,
  60,
  "https://m.media-amazon.com/images/I/71IklRSnYJL.jpg"
);
crearProducto(
  "Leche Entera 1L",
  "lacteos",
  8,
  25,
  30,
  "https://walmartni.vtexassets.com/arquivos/ids/287034/Leche-UHT-marca-Lala-Entera-1L-1-10968.jpg?v=638251727135970000"
);
crearProducto(
  "Queso Parmesano 200g",
  "lacteos",
  8,
  25,
  150,
  "https://jumbo.vtexassets.com/arquivos/ids/413970/Queso-parmesano-Gran-Reserva-trozo-200-g.jpg?v=637473108205700000"
);
crearProducto(
  "Yogurt Natural 500g",
  "lacteos",
  8,
  25,
  45,
  "https://walmartni.vtexassets.com/arquivos/ids/359686/Yogurt-bonlac-natural-500gr.jpg?v=638426169155430000"
);
crearProducto(
  "Coca-Cola Zero 2.5L (2 Pack)",
  "bebidas",
  8,
  25,
  90,
  "assets/proudco2.jpg"
);
crearProducto(
  "Agua Mineral 500ml",
  "bebidas",
  8,
  25,
  10,
  "https://www.ubuy.com.ni/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFDTk9NRExGQ0wuX1NMMTUwMF8uanBn.jpg"
);
crearProducto(
  "Desodorante Roll-On Fresh 50ml",
  "higiene",
  8,
  25,
  25,
  "https://images.ctfassets.net/njdrd936eipt/2wrognCD0GPuv5O2Zk3NsK/08917c0bc32157ddb0fc64569d7ed210/roll-on-antitranspirante-FRESH.png?fm=webp&w=480&q=75"
);

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

// Función para abrir el modal de modificación de producto en el inventario
function abrirModificarProducto(IdInventario) {
  const producto = leerProductoPorId(IdInventario);
  if (producto) {
    const modifyProductModal = document.getElementById("modifyProductModal");
    const modifyProductImageDisplay = document.getElementById(
      "modifyProductImageDisplay"
    );
    const modifyProductName = document.getElementById("modifyProductName");
    const modifyProductCategory = document.getElementById(
      "modifyProductCategory"
    );
    const modifyProductQuantity = document.getElementById(
      "modifyProductQuantity"
    );
    const modifyProductCost = document.getElementById("modifyProductCost");
    const modifyProductPrice = document.getElementById("modifyProductPrice");

    modifyProductImageDisplay.src = producto.ImagenInventario;
    modifyProductName.value = producto.NombreInventario;
    modifyProductCategory.value = producto.CategoriaInventario;
    modifyProductQuantity.value = producto.CantidadInventario;
    modifyProductCost.value = producto.CosteInventario;
    modifyProductPrice.value = producto.PrecioInventario;
    document.getElementById("modifyProductId").value = producto.IdInventario;

    modifyProductModal.style.display = "flex";
  }
}

// Evento para cerrar el modal de modificar producto al hacer clic fuera del modal
window.onclick = function (event) {
  const modifyProductModal = document.getElementById("modifyProductModal");
  if (event.target == modifyProductModal) {
    modifyProductModal.style.display = "none";
  }
};

// Función para cerrar el modal de modificación de producto en el inventario
function cerrarModificarProductoModal() {
  const modifyProductModal = document.getElementById("modifyProductModal");
  modifyProductModal.style.display = "none";
}

// Evento para cerrar el modal de modificar producto al hacer clic en el botón de cerrar
const closeModifyProductModalButton = document.getElementById(
  "closeModifyProductModalButton"
);
if (closeModifyProductModalButton) {
  closeModifyProductModalButton.addEventListener(
    "click",
    cerrarModificarProductoModal
  );
}

// Evento para cerrar el modal de modificar producto al hacer clic fuera del modal
window.onclick = function (event) {
  const modifyProductModal = document.getElementById("modifyProductModal");
  if (event.target == modifyProductModal) {
    modifyProductModal.style.display = "none";
  }
};

// Evento para actualizar producto
const updateProductButton = document.querySelector(
  "#modifyProductModal .update-product-button"
);
if (updateProductButton) {
  updateProductButton.addEventListener("click", function () {
    const modifyProductId = document.getElementById("modifyProductId").value;
    const modifyProductName =
      document.getElementById("modifyProductName").value;
    const modifyProductCategory = document.getElementById(
      "modifyProductCategory2"
    ).value;
    const modifyProductQuantity = document.getElementById(
      "modifyProductQuantity"
    ).value;
    const modifyProductCost =
      document.getElementById("modifyProductCost").value;
    const modifyProductPrice =
      document.getElementById("modifyProductPrice").value;
    const modifyProductImage = document.getElementById(
      "modifyProductImageDisplay"
    ).src;
    const imgDisplay = document.getElementById("modifyProductImageDisplay");

    // Lógica para actualizar el producto en el arreglo y en el DOM
    const updated = actualizarProducto(
      Number(modifyProductId),
      modifyProductName,
      modifyProductCategory,
      modifyProductQuantity,
      modifyProductCost,
      modifyProductPrice,
      modifyProductImage
    );
    generateChart();
    if (updated) {
      cerrarModificarProductoModal();
      imgDisplay.src = "assets/Image placeholder.png";
    } else {
      alert("No se pudo actualizar el producto. Inténtalo de nuevo.");
    }
  });
}

//barra de busqueda

const searchBarP = document.getElementById("searchBarP");
const searchBarC = document.getElementById("searchBarC");

//inventario
// Evento para manejar la búsqueda
searchBarP.addEventListener("input", function () {
  const searchText = searchBarP.value.trim().toLowerCase();
  if (searchText === "") {
    generateProductItems(inventario);
  } else {
    // Filtrar productos basados en la búsqueda en inventario
    const filteredProducts = inventario.filter((producto) =>
      producto.NombreInventario.toLowerCase().includes(searchText)
    );
    generateProductItems(filteredProducts);
  }
});

// Función para generar elementos de producto en el DOM
function generateProductItems(products) {
  productList.innerHTML = "";
  products.forEach((producto) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
            <div class="product-details">
                 <img src="${producto.ImagenInventario}" alt="${producto.NombreInventario}">
                <span style = "width: 100px; margin-right: 50px" class="product-name">${producto.NombreInventario}</span>
                <span style = "width: 100px; margin-left: 20px; text-transform: capitalize" class="product-category">${producto.CategoriaInventario}</span>
                <span style = "width: 100px" class="product-quantity">${producto.CantidadInventario}</span>
                <span class="product-cost">${producto.CosteInventario}</span>
                <span class="product-price">${producto.PrecioInventario}</span>
            </div>
            <div class="product-actions">
                <button class="image-button" data-product-id="${producto.IdInventario}" onclick="abrirModificarProducto(${producto.IdInventario})">
                    <img src="assets/pencil.png" alt="Editar">
                </button>
                <button class="image-button" onclick="confirmarEliminarProducto(${producto.IdInventario})">
                    <img src="assets/trash.png" alt="Eliminar">
                </button>
            </div>
        `;
    productList.appendChild(productItem);
  });
  updateProductCount();
  displayCategorias();
  generateChart();
}

//categorias
// Evento para manejar la búsqueda
searchBarC.addEventListener("input", function () {
  const searchText = searchBarC.value.trim().toLowerCase();
  if (searchText === "") {
    generateCategoryItems(categorias);
  } else {
    // Filtrar categorías basadas en la búsqueda en categorias
    const filteredCategories = categorias.filter((categoria) =>
      categoria.NombreCategoria.toLowerCase().includes(searchText)
    );
    generateCategoryItems(filteredCategories);
  }
});

// Función para generar elementos de categoría en el DOM
function generateCategoryItems(categories) {
  categoryList.innerHTML = "";
  categories.forEach((categoria) => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("category-item");
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
  updateCategoryCount();
  llenarSelectCategorias();
  displayCategorias();
  generateChart();
}

//categoria en productos

// Función para llenar el select con las categorías disponibles
function llenarSelectCategorias() {
  const select = document.getElementById("modifyProductCategory");
  const select2 = document.getElementById("modifyProductCategory2");

  // Limpiar opciones actuales del select
  select.innerHTML = "";
  select2.innerHTML = "";

  // Agregar una opción por cada categoría
  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.NombreCategoria;
    option.textContent = categoria.NombreCategoria;
    select.appendChild(option);
  });

  // Agregar una opción por cada categoría
  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.NombreCategoria;
    option.textContent = categoria.NombreCategoria;
    select2.appendChild(option);
  });
}
