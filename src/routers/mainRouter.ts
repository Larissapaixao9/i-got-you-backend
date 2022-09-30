import express from 'express'
import  authRouter  from '../routers/auth_routers'

const router = express.Router()

router.use(authRouter)


export default router

