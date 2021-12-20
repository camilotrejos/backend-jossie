const express = require("express");
const router = express.Router();
const Agenda = require("../models/agenda");
 
// GET de todos los registros de reservas
router.get("/", async (req,res) => {
 
    const agenda = await Agenda.find().populate('usuario_reserva', 'servicio_reserva', 'barbero_reserva' );
    res.json(agenda);
 
});

// GET de una sola reserva
router.get("/:_id", async (req,res) => {

    const agenda = await Agenda.find({ _id: req.params._id }).populate('usuario_reserva', 'servicio_reserva', 'barbero_reserva' );
    res.json(agenda);

});

//Guardar reserva
router.post("/agendar", async (req,res) => {
    const {
        dia_reserva, 
        mes_reserva, 
        anio_reserva, 
        usuario_reserva, 
        servicio_reserva, 
        barbero_reserva, 
        estado_reserva = true,
        completado = false} = req.body;

    const agenda = new Agenda({
        dia_reserva, 
        mes_reserva, 
        anio_reserva, 
        usuario_reserva, 
        servicio_reserva, 
        barbero_reserva, 
        estado_reserva,
        completado});

    console.log(agenda);
    agenda.save(function (error) {
        if (error) {
            return res.status(401).send({
                estado: "error",
                msg: "No fue posible hacer la reserva"
            })
        }
        return res.status(200).send({
            estado: "ok",
            msg: "Reserva exitosa"
        })
})
});

// PUT para modificar cita en agenda
router.put("/:_id", async (req,res) => {

    const {
        dia_reserva, 
        mes_reserva, 
        anio_reserva, 
        usuario_reserva, 
        servicio_reserva, 
        barbero_reserva, 
        estado_reserva,
        completado} = req.body;

    const newReserva = { 
        dia_reserva, 
        mes_reserva, 
        anio_reserva, 
        usuario_reserva, 
        servicio_reserva, 
        barbero_reserva, 
        estado_reserva,
        completado };
    await Agenda.findOneAndUpdate({ _id: req.params._id}, newReserva);
    res.json({status: "actualizado"});

});

// DELETE para eliminar reserva
router.delete("/:_id", async (req,res) => {
    
    await Agenda.findOneAndDelete({ _id: req.params._id});
    res.json({status: "eliminado"});

});

module.exports = router;