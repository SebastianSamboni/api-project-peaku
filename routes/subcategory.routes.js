import { Router } from 'express'
import { authRequired } from '../middlewares/checkToken.js'
import { createSubcategory, deleteSubcategory, getProducts, getSubcategories, getSubcategoryById, updateSubcategory } from '../controllers/subcategory.controller.js'

const router = Router()

router.post('/create', authRequired, createSubcategory)
router.get('/', getSubcategories)
router.get('/:id', getSubcategoryById)
router.put('/update/:id', authRequired, updateSubcategory)
router.delete('/delete/:id', authRequired, deleteSubcategory)
router.get('/:id/products', getProducts)

export default router