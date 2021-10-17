/* 
===== TODO =====

Custom error handling
- Wrap all controllers in a wrapper
- Create a custom error handling middleware
- Create a custom error class which extends express error class

**/

const express = require("express")
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')

// middleware
app.use(express.static('./public'))
app.use(express.json())


// routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()

// app.get('/api/v1/tasks')                 - get all the tasks
// app.post('/api/v1/tasks')                - create a new task
// app.get('/api/v1/tasks/:id')             - get a single task
// app.patch('/api/v1/tasks/:id')            - update task
// app.delete('/api/v1/tasks/:id')           - delete task