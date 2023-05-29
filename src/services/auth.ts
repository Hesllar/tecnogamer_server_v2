import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { ResponseService, Login, RegisterUser } from '../interfaces';
import { lengthParams } from '../utils/lengthParams';


export const loginFn = async ({ email }:Login): Promise<ResponseService> => {
    try {

        const resp = await db.query('SELECT * FROM fn_login(?)', { type: QueryTypes.SELECT, 
            replacements: [email] });
        
        return {
            ok:true,
            result:resp.shift()
        };
    } catch (error) {
        return {
            ok:false,
            result:error
        };
    }
}

export const registerFn = async ( user : RegisterUser): Promise<ResponseService> => {
    try {

        const resp = await db.query(`SELECT * FROM fn_create_user(${lengthParams(Object.keys(user).length)})`, 
        { type: QueryTypes.INSERT, replacements: Object.values(user) });
        
        return {
            ok:true,
            result:resp.shift()
        };
    } catch (error) {
        return {
            ok:false,
            result:error
        };
    }
}