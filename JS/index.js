document.addEventListener("DOMContentLoaded", function() {
    const perfilButton = document.getElementById('profileButton');
    const usuarioInput = localStorage.getItem('currentUser');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    const adminLink = document.getElementById('AdminLink');
    const profileLink = document.getElementById('ProfileLink');
    const imagesas = document.getElementById('logo');
    const searchBar = document.querySelector('.search-bar input');
    const roundButton2 = document.querySelector('.round-button2');
    const cantidadCesta = document.getElementById('cantidadCesta');
    const botonCesta = document.getElementById('cestaButton');
    const carrouselMain = document.getElementById('carrouselMain');

    const promocionesTitle = document.querySelector(".main-text");
    const promocionesContainer = document.querySelector(".promociones");
    const categoriesContainer = document.querySelector(".categories-container");
    const buttons = document.querySelectorAll(".round-button");

    
    if(usuarioInput)
        {
            perfilButton.innerHTML = usuarioInput;
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            profileLink.style.display = 'block';
            logoutLink.style.display = 'block';
            if(perfilButton.innerHTML === 'Admin')
            {
                adminLink.style.display = 'block';
                profileLink.style.display = 'none';
            }
            
            //imagesas.src = localStorage.getItem('profileImage');
        }
        else
        {
            perfilButton.innerHTML = "Mi Perfil";
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            profileLink.style.display = 'none';
            logoutLink.style.display = 'none';
            adminLink.style.display = 'none';
        }
        
        logoutLink.addEventListener('click', function() {
            const confirmacion = confirm("¿Estás seguro de que quieres cerrar sesión?");
            if (confirmacion) {
                localStorage.removeItem('currentUser');
                perfilButton.innerHTML = "Mi Perfil";
                loginLink.style.display = 'block';
                registerLink.style.display = 'block';
                profileLink.style.display = 'none';
                logoutLink.style.display = 'none';
                adminLink.style.display = 'none';
                location.reload();
            }
        });
       
        loginLink.addEventListener('click', function() {
            localStorage('LoginVer',1);
        });
        registerLink.addEventListener('click', function() {
            localStorage('LoginVer',1);
        });
    const promosData = {
        "alimentos": [
            {
                id: 'a01',
                imgSrc: "https://images.piensavirtual.com/demogreen/core/images/8426904170267.JPG",
                title: "Arroz Blanco 1kg",
                description: "Arroz blanco de grano largo ideal para acompañar tus comidas diarias.",
                price: "C$50.00"
            },
            {
                id: 'a02',
                imgSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750101700436L.jpg",
                title: "Frijoles Rojos 560g",
                description: "Frijoles rojos seleccionados, listos para cocinar y disfrutar en tus platillos favoritos.",
                price: "C$45.00"
            },
            {
                id: 'a03',
                imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/358632/Aceite-Don-Juan-Vegetal-1000Ml-1-7023.jpg?v=638423781906730000",
                title: "Aceite de Cocina 1L",
                description: "Aceite de cocina vegetal, perfecto para preparar tus comidas sin preocupaciones.",
                price: "C$70.00"
            },
            {
                id: 'a04',
                imgSrc: "https://m.media-amazon.com/images/I/71cnGp37afL._AC_UF1000,1000_QL80_.jpg",
                title: "Harina de Maíz Precocida 1kg",
                description: "Harina de maíz precocida para hacer deliciosas arepas o tortillas en casa.",
                price: "C$55.00"
            },
            {
                id: 'a05',
                imgSrc: "https://icbatunegocio.vteximg.com.br/arquivos/ids/157473/232700530.jpg?v=637414100809400000",
                title: "Aceitunas Verdes Rellenas 250g",
                description: "Aceitunas verdes rellenas de pimiento, ideales como aperitivo o para ensaladas.",
                price: "C$60.00"
            },
            {
                id: 'a06',
                imgSrc: "https://www.lasacacias.com.uy/lasacacias/wp-content/uploads/2019/12/pasta-de-trigo-duro-integral-500g-tirabuzon.jpg",
                title: "Pasta de Trigo Integral 500g",
                description: "Pasta de trigo integral, rica en fibra y nutrientes, perfecta para platos saludables.",
                price: "C$40.00"
            }
        ],
        "bebidas": [
            {
                id: 'b01',
                imgSrc: "https://www.ubuy.com.ni/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFDTk9NRExGQ0wuX1NMMTUwMF8uanBn.jpg",
                title: "Agua Mineral Natural 1.5L",
                description: "Agua mineral natural extraída de manantiales naturales, perfecta para hidratarte.",
                price: "C$20.00"
            },
            {
                id: 'b02',
                imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/329517/Gaseosa-Coca-Cola-regular-2-L-2-7640.jpg?v=638392773884170000",
                title: "Refresco de Cola 2L",
                description: "Refresco de cola con burbujas refrescantes y sabor inigualable, tamaño familiar.",
                price: "C$30.00"
            },
            {
                id: 'b03',
                imgSrc: "https://www.surtilag.com/cdn/shop/products/JUGO_NARANJA_JUMEX_f03e1464-676c-4e86-909d-0f03dd023bbd_600x.jpg?v=1585764445",
                title: "Jugo de Naranja 1L",
                description: "Jugo de naranja 100% natural, sin aditivos ni conservantes, lleno de vitaminas.",
                price: "C$40.00"
            },
            {
                id: 'b04',
                imgSrc: "https://organicmarketargentina.com/1207-large_default/cerveza-artesanal-blonde-ale-beer-500ml-beepure.jpg",
                title: "Cerveza Artesanal 500ml",
                description: "Cerveza artesanal elaborada localmente, con ingredientes seleccionados para un sabor único.",
                price: "C$60.00"
            },
            {
                id: 'b05',
                imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRws-c1mYPl1E_uVwbKfpfIMYwF3rTIZUT8bg&s",
                title: "Café Colombiano Tostado 250g",
                description: "Café colombiano tostado y molido, aroma intenso y sabor característico.",
                price: "C$55.00"
            },
            {
                id: 'b06',
                imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKs3D6kOZaFlDzXNNBR4GUEmwknqmIUvrnxQ&s",
                title: "Té Verde Orgánico 100 bolsitas",
                description: "Té verde orgánico en bolsitas, antioxidante y refrescante para cualquier momento del día.",
                price: "C$35.00"
            }
        ],
        "embutidos": [
            {
                id: 'e01',
                imgSrc: "https://clientes.sigmafoodservice.com/medias/515Wx515H-180.jpg?context=bWFzdGVyfGltYWdlc3wyNjU0Njl8aW1hZ2UvcG5nfGFEY3lMMmd6TVM4NU9EQTBPVFV3TURRME56QXlMelV4TlZkNE5URTFTRjh4T0RBdWFuQm58ZWZmYTVmZGZmODk4ZGNhMDUwMWFhZTdlMjQ5N2YzOGVmMGNmOWFkNTM2YTFiOTUyNjRmYzY4OWNlZmM4OTk1ZA",
                title: "Jamón Serrano 100g",
                description: "Jamón serrano curado de alta calidad, perfecto para tablas de embutidos o bocadillos.",
                price: "C$90.00"
            },
            {
                id: 'e02',
                imgSrc: "https://www.supermercadoseljamon.com/documents/10180/892067/11030468_G.jpg",
                title: "Salchichón Ibérico 200g",
                description: "Salchichón ibérico elaborado con carne de cerdo ibérico y especias, un sabor auténtico.",
                price: "C$120.00"
            },
            {
                id: 'e03',
                imgSrc: "https://www.supermercadosplaza.es/documents/10180/10467/010516_G.jpg",
                title: "Chorizo Picante 250g",
                description: "Chorizo picante ahumado, ideal para dar un toque de sabor intenso a tus platos.",
                price: "C$80.00"
            },
            {
                id: 'e04',
                imgSrc: "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202108/17/00118394300596____4__600x600.jpg",
                title: "Mortadela Italiana 150g",
                description: "Mortadela italiana con pistachos, un clásico delicatesen para tus bocadillos.",
                price: "C$70.00"
            },
            {
                id: 'e05',
                imgSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750222158020L.jpg",
                title: "Salami Tipo Milano 300g",
                description: "Salami tipo milano, delicadamente curado para un sabor intenso y textura perfecta.",
                price: "C$110.00"
            },
            {
                id: 'e06',
                imgSrc: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/184834-800-800?v=637813975764570000&width=800&height=800&aspect=true",
                title: "Pastrami de Pavo 250g",
                description: "Pastrami de pavo ahumado y especiado, ideal para sándwiches y entradas.",
                price: "C$95.00"
            }
        ],
        "helados": [
            {
                id: 'h01',
                imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFyrOj5H_gBlrGRB2K0LJrRKXjU77Kw3O6KQ&s",
                title: "Helado de Vainilla 1L",
                description: "Helado cremoso de vainilla elaborado con ingredientes naturales, perfecto para compartir.",
                price: "C$100.00"
            },
            {
                id: 'h02',
                imgSrc: "https://www.kokoeurope.pl/cdn/shop/files/ezgif.com-webp-to-jpg_1.jpg?v=1686635941",
                title: "Paleta de Mango y Chile",
                description: "Paleta de mango con un toque de chile, refrescante y con un toque picante.",
                price: "C$25.00"
            },
            {
                id: 'h03',
                imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEP0d9LDPcZiOwEtrU0NQFEwZGmCZFoviV-g&s",
                title: "Helado de Chocolate Amargo 500ml",
                description: "Helado de chocolate amargo con trozos de chocolate, para los amantes del cacao puro.",
                price: "C$120.00"
            },
            {
                id: 'h04',
                imgSrc: "https://www.laneveria.com.sv/wp-content/uploads/2017/04/WEB-LLEVAR-LITROFRESA.png",
                title: "Sundae de Fresa y Nata",
                description: "Sundae clásico con fresas frescas y nata montada, irresistible para los golosos.",
                price: "C$80.00"
            },
            {
                id: 'h05',
                imgSrc: "https://walmartcr.vtexassets.com/arquivos/ids/504834-500-auto?v=638415134387270000&width=500&height=auto&aspect=true",
                title: "Popsicle de Yogurt y Frutas",
                description: "Popsicle de yogurt natural con trozos de frutas frescas, saludable y delicioso.",
                price: "C$30.00"
            },
            {
                id: 'h06',
                imgSrc: "https://www.conaprole.uy/wp-content/uploads/2018/12/97252-PolipapelCIrlandyChoc900ml-1-600x600.png",
                title: "Helado de Crema Irlandesa 750ml",
                description: "Helado de crema irlandesa con whisky, crema y toques de café, para disfrutar con moderación.",
                price: "C$150.00"
            }
        ],
        "higiene": [
            {
                id: 'hi01',
                imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/370071/Jab-n-L-quido-Antibacterial-Protex-Avena-Prebi-tico-500-ml-2-9982.jpg?v=638451958286030000",
                title: "Jabón Líquido Antibacterial 500ml",
                description: "Jabón líquido antibacterial con aloe vera, protege y limpia tu piel suavemente.",
                price: "C$35.00"
            },
            {
                id: 'hi02',
                imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/379759/Shampoo-Pantene-Pro-V-Restauraci-n-400ml-1-8724.jpg?v=638478963195100000",
                title: "Shampoo Restauración Capilar 400ml",
                description: "Shampoo reparador para cabello dañado, con keratina y extractos naturales.",
                price: "C$50.00"
            },
            {
                id: 'h03',
                imgSrc: "https://m.media-amazon.com/images/I/71IklRSnYJL.jpg",
                title: "Papel Higiénico Ultra Suave (Pack 6 rollos)",
                description: "Papel higiénico ultra suave y resistente, esencial para el hogar y la oficina.",
                price: "C$60.00"
            },
            {
                id: 'h04',
                imgSrc: "https://images.ctfassets.net/njdrd936eipt/2wrognCD0GPuv5O2Zk3NsK/08917c0bc32157ddb0fc64569d7ed210/roll-on-antitranspirante-FRESH.png?fm=webp&w=480&q=75",
                title: "Desodorante Roll-On Fresh 50ml",
                description: "Desodorante roll-on con aroma fresco, controla eficazmente el sudor durante todo el día.",
                price: "C$25.00"
            }
        ],
        "lacteos": [
            {
                id: 'la01',
                imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/287034/Leche-UHT-marca-Lala-Entera-1L-1-10968.jpg?v=638251727135970000",
                title: "Leche Entera 1L",
                description: "Leche entera fresca, ideal para el desayuno o preparar recetas dulces y saladas.",
                price: "C$30.00"
            },
            {
                id: 'la02',
                imgSrc: "https://jumbo.vtexassets.com/arquivos/ids/413970/Queso-parmesano-Gran-Reserva-trozo-200-g.jpg?v=637473108205700000",
                title: "Queso Parmesano 200g",
                description: "Queso parmesano de alta calidad, perfecto para rallar sobre pastas y gratinados.",
                price: "C$150.00"
            },
            {
                id: 'la03',
                imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/196029-800-450?v=637789273898730000&width=800&height=450&aspect=true",
                title: "Yogurt Natural 500g",
                description: "Yogurt natural sin azúcares añadidos, cremoso y saludable para cualquier momento del día.",
                price: "C$45.00"
            },
            {
                id: 'la04',
                imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyThvZWFIaB3E0tMSSYTzr16Aj4_2e8PZHA&s",
                title: "Mantequilla Sin Sal 250g",
                description: "Mantequilla sin sal, ideal para cocinar y preparar repostería con un sabor puro.",
                price: "C$70.00"
            },
            {
                id: 'la05',
                imgSrc: "https://jumbo.vtexassets.com/arquivos/ids/396630/Crema-de-leche-Colun-200-ml.jpg?v=637469297135270000",
                title: "Crema de Leche 200ml",
                description: "Crema de leche fresca, perfecta para dar un toque suave y cremoso a tus platos.",
                price: "C$55.00"
            }
        ],
        "limpieza": [
            {
                id: 'li01',
                imgSrc: "https://supercarnes.com/wp-content/uploads/2020/07/75696400566.png",
                title: "Detergente Líquido Lavanda 1L",
                description: "Detergente líquido con aroma a lavanda, elimina las manchas difíciles y deja tu ropa limpia y fresca.",
                price: "C$50.00"
            },
            {
                id: 'li02',
                imgSrc: "https://jumbo.vtexassets.com/arquivos/ids/437545/Limpiavidrios-gatillo-500-ml.jpg?v=637577332326200000",
                title: "Limpiavidrios 500ml",
                description: "Limpiavidrios efectivo para ventanas y espejos, sin dejar marcas ni residuos.",
                price: "C$40.00"
            },
            {
                id: 'li03',
                imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwGPsIC--0iQi8a_ovaMLUwHCMqD2GJU35Q&s",
                title: "Esponja Multiusos (Pack 3 unidades)",
                description: "Esponjas multiusos ideales para la limpieza de cocina y baño, duraderas y resistentes.",
                price: "C$15.00"
            },
            {
                id: 'li04',
                imgSrc: "https://tienda.dismac.es/web/image/product.template/81582/image",
                title: "Desinfectante de Superficies 750ml",
                description: "Desinfectante de superficies con fórmula antibacteriana, ideal para mantener tu hogar limpio y seguro.",
                price: "C$70.00"
            },
            {
                id: 'li05',
                imgSrc: "https://walmartni.vtexassets.com/arquivos/ids/346893-800-450?v=638419565149670000&width=800&height=450&aspect=true",
                title: "Toallas de Papel (Pack 6 rollos)",
                description: "Toallas de papel absorbentes y resistentes, perfectas para cualquier tarea de limpieza.",
                price: "C$25.00"
            },
            {
                id: 'li06',
                imgSrc: "https://promart.vteximg.com.br/arquivos/ids/7729328-1000-1000/126445.jpg?v=638381878247330000",
                title: "Detergente en Polvo Floral 2kg",
                description: "Detergente en polvo con aroma floral, elimina las manchas y deja la ropa fragante.",
                price: "C$80.00"
            }
        ]
    };

    const initialPromos = [
        {
            id: 'p01',
            imgSrc: "assets/proudco2.jpg",
            title: "Coca-Cola Zero 2.5L (2 Pack)",
            description: "¡Duplica el sabor sin las calorías con nuestro pack especial de 2 botellas de 2.5 litros de Coca-Cola Zero!",
            price: "C$90.00",
            oldprice: "C$130.00"
        },
        {
            id: 'p02',
            imgSrc: "assets/image 1.png",
            title: "Jumex Variedad Frutas (2x1)",
            description: "Aprovecha nuestra promoción 2x1 en Jumex variedad frutas y lleva el doble de sabor refrescante a casa con cada botella!",
            price: "C$60.00",
            oldprice: "C$90.00"
        },
        {
            id: 'p03',
            imgSrc: "assets/producto 3.png",
            title: "Cereales Kellogg's (3x2)",
            description: "¡Desayuna con más variedad y ahorro con nuestra oferta especial 3x2 en cereales Kellogg's!",
            price: "C$850.00",
            oldprice: "C$1050.00"
        },
        {
            id: 'p04',
            imgSrc: "assets/image 3.png",
            title: "Helado Cremissimo 1L + Palomitas ACT II 80g",
            description: "Satisfacción en cada bocado! Helado Cremissimo 1L + Palomitas ACT II 80g de cortesía.",
            price: "C$190.00",
            oldprice: "C$230.00"
        }
    ];

   // Arreglo para almacenar los IDs de los productos en el carrito
   let carritoIds = [];

   botonCesta.addEventListener('click', function() {

if(cantidadCesta.textContent.trim() === "0")
{
    alert("No se puede pasar a cesta si esta vacia!");
}
else
{
    let cestaIDs = JSON.stringify(carritoIds);

    // Almacenar en localStorage
    localStorage.setItem('cestaIDs', cestaIDs);    

     window.location.href = "CestaDeCompra.html";
       }
}
);
   function generatePromoItems(items) {
    promocionesContainer.innerHTML = "";
    items.forEach(item => {
        const promoItemDiv = document.createElement("div");
        promoItemDiv.classList.add("promo-item");
       
        const img = document.createElement("img");
        img.src = item.imgSrc;
        img.alt = item.title;
        img.style.height = "200px"; 
        const title = document.createElement("p");
        title.innerHTML = `<strong>${item.title}</strong>`;
        
        const description = document.createElement("p");
        
        description.textContent = item.description;
 
        description.style.maxHeight = "3.6em";
        description.style.overflow = "hidden";
        description.style.textOverflow = "ellipsis";
        description.style.lineHeight = "1.8em"

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "flex-start"; // Alinear elementos en la parte superior


        const price = document.createElement("p");
        price.innerHTML = `<strong>${item.price}</strong>`;
        
        const oldPriceElement = document.createElement("p");
        if(item.oldprice !== null  && item.oldprice !== undefined) {
           
            oldPriceElement.innerHTML = `<span style="font-size: 4rem; margin-top:-50px">${item.oldprice}</span>`;

            price.style.marginLeft = "20px";
            oldPriceElement.style.marginLeft = "20px";
            oldPriceElement.style.fontWeight = "lighter";
            oldPriceElement.style.textDecoration = "line-through";
            // Aquí debes agregar oldPriceElement al DOM, por ejemplo:
            // Suponiendo que "container" es el elemento donde quieres añadir el párrafo:
            // container.appendChild(oldPriceElement);
        }
        
        const button = document.createElement("button");
        button.textContent = carritoIds.includes(item.id) ? "Agregado" : "Añadir al carrito";
        button.style.backgroundColor = carritoIds.includes(item.id) ? "#000" : "#f0b429";
        button.style.color = carritoIds.includes(item.id) ? "#fff" : "#000";
        button.addEventListener('click', function() {
            if (!carritoIds.includes(item.id)) {
                carritoIds.push(item.id);
                button.textContent = "Agregado";
                button.style.backgroundColor = "#000";
                button.style.color = "#fff";
                cantidadCesta.innerHTML = parseInt(cantidadCesta.innerHTML) + 1;
            } else {
                const index = carritoIds.indexOf(item.id);
                if (index !== -1) {
                    carritoIds.splice(index, 1);
                }
                button.textContent = "Añadir al carrito";
                button.style.backgroundColor = "#f0b429";
                button.style.color = "#000";
                cantidadCesta.innerHTML = parseInt(cantidadCesta.innerHTML) - 1;
            }
        });

        promoItemDiv.appendChild(img);
        promoItemDiv.appendChild(title);
        promoItemDiv.appendChild(description);
        container.appendChild(price);
        if(item.oldprice !== null  && item.oldprice !== undefined) {
           
            oldPriceElement.innerHTML = `<strong>${item.oldprice}</strong>`;
            container.appendChild(oldPriceElement);
        }
        promoItemDiv.appendChild(container);
        promoItemDiv.appendChild(button);
        
        promocionesContainer.appendChild(promoItemDiv);
    });
}
generatePromoItems(initialPromos);
// Manejar la búsqueda
const footer = document.getElementById('footerIndex');
searchBar.addEventListener('input', function() {
    const searchText = searchBar.value.trim().toLowerCase();
    if (searchText === "") {
        categoriesContainer.style.display = 'flex';
        carrouselMain.style.display = 'block';
        footer.style.display = 'block';
        promocionesTitle.textContent = "PROMOCIONES";
        promocionesTitle.style.marginTop = "0px";
        generatePromoItems(initialPromos);
    } else {
        carrouselMain.style.display = 'none';
        categoriesContainer.style.display = 'none';
        footer.style.display = 'none';
        // Filtrar productos basados en la búsqueda en promosData
        const filteredProducts = Object.values(promosData).flatMap(category =>
            category.filter(product =>
                product.title.toLowerCase().includes(searchText)
            )
        );
        promocionesTitle.textContent = "Resultados de búsqueda";
        promocionesTitle.style.marginTop = "110px";
        generatePromoItems(filteredProducts);
    }
});

   // Manejar categorías
   buttons.forEach(button => {
       button.addEventListener("click", () => {
           const isActive = button.classList.contains("active");
           buttons.forEach(btn => btn.classList.remove("active"));
           promocionesTitle.textContent = "PROMOCIONES";

           if (!isActive) {
               button.classList.add("active");
               const altText = button.querySelector("img").alt.toLowerCase();
               promocionesTitle.textContent = altText.charAt(0).toUpperCase() + altText.slice(1);

               // Obtener productos de la categoría seleccionada
               const promoItems = promosData[altText] || [];
               generatePromoItems(promoItems);
           } else {
               generatePromoItems(initialPromos); // Mostrar productos iniciales si la categoría ya está activa
           }
       });
   });
});
