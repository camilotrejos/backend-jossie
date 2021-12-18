const express = require("express");
const router = express.Router();
const Agenda = require("../models/agenda");
 
// GET de todos los registros de reservas
router.get("/", async (req,res) => {
 
    const agenda = await Agenda.find();
    res.json(agenda);
 
});

// GET de una sola reserva
router.get("/:id_reserva", async (req,res) => {

    const agenda = await Agenda.find({ id_reserva: req.params.id_reserva });
    res.json(agenda);

});

//Guardar reserva
router.post("/agendar", async (req,res) => {
    const {id_reserva, dia_reserva, mes_reserva, anio_reserva, usuario_reserva, servicio_reserva, barbero_reserva, estado_reserva} = req.body;
    const agenda = new Agenda({id_reserva, dia_reserva, mes_reserva, anio_reserva, usuario_reserva, servicio_reserva, barbero_reserva, estado_reserva});
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
router.put("/:id_reserva", async (req,res) => {

    const {id_reserva, dia_reserva, mes_reserva, anio_reserva, usuario_reserva, servicio_reserva, barbero_reserva, estado_reserva} = req.body;
    const newReserva = { id_reserva, dia_reserva, mes_reserva, anio_reserva, usuario_reserva, servicio_reserva, barbero_reserva, estado_reserva };
    await Agenda.findOneAndUpdate({ id_usuario: req.params.id_usuario}, newReserva);
    res.json({status: "actualizado"});

});

// DELETE para eliminar reserva
router.delete("/:id_reserva", async (req,res) => {
    
    await Agenda.findOneAndDelete({ id_reserva: req.params.id_reserva});
    res.json({status: "eliminado"});

});

module.exports = router;