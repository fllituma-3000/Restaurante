document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 1. Cambiar la clase activa en los botones
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // 2. Obtener la categoría seleccionada desde el atributo data-filter
            const targetCategory = button.getAttribute("data-filter");

            // 3. Filtrar los platos del menú
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                if (targetCategory === "todos") {
                    // Muestra todos los elementos si se presiona "Todos"
                    item.classList.remove("hide");
                } else if (itemCategory === targetCategory) {
                    // Muestra el elemento si coincide con la categoría elegida
                    item.classList.remove("hide");
                } else {
                    // Oculta el elemento si no coincide
                    item.classList.add("hide");
                }
            });
        });
    });
});