const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip'); // Modelo de Trip
const fs = require('fs');
const path = require('path');

// Ruta para obtener todos los viajes
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find(); // Obtener todos los viajes desde la base de datos
        res.json(trips);
    } catch (error) {
        console.error('Error al obtener los viajes:', error);
        res.status(500).json({ message: 'Error al obtener los viajes' });
    }
});

// Ruta para crear un nuevo viaje
router.post('/', async (req, res) => {
    const { origin, destination, date, price, bus, driver } = req.body;

    try {
        const newTrip = new Trip({
            origin,
            destination,
            date,
            price,
            bus,
            driver,
        });

        await newTrip.save(); // Guardar el viaje en la base de datos
        res.status(201).json(newTrip);
    } catch (error) {
        console.error('Error al crear el viaje:', error);
        res.status(500).json({ message: 'Error al crear el viaje' });
    }
});

// Ruta para reservar un viaje
router.post('/reserve', async (req, res) => {
    const { tripId } = req.body;

    try {
        const trip = await Trip.findById(tripId); // Buscar el viaje por ID
        if (!trip) {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }

        // Generar un archivo TXT con los detalles de la reserva
        const fileName = `reserva_${tripId}_${Date.now()}.txt`;
        const filePath = path.join(__dirname, '../reservations', fileName);

        const fileContent = `
            Reserva Confirmada:
            - Origen: ${trip.origin}
            - Destino: ${trip.destination}
            - Fecha: ${trip.date}
            - Precio: $${trip.price}

            ¡Gracias por reservar con nosotros!
        `;

        // Escribir el archivo en el sistema
        fs.writeFileSync(filePath, fileContent);

        res.json({ message: 'Reserva exitosa', file: `/reservations/${fileName}` });
    } catch (error) {
        console.error('Error al procesar la reserva:', error);
        res.status(500).json({ message: 'Error al procesar la reserva' });
    }
});

// Ruta para eliminar un viaje
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTrip = await Trip.findByIdAndDelete(id);
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }

        res.json({ message: 'Viaje eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el viaje:', error);
        res.status(500).json({ message: 'Error al eliminar el viaje' });
    }
});

// Ruta para actualizar un viaje
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { origin, destination, date, price, bus, driver } = req.body;

    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            id,
            { origin, destination, date, price, bus, driver },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }

        res.json(updatedTrip);
    } catch (error) {
        console.error('Error al actualizar el viaje:', error);
        res.status(500).json({ message: 'Error al actualizar el viaje' });
    }
});

module.exports = router;
