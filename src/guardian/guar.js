const { verify } = require("jsonwebtoken");

const userguar = (req, res, next) => {
    const authorization = req.headers.authorization; //capturar cabecera del token
    if (!authorization) {
        next(JSON.stringify({
            estado: "error",
            msg: "No autorizado"
        }))
    }
    try {
        const token = authorization.split(" ")[1] //En la posición 1 está la información del usuario
        const payload = verify(token, "misecreto"); //Se verifica si la contraseña es igual al token
        if (payload.rol != admin) {
            next(JSON.stringify({
                estado: "error",
                msg: "No autorizado"
            }))
        }

    } catch (e) {
        console.log(e);
    }
}

exports.userguar=userguar;