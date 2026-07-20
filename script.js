// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EFECTO SCROLL EN NAVBAR
    // Cambia el fondo de la navbar cuando el usuario hace scroll hacia abajo
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(30, 30, 36, 0.98)';
            navbar.style.padding = '15px 8%'; // Se vuelve un poco más delgada
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.backgroundColor = 'rgba(30, 30, 36, 0.95)';
            navbar.style.padding = '20px 8%';
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 2. MENÚ RESPONSIVE (MÓVIL)
    // Inserta dinámicamente el botón de hamburguesa y maneja su apertura
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // Crear el botón hamburguesa dinámicamente
        const menuBtn = document.createElement('div');
        menuBtn.classList.add('menu-toggle');
        menuBtn.innerHTML = `
            <div style="width: 25px; height: 3px; background-color: #ffffff; margin: 5px 0; transition: 0.4s;"></div>
            <div style="width: 25px; height: 3px; background-color: #ffffff; margin: 5px 0; transition: 0.4s;"></div>
            <div style="width: 25px; height: 3px; background-color: #ffffff; margin: 5px 0; transition: 0.4s;"></div>
        `;
        menuBtn.style.cursor = 'pointer';
        menuBtn.style.display = 'block';
        
        // Insertarlo antes del menú
        navbar.insertBefore(menuBtn, navMenu);

        // Estilos rápidos para el menú móvil cuando se activa
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = 'rgba(30, 30, 36, 0.98)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.alignItems = 'center';
        navMenu.style.padding = '20px 0';
        navMenu.style.display = 'none'; // Oculto por defecto

        // Evento click para abrir/cerrar
        menuBtn.addEventListener('click', () => {
            if (navMenu.style.display === 'none' || navMenu.style.display === '') {
                navMenu.style.display = 'flex';
                // Animación básica de las líneas del botón (opcional)
                menuBtn.children[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                menuBtn.children[1].style.opacity = '0';
                menuBtn.children[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                navMenu.style.display = 'none';
                menuBtn.children[0].style.transform = 'none';
                menuBtn.children[1].style.opacity = '1';
                menuBtn.children[2].style.transform = 'none';
            }
        });
    }

    // 3. EFECTO REVEAL AL HACER SCROLL
    // Hace que las tarjetas y elementos aparezcan suavemente al bajar la pantalla
    const revealElements = document.querySelectorAll('.feature-card, .gallery-item, .testimonial-card, .section-header');
    
    // Configurar estilos iniciales invisibles mediante JS para no romper el CSS si JS está desactivado
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85; // Punto de activación

        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Ejecutar una vez al cargar por si hay elementos ya visibles

});