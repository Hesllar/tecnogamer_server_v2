import { QueryTypes } from 'sequelize';
import db from '../../config';
import { ResponseService, postMark } from '../../../interfaces'

export const createMarkFn = async ({ nameMark }: postMark): Promise<ResponseService> => {
    
    try {
        const resp = await db.query(`SELECT * FROM fn_create_mark(?)`,
            { type: QueryTypes.SELECT, replacements: [nameMark] });
        return {
            ok:true,
            result:{
                responsePost:resp.shift()
            }
        };
    } catch (error) {
        return {
            ok:false,
            result:{
                responseError:error
            }
        };
    }
}