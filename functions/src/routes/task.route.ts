import express from 'express'
import { getAllTask, createTask, updateTask, deleteTask, getOneTask } from '../controllers/taskController'
import checkToken from '../middlewares/authentication'
import cors from 'cors'
import domainList from '../middlewares/cors'
// import roleAuthorization from '../middlewares/authorization'

const taskRoutes = express.Router()

taskRoutes.options('/tasks', cors(domainList.clientGlobal))
taskRoutes.options('/tasks/:id', cors(domainList.clientGlobal))

taskRoutes.get('/tasks', cors(domainList.clientGlobal), getAllTask)
taskRoutes.get('/tasks', cors(domainList.clientGlobal), getOneTask)
taskRoutes.post('/tasks', cors(domainList.clientGlobal), createTask)
taskRoutes.put('/tasks/:id', cors(domainList.clientGlobal), updateTask)
taskRoutes.delete('/tasks/:id', cors(domainList.clientGlobal), deleteTask)

export default taskRoutes