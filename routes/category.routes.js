import { Router } from 'express'
import { authRequired } from '../middlewares/checkToken.js'
import {
    createCategory,
    getCategories,
    getCategoryById,
    getSubcategories,
    getProducts
} from '../controllers/category.controller.js'

const router = Router()

router.post('/create', createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.get('/:id/subcategories', getSubcategories)
router.get('/:id/products', getProducts)

export default router