const { authCheck } = require("../helpers/auth");
const { v4: uuidv4 } = require('uuid');

const DB = require("../helpers/mockDb")

const getAllTasks = (req, res) => {
    const auth = authCheck(req.get('accessToken'));
    if (auth) {
        const tasks = DB.tasks.filter(({ username }) => username === auth.username)
        res.status(200).json({
            tasks,
        })
    } else {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}

const createTask = (req, res) => {
    const auth = authCheck(req.get('accessToken'));
    if (auth) {
        const userTasks = DB.tasks.filter((task) => task.username === auth.username)
        const order = userTasks.sort((a, b) => b.order - a.order)[0].order + 1
        const taskId = uuidv4();

        DB.tasks.push({
            id: taskId,
            username: auth.username,
            content: req.body.content,
            order,
        });
        DB.tasks.push(({ username }) => username === auth.username)
        res.status(200).json({
            message: `Successfully created task with task id: ${taskId}`
        })
    } else {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}

const updateTask = (req, res) => {
    const auth = authCheck(req.get('accessToken'));
    if (auth) {
        const taskId = req.params.id;
        const { content } = req.body;
        const task = DB.tasks.find((t) => t.id === taskId && auth.username === t.username);
        if (task) {
            const index = DB.tasks.findIndex((t) => t.id === taskId && auth.username === t.username);
            DB.tasks[index].content = content;

            res.status(200).json({
                message: `Successfully updated task with task id: ${taskId}`
            });
        } else {
            res.status(404).json({
                message: `No task found with task id: ${taskId}`
            });
        }
    } else {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}

const deleteTask = (req, res) => {
    const auth = authCheck(req.get('accessToken'));
    if (auth) {
        const taskId = req.params.id;
        const task = DB.tasks.find((t) => t.id === taskId && auth.username === t.username);
        if (task) {
            const index = DB.tasks.findIndex((t) => t.id === taskId && auth.username === t.username);
            delete DB.tasks[index];

            res.status(200).json({
                message: `Successfully updated task with task id: ${taskId}`
            });
        } else {
            res.status(404).json({
                message: `No task found with task id: ${taskId}`
            });
        }
    } else {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}

const reOrderTasks = (req, res) => {
    const auth = authCheck(req.get('accessToken'));
    if (auth) {
        /**
         * Expects request body to be
         * [ { id: '1', order: 2}, { id: '2', order: 1} ]
         */
        const reorderedTasks = req.body.tasks;
        const tasks = DB.tasks.filter(({ username }) => username === auth.username).map(({ id, order }) => ({ id, order }));

        // Verify that task ids exists in the request data
        try {
            if (
                reorderedTasks.length === tasks.length &&
                tasks.every(({ id }) => reorderedTasks.find(r => r.id === id)) // refactor for efficiency
            ) {
                // update each task's order
                tasks.forEach((t, index) => {
                    DB.tasks[index].order = reorderedTasks.find(r => r.id === t.id).order
                })
                res.status(200).json({
                    message: 'Successfully reordered tasks.'
                })
            } else {
                res.status(400).json({
                    message: 'Unable to update the tasks due malformed request data'
                })
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    } else {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    reOrderTasks
}