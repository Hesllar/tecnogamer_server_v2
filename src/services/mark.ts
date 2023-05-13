import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { ResponseService, postMark, getMarkById, Mark } from '../interfaces';



export const getMarksFn = async (): Promise<ResponseService> => {
    try {
        
        const resp = await db.query('SELECT * FROM fn_get_marks()', { type: QueryTypes.SELECT });
        
        return {
            ok:true,
            result:resp
        };
    } catch (error) {
        return {
            ok:false,
            result:error
        }
    }
}


export const getMarkByIdFn = async ({ markId }:getMarkById): Promise<ResponseService> => {
    try {
        
        const resp = await db.query('SELECT * FROM fn_get_mark_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[markId] });
        
        return {
            ok:true,
            result:resp.shift()
        };
    } catch (error) {
        return {
            ok:true,
            result:error
        };
    }
}

export const createMarkFn = async ({ nameMark }: postMark): Promise<ResponseService> => {
    
    try {
        const resp = await db.query('SELECT * FROM fn_create_mark(?)',
            { type: QueryTypes.INSERT, replacements: [nameMark] });
        
        return {
            ok:true,
            result:resp.shift()
        };
    } catch (error) {
            return {
                ok:false,
                result:error
            };
        
    }
}

export const updateMarkFn = async ({ markId,  nameMark }:Mark): Promise<ResponseService> => {
    try {
        const resp = await db.query('SELECT * FROM fn_update_mark( ?, ?)',
            { type: QueryTypes.UPDATE, replacements: [markId, nameMark] });
        return {
            ok:true,
            result:resp.shift()
        }
    } catch (error) {
        return {
            ok:false,
            result:error
        };
    }
}