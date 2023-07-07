import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sendOk, internalError, badRequest } from '../utils/http';
import { userMappers } from '../mappers';
import { serviceUser } from '../services';


export const getUsers = async (req: Request, res: Response) => {
    try {
      
        const resultGetUsersAllFn = await serviceUser.getUsersFn();

        const newStructure = resultGetUsersAllFn.map( user =>{
            return{
                userId: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                userName: user.user_name,
                email: user.email,
                typeUserId: user.type_user
            }
        });
        
        sendOk(res, (resultGetUsersAllFn.length === 0) ? 'No hay usuarios' : 'Usuarios encontrados', newStructure);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const getUsersById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const resultGetUserById = await serviceUser.getUserByIdFn(+userId);
        
        if(!resultGetUserById) return badRequest(res,'No hay datos para este usuario', {} );
        
        const {user_id, first_name, last_name, user_name, email, type_user } = resultGetUserById;

        const newStructure = {
            userId: user_id,
            firstName: first_name,
            lastName: last_name,
            userName: user_name,
            email: email,
            typeUserId: type_user
        }

        sendOk(res,'Usuario encontrado',newStructure);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {

        const { firstName, lastName, userName } = req.body;

        const { userId } = req.params;

        const {first_name, last_name, user_name } = userMappers({
            first_name: firstName,
            last_name: lastName,
            user_name: userName,
            email: '',
            password: '',
            type_user: 0
        }); 
    
        const resultUpdateUser = await serviceUser.updateUserFn({ user_id: +userId, first_name, last_name, user_name});

        sendOk(res, 
            (resultUpdateUser.rows_affected > 0) 
                ? 'Usuario actualizado correctamente'
                : 'No hay nuevas modificaciones para este usuario',
        resultUpdateUser, 201);

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
        
        const resultUpdatePasswordUser = await serviceUser.updatePasswordUserFn(emailUser.trim(), passHash);

        sendOk(res, 'Contraseña actualizada correctamente', resultUpdatePasswordUser, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}






