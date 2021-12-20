const mongoose = require("mongoose");
const servicios = require("./servicios");
const { Schema } = mongoose;

const BarberosSchema = new Schema({

    /* id_barbero: {type: Number, required: true}, */
    nombres_barbero: {type: String, required: true},
    apellidos_barbero: {type: String, required: true},
    estado_barbero: {type: Boolean, required: true}, //Activo o no Activo
    id_servicio_barbero: {
        type: Schema.Types.ObjetctId, 
        ref: servicios}
      
});

module.exports = mongoose.model("Barberos", BarberosSchema );