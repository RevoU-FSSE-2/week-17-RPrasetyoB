import express from 'express'
import { Request, Response } from 'express'
import userRoutes from './user.route'
import taskRoutes from './task.route'
import domainList from '../middlewares/cors'
import cors from 'cors'

const routes = express.Router()

routes.get('/', (req: Request, res : Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to RPB rest API'
    })
})


routes.use('/v1', cors(domainList.clientGlobal), userRoutes)
routes.use('/v1', cors(domainList.clientGlobal), taskRoutes)
export default routes;