import { QueryTypes } from 'sequelize';
import db from '../../config';

export const updateCategoryFn = async (categoryId: number, nameCategory: string): Promise<object[]> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_update_category(?,?)`,
            { type: QueryTypes.SELECT, replacements: [categoryId, nameCategory] });
        return resp;
    } catch (error) {
        throw error;
    }
}