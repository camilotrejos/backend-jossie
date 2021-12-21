const express = require("express");
const router = express.Router();
const Servicios = require("../models/servicios");

// GET todos los servicios 
router.get("/", async (req,res) => {

    const serv = await Servicios.find();
    res.json(serv);

});

// GET de un solo servicio por id_servicio
router.get("/:_id", async (req,res) => {

    const serv = await Servicios.find( { _id: req.params._id } );
    res.json(serv);

});


// POST para añadir Servicios
router.post("/", async (req,res) => {

    const { 
       
        nombre_servicio, 
        url_imagen_servicio, 
        descripcion_servicio, 
        costo_servicio } = req.body;

    const serv = new Servicios({
    
        nombre_servicio, 
        url_imagen_servicio, 
        descripcion_servicio, 
        costo_servicio});

    await serv.save();
    res.json({status: "guardado"});

});


// PUT para modificar Servicios
router.put("/:_id", async (req,res) => {

    const {
        nombre_servicio, 
        url_imagen_servicio, 
        descripcion_servicio, 
        costo_servicio} = req.body;
        
    const newServ = {  
        nombre_servicio, 
        url_imagen_servicio, 
        descripcion_servicio, 
        costo_servicio };

    await Servicios.findOneAndUpdate( { _id: req.params._id }, newServ);
    res.json({status: "actualizado"});

});


// DELETE para eliminar Servicios
router.delete("/:_id", async (req,res) => {
    await Servicios.findOneAndRemove( { _id: req.params._id } );
    res.json({status: "eliminado"});
});


module.exports = router;
