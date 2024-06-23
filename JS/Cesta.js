document.addEventListener("DOMContentLoaded", function() {

      // Función para formatear números como moneda
      function formatCurrency(value) {
        return new Intl.NumberFormat('es-NI', {
            style: 'currency',
            currency: 'NIO'
        }).format(value);
    }
    const continueCesta = document.getElementById('ContinueCesta');
  // Obtener los productos del localStorage
  let productos = JSON.parse(localStorage.getItem('cestaIDs')) || [];

const productName = document.getElementById('CestaProductName');

const promosData = {
    "alimentos": [
        {
            id: 'a01',
            imgSrc: "https://images.piensavirtual.com/demogreen/core/images/8426904170267.JPG",
            title: "Arroz Blanco 1kg",
            description: "Arroz blanco de grano largo ideal para acompañar tus comidas diarias.",
            price: 50.00
        },
        {
            id: 'a02',
            imgSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750101700436L.jpg",
            title: "Frijoles Rojos 560g",
            description: "Frijoles rojos seleccionados, listos para cocinar y disfrutar en tus platillos favoritos.",
            price: 45.00
        },
        {
            id: 'a03',
            imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/358632/Aceite-Don-Juan-Vegetal-1000Ml-1-7023.jpg?v=638423781906730000",
            title: "Aceite de Cocina 1L",
            description: "Aceite de cocina vegetal, perfecto para preparar tus comidas sin preocupaciones.",
            price: 70.00
        },
        {
            id: 'a04',
            imgSrc: "https://m.media-amazon.com/images/I/71cnGp37afL._AC_UF1000,1000_QL80_.jpg",
            title: "Harina de Maíz Precocida 1kg",
            description: "Harina de maíz precocida para hacer deliciosas arepas o tortillas en casa.",
            price: 55.00
        },
        {
            id: 'a05',
            imgSrc: "https://icbatunegocio.vteximg.com.br/arquivos/ids/157473/232700530.jpg?v=637414100809400000",
            title: "Aceitunas Verdes Rellenas 250g",
            description: "Aceitunas verdes rellenas de pimiento, ideales como aperitivo o para ensaladas.",
            price: 60.00
        },
        {
            id: 'a06',
            imgSrc: "https://www.lasacacias.com.uy/lasacacias/wp-content/uploads/2019/12/pasta-de-trigo-duro-integral-500g-tirabuzon.jpg",
            title: "Pasta de Trigo Integral 500g",
            description: "Pasta de trigo integral, rica en fibra y nutrientes, perfecta para platos saludables.",
            price: 40.00
        }
    ],
    "bebidas": [
        {
            id: 'b01',
            imgSrc: "https://www.ubuy.com.ni/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFDTk9NRExGQ0wuX1NMMTUwMF8uanBn.jpg",
            title: "Agua Mineral Natural 1.5L",
            description: "Agua mineral natural extraída de manantiales naturales, perfecta para hidratarte.",
            price: 20.00
        },
        {
            id: 'b02',
            imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/329517/Gaseosa-Coca-Cola-regular-2-L-2-7640.jpg?v=638392773884170000",
            title: "Refresco de Cola 2L",
            description: "Refresco de cola con burbujas refrescantes y sabor inigualable, tamaño familiar.",
            price: 30.00
        },
        {
            id: 'b03',
            imgSrc: "https://www.surtilag.com/cdn/shop/products/JUGO_NARANJA_JUMEX_f03e1464-676c-4e86-909d-0f03dd023bbd_600x.jpg?v=1585764445",
            title: "Jugo de Naranja 1L",
            description: "Jugo de naranja 100% natural, sin aditivos ni conservantes, lleno de vitaminas.",
            price: 40.00
        },
        {
            id: 'b04',
            imgSrc: "https://organicmarketargentina.com/1207-large_default/cerveza-artesanal-blonde-ale-beer-500ml-beepure.jpg",
            title: "Cerveza Artesanal 500ml",
            description: "Cerveza artesanal elaborada localmente, con ingredientes seleccionados para un sabor único.",
            price: 60.00
        },
        {
            id: 'b05',
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRws-c1mYPl1E_uVwbKfpfIMYwF3rTIZUT8bg&s",
            title: "Café Colombiano Tostado 250g",
            description: "Café colombiano tostado y molido, aroma intenso y sabor característico.",
            price: 55.00
        },
        {
            id: 'b06',
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKs3D6kOZaFlDzXNNBR4GUEmwknqmIUvrnxQ&s",
            title: "Té Verde Orgánico 100 bolsitas",
            description: "Té verde orgánico en bolsitas, antioxidante y refrescante para cualquier momento del día.",
            price: 35.00
        }
    ],
    "embutidos": [
        {
            id: 'e01',
            imgSrc: "https://clientes.sigmafoodservice.com/medias/515Wx515H-180.jpg?context=bWFzdGVyfGltYWdlc3wyNjU0Njl8aW1hZ2UvcG5nfGFEY3lMMmd6TVM4NU9EQTBPVFV3TURRME56QXlMelV4TlZkNE5URTFTRjh4T0RBdWFuQm58ZWZmYTVmZGZmODk4ZGNhMDUwMWFhZTdlMjQ5N2YzOGVmMGNmOWFkNTM2YTFiOTUyNjRmYzY4OWNlZmM4OTk1ZA",
            title: "Jamón Serrano 100g",
            description: "Jamón serrano curado de alta calidad, perfecto para tablas de embutidos o bocadillos.",
            price: 90.00
        },
        {
            id: 'e02',
            imgSrc: "https://www.supermercadoseljamon.com/documents/10180/892067/11030468_G.jpg",
            title: "Salchichón Ibérico 200g",
            description: "Salchichón ibérico elaborado con carne de cerdo ibérico y especias, un sabor auténtico.",
            price: 120.00
        },
        {
            id: 'e03',
            imgSrc: "https://www.supermercadosplaza.es/documents/10180/10467/010516_G.jpg",
            title: "Chorizo Picante 250g",
            description: "Chorizo picante ahumado, ideal para dar un toque de sabor intenso a tus platos.",
            price: 80.00
        },
        {
            id: 'e04',
            imgSrc: "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202108/17/00118394300596____4__600x600.jpg",
            title: "Mortadela Italiana 150g",
            description: "Mortadela italiana con pistachos, un clásico delicatesen para tus bocadillos.",
            price: 70.00
        },
        {
            id: 'e05',
            imgSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750222158020L.jpg",
            title: "Salami Tipo Milano 300g",
            description: "Salami tipo milano, delicadamente curado para un sabor intenso y textura perfecta.",
            price: 110.00
        },
        {
            id: 'e06',
            imgSrc: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/184834-800-800?v=637813975764570000&width=800&height=800&aspect=true",
            title: "Pastrami de Pavo 250g",
            description: "Pastrami de pavo ahumado y especiado, ideal para sándwiches y entradas.",
            price: 95.00
        }
    ],
    "helados": [
        {
            id: 'h01',
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFyrOj5H_gBlrGRB2K0LJrRKXjU77Kw3O6KQ&s",
            title: "Helado de Vainilla 1L",
            description: "Helado cremoso de vainilla elaborado con ingredientes naturales, perfecto para compartir.",
            price: 100.00
        },
        {
            id: 'h02',
            imgSrc: "https://www.kokoeurope.pl/cdn/shop/files/ezgif.com-webp-to-jpg_1.jpg?v=1686635941",
            title: "Paleta de Mango y Chile",
            description: "Paleta de mango con un toque de chile, refrescante y con un toque picante.",
            price: 25.00
        },
        {
            id: 'h03',
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEP0d9LDPcZiOwEtrU0NQFEwZGmCZFoviV-g&s",
            title: "Helado de Chocolate Amargo 500ml",
            description: "Helado de chocolate amargo con trozos de chocolate, para los amantes del cacao puro.",
            price: 120.00
        },
        {
            id: 'h04',
            imgSrc: "https://www.laneveria.com.sv/wp-content/uploads/2017/04/WEB-LLEVAR-LITROFRESA.png",
            title: "Sundae de Fresa y Nata",
            description: "Sundae clásico con fresas frescas y nata montada, irresistible para los golosos.",
            price: 80.00
        },
        {
            id: 'h05',
            imgSrc: "https://walmartcr.vtexassets.com/arquivos/ids/504834-500-auto?v=638415134387270000&width=500&height=auto&aspect=true",
            title: "Popsicle de Yogurt y Frutas",
            description: "Popsicle de yogurt natural con trozos de frutas frescas, saludable y delicioso.",
            price: 30.00
        },
        {
            id: 'h06',
            imgSrc: "https://www.conaprole.uy/wp-content/uploads/2018/12/97252-PolipapelCIrlandyChoc900ml-1-600x600.png",
            title: "Helado de Crema Irlandesa 750ml",
            description: "Helado de crema irlandesa con whisky, crema y toques de café, para disfrutar con moderación.",
            price: 150.00
        }
    ],
    "higiene": [
        {
            id: 'hi01',
            imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/370071/Jab-n-L-quido-Antibacterial-Protex-Avena-Prebi-tico-500-ml-2-9982.jpg?v=638451958286030000",
            title: "Jabón Líquido Antibacterial 500ml",
            description: "Jabón líquido antibacterial con aloe vera, protege y limpia tu piel suavemente.",
            price: 35.00
        },
        {
            id: 'hi02',
            imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/379759/Shampoo-Pantene-Pro-V-Restauraci-n-400ml-1-8724.jpg?v=638478963195100000",
            title: "Shampoo Restauración Capilar 400ml",
            description: "Shampoo reparador para cabello dañado, con keratina y extractos naturales.",
            price: 50.00
        },
        {
            id: 'h03',
            imgSrc: "https://m.media-amazon.com/images/I/71IklRSnYJL.jpg",
            title: "Papel Higiénico Ultra Suave (Pack 6 rollos)",
            description: "Papel higiénico ultra suave y resistente, esencial para el hogar y la oficina.",
            price: 60.00
        },
        {
            id: 'h04',
            imgSrc: "https://images.ctfassets.net/njdrd936eipt/2wrognCD0GPuv5O2Zk3NsK/08917c0bc32157ddb0fc64569d7ed210/roll-on-antitranspirante-FRESH.png?fm=webp&w=480&q=75",
            title: "Desodorante Roll-On Fresh 50ml",
            description: "Desodorante roll-on con aroma fresco, controla eficazmente el sudor durante todo el día.",
            price: 25.00
        }
    ],
    "lacteos": [
        {
            id: 'la01',
            imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/287034/Leche-UHT-marca-Lala-Entera-1L-1-10968.jpg?v=638251727135970000",
            title: "Leche Entera 1L",
            description: "Leche entera fresca, ideal para el desayuno o preparar recetas dulces y saladas.",
            price: 30.00
        },
        {
            id: 'la02',
            imgSrc: "https://jumbo.vtexassets.com/arquivos/ids/413970/Queso-parmesano-Gran-Reserva-trozo-200-g.jpg?v=637473108205700000",
            title: "Queso Parmesano 200g",
            description: "Queso parmesano de alta calidad, perfecto para rallar sobre pastas y gratinados.",
            price: 150.00
        },
        {
            id: 'la03',
            imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/196029-800-450?v=637789273898730000&width=800&height=450&aspect=true",
            title: "Yogurt Natural 500g",
            description: "Yogurt natural sin azúcares añadidos, cremoso y saludable para cualquier momento del día.",
            price: 45.00
        },
        {
            id: 'la04',
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyThvZWFIaB3E0tMSSYTzr16Aj4_2e8PZHA&s",
            title: "Mantequilla Sin Sal 250g",
            description: "Mantequilla sin sal, ideal para cocinar y preparar repostería con un sabor puro.",
            price: 70.00
        },
        {
            id: 'la05',
            imgSrc: "https://jumbo.vtexassets.com/arquivos/ids/396630/Crema-de-leche-Colun-200-ml.jpg?v=637469297135270000",
            title: "Crema de Leche 200ml",
            description: "Crema de leche fresca, perfecta para dar un toque suave y cremoso a tus platos.",
            price: 55.00
        }
    ],
    "limpieza": [
        {
            id: 'li01',
            imgSrc: "https://supercarnes.com/wp-content/uploads/2020/07/75696400566.png",
            title: "Detergente Líquido Lavanda 1L",
            description: "Detergente líquido con aroma a lavanda, elimina las manchas difíciles y deja tu ropa limpia y fresca.",
            price: 50.00
        },
        {
            id: 'li02',
            imgSrc: "https://jumbo.vtexassets.com/arquivos/ids/437545/Limpiavidrios-gatillo-500-ml.jpg?v=637577332326200000",
            title: "Limpiavidrios 500ml",
            description: "Limpiavidrios efectivo para ventanas y espejos, sin dejar marcas ni residuos.",
            price: 40.00
        },
        {
            id: 'li03',
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwGPsIC--0iQi8a_ovaMLUwHCMqD2GJU35Q&s",
            title: "Esponja Multiusos (Pack 3 unidades)",
            description: "Esponjas multiusos ideales para la limpieza de cocina y baño, duraderas y resistentes.",
            price: 15.00
        },
        {
            id: 'li04',
            imgSrc: "https://tienda.dismac.es/web/image/product.template/81582/image",
            title: "Desinfectante de Superficies 750ml",
            description: "Desinfectante de superficies con fórmula antibacteriana, ideal para mantener tu hogar limpio y seguro.",
            price: 70.00
        },
        {
            id: 'li05',
            imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/346893-800-450?v=638419565149670000&width=800&height=450&aspect=true",
            title: "Toallas de Papel (Pack 6 rollos)",
            description: "Toallas de papel absorbentes y resistentes, perfectas para cualquier tarea de limpieza.",
            price: 25.00
        },
        {
            id: 'li06',
            imgSrc: "https://promart.vteximg.com.br/arquivos/ids/7729328-1000-1000/126445.jpg?v=638381878247330000",
            title: "Detergente en Polvo Floral 2kg",
            description: "Detergente en polvo con aroma floral, elimina las manchas y deja la ropa fragante.",
            price: 80.00
        }
    ]
};

const initialPromos = [
    {
        id: 'p01',
        imgSrc: "assets/proudco2.jpg",
        title: "Coca-Cola Zero 2.5L (2 Pack)",
        description: "¡Duplica el sabor sin las calorías con nuestro pack especial de 2 botellas de 2.5 litros de Coca-Cola Zero!",
        price: 90.00
    },
    {
        id: 'p02',
        imgSrc: "assets/image 1.png",
        title: "Jumex Variedad Frutas (2x1)",
        description: "Aprovecha nuestra promoción 2x1 en Jumex variedad frutas y lleva el doble de sabor refrescante a casa con cada botella!",
        price: 60.00
    },
    {
        id: 'p03',
        imgSrc: "assets/producto 3.png",
        title: "Cereales Kellogg's (3x2)",
        description: "¡Desayuna con más variedad y ahorro con nuestra oferta especial 3x2 en cereales Kellogg's!",
        price: 850.00
    },
    {
        id: 'p04',
        imgSrc: "assets/image 3.png",
        title: "Helado Cremissimo 1L (Todos los sabores) + ¡Regalo! Palomitas ACT II 80g",
        description: "Satisfacción en cada bocado! Helado Cremissimo 1L + Palomitas ACT II 80g de cortesía para una experiencia de sabor incomparable.",
        price: 190.00
    }
];

let subtotal = 0;
const cartItemsContainer = document.getElementById('cart-items-container');
    // Función para encontrar un producto por su ID
    function findProductById(id) {
        for (let category in promosData) {
            let product = promosData[category].find(product => product.id === id);
            if (product) return product;
        }
        return initialPromos.find(product => product.id === id);
    }

    // Función para agregar un producto al carrito
    function addProductToCart(product) {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <img src="${product.imgSrc}" alt="${product.title}" style = "margin-left:40px">
                <span style = "width: 100px;margin-left: 40px">${product.title}</span>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn decrease-btn" style = "margin-left: 20px">−</button>
                <span class="quantity" style = "margin-left: 10px; margin-right: 10px">1</span>
                <button class="quantity-btn increase-btn">+</button>
            </div>
            <div class="item-price">
                <span>${formatCurrency(product.price)}</span>
            </div>
             <div class="item-subtotal">
            <span style = "font-weight: bold;">${formatCurrency(product.price)}</span>
        </div>
            <button class="delete-btn" style = "margin-right: 80px;">🗑️</button>
        `;

        cartItemsContainer.appendChild(cartItem);

       // Función para calcular el subtotal para este producto basado en la cantidad actual
    function calculateSubtotal(quantity) {
        return product.price * quantity;
    }

    // Añadir al subtotal inicial
    subtotal += product.price;
    updateSubtotal();

    // Event listener para el botón de eliminar
    cartItem.querySelector('.delete-btn').addEventListener('click', function() {
        cartItem.remove();
        subtotal -= product.price;
        updateSubtotal();
    });

    // Event listener para el botón de aumentar cantidad
    cartItem.querySelector('.increase-btn').addEventListener('click', function() {
        let quantityElement = cartItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;

        // Actualizar el subtotal
        let subtotalElement = cartItem.querySelector('.item-subtotal span');
        subtotal += product.price;
        subtotalElement.textContent = formatCurrency(calculateSubtotal(quantity));
        updateSubtotal();
    });

    // Event listener para el botón de disminuir cantidad
    cartItem.querySelector('.decrease-btn').addEventListener('click', function() {
        let quantityElement = cartItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;

            // Actualizar el subtotal
            let subtotalElement = cartItem.querySelector('.item-subtotal span');
            subtotal -= product.price;
            subtotalElement.textContent = formatCurrency(calculateSubtotal(quantity));
            updateSubtotal();
        }
    });
}

// Función para actualizar el subtotal en la página
function updateSubtotal() {
    document.getElementById('subtotal-amount').textContent = formatCurrency(subtotal);
    localStorage.setItem('cestaSubTotal', subtotal);
}
    // Mostrar el subtotal inicial al cargar la página
    updateSubtotal();

    // Cargar los productos al carrito inicialmente
    productos.forEach(productoID => {
        let product = findProductById(productoID);
        if (product) {
            addProductToCart(product);
        }
    });

    // Continuar con la cesta
    continueCesta.addEventListener('click', function() {
        const usuarioInput = localStorage.getItem('currentUser');
        if (usuarioInput) {
            location.href = 'Pedido.html';
        } else {
            location.href = 'Login.html';
            localStorage.setItem('LoginVer', 0);
        }
    });

    const cestaInput = document.getElementById('cestaSearchBar');

    function handleFilterInput() {
        const cartItems = document.querySelectorAll('.cart-item');

        // Iterar sobre todos los elementos .cart-item
        cartItems.forEach(cartItem => {
            // Obtener el elemento .item-details dentro de cada .cart-item
            const itemDetails = cartItem.querySelector('.item-details');
    
            // Verificar si se encontró el elemento .item-details
            if (itemDetails) {
                // Obtener el contenido del primer <span> dentro de .item-details
                const spanContent = itemDetails.querySelector('span').textContent.toLowerCase();
    
                // Comparar con el valor de la entrada (inputValue)
                if (spanContent.includes(this.value.toLowerCase())) {
                    // Mostrar el cart-item
                    cartItem.style.display = 'flex';
                } else {
                    // Ocultar el cart-item
                    cartItem.style.display = 'none';
                }
            }
        });
    
        // Si el inputValue está vacío, mostrar todos los cart-items
        if (this.value.trim() === '') {
            cartItems.forEach(cartItem => {
                cartItem.style.display = 'flex';
            });
        }
    }

    // Agregar un event listener para el evento input
    cestaInput.addEventListener('input', handleFilterInput);



});