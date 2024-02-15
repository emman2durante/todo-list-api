const express = require('express')
const routes = require('./routes');
const app = express()
const port = 3000

// Use JSON
app.use(express.json())

// Setup routes
app.use('/', routes);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send();
});

// Handle 500 errors
app.use((err, req, res, next) => {
    res.status(err.status || 500).send();
});

app.listen(port, () => {
    console.log(`Todo app listening on port ${port}`)
})