import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import { Purchase } from '../models/purchase.model.js'

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
        res.cookie('token', token)
        res.status(200).json({
            user,
            message: 'Login successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export const logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    return res.sendStatus(200)
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

export const updateProfile = async (req, res) => {
    const { id } = req.user
    const params = req.body

    if (params.password) {
        const pwd = await bcrypt.hash(password, 10)
        params.password = pwd
    }

    try {
        const user = await User.update(params, {where: {id}})
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteAccount = async (req, res) => {
    const { id } = req.user

    try {
        await User.destroy({ where: { id } })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized ' })
    
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' })
        
        const userFound = await User.findByPk({where: user.id})
        if (!userFound) return res.status(404).json({ message: 'No found' })
        
        return res.json({
            id: userFound.id,
            name: userFound.name,
            last_name: userFound.last_name,
            email: userFound.email,
            cellphone: userFound.cellphone
        })
    })
}