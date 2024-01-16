import { Router } from 'express'
import { authRequired } from '../middlewares/checkToken.js'
import {
    deleteAccount,
    getMyPurchases,
    getProfile,
    login,
    logout,
    register,
    updateProfile,
    verifyToken
} from '../controllers/user.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/get-info', authRequired, getProfile)
router.get('/purchases', authRequired, getMyPurchases)
router.put('/update', authRequired, updateProfile)
router.delete('/delete', authRequired, deleteAccount)
router.get('/verify', verifyToken)

export default router