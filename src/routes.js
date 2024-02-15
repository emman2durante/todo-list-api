const { Router } = require('express');
const register = require('./register');
const login = require('./login');
const { getAllTasks, createTask, updateTask, deleteTask, reOrderTasks } = require('./tasks');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks', reOrderTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
