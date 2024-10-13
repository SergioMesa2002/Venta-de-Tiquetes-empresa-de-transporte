const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de que la ruta al modelo sea correcta
const Bus = require('../models/Bus'); // Asegúrate de que el modelo de Bus esté definido
const Driver = require('../models/Driver'); // Asegúrate de que el modelo de Driver esté definido
const Trip = require('../models/Trip'); // Asegúrate de que el modelo de Trip esté definido
const router = express.Router();

// Registrar Administrador
router.post('/register-admin', async (req, res) => {
    const { cedula, nombre, fechaNacimiento, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña
        const newUser = new User({
            cedula,
            nombre,
            fecha_nacimiento: fechaNacimiento, // Cambiar aquí para que coincida con el modelo
            username,
            password: hashedPassword, // Almacena la contraseña hasheada
            role: 'admin' // Establece el rol del usuario
        });

        await newUser.save();
        res.status(201).json({ message: 'Administrador registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el administrador', error });
    }
});

// Registrar Cliente
router.post('/register-client', async (req, res) => {
    const { cedula, nombre, fechaNacimiento, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña
        const newUser = new User({
            cedula,
            nombre,
            fecha_nacimiento: fechaNacimiento, // Cambiar aquí para que coincida con el modelo
            username,
            password: hashedPassword, // Almacena la contraseña hasheada
            role: 'client' // Establece el rol del usuario
        });

        await newUser.save();
        res.status(201).json({ message: 'Cliente registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el cliente', error });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Respuesta según el rol
        if (user.role === 'admin') {
            return res.status(200).json({ message: 'Bienvenido administrador', user });
        } else {
            return res.status(200).json({ message: 'Bienvenido cliente', user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
});

// Crear Bus
router.post('/create-bus', async (req, res) => {
    const { busPlate, driverName, departureCity, arrivalCity } = req.body;

    try {
        const newBus = new Bus({
            plate: busPlate,
            driver: driverName,
            departureCity,
            arrivalCity,
        });

        await newBus.save();
        res.status(201).json({ message: 'Bus creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el bus', error });
    }
});

// Crear Conductor
router.post('/create-driver', async (req, res) => {
    const { driverCedula, driverName, driverLicense } = req.body;

    try {
        const newDriver = new Driver({
            cedula: driverCedula,
            name: driverName,
            license: driverLicense,
        });

        await newDriver.save();
        res.status(201).json({ message: 'Conductor creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el conductor', error });
    }
});

// Crear Viaje
router.post('/create-trip', async (req, res) => {
    const { tripOrigin, tripDestination, tripDepartureTime } = req.body;

    try {
        const newTrip = new Trip({
            origin: tripOrigin,
            destination: tripDestination,
            departureTime: tripDepartureTime,
        });

        await newTrip.save();
        res.status(201).json({ message: 'Viaje creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el viaje', error });
    }
});

// Ver Historial de Viajes
router.get('/trip-history', async (req, res) => {
    try {
        const trips = await Trip.find(); // Aquí puedes agregar filtros si es necesario
        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el historial de viajes', error });
    }
});

module.exports = router;
