import { QueryTypes } from 'sequelize';
import db from '../../config';

export const updateMarkFn = async (markId: number, nameMark: string): Promise<object[]> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_update_mark(?,?)`,
            { type: QueryTypes.SELECT, replacements: [markId, nameMark] });
        return resp;
    } catch (error) {
        throw error;
    }
}