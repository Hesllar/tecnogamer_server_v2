import { QueryTypes } from 'sequelize';
import db from '../../config';
import { ResponseService, Mark } from '../../../interfaces'

export const getMarksFn = async (): Promise<ResponseService> => {
    try {
        const resp = await db.query('SELECT * FROM fn_get_marks()', { type: QueryTypes.SELECT });
        return {
            ok:true,
            result:{
                responseGet:resp
            }
        };
    } catch (error) {
        return {
            ok:false,
            result:{
                responseError:error
            }
        }
    }
}