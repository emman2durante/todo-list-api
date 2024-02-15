const { Router } = require('express');
const register = require('./apis/register');
const login = require('./apis/login');
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    reOrderTasks
} = require('./apis/tasks');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks', reOrderTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
