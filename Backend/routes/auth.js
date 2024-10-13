const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de que la ruta al modelo sea correcta
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
        console.error(error.message); // Imprimir el mensaje de error
        res.status(500).json({ message: 'Error al registrar el administrador', error: error.message });
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
        console.error(error.message); // Imprimir el mensaje de error
        res.status(500).json({ message: 'Error al registrar el cliente', error: error.message });
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
        console.error(error.message); // Imprimir el mensaje de error
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
});

module.exports = router;
