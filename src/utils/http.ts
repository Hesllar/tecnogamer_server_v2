import { Response } from 'express';

export const sendOk = (res: Response, message: string, result: [] | object, code: number = 200) => {
    return res.status(code).json({
        status: true,
        message,
        response: result,
    });
}

export const badRequest = (res: Response, message: string, result: [] | object, code: number = 400) => {
    return res.status(code).json({
        status: false,
        message,
        response: result
    });
}

export const internalError = (res: Response, message: string, result: [] | object, code: number = 500) => {
    return res.status(code).json({
        status: false,
        message,
        response: result
    });
}


