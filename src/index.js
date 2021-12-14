const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { mongoose }  = require("./database");

const app = express();



// Settings
app.set("port", process.env.PORT || 3000)

// Middlewares
app.use(morgan("dev"));
app.use(express.json());


// Routes
app.use("/api/servicios", require("./routes/servicios.routes"))
app.use("/api/barberos", require("./routes/barberos.routes"))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Server
app.listen(app.get("port"), () => {

    console.log(`Server on port ${app.get("port")}`);

});
