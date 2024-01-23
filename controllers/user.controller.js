import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import { Purchase } from '../models/purchase.model.js'
import jwt from 'jsonwebtoken'
import { data } from '../config.js'

export const register = async (req, res) => {
    const { name, last_name, email, password, cellphone } = req.body
    try {
        if (!password || password.length < 8 || password.length > 20) {
            return res.status(400).json({
                error: 'La contraseña debe tener entre 8 y 20 caracteres!'
            })
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: 'La contraseña debe contener al menos una letra y un número'
            })
        }

        const pwdHash = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            last_name,
            email,
            password: pwdHash,
            cellphone
        })
        res.status(200).json(newUser)
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let errors = []
            errors = error.errors.map(err => ({
                message: err.message
            }))

            return res.status(400).json({ error: 'Error de validación', errors })
        } 
        res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        if(!user) return res.status(404).json({message: 'Usuario no encontrado.'})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) res.status(400).json({message: 'Contraseña Incorrecta'})

        const token = await createAccessToken(user)
        res.setHeader('Authorization', token)
        res.status(200).json({
            user,
            message: 'Login successfully',
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export const getProfile = async (req, res) => {
    const { id } = req.user
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password']}
        })
        if (!user) return res.status(400).json({ message: 'User not found' })
        
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getMyPurchases = async (req, res) => {
    const { id } = req.user
    try {      
        const purchases = await Purchase.findAll({ where: { user_id: id } })
        res.json(purchases)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const verifyToken = async (req, res) => {
    const token = req.headers.authorization
    if (!token) {
        console.log('Alert 1')
        return res.status(401).json({ message: 'Unauthorized ' })
    }
    
    jwt.verify(token, data.jwtToken, async (err, user) => {
        if (err) {
            console.log('Alert 3: ', err)
            return res.status(401).json({ message: 'Unauthorized' })
        }
        
        const userFound = await User.findOne({where: {id: user.id}})
        if (!userFound) return res.status(404).json({ message: 'No found' })
        
        return res.json({
            id: userFound.id,
            name: userFound.name,
            last_name: userFound.last_name,
            email: userFound.email,
            token
        })
    })
}