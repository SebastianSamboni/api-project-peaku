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
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: "La cantidad de productos debe ser mayor o igual a cero!"
            }
        },
        defaultValue: 0
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    img_product: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})