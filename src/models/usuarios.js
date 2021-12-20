const { genSalt, hash } = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuariosSchema = new Schema({

/*     id_usuario: {type: Number, required: true}, */
    nombres_usuario: {type: String, required: true},
    apellidos_usuario: {type: String, required: true},
    email_usuario: {type: String, required: true, unique: true},
    celular_usuario: {type: Number, required: true},
    password_usuario: {type: String, required: true},
    estado_usuario: {type: Boolean, required: true}, //Activo-Inactivo
    rol_usuario:{type: String, required: true}
});

//Aqui se cifra la contraseña
usuariosSchema.pre("save",async function(next){
    const salt = await genSalt(10); //10 numero de veces que se cifra
    console.log(salt);
    this.password_usuario = await hash(this.password_usuario, salt);
    next();
})

module.exports = mongoose.model("users", usuariosSchema );