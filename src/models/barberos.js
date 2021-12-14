const mongoose = require("mongoose");
const { Schema } = mongoose;

const BarberosSchema = new Schema({

    id_barbero: {type: String, required: true},
    nombre_barbero: {type: String, required: true},
    id_servicio_barbero: {type: String, required: true}
    
});

module.exports = mongoose.model("Barberos", BarberosSchema );