import { config } from 'dotenv'

config()

export const data = {
    port: process.env.SERVER_PORT,
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    },
    jwtToken: process.env.TOKEN_SECRET
}