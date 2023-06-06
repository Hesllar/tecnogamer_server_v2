import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { RegisterUser } from '../interfaces';
import { lengthParams } from '../utils/lengthParams';



type typeValidateEmail = {
    user_id: number;
    email:string;
    type_user:number;
    password:string;
}

type typeCreateUser = {
    user_id:number;
    email:string;
    type_user:number;
}

export const validateEmail = async (email: string):Promise<typeValidateEmail> => {
    try {

        const resultValidateEmail = await db.query<typeValidateEmail>('SELECT * FROM fn_validate_email(?)', 
        { type: QueryTypes.SELECT, replacements: [email] });
       
        return resultValidateEmail[0];
        
    } catch (error) {

        throw error;
    }
}


export const createUser = async ( user : RegisterUser): Promise<typeCreateUser> => {
    try {

        const resultCreateUser = await db.query<typeCreateUser>(`SELECT * FROM fn_create_user(${lengthParams(Object.keys(user).length)})`, 
        { type: QueryTypes.SELECT, replacements: Object.values(user) });
        
        return resultCreateUser[0];
     
    } catch (error) {

        throw error;
    }
}