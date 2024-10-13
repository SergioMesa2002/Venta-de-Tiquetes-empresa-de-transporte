// URL del backend
const API_URL = 'http://localhost:5000/api/auth';

// Lógica para el inicio de sesión
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            console.log(res.status, data); // Imprime el estado y los datos de la respuesta
            if (res.status === 200) {
                // Guardar el rol en localStorage
                localStorage.setItem('role', data.user.role);
                // Redirigir a la página de bienvenida
                window.location.href = 'welcome.html';
            } else {
                document.getElementById('message').textContent = data.message;
            }
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para el registro de administradores
const registerAdminForm = document.getElementById('registerAdminForm');
if (registerAdminForm) {
    registerAdminForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/register-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cedula, nombre, fechaNacimiento, username, password })
            });

            const data = await res.json();
            console.log(res.status, data); // Imprime el estado y los datos de la respuesta
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                // Redirigir o hacer algo después del registro exitoso
                // window.location.href = 'index.html'; // Cambiar por la URL de destino
            }
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}

// Lógica para el registro de clientes
const registerClientForm = document.getElementById('registerClientForm');
if (registerClientForm) {
    registerClientForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/register-client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cedula, nombre, fechaNacimiento, username, password })
            });

            const data = await res.json();
            console.log(res.status, data); // Imprime el estado y los datos de la respuesta
            document.getElementById('message').textContent = data.message;
            if (res.status === 201) {
                // Redirigir o hacer algo después del registro exitoso
                // window.location.href = 'index.html'; // Cambiar por la URL de destino
            }
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            document.getElementById('message').textContent = 'Error en la conexión';
        }
    });
}
