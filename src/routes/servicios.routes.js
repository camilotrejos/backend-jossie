const express = require("express");
const router = express.Router();
const Servicios = require("../models/servicios");

// GET todos los servicios 
router.get("/", async (req,res) => {

    const serv = await Servicios.find();
    res.json(serv);

});

// GET de un solo servicio por id_servicio
router.get("/:id_servicio", async (req,res) => {

    const serv = await Servicios.find( { id_servicio: req.params.id_servicio } );
    res.json(serv);

});


// POST para añadir Servicios
router.post("/", async (req,res) => {

    const { id_servicio, nombre_servicio, url_imagen_servicio, descripcion_servicio, costo_servicio } = req.body;
    const serv = new Servicios({id_servicio, nombre_servicio, url_imagen_servicio, descripcion_servicio, costo_servicio});
    await serv.save();
    res.json({status: "guardado"});

});


// PUT para modificar Servicios
router.put("/:id_servicio", async (req,res) => {

    const {id_servicio, nombre_servicio, url_imagen_servicio, descripcion_servicio, costo_servicio} = req.body;
    const newServ = { id_servicio, nombre_servicio, url_imagen_servicio, descripcion_servicio, costo_servicio };
    await Servicios.findOneAndUpdate( { id_servicio: req.params.id_servicio }, newServ);
    res.json({status: "actualizado"});

});


// DELETE para eliminar Servicios
router.delete("/:id_servicio", async (req,res) => {
    await Servicios.findOneAndRemove( { id_servicio: req.params.id_servicio } );
    res.json({status: "eliminado"});
});


module.exports = router;
