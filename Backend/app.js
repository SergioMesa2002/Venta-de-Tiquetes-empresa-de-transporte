const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Asegúrate de que la ruta sea correcta

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Para procesar JSON en el body

// Definir las rutas
app.use('/api/auth', authRoutes); // Asegúrate de tener esto

// Conectar a la base de datos
const URI = 'mongodb+srv://sergiomesa01:nOwlqJoGuKxjgEF2@training.m1grr.mongodb.net/?retryWrites=true&w=majority&appName=training';
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
