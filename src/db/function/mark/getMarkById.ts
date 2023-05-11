import { QueryTypes } from 'sequelize';
import db from '../../config';
import { ResponseService, getMarkById } from '../../../interfaces'

export const getMarkByIdFn = async ({ markId }:getMarkById): Promise<ResponseService> => {
    try {
        
        const resp = await db.query(`SELECT * FROM fn_get_mark_by_id(${markId})`, { type: QueryTypes.SELECT });

        return {
            ok:true,
            result:{
                responseGet:resp
            }
        };
    } catch (error) {
        return {
            ok:true,
            result:{
                responseGet:error
            }
        };
    }
}