import { SubCategory } from '../models/subcategory.model.js'
import { Product } from '../models/product.model.js'

export const createSubcategory = async (req, res) => {
    const { role_id } = req.user
    const { name, category_id } = req.body
    try {
        if (role_id === 1) {
            const newSubcategory = await SubCategory.create({
                name,
                category_id
            })
            res.sendStatus(200)
        }
        else {
            return res.status(400).json(`You don't have the permissions to do this!`)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getSubcategories = async (req, res) => {
    try {
        const subcategoriesList = await SubCategory.findAll()
        res.json(subcategoriesList)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getSubcategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const subcategory = await SubCategory.findByPk(id)
        res.json(subcategory)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateSubcategory = async (req, res) => {
    const { role_id } = req.user
    const { id } = req.params
    const params = req.body
    try {
        if (role_id === 1) {
            const subcategory = await SubCategory.update(params, { where: { id } })
            res.json(subcategory)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteSubcategory = async (req, res) => {
    const { id } = req.params
    const { role_id } = req.user
    try {
        if (role_id === 1) {
            await SubCategory.destroy({ where: { id } })
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProducts = async (req, res) => {
    const { id } = req.params
    try {
        const subcategories = await Product.findAll(
            {where: { subcategory_id: id}}
        )
        res.json(subcategories)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}