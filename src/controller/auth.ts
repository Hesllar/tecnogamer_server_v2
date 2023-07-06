
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { serviceAuth } from '../services';
import { sendOk, internalError, badRequest } from '../utils/http';
import { createToken } from '../auth/createToken';
import { createUserName } from '../utils/createUserName';
import { userMappers } from '../mappers';
import { createUserFn } from '../db/function/user';
import {  RegisterUser } from '../interfaces';


export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const getUserByEmail = await serviceAuth.validateEmail(email.trim().toLocaleLowerCase());

        const { password: passwordDB, ...restoLogin } = getUserByEmail;

        const {user_id: userId, type_user: typeUser} = restoLogin;

        const isValidPassword = bcrypt.compareSync(password, passwordDB);

        if (!isValidPassword) return badRequest(res, 'El correo o contraseña no son válidos', {});
        
        const {ok, msg, token} = await createToken(userId, restoLogin.email, typeUser);

        if(!ok) return badRequest(res, msg, {});
        
        sendOk(res, 'Login correcto', {userId, email: restoLogin.email,  typeUser, token });

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const registerUser = async (req: Request, res: Response) => {
    try {
        
        const { firstName, lastName, password } = req.body;

        const userName = createUserName(firstName, lastName);

        const passwordHash = bcrypt.hashSync(password?.trim(), 10);

        const createUserMappers = userMappers({
            first_name:firstName, 
            last_name:lastName,
            user_name:userName,
            email: req.body.email, 
            password:passwordHash, 
            type_user:2});
        
        const createUser = await serviceAuth.createUser(createUserMappers);
        
        const { user_id: userId, email, type_user:typeUser } = createUser;

        const {ok, msg, token} = await createToken(userId, email, typeUser);

        if(!ok) return badRequest(res, msg, {});

        sendOk(res, 'Usuario creado correctamente', {userId, email, typeUser, token}, 201);
        
    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const resetToken = async (req :Request, res: Response) =>{

    const {user, email, typeUser} = req.userData;

    try {

        const {ok, msg, token} = await createToken(user, email, typeUser);

        if(!ok) return badRequest(res, msg, {});

        sendOk(res, 'Token reseteado correctamente', {...req.userData, token}, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }

}
