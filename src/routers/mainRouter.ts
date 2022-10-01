import express from 'express'
import  auth_router  from '../routers/auth_routers'
import home_router from '../routers/home_router'

const router = express.Router()

router.use(auth_router)
router.use(home_router)


export default router

