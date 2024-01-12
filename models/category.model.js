import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { SubCategory } from './subcategory.model.js'

export const Category = sequelize.define('categories', {
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

Category.hasMany(SubCategory, {
    foreignKey: 'category_id',
    sourceKey: 'id'
})

SubCategory.belongsTo(Category, {
    foreignKey: 'category_id',
    target: 'id'
})