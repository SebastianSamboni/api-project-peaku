import { Router } from 'express'
import { authRequired } from '../middlewares/checkToken.js'
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    getSubcategories,
    updateCategory,
    getProducts
} from '../controllers/category.controller.js'

const router = Router()

router.post('/create', authRequired, createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.put('/update/:id', authRequired, updateCategory)
router.delete('/delete', authRequired, deleteCategory)
router.get('/:id/subcategories', getSubcategories)
router.get('/:id/products', getProducts)

export default router