import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { PurchaseCar } from './purchaseCar.model.js'

export const Purchase = sequelize.define('purchases', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [7],
                msg: `Los códigos no pueden tener más de 7 dígitos incluyendo el '-'!`
            }
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                args: true,
                msg: 'La fecha no es válida!'
            }
        }
    },
    total: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: 'El valor no puede ser menor a 0!'
            },
            max: {
                args: [99999999],
                msg: 'No puedes ingresar ese valor!'
            }
        }
    }
}, {
    timestamps: false
})

Purchase.hasOne(PurchaseCar, {
    foreignKey: 'purchase_id',
    sourceKey: 'id'
})
PurchaseCar.belongsTo(Purchase, {
    foreignKey: 'purchase_id',
    target: 'id'
})