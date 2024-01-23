import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Product } from './product.model.js'

export const SubCategory = sequelize.define('subcategories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

SubCategory.hasMany(Product, {
    foreignKey: 'subcategory_id',
    sourceKey: 'id'
})

Product.belongsTo(SubCategory, {
    foreignKey: 'subcategory_id',
    target: 'id'
})