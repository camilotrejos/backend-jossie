const express = require("express");
const router = express.Router();
const Usuarios = require("../models/usuarios");
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {userguar} = require('../guardian/guar');

router.post("/login", async function (req, res) {
    try {
        const { nombre, apellido, email, rol, password } = req.body;
        console.log(nombre);
        console.log(password);
        const user = await Usuarios.findOne({ nombre })
        console.log(user);
        const prueba = user.password;
        console.log(prueba);
        if (!user) {
            return res.status(401).send({
                estado: "error",
                msg: "credenciales inválidas"
            });
        }
        const passok = await compare(password, user.password);
        console.log(passok);
        if (passok) {
            const token = sign({
                nombre:user.nombre
            },"misecreto")
            return res.status(200).send({
                estado: "ok",
                msg: "Logueado",
                token
            })
        } else {
            return res.status(401).send({
                estado: "error",
                msg: "credenciales pass inválidas"
            })
        }
    } catch (error) {
        console.log(error);

    }
})

router.post("/guardar", async (req,res) => {
    const {nombre, apellido, email, rol, password} = req.body;
    const user = new Usuarios({nombre, apellido, email, rol, password});
    console.log(user);
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

router.get("/", async (req,res) => {

    const barb = await Usuarios.find();
    res.json(barb);

});

module.exports = router;