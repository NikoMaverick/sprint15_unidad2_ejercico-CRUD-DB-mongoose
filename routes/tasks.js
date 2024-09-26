// - routes 
  // - tasks.js // Aquí estarán todas las rutas

const express = require ('express');
const router = express.Router();
const Task = require('./models/Task');


// Endpoint para crear una tarea.
router.post('/create', async (req, res) => {
  try {
    const tarea = await Task.create({...req.body, completed: false}); // create() para un nuevo objeto y vincularlo al prototipo de un objeto ya existente
    res.staus(201).json(tarea); // Si la tarea ha sido creada con exito, lanzamos un status 201(Creado).
  } catch (error) {
    res.status(500).json({ message: 'Error creating task'}); // status 500(Error interno del servidor)
  };
});


// Endpoint para traer todas las tareas.
router.get('/', async (req, res) => {
  try {
    const tarea = await Task.find();
    res.status(200).json(tarea);
  } catch (error) { 
    res.status(500).json({ message: 'Error creating task'});
  }
});

// Endpoint para buscar tarea por id.
router.get('/id/:_id'), async (req, res) => {
  try {
    const tarea = await Task.findByid(req.params._id)  // findByid() obtiene una entidad dado su identificador. Cuando no exista, devuelve un opcional vacío.
    res.status(200).json(tarea);
    if (!tarea) { // Si no obtiene la tarea, lanzamos error 404(No se ha encontrado)
      return res.status (404).send('The task was not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating task'});
  };
};


// Endpoint para marcar una tarea como completada.
router.put('markAsCompleted/:_id', async (req, res)  => {
  try {
    const tarea = await Task.findByidAndUpdate(req.params._id, {completed: true}, {new: true}) //findByIdAndUpdate() se utiliza para buscar un documento por su _id y actualizarlo con nuevos datos.
    res.status(200).json('Task successfully updated')
    if(!tarea) {
      return res.status(404).send({ messaje: 'Task not found'}) // Si no actualiza la tares, lanzamos error 404(No se ha encontrado)
    };
  } catch (error) {
    res.status(500).json({ message: 'Error creating task'});
  };
});


// Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. No cambiar “completed” solo, el título.
router.put('/id/:_id', async (req, res) => {
  try{
    const tarea = await Task.findByidAndUpdate(req.params._id, {title: req.body.title}, {new: true}); // Modificamos el titulo de la tarea actualizando el body
    res.status(200).json('Task successfully updated')
    if(!tarea) {
      return res.status(404).send({ messaje: 'Task not found'}) // Si no actualiza la tares, lanzamos error 404(No se ha encontrado)
    };
  } catch (error) {
    res.status(500).json({ message: 'Error creating task'});
  };
});

// Endpoint para eliminar una tarea.
router.delete('/id/:_id', async (req, res) => {
  try {
    const tarea = await Task.findByidAndDelete(req.params._id);
    res.status(200).json('Task has been successfully deleted');
    if(!tarea) {
      return res.status(404).send({ messaje: 'Task not found'}) // Si no actualiza la tares, lanzamos error 404(No se ha encontrado)
    };
  } catch (error) {
    res.status(500).json({ message: 'Error creating task'});
  };
});


module.exports = router;


/*

const express = require("express")
const router = express.Router()
const TaskController = require("../controllers/Task.controller")

router.post("/create", TaskController.create)
router.get("/", TaskController.getAll)
router.get("/id/:_id", TaskController.getById)
router.put("/markAsCompleted/:_id", TaskController.updateCompleted)
router.delete("/id/:_id", TaskController.deleteById)

module.exports = router
*/