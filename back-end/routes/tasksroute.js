
const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/taskscontroller')
const verifyToken = require('../middleware/verifyToken')

router.use(verifyToken)

// get all tasks
router.route('/')
            .get(tasksController.getTasks)

router.route('/')
            .post(tasksController.addTask)

router.route('/:id')
            .put(tasksController.editTask)

router.route('/:id')
            .delete(tasksController.deleteTask) 




module.exports = router;