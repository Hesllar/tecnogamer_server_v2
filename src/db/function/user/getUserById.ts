import { QueryTypes } from 'sequelize';
import { ResponseService } from '../../../interfaces';
import db from '../../config';

export const getUserByIdFn = async (user_id: number): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_get_user_by_id(${user_id})`, { type: QueryTypes.SELECT });
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