import express from 'express'
const userRoutes = express.Router()
import { getAllUsers, update, resetPassReq, resetPass } from '../controllers/userController'
import checkToken from '../middlewares/authentication'


userRoutes.get('/users', checkToken, getAllUsers)
userRoutes.put('/users', checkToken, update)
userRoutes.post('/reset-req', checkToken, resetPassReq)
userRoutes.post('/reset', checkToken, resetPass)

export default userRoutes