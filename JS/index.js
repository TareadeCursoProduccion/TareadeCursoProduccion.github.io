document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".round-button");
    const promocionesTitle = document.querySelector(".main-text");
    const promocionesContainer = document.querySelector(".promociones");

    const promosData = {
        "alimentos": [
            {
                imgSrc: "assets/alimentos1.jpg",
                title: "Producto 1 Alimentos",
                description: "Descripción del producto 1 de alimentos.",
                price: "C$100.00"
            },
            {
                imgSrc: "assets/alimentos2.jpg",
                title: "Producto 2 Alimentos",
                description: "Descripción del producto 2 de alimentos.",
                price: "C$150.00"
            }
        ],
        "bebidas": [
            {
                imgSrc: "assets/bebidas1.jpg",
                title: "Producto 1 Bebidas",
                description: "Descripción del producto 1 de bebidas.",
                price: "C$50.00"
            },
            {
                imgSrc: "assets/bebidas2.jpg",
                title: "Producto 2 Bebidas",
                description: "Descripción del producto 2 de bebidas.",
                price: "C$75.00"
            }
        ],
        "embutidos": [
            {
                imgSrc: "assets/embutidos1.jpg",
                title: "Producto 1 Embutidos",
                description: "Descripción del producto 1 de embutidos.",
                price: "C$120.00"
            },
            {
                imgSrc: "assets/embutidos2.jpg",
                title: "Producto 2 Embutidos",
                description: "Descripción del producto 2 de embutidos.",
                price: "C$180.00"
            }
        ],
        "helados": [
            {
                imgSrc: "assets/helados1.jpg",
                title: "Producto 1 Helados",
                description: "Descripción del producto 1 de helados.",
                price: "C$200.00"
            },
            {
                imgSrc: "assets/helados2.jpg",
                title: "Producto 2 Helados",
                description: "Descripción del producto 2 de helados.",
                price: "C$250.00"
            }
        ],
        "higiene": [
            {
                imgSrc: "assets/higiene1.jpg",
                title: "Producto 1 Higiene",
                description: "Descripción del producto 1 de higiene.",
                price: "C$80.00"
            },
            {
                imgSrc: "assets/higiene2.jpg",
                title: "Producto 2 Higiene",
                description: "Descripción del producto 2 de higiene.",
                price: "C$130.00"
            }
        ],
        "lacteos": [
            {
                imgSrc: "assets/lacteos1.jpg",
                title: "Producto 1 Lácteos",
                description: "Descripción del producto 1 de lácteos.",
                price: "C$90.00"
            },
            {
                imgSrc: "assets/lacteos2.jpg",
                title: "Producto 2 Lácteos",
                description: "Descripción del producto 2 de lácteos.",
                price: "C$140.00"
            }
        ],
        "limpieza": [
            {
                imgSrc: "assets/limpieza1.jpg",
                title: "Producto 1 Limpieza",
                description: "Descripción del producto 1 de limpieza.",
                price: "C$60.00"
            },
            {
                imgSrc: "assets/limpieza2.jpg",
                title: "Producto 2 Limpieza",
                description: "Descripción del producto 2 de limpieza.",
                price: "C$110.00"
            }
        ]
    };

    // Datos iniciales de promociones (puedes personalizarlos según tu preferencia)
    const initialPromos = [
        {
            imgSrc: "assets/proudco2.jpg",
            title: "Coca-Cola Zero 2.5L (2 Pack)",
            description: "¡Duplica el sabor sin las calorías con nuestro pack especial de 2 botellas de 2.5 litros de Coca-Cola Zero!",
            price: "C$90.00"
        },
        {
            imgSrc: "assets/image 1.png",
            title: "Jumex Variedad Frutas (2x1)",
            description: "Aprovecha nuestra promoción 2x1 en Jumex variedad frutas y lleva el doble de sabor refrescante a casa con cada botella!",
            price: "C$60.00"
        },
        {
            imgSrc: "assets/producto 3.png",
            title: "Cereales Kellogg's (3x2)",
            description: "¡Desayuna con más variedad y ahorro con nuestra oferta especial 3x2 en cereales Kellogg's!",
            price: "C$850.00"
        },
        {
            imgSrc: "assets/image 3.png",
            title: "Helado Cremissimo 1L (Todos los sabores) + ¡Regalo! Palomitas ACT II 80g",
            description: "Satisfacción en cada bocado! Helado Cremissimo 1L + Palomitas ACT II 80g de cortesía para una experiencia de sabor incomparable.",
            price: "C$190.00"
        }
    ];

    // Función para generar elementos promo-item
    function generatePromoItems(items) {
        promocionesContainer.innerHTML = ""; // Limpiar los elementos existentes
        items.forEach(item => {
            const promoItemDiv = document.createElement("div");
            promoItemDiv.classList.add("promo-item");

            const img = document.createElement("img");
            img.src = item.imgSrc;
            img.alt = item.title;

            const title = document.createElement("p");
            title.innerHTML = `<strong>${item.title}</strong>`;

            const description = document.createElement("p");
            description.textContent = item.description;

            const price = document.createElement("p");
            price.innerHTML = `<strong>${item.price}</strong>`;

            const button = document.createElement("button");
            button.textContent = "Añadir al carrito";

            promoItemDiv.appendChild(img);
            promoItemDiv.appendChild(title);
            promoItemDiv.appendChild(description);
            promoItemDiv.appendChild(price);
            promoItemDiv.appendChild(button);

            promocionesContainer.appendChild(promoItemDiv);
        });
    }

    // Generar elementos iniciales
    generatePromoItems(initialPromos);

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const isActive = button.classList.contains("active");
            buttons.forEach(btn => btn.classList.remove("active"));
            promocionesTitle.textContent = "PROMOCIONES";

            if (!isActive) {
                button.classList.add("active");
                const altText = button.querySelector("img").alt.toLowerCase();
                promocionesTitle.textContent = altText.charAt(0).toUpperCase() + altText.slice(1); // Capitalizar el primer carácter

                const promoItems = promosData[altText] || [];
                generatePromoItems(promoItems);
            } else {
                generatePromoItems(initialPromos); 
            }
        });
    });
});
