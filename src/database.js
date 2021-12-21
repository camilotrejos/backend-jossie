const mongoose = require("mongoose");
const URI = "mongodb+srv://jossibarbershop:Jossi123@cluster0.3d0va.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(db => console.log("DB is connected"))
    .catch(err => console.error(err));

module.exports = mongoose;
