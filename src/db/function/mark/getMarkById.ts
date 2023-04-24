import { QueryTypes } from 'sequelize';
import db from '../../config';

export const getMarkByIdFn = async (markId: number): Promise<object[]> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_get_mark_by_id(${markId})`, { type: QueryTypes.SELECT });
        return resp;
    } catch (error) {
        throw error;
    }
}