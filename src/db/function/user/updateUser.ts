import { QueryTypes } from 'sequelize';
import { ResponseService, updateUser } from '../../../interfaces';
import { lengthParams } from '../../../utils/lengthParams';
import db from '../../config';

export const updateUserFn = async (userData: updateUser): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_update_user(${lengthParams(Object.keys(userData).length)})`,
            { type: QueryTypes.UPDATE, replacements: Object.values(userData) });
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