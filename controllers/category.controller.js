import { Category } from '../models/category.model.js'
import { Product } from '../models/product.model.js'
import { SubCategory } from '../models/subcategory.model.js'
import path from 'path'
import fs from 'fs/promises'

const __dirname = path.resolve()

export const createCategory = async () => {
    try {
        const filePath = path.join(__dirname, './data/categories.csv')
        const csvData = await fs.readFile(filePath, 'utf-8')
        const lines = csvData.split('\n')

        lines.shift()
    
        for (const line of lines) {
            const name = line.trim()
            await Category.create({name})
        }

        console.log('Categorias creadas!')
    } catch (error) {
        console.error('Error al crear categorias: ', error)
    }
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
            where: { category_id: id },
            include: [{model: Product}]
        })

        const products = subcategories.map(subCategory => subCategory.products)
        res.status(200).json({products})
    } catch (error) {
        res.status(500).send('Error en el servidor')
    }
}