const mongoose = require("mongoose");
const { Schema } = mongoose;

const BarberosSchema = new Schema({

    id_barbero: {type: Number, required: true},
    nombres_barbero: {type: String, required: true},
    apellidos_barbero: {type: String, required: true},
    estado_barbero: {type: String, required: true}, //Disponible-Ocupado
    id_servicio_barbero: {type: String, required: true}
      
});

module.exports = mongoose.model("Barberos", BarberosSchema );