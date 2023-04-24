import { QueryTypes } from 'sequelize';
import db from '../../config';

export const getCategoryByIdFn = async (categoryId: number): Promise<object[]> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_get_category_by_id(${categoryId})`, { type: QueryTypes.SELECT });
        return resp;
    } catch (error) {
        throw error;
    }
}


