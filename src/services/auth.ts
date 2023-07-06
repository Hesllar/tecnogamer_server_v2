import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { RegisterUser, OutPutLogin, OutPutRegisterUser } from '../interfaces';
import { lengthParams} from '../utils/lengthParams';


export const validateEmail = async (email: string):Promise<OutPutLogin> => {
    try {

        const resultValidateEmail = await db.query('SELECT * FROM fn_validate_email(?)', 
        { type: QueryTypes.SELECT, replacements: [email] });
       
        return resultValidateEmail.pop() as OutPutLogin;
        
    } catch (error) {

        throw error;
    }
}


export const createUser = async ( user : RegisterUser): Promise<OutPutRegisterUser> => {
    try {

        const resultCreateUser = await db.query(`SELECT * FROM fn_create_user(${lengthParams(Object.keys(user).length)})`, 
        { type: QueryTypes.SELECT, replacements: Object.values(user) });
        
        return resultCreateUser.pop() as OutPutRegisterUser;
     
    } catch (error) {

        throw error;
    }
}