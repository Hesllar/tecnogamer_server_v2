import { Request, Response } from 'express';
import { serviceCategory } from '../services';
import { Category } from '../interfaces';
import { sendOk, internalError, badRequest } from '../utils/http';

export const getCategories = async (req: Request, res: Response) => {
    try {

        const getCategories = await serviceCategory.getCategoriesFn();

        sendOk(res, (getCategories.length === 0) ? 'No hay categorías' : 'Categorías encontradas', getCategories);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const getCategoryById = async (req: Request, res: Response) => {
    try {

        const { categoryId } = req.params;

        const getCategoryById = await serviceCategory.getCategoryByIdFn({categoryId: +categoryId});
        
        if(!getCategoryById) return badRequest(res,'No hay datos para esta categoría', {} );

        sendOk(res,'Categoría encontrada', getCategoryById);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const createCategory = async (req: Request, res: Response) => {
    try {

        const { nameCategory } = req.body;

        const createCategory = await serviceCategory.createCategoryFn({nameCategory: nameCategory.trim()});

        sendOk(res, 'Categoría creada correctamente', createCategory, 201);

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

        const bodyCategory : Category = {
            categoryId: +categoryId,
            nameCategory
        }
  
        const {ok, result} = await serviceCategory.updateCategoryFn(bodyCategory);
       
        if(!ok) return badRequest(res, result.message, result);

        sendOk(res, 'Categoría actualizada correctamente', result.shift(), 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}
