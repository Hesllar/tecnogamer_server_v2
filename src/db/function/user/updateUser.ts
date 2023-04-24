import { QueryTypes } from 'sequelize';
import { ResponseService, UserInterface } from '../../../interfaces';
import { lengthParams } from '../../../utils/lengthParams';
import db from '../../config';

export const updateUserFn = async (userData: UserInterface): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_update_user(${lengthParams(Object.keys(userData).length)})`,
            { type: QueryTypes.SELECT, replacements: Object.values(userData) });
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