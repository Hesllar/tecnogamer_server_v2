import { QueryTypes } from 'sequelize';
import db from '../../config';
import { lengthParams } from '../../../utils/lengthParams';
import { ResponseService, UserInterface } from '../../../interfaces';


export const createUserFn = async (userData: UserInterface): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_create_user(${lengthParams(Object.keys(userData).length)})`,
            { type: QueryTypes.SELECT, replacements: Object.values(userData) });
        return {
            ok:true,
            result:resp[0]
        };
    } catch (error) {
        return {
            ok:false,
            result:error
        };
    }
}