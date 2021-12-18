const mongoose = require("mongoose");
const { Schema } = mongoose;

const AgendaSchema = new Schema({

    id_reserva: {type: Number, required: true},
    dia_reserva: {type: Number, required: true},
    mes_reserva: {type: Number, required: true},
    anio_reserva: {type: Number, required: true},
    usuario_reserva: {type: String, required: true},
    servicio_reserva: {type: String, required: true},
    barbero_reserva: {type: String, required: true},
    estado_reserva: {type: String, required: true} //Ejecutado-Pendiente-En curso
      
});

module.exports = mongoose.model("agenda", AgendaSchema );