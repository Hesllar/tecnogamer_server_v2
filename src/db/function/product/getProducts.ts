import { QueryTypes } from 'sequelize';
import { ResponseService } from '../../../interfaces';
import db from '../../config';

export const getProductsFn = async (): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_get_products()`, { type: QueryTypes.SELECT });
        return {
            ok:true,
            result:resp
        };
    } catch (error) {
        return{
            ok:false,
            result:error
        };
    }
}