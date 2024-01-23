import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'
import subCategoriesRoutes from './routes/subcategory.routes.js'
import productsRoutes from './routes/product.routes.js'

const app = express()

app.use(cors({ origin: '*' }));
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/subcategories', subCategoriesRoutes)
app.use('/api/products', productsRoutes)

export default app