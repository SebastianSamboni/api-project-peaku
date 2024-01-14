import { Category } from '../models/category.model.js'
import { Product } from '../models/product.model.js'
import { SubCategory } from '../models/subcategory.model.js'

export const createCategory = async () => {
    const categoriesCreated = Category.findOne({ where: { name: 'Caninos' } })
    if (categoriesCreated) console.log('Categories already created')
    const categoryOne = Category.create({ name: 'Caninos' })
    const categoryTwo = Category.create({ name: 'Felinos' })
    const categoryThree = Category.create({ name: 'Peces' })
    
    console.log(categoryOne, categoryTwo, categoryThree)
}

export const getCategories = async (req, res) => {
    try {
        const categoriesList = await Category.findAll()
        res.json(categoriesList)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findByPk(id)
        res.json(category)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const { role_id } = req.user
    try {
        if (role_id === 1) {
            const category = await Category.update(name, { where: { id } })
            res.json(category)
        }
        else {
            res.status(400).json('The category does not exist')
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params
    const { role_id } = req.user
    try {
        if (role_id === 1) {
            await Category.destroy({ where: { id } })
            res.sendStatus(204)
        }
        else {
            res.status(400).json('The category does not exist')
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getSubcategories = async (req, res) => {
    const { id } = req.params
    try {
        const subcategories = await SubCategory.findAll(
            {where: { category_id: id}}
        )
        res.json(subcategories)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProducts = async (req, res) => {
    const { id } = req.params

    try {
        const subcategories = await SubCategory.findAll({
            where: { id },
            include: [{model: Product}]
        })

        const products = subcategories.flatMap(subCategory => subCategory.Product)
        res.json(products)
    } catch (error) {
        res.status(500).send('Error en el servidor')
    }
}