import express from 'express'
import { getAllTask, createTask, updateTask, deleteTask } from '../controllers/taskController'
import checkToken from '../middlewares/authentication'
import roleAuthorization from '../middlewares/authorization'

const taskRoutes = express.Router()

taskRoutes.get('/tasks', checkToken, roleAuthorization(['manager','leader','member']), getAllTask)
taskRoutes.post('/tasks', checkToken, createTask)
taskRoutes.put('/tasks/:id', checkToken, updateTask)
taskRoutes.delete('/tasks/:id', checkToken, deleteTask)

export default taskRoutes