import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { PostCategory, 
    GetCategoryById, 
    Category, 
    OutPutGetCategories,
    OutPutGetCategoryById,
    OutPutPostCategory
 } from '../interfaces';

export const getCategoriesFn = async (): Promise<Array<OutPutGetCategories>> => {
    try {

        const resultgetCategoriesFn = await db.query('SELECT * FROM fn_get_categories()',
            { type: QueryTypes.SELECT });
        
        return resultgetCategoriesFn as Array<OutPutGetCategories>; 

    } catch (error) {
        throw error;
    }
}

export const getCategoryByIdFn = async ( category_id: number): Promise<OutPutGetCategoryById> => {
    try {
        const resultGetCategoryById = await db.query('SELECT * FROM fn_get_category_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[ category_id ] });

        return resultGetCategoryById.pop() as OutPutGetCategoryById;

    } catch (error) {
        throw error;
    }
}

export const createCategoryFn = async ( name_category: string ): Promise<OutPutPostCategory> => {
    try {

        const resultCreateCategoryFn = await db.query('SELECT * FROM fn_create_category(?)',
            { type: QueryTypes.INSERT, replacements: [name_category] });

        const getValue = resultCreateCategoryFn.shift() as unknown as Array<OutPutPostCategory>;
      
        return getValue.shift() as OutPutPostCategory;

    } catch (error) {
        throw error;
    }
}

export const updateCategoryFn = async (category_id :number, name_category: string): Promise<OutPutPostCategory> => {
    try {

        const resultUpdateCategoryFn = await db.query('SELECT * FROM fn_update_category(?, ?)',
            { type: QueryTypes.UPDATE, replacements: [category_id, name_category] });

            const getValue = resultUpdateCategoryFn.shift() as unknown as Array<OutPutPostCategory>;

            return getValue.shift() as OutPutPostCategory;
    } catch (error) {
        throw error;
    }
}
