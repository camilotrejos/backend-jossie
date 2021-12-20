const express = require("express");
const router = express.Router();
const Barberos = require("../models/barberos");

// GET todos los barberos
router.get("/", async (req,res) => {

    const barb = await Barberos.find().populate('id_servicio_barbero');
    res.json(barb);

});

// GET de un solo Barbero por id_barbero
router.get("/:_id", async (req,res) => {

    const barb = await Barberos.find({ _id: req.params._id }).populate('id_servicio_barbero');
    res.json(barb);

});

// POST para añadir Barberos
router.post("/", async (req,res) => {

    const { 
        /* id_barbero, */ 
        nombres_barbero, 
        apellidos_barbero, 
        estado_barbero = true, 
        id_servicio_barbero } = req.body;

    const barb = new Barberos({
        /* id_barbero,  */
        nombres_barbero, 
        apellidos_barbero, 
        estado_barbero, 
        id_servicio_barbero});

    await barb.save();
    res.json({status: "guardado"});

});

// PUT para modificar Barberos
router.put("/:_id", async (req,res) => {

    const {
        nombres_barbero, 
        apellidos_barbero, 
        estado_barbero, 
        id_servicio_barbero } = req.body;

    const newBarb = {
        nombres_barbero, 
        apellidos_barbero, 
        estado_barbero, 
        id_servicio_barbero };

    await Barberos.findOneAndUpdate({ _id: req.params._id}, newBarb);
    res.json({status: "actualizado"});

});

// DELETE para eliminar Servicios
router.delete("/:_id", async (req,res) => {
    
    await Barberos.findOneAndDelete({ id_barbero: req.params.id_barbero});
    res.json({status: "eliminado"});
});

module.exports = router;