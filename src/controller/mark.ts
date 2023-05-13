
import { Request, Response } from 'express';
import { serviceMark } from '../services';
import { Mark } from '../interfaces';
import { sendOk, internalError, badRequest } from '../utils/http';


export const getMarks = async (req: Request, res: Response) => {
    try {

        const {ok, result} = await serviceMark.getMarksFn();

        if(!ok) return badRequest(res, result.message, result);
        
        sendOk(res, (result.length === 0) ? 'No hay marcas' : 'Marcas encontradas', result);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const getMarkById = async (req: Request, res: Response) => {
    try {

        const { markId } = req.params;

        const { ok, result } = await serviceMark.getMarkByIdFn({ markId: +markId });

        if(!ok) return badRequest(res, result.message, result);

        sendOk(res, (result.length === 0) ? 'No hay datos para esta marca' : 'Datos encontrados', result);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const createMark = async (req: Request, res: Response) => {
    try {

        const { nameMark } = req.body;

        const { ok,  result } = await serviceMark.createMarkFn({ nameMark: nameMark.trim() });

        if(!ok) return badRequest(res, result.message, result);

        sendOk(res, 'Marca creada correctamente', result.shift(), 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const updateMark = async (req: Request, res: Response) => {
    try {

        const { markId } = req.params;

        const { nameMark } = req.body;

        const bodyMark : Mark = {
            markId: +markId,
            nameMark:nameMark.trim()
        }

        const { ok, result } = await serviceMark.updateMarkFn(bodyMark);

        if(!ok) return badRequest(res, result.message, result);

        sendOk(res, 'Marca actualizada correctamente', result.shift(), 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}