import jwt,{JwtPayload} from 'jsonwebtoken';
import { badRequest } from '../utils/http';
import { Request, Response,NextFunction } from 'express';

const secretToken = process.env.SECRET_TOKEN || 'mradQ18Pl2';

export const validateToken = (req:Request, res:Response, next:NextFunction)=> {
   
    const token = req.header('x-access-token');
   
    if(!token){
        return badRequest(res,'Token de acceso no encontrado', [], 401);
    }

    try {
    
        const {user, email, typeUser} =jwt.verify(token, secretToken) as JwtPayload;
        
        req.userData = {
            user,
            email,
            typeUser
        }
        
        next();

    } catch (error) {
        if (error instanceof Error) {
            badRequest(res, 'Error, token de acceso no válido',error, 401);
        }
        
    }
    

    
}