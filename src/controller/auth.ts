
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { loginFn } from '../db/function/login/login';
import { Login, UserInterface } from '../interfaces';
import { sendOk, internalError, badRequest } from '../utils/http';
import { createToken } from '../auth/createToken';
import { createUserName } from '../utils/createUserName';
import { userMappers } from '../mappers';
import { createUserFn } from '../db/function/user';


export const login = async (req: Request, res: Response) => {
    try {

        const { email, password }: Login = req.body;

        const {ok: okServie, result} = await loginFn(email.trim().toLocaleLowerCase());

        if(!okServie) return badRequest(res, result.message, {});

        const { password: passwordDB, ...resto } = result;

        const isPassValid = bcrypt.compareSync(password, passwordDB);

        if (!isPassValid) return badRequest(res, 'El correo o contraseña no son válidos', {});
        
        const {ok, msg, token} = await createToken(resto.userid, resto.email, resto.typeuser);

        if(!ok) return badRequest(res, msg, {});
        
        sendOk(res, 'Login correcto', { ...resto, token });

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const registerUser = async (req: Request, res: Response) => {
    try {

        let {userName, firstName, lastName, password, typeUserId} = req.body;

        userName = createUserName(firstName, lastName);

        password = bcrypt.hashSync(password?.trim() || 'prueba', 10);

        typeUserId = 2;
        
        const {userId, ...resto} = userMappers({...req.body, userName, password, typeUserId});
        
        const {ok:okService, result} = await createUserFn(resto);

        if(!okService) return badRequest(res, result.message, {});

        const {ok, msg, token} = await createToken(result.user_id, result.email, result.type_user);

        if(!ok) return badRequest(res, msg, {});

        sendOk(res, 'Usuario creado correctamente', {...result, token}, 201);

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
