import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { PostCategory, GetCategoryById, Category } from '../interfaces';

type typeGetCategories = {
    category_id: number;
    name_category: string;
}

type typeCreateCategory = {
    name_category: string;
}





export const getCategoriesFn = async (): Promise<Array<typeGetCategories>> => {
    try {

        const resultgetCategoriesFn = await db.query('SELECT * FROM fn_get_categories()',
            { type: QueryTypes.SELECT }) as Array<typeGetCategories>;
        
        return resultgetCategoriesFn;

    } catch (error) {
        throw error;
    }
}

export const getCategoryByIdFn = async ({ categoryId }: GetCategoryById): Promise<typeGetCategories> => {
    try {
        const resultGetCategoryById = await db.query<typeGetCategories>('SELECT * FROM fn_get_category_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[ categoryId ] });

        return resultGetCategoryById[0];

    } catch (error) {
        throw error;
    }
}

export const createCategoryFn = async ({ nameCategory }:PostCategory): Promise<typeCreateCategory> => {
    try {

        const resp = await db.query('SELECT * FROM fn_create_category(?)',
            { type: QueryTypes.INSERT, replacements: [nameCategory] }) as unknown as typeCreateCategory;
        console.log(resp);
        return resp;
    } catch (error) {
        throw error;
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
