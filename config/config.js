// 1. Código de la conexión a la base de datos (config.js)

const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try{
        consolelog(process.env.MONDO_URI);
        await mongoose.connect(process.env.MONDO_URI);
        console.log('Base de datos conectada con exito');
    } catch (error) {
        console.log.error(error);
        throw new Error ('Error al inicializar la base de datos');
    };
};

module.exports = {
    dbConnection,
};



/*
const mongoose = require("mongoose")
require('dotenv').config()

const dbConnection = async () => {
  try {
    console.log("Ya se ha conectado la BBDD")
    await mongoose.connect(process.env.MONGO_URI)

  } catch (err) {
    console.error("No se ha podido conectar a la BBDD: ", err)
  }
}

module.exports = dbConnection
*/
