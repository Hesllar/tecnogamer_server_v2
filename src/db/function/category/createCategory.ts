import { QueryTypes } from 'sequelize';
import db from '../../config';

export const createCategoryFn = async (nameCategory: string): Promise<object[]> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_create_category(?)`,
            { type: QueryTypes.SELECT, replacements: [nameCategory] });
        return resp;
    } catch (error) {
        throw error;
    }
}