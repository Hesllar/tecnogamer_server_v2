
import { Request, Response } from 'express';
import { getMarksFn, getMarkByIdFn, createMarkFn, updateMarkFn } from '../db/function/mark';
import { Mark } from '../interfaces';
import { sendOk, internalError } from '../utils/http';


export const getMarks = async (req: Request, res: Response) => {
    try {
        const resp = await getMarksFn();

        sendOk(res, (resp.length === 0) ? 'No hay marcas' : 'Marcas encontradas', resp);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const getMarkById = async (req: Request, res: Response) => {
    try {

        const { markId } = req.params;

        const resp = await getMarkByIdFn(+markId);

        sendOk(res, (resp.length === 0) ? 'No hay datos para esta marca' : 'Datos encontrados', resp);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const createMark = async (req: Request, res: Response) => {
    try {

        const { nameMark }: Mark = req.body;

        const resp = await createMarkFn(nameMark.trim());

        sendOk(res, 'Marca creada correctamente', resp, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const updateMark = async (req: Request, res: Response) => {
    try {

        const { markId } = req.params;

        const { nameMark }: Mark = req.body;

        const resp = await updateMarkFn(+markId, nameMark.trim());

        sendOk(res, 'Marca actualizada correctamente', resp, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}