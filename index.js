import app from './app.js'
import { sequelize } from './database/database.js'
import { data } from './config.js'
import { createCategory } from './controllers/category.controller.js'
import { createSubcategory } from './controllers/subcategory.controller.js'
import { createProduct } from './controllers/product.controller.js'

import './models/user.model.js'
import './models/purchase.model.js'
import './models/purchaseCar.model.js'
import './models/product.model.js'
import './models/subcategory.model.js'
import './models/category.model.js'
    
const port = data.port

const main = async () => {
    try {
        await sequelize.sync({ alter: true})
        app.listen(port)
        // createCategory()
        // createSubcategory()
        // createProduct()
        console.log(`Server is running on http://localhost:${port}`)
    } catch (error) {
        console.log(`Unable to connect to the database: ${error}`)
    }
}

main()