const { getAllTasks, createTask, getTask, updateTask, deleteTask, putTask } = require('../controllers/tasks');
const express = require('express');
const router = express.Router();

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask).put(putTask)

module.exports = router;
