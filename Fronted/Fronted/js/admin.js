document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'https://api-con-apollo-server-1.onrender.com'; // URL base para todas las solicitudes

    // Función para enviar datos al servidor
    async function sendData(endpoint, data) {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
             });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error: ${res.status} ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            showMessage('Error: ' + error.message, 'error');
            console.error(error);
            throw error; // Permite que el error sea manejado más adelante si es necesario
        }
    }

    // Función utilitaria para mostrar mensajes en el DOM
    function showMessage(message, type = 'info') {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        messageDiv.className = type === 'error' ? 'message-error' : 'message-info';
    }

    // Lógica para crear Bus
    const createBusForm = document.getElementById('createBusForm');
    if (createBusForm) {
        createBusForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const busPlate = document.getElementById('busPlate').value;
            const driverId = document.getElementById('busDriver').value;
            const departureCity = document.getElementById('departureCity').value;
            const arrivalCity = document.getElementById('arrivalCity').value;

            try {
                const response = await sendData('/create-bus', {
                    plate: busPlate,
                    driver: driverId,
                    departureCity,
                    arrivalCity,
                });
                showMessage(response.message);
                if (response.message.includes('exitosamente')) createBusForm.reset();
            } catch (error) {
                console.error('Error al crear bus:', error);
            }
        });
    }

    // Lógica para crear Conductor
    const createDriverForm = document.getElementById('createDriverForm');
    if (createDriverForm) {
        createDriverForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const driverCedula = document.getElementById('driverCedula').value;
            const driverName = document.getElementById('driverName').value;
            const driverLicense = document.getElementById('driverLicense').value;

            try {
                const response = await sendData('/create-driver', {
                    driverCedula,
                    driverName,
                    driverLicense,
                });
                showMessage(response.message);
                if (response.message.includes('exitosamente')) createDriverForm.reset();
            } catch (error) {
                console.error('Error al crear conductor:', error);
            }
        });
    }

    // Lógica para crear Viaje
    const createTripForm = document.getElementById('createTripForm');
    if (createTripForm) {
        createTripForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const tripOrigin = document.getElementById('tripOrigin').value;
            const tripDestination = document.getElementById('tripDestination').value;
            const tripDepartureTime = document.getElementById('tripDepartureTime').value;
            const busId = document.getElementById('busDriver').value;

            try {
                const response = await sendData('/create-trip', {
                    origin: tripOrigin,
                    destination: tripDestination,
                    departureTime: tripDepartureTime,
                    bus: busId,
                });
                showMessage(response.message);
                if (response.message.includes('exitosamente')) createTripForm.reset();
            } catch (error) {
                console.error('Error al crear viaje:', error);
            }
        });
    }

    // Lógica para ver historial de viajes
    const viewTripHistoryButton = document.getElementById('viewTripHistory');
    if (viewTripHistoryButton) {
        viewTripHistoryButton.addEventListener('click', async () => {
            try {
                const res = await fetch(`${API_URL}/trip-history`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `Error: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                console.log(data);
                showMessage('Historial de viajes obtenido exitosamente.');
                // Aquí puedes renderizar el historial en el DOM
            } catch (error) {
                console.error('Error al obtener historial de viajes:', error);
                showMessage('Error: ' + error.message, 'error');
            }
        });
    }
});
