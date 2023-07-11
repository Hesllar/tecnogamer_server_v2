import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { PostCategory, Category } from '../interfaces';

export const getCategoriesFn = async (): Promise<Array<Category>> => {
    try {

        const resultgetCategoriesFn = await db.query('SELECT * FROM fn_get_categories()',
            { type: QueryTypes.SELECT });
        
        return resultgetCategoriesFn as Array<Category>; 

    } catch (error) {
        throw error;
    }
}

export const getCategoryByIdFn = async ( category_id: number): Promise<Category> => {
    try {
        const resultGetCategoryById = await db.query('SELECT * FROM fn_get_category_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[ category_id ] });

        return resultGetCategoryById.pop() as Category;

    } catch (error) {
        throw error;
    }
}

export const createCategoryFn = async ( name_category: string ): Promise<Category> => {
    try {

        const resultCreateCategoryFn = await db.query('SELECT * FROM fn_create_category(?)',
            { type: QueryTypes.INSERT, replacements: [name_category] });

        const getValue = resultCreateCategoryFn.shift() as unknown as Array<Category>;
      
        return getValue.shift() as Category;

    } catch (error) {
        throw error;
    }
}

export const updateCategoryFn = async ({name_category, category_id}:Category): Promise<{wasModified:boolean}> => {
    try {

        const resultUpdateCategoryFn = await db.query('SELECT * FROM fn_update_category(?, ?)',
            { type: QueryTypes.UPDATE, replacements: [category_id, name_category] });
        
        const [[{fn_update_category}]] = resultUpdateCategoryFn as unknown as [[{fn_update_category:boolean}]];

        return {wasModified:fn_update_category};
    } catch (error) {
        throw error;
    }
}
