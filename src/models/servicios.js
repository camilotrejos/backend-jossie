const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiciosSchema = new Schema({

    nombre_servicio: {type: String, required: true, unique: true},
    url_imagen_servicio: {type: String, required: true},
    descripcion_servicio: {type: String, required: true},
    costo_servicio: {type: Number, required: true}
     
});

module.exports = mongoose.model("servicios", ServiciosSchema );