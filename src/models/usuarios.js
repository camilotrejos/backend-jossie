const { genSalt, hash } = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuariosSchema = new Schema({

    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    rol: {type: String, required: true},
    password: {type: String, required: true}
    
});

//Aqui se cifra la contraseña
usuariosSchema.pre("save",async function(next){
    const salt = await genSalt(10); //10 numero de veces que se cifra
    console.log(salt);
    this.password = await hash(this.password, salt);
    next();
})

module.exports = mongoose.model("users", usuariosSchema );