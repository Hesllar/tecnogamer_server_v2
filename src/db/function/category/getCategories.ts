import { QueryTypes } from 'sequelize';
import db from '../../config';

export const getCategoriesFn = async (): Promise<object[]> => {
    try {
        const resp = await db.query('SELECT * FROM fn_get_categories()', { type: QueryTypes.SELECT });
        return resp;
    } catch (error) {
        throw error;
    }
}