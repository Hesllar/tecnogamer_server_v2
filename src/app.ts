import dotenv from 'dotenv'
import Server from './models/server';
dotenv.config({ path: './src/.env' });

const server: Server = new Server();

server.listen();

