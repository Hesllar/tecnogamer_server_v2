
import { Sequelize, Dialect } from 'sequelize'
import dotenv from 'dotenv'
import { configDB } from '../interfaces';
dotenv.config({ path: './src/.env' });

const config: configDB = {
    dataBase:process.env.DB_NAME,
    userDB:process.env.DB_USERNAME,
    userPass:process.env.DB_PASSWORD,
    opcionDB:{
        host:process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number ?? 54320,
        dialect: 'postgres'
    }
    }

const db = new Sequelize(...Object.values(config));

export default db;