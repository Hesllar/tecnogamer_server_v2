import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { PostMark, 
    GetMarkById, 
    Mark, 
    OutPutGetMarks, 
    OutPutGetMarkById,
    OutPutPostMark,
    OutPutPutMark } from '../interfaces';



export const getMarksFn = async (): Promise<Array<OutPutGetMarks>> => {
    try {
        
        const resultGetMarksFn = await db.query('SELECT * FROM fn_get_marks()', 
        { type: QueryTypes.SELECT }) as Array<OutPutGetMarks>;
        
        return  resultGetMarksFn;

    } catch (error) {
        throw error;
    }
}


export const getMarkByIdFn = async ({ mark_id }:GetMarkById): Promise<OutPutGetMarkById> => {
    try {
        
        const resultGetMarkByIdFn = await db.query<OutPutGetMarkById>('SELECT * FROM fn_get_mark_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[mark_id] });
        
       return resultGetMarkByIdFn[0];

    } catch (error) {
        throw error;
    }
}

export const createMarkFn = async ({ name_mark }: PostMark): Promise<OutPutPostMark> => {
    
    try {
        const resultCreateMarkFn = await db.query<OutPutPostMark>('SELECT * FROM fn_create_mark(?)',
            { type: QueryTypes.SELECT, replacements: [name_mark] });
        
        return resultCreateMarkFn[0];
    } catch (error) {
        throw error;
        
    }
}

export const updateMarkFn = async ({ mark_id,  name_mark }:Mark): Promise<OutPutPutMark> => {
    try {
        const resultUpdateMarkFn = await db.query<OutPutPutMark>('SELECT * FROM fn_update_mark( ?, ?)',
            { type: QueryTypes.SELECT, replacements: [mark_id, name_mark] });

        return resultUpdateMarkFn[0];
    } catch (error) {
        throw error;
    }
}