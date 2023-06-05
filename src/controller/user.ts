import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUsersFn, getUserByIdFn, createUserFn, updateUserFn, updatePasswordUserFn } from '../db/function/user';
import { sendOk, internalError, badRequest } from '../utils/http';
import { createUserName } from '../utils/createUserName';
import { userMappers } from '../mappers';
import { createToken } from '../auth/createToken';

export const getUsers = async (req: Request, res: Response) => {
    try {
      
        const {ok, result} = await getUsersFn();

        if(!ok) return badRequest(res, result.message, {});

        sendOk(res, (result.length === 0) ? 'No hay usuarios' : 'Usuarios encontrados', result, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const getUsersById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const {ok, result} = await getUserByIdFn(+userId);

        if(!ok) return badRequest(res, result.message, {});
        
        sendOk(res, (result.length === 0) ? 'No hay datos para este usuario' : 'Datos encontrados', result, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {

        const { userId, firstName, lastName, userName} : structUser = userMappers({ ...req.params, ...req.body});
    
        const {ok, result} = await updateUserFn({userId, firstName, lastName, userName});

        if(!ok) return badRequest(res, result.message, {});

        sendOk(res, 'Usuario actualizado correctamente', result, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try {

        const { emailUser } = req.params;

        const { password } = req.body;

        const passHash = bcrypt.hashSync(password.trim(), 10);
        
        const {ok, result} = await updatePasswordUserFn(emailUser.trim(), passHash);

        if(!ok) return badRequest(res, result.message, {});

        sendOk(res, 'Contraseña actualizada correctamente', result, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}






