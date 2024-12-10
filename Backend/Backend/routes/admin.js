const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus'); // Asegúrate de crear este modelo
const Driver = require('../models/Driver'); // Asegúrate de crear este modelo
const Trip = require('../models/Trip'); // Asegúrate de crear este modelo

router.post('/buses', async (req, res) => {
    const { plate, driver, departureCity, arrivalCity } = req.body;
    console.log('Datos recibidos:', req.body);

    try {
        const driverExists = await Driver.findById(driver);
        if (!driverExists) {
            return res.status(400).json({ message: 'El conductor con ese ID no existe' });
        }

        const newBus = new Bus({
            plate,
            driver,
            departureCity,
            arrivalCity,
        });

        await newBus.save();

        res.status(201).json({
            message: 'Bus creado exitosamente',
            newBus,
        });
    } catch (error) {
        console.error('Error al crear el bus:', error.message);
        res.status(500).json({
            message: 'Error al crear el bus',
            error: error.message,
        });
    }
});


// Crear Conductor
router.post('/drivers', async (req, res) => {
    const { cedula, name, license } = req.body;

    try {
        const newDriver = new Driver({ cedula, name, license });
        await newDriver.save();
        res.status(201).json({ message: 'Conductor creado exitosamente', newDriver });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el conductor', error });
    }
});

// Ruta para crear un viaje
router.post('/trips', async (req, res) => {
    const { origin, destination, departureTime, busId, driverId } = req.body;

    try {
        // Verifica que el bus existe
        const busExists = await Bus.findById(busId);
        if (!busExists) {
            return res.status(400).json({ message: 'El bus con ese ID no existe' });
        }

        // Verifica que el conductor existe
        const driverExists = await Driver.findById(driverId);
        if (!driverExists) {
            return res.status(400).json({ message: 'El conductor con ese ID no existe' });
        }

        // Ruta para obtener todos los viajes

        // Endpoint para obtener todos los viajes
        router.get('/trips', async (req, res) => {
            try {
                const trips = await Trip.find()
                    .populate('bus', 'placa') // Poblar el campo 'bus' con la placa
                    .populate('driver', 'name license'); // Poblar el campo 'driver' con nombre y licencia

                res.status(200).json(trips);
            } catch (error) {
                console.error('Error al obtener los viajes:', error);
                res.status(500).json({ message: 'Error al obtener los viajes', error });
            }
        });

        module.exports = router;


        // Crea el viaje
        const newTrip = new Trip({
            origin,
            destination,
            departureTime,
            bus: busId,
            driver: driverId,
        });

        await newTrip.save();

        res.status(201).json({ message: 'Viaje creado exitosamente', newTrip });
    } catch (error) {
        console.error('Error al crear el viaje:', error);
        res.status(500).json({ message: 'Error al crear el viaje', error });
    }
});

module.exports = router;