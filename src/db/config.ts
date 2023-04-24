
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({ path: './src/.env' });

const database: string = process.env.DB_NAME || '';
const host: string = process.env.DB_HOST || '';
const userDb: string = process.env.DB_USERNAME || '';
const userPass: string = process.env.DB_PASSWORD || '';

const db = new Sequelize(database, userDb, userPass, {
    host,
    port: 5432,
    dialect: 'postgres'
});

export default db;