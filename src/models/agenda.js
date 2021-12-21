const mongoose = require("mongoose");
const barberos = require("./barberos");
const servicios = require("./servicios");
const usuarios = require("./usuarios");
const { Schema } = mongoose;

const AgendaSchema = new Schema({

    dia_reserva: {type: Number, required: true},
    mes_reserva: {type: Number, required: true},
    anio_reserva: {type: Number, required: true},
    usuario_reserva: {
        type: Schema.Types.ObjectID, 
        ref: usuarios},
    servicio_reserva:{
        type: Schema.Types.ObjectID,
        ref: servicios},
    barbero_reserva: {
        type: Schema.Types.ObjectID,
        ref: barberos},
    estado_reserva: {type: Boolean, required: true}, //Ejecutado-Pendiente-En curso
    completado:{type: Boolean, required:true},
    comentario: {type:String, required:true}
      
});

module.exports = mongoose.model("agenda", AgendaSchema );