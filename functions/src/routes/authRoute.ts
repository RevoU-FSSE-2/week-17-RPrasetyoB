import express from 'express'
import { accessTokenRefresh, login, logoutUser, regUser } from '../controllers/userController'
import cors from 'cors'
import domainList from '../middlewares/cors'

const authRoute = express.Router()

authRoute.options('/v1/auth/register', cors(domainList.clientGlobal))
authRoute.options('/v1/auth/login', cors(domainList.clientGlobal))
authRoute.options('/v1/logout', cors(domainList.clientGlobal))

authRoute.post('/v1/auth/register', cors(domainList.clientGlobal), regUser)
authRoute.post('/v1/auth/login', cors(domainList.clientGlobal), login)
authRoute.post('/v1/logout', cors(domainList.clientGlobal), logoutUser)

export default authRoute