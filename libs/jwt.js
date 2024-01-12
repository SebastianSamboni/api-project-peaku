import jwt from 'jsonwebtoken'
import moment from 'moment'
import { data } from '../config.js'

const pwdToken = data.jwtToken

export const createAccessToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email
    }

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            pwdToken,
            {
                expiresIn: '1d' 
            },
            (error, token) => { 
                if (error) reject(error)
                resolve(token)
            }
        )  
    })
}