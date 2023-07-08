import { QueryTypes } from 'sequelize';
import db from '../db/config';
import { lengthParams } from '../utils/lengthParams';
import { OutPutGetUsersAll, UpdateUser } from '../interfaces';


export const getUsersFn = async (): Promise<Array<OutPutGetUsersAll>> => {
    try {

        const resultGetUserAll = await db.query('SELECT * FROM fn_get_users()', { type: QueryTypes.SELECT });

        return resultGetUserAll as Array<OutPutGetUsersAll>;
        
    } catch (error) {
        throw error;
    }
}

export const getUserByIdFn = async (userId: number): Promise<OutPutGetUsersAll> => {
    try {

        const resultGetUserById = await db.query(`SELECT * FROM fn_get_user_by_id(${userId})`, { type: QueryTypes.SELECT });

        return resultGetUserById.pop() as OutPutGetUsersAll;
        
    } catch (error) {
        
        throw error;
    }
}

export const updateUserFn = async (userData: UpdateUser): Promise<{rows_affected:number}> => {
    try {
        const resultUpdateUser = await db.query(`SELECT * FROM fn_update_user(${lengthParams(Object.keys(userData).length)})`,
            { type: QueryTypes.UPDATE, replacements: Object.values(userData) });

        const getValue = resultUpdateUser.shift() as unknown as Array<{rows_affected:number}>;
        
        return getValue.shift() as {rows_affected:number};
        
    } catch (error) {
        throw error;
    }
}

export const updatePasswordUserFn = async (emailUser: string, passwordUser: string): Promise<{rows_affected:number}> => {
    try {
        const resultUpdatePasswordUser = await db.query(`SELECT * FROM fn_update_password_user(?, ?)`,
            { type: QueryTypes.UPDATE, replacements: [emailUser, passwordUser] });

        const getValue = resultUpdatePasswordUser.shift() as unknown as Array<{rows_affected:number}>;
        
        return getValue.shift() as {rows_affected:number};
    } catch (error) {
        throw error;
    }
}