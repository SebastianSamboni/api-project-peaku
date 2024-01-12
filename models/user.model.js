import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Purchase } from './purchase.model.js'

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isAlpha: {
                args: true,
                msg: 'El nombre solo puede contener letras.'
            },
            notEmpty: {
                args: true,
                msg: 'Este campo es obligatorio.'
            }
        }
    },
    last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isAlpha: {
                args: true,
                msg: 'El apellido solo puede contener letras.'
            },
            notEmpty: {
                args: true,
                msg: 'Este campo es obligatorio.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Favor ingresa un email válido.'
            },
            notEmpty: {
                args: true,
                msg: 'Este campo es obligatorio.'
            },
            isUnique: async (email) => {
                const emailExists = await User.findOne({
                    where: {email}
                })
                if (emailExists) {
                    throw new Error('El correo ya está en uso.')
                }
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Este campo es obligatorio.'
            }
        }
    },
    cellphone: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
            isNumeric: {
                msg: 'Solo se permiten números.'
            },
            len: {
                args: [10, 10],
                msg: 'El número que ingresaste no es válido.'
            }
        }
    }
}, {
    timestamps: false
})

User.hasMany(Purchase, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})

Purchase.belongsTo(User, {
    foreignKey: 'user_id',
    target: 'id'
})