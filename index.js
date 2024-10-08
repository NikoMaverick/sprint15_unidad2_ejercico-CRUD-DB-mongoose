//- index.js - Añadiremos nuestro servidor, conexión a la base de datos y uniremos el resto de la aplicación

const express = require("express")
const router = require("./routes/tasks.js")
const {dbConnection} = require("./config/config.js")
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

dbConnection()

app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))



/*

const express = require("express")
const app = express()
const dbConnection = require("./config/config")
const router = require("./routes/tasks")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

dbConnection()

const PORT = 8080
app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))

*/