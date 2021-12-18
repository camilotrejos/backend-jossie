const express = require("express");
const router = express.Router();
const Barberos = require("../models/barberos");

// GET todos los barberos
router.get("/", async (req,res) => {

    const barb = await Barberos.find();
    res.json(barb);

});

// GET de un solo Barbero por id_barbero
router.get("/:id_barbero", async (req,res) => {

    const barb = await Barberos.find({ id_barbero: req.params.id_barbero });
    res.json(barb);

});

// POST para añadir Barberos
router.post("/", async (req,res) => {

    const { id_barbero, nombres_barbero, apellidos_barbero, estado_barbero, id_servicio_barbero } = req.body;
    const barb = new Barberos({id_barbero, nombres_barbero, apellidos_barbero, estado_barbero, id_servicio_barbero});
    await barb.save();
    res.json({status: "guardado"});

});

// PUT para modificar Barberos
router.put("/:id_barbero", async (req,res) => {

    const { id_barbero, nombres_barbero, apellidos_barbero, estado_barbero, id_servicio_barbero } = req.body;
    const newBarb = { id_barbero, nombres_barbero, apellidos_barbero, estado_barbero, id_servicio_barbero };
    await Barberos.findOneAndUpdate({ id_barbero: req.params.id_barbero}, newBarb);
    res.json({status: "actualizado"});

});

// DELETE para eliminar Servicios
router.delete("/:id_barbero", async (req,res) => {
    
    await Barberos.findOneAndDelete({ id_barbero: req.params.id_barbero});
    res.json({status: "eliminado"});
});

module.exports = router;