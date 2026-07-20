document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const formInputs = bookingForm.querySelectorAll('input, select');
    const successMessage = document.getElementById('success-message');
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');
    
    // 1. RESTRICCIÓN DE FECHAS (No permitir días pasados)
    // Obtener la fecha de hoy en formato YYYY-MM-DD
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Enero es 0
    let dd = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    const minDate = `${yyyy}-${mm}-${dd}`;
    dateInput.min = minDate; // Establece el mínimo del calendario html

    // 2. LOGICA INTERACTIVA DE HORAS DISPONIBLES
    // Simula las horas disponibles del restaurante dependiendo de la fecha seleccionada
    dateInput.addEventListener('input', () => {
        // Habilitar el select de horas
        timeSelect.disabled = false;
        
        // Limpiar opciones anteriores
        timeSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';

        const selectedDate = dateInput.value;
        const isToday = (selectedDate === minDate);
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        // Horarios base del restaurante (Almuerzo y Cena)
        const hours = [
            "13:00", "13:30", "14:00", "14:30", "15:00",
            "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
        ];

        // Rellenar dinámicamente las opciones
        hours.forEach(hour => {
            const [hourPart, minutePart] = hour.split(':').map(Number);

            // Si es hoy, no mostrar horas que ya pasaron
            if (isToday) {
                if (hourPart < currentHour || (hourPart === currentHour && minutePart <= currentMinutes)) {
                    return; // Salta esta iteración, no añade la opción
                }
            }

            const option = document.createElement('option');
            option.value = hour;
            
            // Formatear para mostrar AM/PM correctamente (simplificado)
            let displayHour = hourPart > 12 ? hourPart - 12 : hourPart;
            let period = hourPart >= 12 ? 'PM' : 'AM';
            if (displayHour === 0) displayHour = 12; // Medianoche

            option.textContent = `${displayHour}:${String(minutePart).padStart(2, '0')} ${period}`;
            timeSelect.appendChild(option);
        });
    });

    // 3. CONTROL DE ENVÍO DE FORMULARIO (INTERACTIVIDAD DE CONFIRMACIÓN)
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita recargar la página

        // Capturar los valores ingresados por el usuario
        const name = document.getElementById('client-name').value;
        const email = document.getElementById('client-email').value;
        const date = dateInput.value;
        const time = timeSelect.value;
        const guests = document.getElementById('guests-count').value;

        // Inyectar los datos en el resumen de éxito
        document.getElementById('summary-name').textContent = name;
        document.getElementById('summary-email').textContent = email;
        document.getElementById('summary-date').textContent = formatDateForDisplay(date);
        document.getElementById('summary-time').textContent = time + " PM";
        document.getElementById('summary-guests').textContent = guests + (guests === "1" ? " persona" : " personas");

        // Ocultar el formulario de forma animada y mostrar el éxito
        bookingForm.style.display = 'none';
        successMessage.style.display = 'block';
    });

    // 4. FEEDBACK DE VALIDACIÓN Y BOTÓN DE REINICIO
    formInputs.forEach(input => {
        input.addEventListener('blur', () => { // 'blur' se activa cuando el usuario sale del campo
            if (input.checkValidity()) {
                input.closest('.form-group').classList.add('success');
            } else {
                input.closest('.form-group').classList.remove('success');
            }
        });
    });

    document.getElementById('btn-reset-form').addEventListener('click', () => {
        bookingForm.reset();
        timeSelect.disabled = true;
        timeSelect.innerHTML = '<option value="" disabled selected>Primero selecciona una fecha</option>';
        successMessage.style.display = 'none';
        bookingForm.style.display = 'flex';
        formInputs.forEach(input => input.closest('.form-group').classList.remove('success'));
    });

    // Función auxiliar para transformar fechas (Ej: 2026-07-05 a 05/07/2026)
    function formatDateForDisplay(dateString) {
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
});