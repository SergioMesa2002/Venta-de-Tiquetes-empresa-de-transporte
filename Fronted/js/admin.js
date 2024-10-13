// URL del backend
const API_URL = 'http://localhost:5000/api/auth'; // Asegúrate de que esta sea la URL correcta

// Lógica para crear Bus
const createBusForm = document.getElementById('createBusForm');
if (createBusForm) {
    createBusForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const busPlate = document.getElementById('busPlate').value;
        const driverName = document.getElementById('driverName').value;
        const departureCity = document.getElementById('departureCity').value;
        const arrivalCity = document.getElementById('arrivalCity').value;

        try {
            const res = await fetch(`${API_URL}/create-bus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ busPlate, driverName, departureCity, arrivalCity })
            });

            const data = await res.json();
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                // Limpiar el formulario o redirigir según sea necesario
                createBusForm.reset();
            }
        } catch (error) {
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para crear Conductor
const createDriverForm = document.getElementById('createDriverForm');
if (createDriverForm) {
    createDriverForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const driverCedula = document.getElementById('driverCedula').value;
        const driverName = document.getElementById('driverName').value; // Asegúrate de que no haya conflictos de IDs
        const driverLicense = document.getElementById('driverLicense').value;

        try {
            const res = await fetch(`${API_URL}/create-driver`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ driverCedula, driverName, driverLicense })
            });

            const data = await res.json();
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                // Limpiar el formulario o redirigir según sea necesario
                createDriverForm.reset();
            }
        } catch (error) {
            document.getElementById('message').textContent = 'Error en la conexión';
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

        try {
            const res = await fetch(`${API_URL}/create-trip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tripOrigin, tripDestination, tripDepartureTime })
            });

            const data = await res.json();
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                // Limpiar el formulario o redirigir según sea necesario
                createTripForm.reset();
            }
        } catch (error) {
            document.getElementById('message').textContent = 'Error en la conexión';
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
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            if (res.status === 200) {
                // Aquí puedes procesar y mostrar el historial de viajes
                console.log(data); // Muestra el historial en la consola por ahora
                document.getElementById('message').textContent = 'Historial de viajes obtenido exitosamente.';
            } else {
                document.getElementById('message').textContent = data.message;
            }
        } catch (error) {
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}
