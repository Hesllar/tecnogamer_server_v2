import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { Mark } from '../interfaces';



export const getMarksFn = async (): Promise<Array<Mark>> => {
    try {
        
        const resultGetMarksFn = await db.query('SELECT * FROM fn_get_marks()', 
        { type: QueryTypes.SELECT }); 
        
        return  resultGetMarksFn as Array<Mark>;

    } catch (error) {
        throw error;
    }
}


export const getMarkByIdFn = async (markId: number): Promise<Mark> => {
    try {
        
        const resultGetMarkByIdFn = await db.query('SELECT * FROM fn_get_mark_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[markId] });
        
       return resultGetMarkByIdFn.pop() as  Mark;

    } catch (error) {
        throw error;
    }
}

export const createMarkFn = async (nameMark: string): Promise<Mark> => {
    
    try {
        const resultCreateMarkFn = await db.query('SELECT * FROM fn_create_mark(?)',
            { type: QueryTypes.INSERT, replacements: [nameMark] });

        const getValue = resultCreateMarkFn.shift() as unknown as Array<Mark>;
        
        return getValue.shift() as Mark;

    } catch (error) {
        throw error;
        
    }
}

export const updateMarkFn = async ({ mark_id,  name_mark }:Mark): Promise<{wasModified:boolean}> => {
    try {
        const resultUpdateMarkFn = await db.query('SELECT * FROM fn_update_mark( ?, ?)',
            { type: QueryTypes.UPDATE, replacements: [mark_id, name_mark] });

        const [[{fn_update_mark}]] = resultUpdateMarkFn as unknown as [[{fn_update_mark:boolean}]];

        return {wasModified:fn_update_mark};
        
    } catch (error) {
        throw error;
    }
}