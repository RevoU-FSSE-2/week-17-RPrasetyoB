import express from 'express'
import { getAllUsers, update, resetPassReq, resetPass } from '../controllers/userController'
import checkToken from '../middlewares/authentication'
import domainList from '../middlewares/cors'
import cors from 'cors'

const userRoutes = express.Router()

userRoutes.options('/users', cors(domainList.clientGlobal))
userRoutes.options('/reset-req', cors(domainList.clientGlobal))
userRoutes.options('/reset', cors(domainList.clientGlobal))

userRoutes.get('/users', cors(domainList.clientGlobal), getAllUsers)
userRoutes.put('/users', cors(domainList.clientGlobal), update)
userRoutes.post('/reset-req', cors(domainList.clientGlobal), resetPassReq)
userRoutes.post('/reset', cors(domainList.clientGlobal), resetPass)

export default userRoutes