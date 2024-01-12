import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Product = sequelize.define('products', {
    code: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    img_product: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})