import { Router } from 'express'
import { authRequired } from '../middlewares/checkToken.js'
import { createProduct, getProducts, getProductByCode, getProductsByPrice, getProductsByState, updateState, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const router = Router()

router.post('/create', authRequired, createProduct)
router.get('/', getProducts)
router.get('/:code', getProductByCode)
router.get('/price', getProductsByPrice)
router.get('/state', getProductsByState)
router.put('/state/:code', updateState)
router.put('/update/:code', authRequired, updateProduct)
router.delete('/delete/:code', authRequired, deleteProduct)

export default router