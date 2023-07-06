import { Request, Response } from 'express';
import { serviceCategory } from '../services';
import { Category, OutPutGetCategories, OutPutGetCategoryById, OutPutPostCategory } from '../interfaces';
import { sendOk, internalError, badRequest } from '../utils/http';

export const getCategories = async (req: Request, res: Response) => {
    try {

        const getCategories = await serviceCategory.getCategoriesFn();
        
        const structure = getCategories.map(({category_id,name_category}: OutPutGetCategories) => {
            return {
                categoryId: category_id,
                nameCategory:name_category
            }
        });

        sendOk(res, (getCategories.length === 0) ? 'No hay categorías' : 'Categorías encontradas', structure);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const getCategoryById = async (req: Request, res: Response) => {
    try {

        const { categoryId } = req.params;

        const getCategoryById = await serviceCategory.getCategoryByIdFn(+categoryId);
        
        if(!getCategoryById) return badRequest(res,'No hay datos para esta categoría', {} );

        sendOk(res,'Categoría encontrada', {
            categoryId: getCategoryById.category_id, 
            nameCategory: getCategoryById.name_category
        });

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const createCategory = async (req: Request, res: Response) => {
    try {

        const { nameCategory } = req.body;

        const createCategory = await serviceCategory.createCategoryFn(nameCategory.trim());
        
        sendOk(res, 'Categoría creada correctamente', {nameCategory:createCategory.name_category}, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {

        const { categoryId } = req.params;

        const { nameCategory } = req.body;

        const updateCategory  = await serviceCategory.updateCategoryFn(+categoryId, nameCategory);
        
        sendOk(res, 'Categoría actualizada correctamente', {nameCategory: updateCategory.name_category}, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}
