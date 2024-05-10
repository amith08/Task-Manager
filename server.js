const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a specific task by ID
app.get('/tasks.json/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
    } else {
        res.json(task);
    }
});

// Create a new task
app.post('/tasks.json', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update an existing task
app.put('/tasks.json/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) {
        res.status(404).json({ error: 'Task not found' });
    } else {
        tasks[index] = updatedTask;
        res.json(updatedTask);
    }
});

// Delete a task
app.delete('/tasks.json/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(t => t.id !== taskId);
    res.sendStatus(204);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
