import { SubCategory } from '../models/subcategory.model.js'
import { Product } from '../models/product.model.js'

export const createSubcategory = async (req, res) => {
    const one = SubCategory.create(
        {
            name: 'Alimentos',
            category_id: 1
        }
    )
    const two = SubCategory.create(
        {
            name: 'Snacks',
            category_id: 1
        }
    )
    const three = SubCategory.create(
        {
            name: 'Accesorios',
            category_id: 1
        }
    )
    const four = SubCategory.create(
        {
            name: 'Alimentos',
            category_id: 2
        }
    )
    const five = SubCategory.create(
        {
            name: 'Arenas',
            category_id: 2
        }
    )
    const six = SubCategory.create(
        {
            name: 'Accesorios',
            category_id: 2
        }
    )
    const seven = SubCategory.create(
        {
            name: 'Alimentos',
            category_id: 3
        }
    )
    const eight = SubCategory.create(
        {
            name: 'Accesorios peceras',
            category_id: 3
        }
    )
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