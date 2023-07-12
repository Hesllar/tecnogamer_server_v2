
import { Request, Response } from 'express';
import { serviceMark } from '../services';
import { Mark } from '../interfaces';
import { sendOk, internalError, badRequest } from '../utils/http';


export const getMarks = async (req: Request, res: Response) => {
    try {

        const getMarks = await serviceMark.getMarksFn();


        const structure = getMarks.map(({mark_id, name_mark}) => {
            return {
                markId: mark_id,
                nameMark:name_mark
            }
        });

        sendOk(res, (getMarks.length === 0) ? 'No hay marcas' : 'Marcas encontradas', structure);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const getMarkById = async (req: Request, res: Response) => {
    try {

        const { markId } = req.params;

        const getMarkById = await serviceMark.getMarkByIdFn( +markId );
        
        if(!getMarkById) return badRequest(res,'No hay datos para esta marca', {} );

        sendOk(res, 'Datos encontrados', 
        {
            markId:getMarkById.mark_id,
            nameMark: getMarkById.name_mark
        });

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const createMark = async (req: Request, res: Response) => {
    try {

        const { nameMark } = req.body;

        const { name_mark, mark_id } = await serviceMark.createMarkFn(nameMark.trim());

        sendOk(res, 'Marca creada correctamente', {markId: mark_id ,nameMark: name_mark}, 201);

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
            mark_id: +markId,
            name_mark:nameMark.trim()
        }

        const updateMark = await serviceMark.updateMarkFn(bodyMark);

        sendOk(res, 'Marca actualizada correctamente', updateMark);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}