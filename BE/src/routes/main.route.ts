import express from 'express'
import { Request, Response } from 'express'
import userRoutes from './user.route'
import taskRoutes from './task.route'
import authRoute from './authRoute'

const routes = express.Router()

routes.get('/', (req: Request, res : Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to RPB rest API'
    })
})

routes.use('/v1', userRoutes)
routes.use('/v1', taskRoutes)
routes.use('/v1', authRoute)
export default routes;