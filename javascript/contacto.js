document.addEventListener('DOMContentLoaded', () => {
    
    const formulario = document.getElementById('formContacto');
    const alerta = document.getElementById('alerta-formulario');

    formulario.addEventListener('submit', (e) => {
        
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();


        if (nombre === '' || email === '' || mensaje === '') {
            alerta.textContent = 'Por favor, rellena todos los campos obligatorios.';
            alerta.className = 'alerta-formulario error'; // Aplica el estilo rojo de CSS
            return; 
        
        alerta.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido enviado con éxito. Nos comunicaremos contigo pronto.`;
        alerta.className = 'alerta-formulario exito'; // Aplica el estilo verde de CSS


        formulario.reset();

        
        setTimeout(() => {
            alerta.className = 'alerta-formulario';
            alerta.style.display = 'none';
        }, 5000);
    });
});