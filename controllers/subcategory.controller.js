import { SubCategory } from '../models/subcategory.model.js'
import { Product } from '../models/product.model.js'
import path from 'path'
import fs from 'fs/promises'

const __dirname = path.resolve()

export const createSubcategory = async (req, res) => {
    try {
        const filePath = path.join(__dirname, './data/subcategories.csv')
        const csvData = await fs.readFile(filePath, 'utf-8')
        const lines = csvData.split('\n')
        lines.shift()

        for (const line of lines) {
            const [name, category_id] = line.trim().split(',')
            await SubCategory.create({ name, category_id })
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