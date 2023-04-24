import { QueryTypes } from 'sequelize';
import db from '../../config';

export const getMarksFn = async (): Promise<object[]> => {
    try {
        const resp = await db.query('SELECT * FROM fn_get_marks()', { type: QueryTypes.SELECT });
        return resp;
    } catch (error) {
        throw error;
    }
}