import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import nodemailer from 'nodemailer'

import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'
import subCategoriesRoutes from './routes/subcategory.routes.js'
import productsRoutes from './routes/product.routes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testing.react18@gmail.com',
        pass: 'vkyj bxpe ooeg xlwm'
    }
})

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/subcategories', subCategoriesRoutes)
app.use('/api/products', productsRoutes)
app.post('/api/email', (req, res) => {
    const { email } = req.body
    console.log('Body request: ', req.body)

    const mailOptions = {
        from: 'testing.react18@gmail.com',
        to: email,
        subject: 'Solicitud de suscripción',
        text: '¡Hola! Has solicitado suscribirte.'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json(`'El error está aqui: ${error}`)
        }
        console.log(info)
        res.status(200).json(`Correo enviado: ${info.response}`)
    })
})

export default app