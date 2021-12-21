const express = require("express");
const router = express.Router();
const Usuarios = require("../models/usuarios");
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { genSalt, hash } = require("bcrypt");
 
// GET de todos los usuarios
router.get("/", async (req,res) => {
 
    const usuario = await Usuarios.find();
    res.json(usuario);
 
});

// GET de un solo usuario por id_barbero
router.get("/:_id", async (req,res) => {

    const usuario = await Usuarios.find({ _id: req.params._id });
    res.json(usuario);

});

//Guardar usuario
router.post("/guardar", async (req,res) => {
    const {

        nombres_usuario, 
        apellidos_usuario, 
        email_usuario, 
        celular_usuario, 
        password_usuario, 
        estado_usuario = true,
        rol_usuario = 'user'} = req.body;

    const user = new Usuarios({
        
        nombres_usuario, 
        apellidos_usuario, 
        email_usuario, 
        celular_usuario, 
        password_usuario, 
        estado_usuario,
        rol_usuario});


    user.save(function (error) {
        if (error) {
            return res.status(401).send({
                estado: "error",
                msg: "usuario no guardado"
            })
        }
        return res.status(200).send({
            estado: "ok",
            msg: "usuario guardado"
        })
})
});

router.put("/:_id", async (req,res) => {

    const { 
        nombres_usuario, 
        apellidos_usuario, 
        email_usuario, 
        celular_usuario, 
        estado_usuario,
        rol_usuario} = req.body;


    const newUser = { 
        nombres_usuario, 
        apellidos_usuario, 
        email_usuario, 
        celular_usuario, 
        estado_usuario,
        rol_usuario };

    await Usuarios.findOneAndUpdate({ _id: req.params._id}, newUser);
    res.json({status: "actualizado"});

});

// DELETE para eliminar usuarios
router.delete("/:_id", async (req,res) => {
    
    await Usuarios.findOneAndDelete({ _id: req.params._id});
    res.json({status: "eliminado"});

});

//Loguin
router.post("/login", async function (req, res) {
    try {
        const { 
            email_usuario, 
            password_usuario } = req.body;

        const user = await Usuarios.findOne({ email_usuario })
        console.log(user);
       
        //Si no encuentra el email
        if (!user) {
            return res.status(401).send({
                estado: "error",
                msg: "Email no encontrado"
            });
        }
        const passok = await compare(password_usuario, user.password_usuario);
        console.log(passok);
        if (passok) {
            const token = sign({
                _id: user._id,
                email:user.email_usuario,
                rol: user.rol_usuario}, 
                "misecreto")

            return res.status(200).send({
                estado: "ok",
                msg: "Logueado Contraseña Correcta",
                token
            })
        } else {
            return res.status(401).send({
                estado: "error",
                msg: "Contraseña Incorrecta"
            })
        }
    } catch (error) {
        console.log(error);
 
    }
})

module.exports = router;