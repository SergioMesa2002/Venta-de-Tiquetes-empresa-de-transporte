const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true }, // Asegúrate de que el nombre coincide
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true } // Establece el rol del usuario
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
