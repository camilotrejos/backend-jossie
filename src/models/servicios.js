const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiciosSchema = new Schema({

    id_servicio: {type: String, required: true},
    nombre_servicio: {type: String, required: true},
    descripcion_servicio: {type: String, required: true}
    
});

module.exports = mongoose.model("servicios", ServiciosSchema );