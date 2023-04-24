import { QueryTypes } from 'sequelize';
import { ResponseService } from '../../../interfaces';
import db from '../../config';

export const updatePasswordUserFn = async (emailUser: string, passwordUser: string): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_update_password_user(?, ?)`,
            { type: QueryTypes.UPDATE, replacements: [emailUser, passwordUser] });
        return {
            ok:true,
            result:resp
        };
    } catch (error) {
        return {
            ok:false,
            result:error
        };
    }
}