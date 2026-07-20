document.addEventListener("DOMContentLoaded", () => {
    // --- FILTRADO DE MENÚ ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuGrid = document.querySelector(".menu-grid");
    const menuItems = document.querySelectorAll(".menu-grid .menu-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 1. Gestionar la clase 'active' en los botones
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // 2. Obtener la categoría del botón presionado
            const targetCategory = button.getAttribute("data-filter");

            // 3. Mostrar u ocultar los platos según la categoría
    menuItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (targetCategory === "todos" || itemCategory === targetCategory) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    });
        });
    });

    // --- LÓGICA DEL CARRITO DE COMPRAS ---
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartIcon = document.querySelector(".floating-cart"); // Apuntamos al nuevo botón flotante
    const closeCartBtn = document.querySelector(".close-cart-btn");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalPriceEl = document.getElementById("cart-total-price");
    const cartItemCountEl = document.querySelector(".cart-item-count");
    const clearCartBtn = document.querySelector(".btn-clear-cart");
    const checkoutBtn = document.querySelector(".btn-checkout");

    let cart = [];

    // Abrir y cerrar carrito
    cartIcon.addEventListener("click", () => cartSidebar.classList.add("open"));
    closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

    // Añadir item al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            const img = e.target.closest('.menu-item').querySelector('.item-img').src;

            // Animar el botón del carrito para dar feedback visual
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);

            addToCart(id, name, price, img);
        });
    });

    function addToCart(id, name, price, img) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        renderCartItems();
        renderCartTotal();
    }

    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty-msg">Tu carrito está vacío.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn decrease-btn">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-btn">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    function renderCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCountEl.textContent = totalItems;
        cartItemCountEl.style.display = totalItems > 0 ? 'block' : 'none';
    }

    // Manejar acciones dentro del carrito (aumentar, disminuir)
    cartItemsContainer.addEventListener('click', e => {
        const id = e.target.closest('.cart-item')?.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('increase-btn')) {
            changeQuantity(id, 1);
        } else if (e.target.classList.contains('decrease-btn')) {
            changeQuantity(id, -1);
        }
    });

    function changeQuantity(id, amount) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                // Eliminar el item si la cantidad es 0 o menos
                cart = cart.filter(cartItem => cartItem.id !== id);
            }
        }
        updateCart();
    }

    // Vaciar carrito
    clearCartBtn.addEventListener('click', () => {
        // Añadimos una confirmación para evitar vaciar por error
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            cart = [];
            updateCart();
        }
    });

    // Realizar pedido
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío. Añade productos para realizar un pedido.");
            return;
        }

        alert("¡Pedido realizado con éxito! Gracias por tu compra.");
        cart = [];
        updateCart();
        cartSidebar.classList.remove("open"); // Cierra el carrito después del pedido
    });

    // Inicializar el carrito al cargar la página
    updateCart();
});
