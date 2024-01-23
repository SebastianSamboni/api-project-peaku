import { Router } from 'express'
import { authRequired } from '../middlewares/checkToken.js'
import {
    getMyPurchases,
    getProfile,
    login,
    register,
    verifyToken
} from '../controllers/user.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/get-info', authRequired, getProfile)
router.get('/purchases', authRequired, getMyPurchases)
router.get('/verify', verifyToken)

export default router