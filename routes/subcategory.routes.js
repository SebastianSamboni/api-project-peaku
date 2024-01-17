import { Router } from 'express'
import {
    createSubcategory,
    getProducts,
    getSubcategories,
    getSubcategoryById
} from '../controllers/subcategory.controller.js'

const router = Router()

router.post('/create', createSubcategory)
router.get('/', getSubcategories)
router.get('/:id', getSubcategoryById)
router.get('/:id/products', getProducts)

export default router