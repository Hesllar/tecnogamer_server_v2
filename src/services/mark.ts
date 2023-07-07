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
        { type: QueryTypes.SELECT }); 
        
        return  resultGetMarksFn as Array<OutPutGetMarks>;

    } catch (error) {
        throw error;
    }
}


export const getMarkByIdFn = async ({ mark_id }:GetMarkById): Promise<OutPutGetMarkById> => {
    try {
        
        const resultGetMarkByIdFn = await db.query('SELECT * FROM fn_get_mark_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[mark_id] });
        
       return resultGetMarkByIdFn.pop() as  OutPutGetMarkById;

    } catch (error) {
        throw error;
    }
}

export const createMarkFn = async ({ name_mark }: PostMark): Promise<OutPutPostMark> => {
    
    try {
        const resultCreateMarkFn = await db.query('SELECT * FROM fn_create_mark(?)',
            { type: QueryTypes.INSERT, replacements: [name_mark] });

        const getValue = resultCreateMarkFn.shift() as unknown as Array<OutPutPostMark>;
        
        return getValue.shift() as OutPutPostMark;

    } catch (error) {
        throw error;
        
    }
}

export const updateMarkFn = async ({ mark_id,  name_mark }:Mark): Promise<OutPutPutMark> => {
    try {
        const resultUpdateMarkFn = await db.query('SELECT * FROM fn_update_mark( ?, ?)',
            { type: QueryTypes.UPDATE, replacements: [mark_id, name_mark] });

        const getValue = resultUpdateMarkFn.shift() as unknown as Array<OutPutPutMark>;

        return getValue.shift() as OutPutPutMark;
        
    } catch (error) {
        throw error;
    }
}