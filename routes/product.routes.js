import { Router } from 'express'
import {
    createProduct,
    getProducts,
    getProductByCode,
    getProductsByPrice,
    getProductsByParameter
} from '../controllers/product.controller.js'

const router = Router()

router.post('/create', createProduct)
router.get('/get', getProducts)
router.get('/code/:id', getProductByCode)
router.get('/price/:price', getProductsByPrice)
router.get('/get-search', getProductsByParameter)

export default router