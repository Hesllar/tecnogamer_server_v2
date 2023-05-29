
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

        const {ok: okServie, result} = await serviceAuth.loginFn({ email: email.trim().toLocaleLowerCase() });

        if(!okServie) return badRequest(res, result.message, result);

        const { password: passwordDB, ...restoLogin } = result;

        const isPassValid = bcrypt.compareSync(password, passwordDB);

        if (!isPassValid) return badRequest(res, 'El correo o contraseña no son válidos', {});
        
        const {ok, msg, token} = await createToken(restoLogin.userid, restoLogin.email, restoLogin.typeuser);

        if(!ok) return badRequest(res, msg, {});
        
        sendOk(res, 'Login correcto', { ...restoLogin, token });

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

        const registerUserMp = userMappers({...req.body, userName, passwordHash, typeUserId:2});

        const {ok:okService, result} = await serviceAuth.registerFn(registerUserMp);

        if(!okService) return badRequest(res, result.message, result);

        const { user_id, email, type_user } = result.shift()

        const {ok, msg, token} = await createToken(user_id, email, type_user);

        if(!ok) return badRequest(res, msg, {});

        sendOk(res, 'Usuario creado correctamente', {user_id, email, type_user, token}, 201);

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
