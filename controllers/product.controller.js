import { Product } from '../models/product.model.js'

export const createProduct = async (req, res) => {
    const { name, price, stock, img_product, subcategory_id } = req.body
    try {
        const newProduct = await Product.create({
            name,
            price,
            stock,
            img_product,
            subcategory_id
        })
        res.sendStatus(200)
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
    const { code } = req.params
    try {
        const product = await Product.findByPk(code)
        res.json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductsByPrice = async (req, res) => {
    const { price } = req.body
    try {
        const products = await Product.findAll({ where: { price } })
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductsByState = async (req, res) => {
    const { is_available } = req.body
    try { 
        const products = await Product.findAll({ where: { is_available } })
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductsByParameter = async (req, res) => {
    
}

export const updateState = async (req, res) => {
    const { code } = req.params
    try {
        const product = await Product.findByPk(code)
        if (product.stock === 0) {
            product.update(false, {where: {is_available}})
        }
        else {
            product.update(true, {where: {is_available}})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProduct = async (req, res) => {
    const { role_id } = req.user
    const { code } = req.params
    const params = req.body
    try {
        if (role_id === 1) {
            const product = await Product.update(params, { where: { code } })
            res.json(product)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    const { code } = req.params
    const { role_id } = req.user
    try {
        if (role_id === 1) {
            await Product.destroy({ where: { code } })
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}