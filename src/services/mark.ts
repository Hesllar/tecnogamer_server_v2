import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { PostMark, GetMarkById, Mark } from '../interfaces';


type typeGetMarks = {
    mark_id: number;
    name_mark:string;
}

type typUpsertMark = {
    name_mark: string;
}

export const getMarksFn = async (): Promise<Array<typeGetMarks>> => {
    try {
        
        const resultGetMarksFn = await db.query('SELECT * FROM fn_get_marks()', 
        { type: QueryTypes.SELECT }) as Array<typeGetMarks>;;
        
        return  resultGetMarksFn;

    } catch (error) {
        throw error;
    }
}


export const getMarkByIdFn = async ({ markId }:GetMarkById): Promise<typeGetMarks> => {
    try {
        
        const resultGetMarkByIdFn = await db.query<typeGetMarks>('SELECT * FROM fn_get_mark_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[markId] });
        
       return resultGetMarkByIdFn[0];

    } catch (error) {
        throw error;
    }
}

export const createMarkFn = async ({ nameMark }: PostMark): Promise<typUpsertMark> => {
    
    try {
        const resultCreateMarkFn = await db.query<typUpsertMark>('SELECT * FROM fn_create_mark(?)',
            { type: QueryTypes.SELECT, replacements: [nameMark] });
        
        return resultCreateMarkFn[0];
    } catch (error) {
        throw error;
        
    }
}

export const updateMarkFn = async ({ markId,  nameMark }:Mark): Promise<typUpsertMark> => {
    try {
        const resultUpdateMarkFn = await db.query<typUpsertMark>('SELECT * FROM fn_update_mark( ?, ?)',
            { type: QueryTypes.SELECT, replacements: [markId, nameMark] });

        return resultUpdateMarkFn[0];
    } catch (error) {
        throw error;
    }
}