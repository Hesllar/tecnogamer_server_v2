import { QueryTypes } from 'sequelize';
import db from '../../config';
import { ResponseService } from '../../../interfaces';

type loginData = {
    userid: number;
    email: string;
    typeuser: number;
    password: string;
}

export const loginFn = async (email: string): Promise<ResponseService> => {
    try {

        const [result] = await db.query<loginData>(`SELECT * FROM fn_login(?)`, { type: QueryTypes.SELECT, replacements: [email] });
        
        return {
            ok:true,
            result
        };
    } catch (error) {
        return {
            ok:false,
            result:error
        };
    }
}