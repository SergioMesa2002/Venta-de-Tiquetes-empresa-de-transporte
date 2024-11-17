const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Rutas de autenticación
const adminRoutes = require('./routes/admin'); // Asegúrate de crear y usar estas rutas

const app = express();

// Configuración de CORS para permitir solo solicitudes de localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000', // Permite solo solicitudes de localhost:3000
    methods: ['GET', 'POST'], // Métodos permitidos
    credentials: true, // Permite el uso de cookies
};

// Habilita CORS con las opciones definidas
app.use(cors(corsOptions));
app.use(express.json()); // Para procesar JSON en el body

// Definir las rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/admin', adminRoutes); // Rutas de administración para buses, conductores y viajes

// Configuración de Mongoose
mongoose.set('strictQuery', true); // Configura strictQuery

// Conectar a la base de datos
const URI = 'mongodb+srv://sergiomesa01:nOwlqJoGuKxjgEF2@training.m1grr.mongodb.net/?retryWrites=true&w=majority&appName=training'; // Define tu URI aquí
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
