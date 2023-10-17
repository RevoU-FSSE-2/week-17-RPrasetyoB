import express from 'express'
import { accessTokenRefresh, login, logoutUser, regUser } from '../controllers/userController'

const authRoute = express.Router()


authRoute.post('/auth/register', regUser)
authRoute.post('/auth/login', login)
authRoute.post('/logout', logoutUser)
authRoute.post('/refresh-token', accessTokenRefresh)

export default authRoute