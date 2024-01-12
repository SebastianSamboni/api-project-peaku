import jwt from 'jsonwebtoken'
import { data } from '../config.js'

const passToken = data.jwtToken

export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    
    if (!token) return res.status(401).json({
        message: 'No token, authorization denied'
    })

    jwt.verify(token, passToken, (error, user) => {
        if (error) return res.status(403).json({ message: 'Invalid token' })
        req.user = user
    })

    next()
}