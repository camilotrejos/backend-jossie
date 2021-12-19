const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { mongoose }  = require("./database");
const cors = require('cors');
const app = express();

// CORS
app.use(cors());

// Settings
app.set("port", process.env.PORT || 8080)

// Middlewares
app.use(morgan("dev"));
app.use(express.json());


// Routes
app.use("/api/servicios", require("./routes/servicios.routes"))
app.use("/api/barberos", require("./routes/barberos.routes"))
app.use("/api/users", require("./routes/usuarios.routes"))
app.use("/api/agenda", require("./routes/agenda.routes"))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Server
app.listen(app.get("port"), () => {

    console.log(`Server on port ${app.get("port")}`);

});
