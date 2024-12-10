const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip'); // Importar el modelo Trip

// Endpoint para obtener todos los viajes
router.get('/', async (req, res) => {
    try {
        // Consulta para obtener todos los viajes y poblar los detalles de bus y conductor
        const trips = await Trip.find()
            .populate('bus', 'placa') // Obtiene solo el campo 'placa' del modelo Bus
            .populate('driver', 'name license'); // Obtiene solo los campos 'name' y 'license' del modelo Driver

        res.status(200).json(trips); // Devuelve los viajes en formato JSON
    } catch (error) {
        console.error('Error al obtener los viajes:', error);
        res.status(500).json({ message: 'Error al obtener los viajes', error });
    }
});

module.exports = router;
