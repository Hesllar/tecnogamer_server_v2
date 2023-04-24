import { Request, Response } from 'express';
import { getCategoriesFn, getCategoryByIdFn, createCategoryFn, updateCategoryFn } from '../db/function/category';
import { Category } from '../interfaces';
import { sendOk, internalError } from '../utils/http';

export const getCategories = async (req: Request, res: Response) => {
    try {

        const resp = await getCategoriesFn();

        sendOk(res, (resp.length === 0) ? 'No hay categorías' : 'Categorías encontradas', resp);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const getCategoryById = async (req: Request, res: Response) => {
    try {

        const { categoryId } = req.params;

        const resp = await getCategoryByIdFn(+categoryId);

        sendOk(res, (resp.length === 0) ? 'No hay datos para esta categoría' : 'Datos encontrados', resp);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const createCategory = async (req: Request, res: Response) => {
    try {

        const { nameCategory }: Category = req.body;

        const resp = await createCategoryFn(nameCategory.trim());

        sendOk(res, 'Categoría creada correctamente', resp, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {

        const { categoryId } = req.params;

        const { nameCategory }: Category = req.body;

        const resp = await updateCategoryFn(+categoryId, nameCategory.trim());

        sendOk(res, 'Categoría actualizada correctamente', resp, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}
