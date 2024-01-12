import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Product } from './product.model.js'
import { SubCategory } from './subcategory.model.js'

export const PurchaseCar = sequelize.define('cars', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
        defaultValue: []
    },
    total: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: false
})