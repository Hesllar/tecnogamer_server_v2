import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { ResponseService, postCategory, getCategoryById, Category } from '../interfaces';

export const getCategoriesFn = async (): Promise<ResponseService> => {
    try {
        const resp = await db.query('SELECT * FROM fn_get_categories()', { type: QueryTypes.SELECT });
        return {
            ok:true,
            result:resp
        };
    } catch (error) {
        return {
            ok:false,
            result:error
        };
    }
}

export const getCategoryByIdFn = async ({ categoryId }: getCategoryById): Promise<ResponseService> => {
    try {
        const resp = await db.query('SELECT * FROM fn_get_category_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[ categoryId ] });
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

export const createCategoryFn = async ({ nameCategory }:postCategory): Promise<ResponseService> => {
    try {
        const resp = await db.query('SELECT * FROM fn_create_category(?)',
            { type: QueryTypes.INSERT, replacements: [nameCategory] });
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

export const updateCategoryFn = async ({categoryId, nameCategory}: Category): Promise<ResponseService> => {
    try {
        const resp = await db.query('SELECT * FROM fn_update_category(?, ?)',
            { type: QueryTypes.UPDATE, replacements: [categoryId, nameCategory] });
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
