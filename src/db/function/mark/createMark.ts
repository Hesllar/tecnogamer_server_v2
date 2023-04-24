import { QueryTypes } from 'sequelize';
import db from '../../config';

export const createMarkFn = async (nameMark: string): Promise<object[]> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_create_mark(?)`,
            { type: QueryTypes.SELECT, replacements: [nameMark] });
        return resp;
    } catch (error) {
        throw error;
    }
}