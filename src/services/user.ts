import { QueryTypes } from 'sequelize';
import db from '../db/config';
import { lengthParams } from '../utils/lengthParams';
import { OutPutUser, UpdateUser} from '../interfaces';


export const getUsersFn = async (): Promise<Array<OutPutUser>> => {
    try {

        const resultGetUserAll = await db.query('SELECT * FROM fn_get_users()', { type: QueryTypes.SELECT });

        return resultGetUserAll as Array<OutPutUser>;
        
    } catch (error) {
        throw error;
    }
}

export const getUserByIdFn = async (userId: number): Promise<OutPutUser> => {
    try {

        const resultGetUserById = await db.query(`SELECT * FROM fn_get_user_by_id(${userId})`, { type: QueryTypes.SELECT });

        return resultGetUserById.pop() as OutPutUser;
        
    } catch (error) {
        
        throw error;
    }
}

export const updateUserFn = async (userData: UpdateUser): Promise<{wasModified:boolean}> => {
    try {
        const resultUpdateUser = await db.query(`SELECT * FROM fn_update_user(${lengthParams(Object.keys(userData).length)})`,
            { type: QueryTypes.UPDATE, replacements: Object.values(userData) });

        const [[{fn_update_user}]] = resultUpdateUser as unknown as [[{fn_update_user:boolean}]];
        
        return {wasModified:fn_update_user};
        
    } catch (error) {
        throw error;
    }
}

export const updatePasswordUserFn = async (emailUser: string, passwordUser: string): Promise<{wasModified:boolean}> => {
    try {
        const resultUpdatePasswordUser = await db.query(`SELECT * FROM fn_update_password_user(?, ?)`,
            { type: QueryTypes.UPDATE, replacements: [emailUser, passwordUser] });

        const [[{fn_update_password_user}]] = resultUpdatePasswordUser as unknown as [[{fn_update_password_user:boolean}]];
        
        return {wasModified:fn_update_password_user};
    } catch (error) {
        throw error;
    }
}