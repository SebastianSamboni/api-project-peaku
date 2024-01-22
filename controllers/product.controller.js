import { Op } from 'sequelize'
import { Product } from '../models/product.model.js'
import path from 'path'
import fs from 'fs/promises'

const __dirname = path.resolve()

export const createProduct = async (req, res) => {
    try {
        const filePath = path.join(__dirname, './data/products.csv')
        const csvData = await fs.readFile(filePath, 'utf-8')
        const lines = csvData.split('\n')
        lines.shift()

        for (const line of lines) {
            const [name, description, price, img_product, subcategory_id] = line.trim().split(',')
            await Product.create({name, description, price, img_product, subcategory_id})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProducts = async (req, res) => {
    try {
        const productList = await Product.findAll()
        res.json(productList)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductByCode = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByPk(id)
        res.json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductsByPrice = async (req, res) => {
    const { price } = req.params
    try {
        const products = await Product.findAll({ where: { price } })
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductsByParameter = async (req, res) => {
    const { search_parameter } = req.query
    console.log('Valor de search_parameter', search_parameter)
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search_parameter}%` } }
                ]
            }
        })
        if (!products || products.length === 0) return res.status(401).json({ message: `No se encuentran productos con la siguiente búsqueda: ${search_parameter}` })
        
        return res.status(200).json({products})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}