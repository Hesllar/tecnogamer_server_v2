import { QueryTypes } from 'sequelize';
import db from '../db/config';
import { lengthParams } from '../utils/lengthParams';
import { Sale } from '../interfaces';


export const validateSaleFn = async (producId: number, userId: number) => {
    try {

        await db.query('SELECT * FROM fn_validate_sale(?, ?)', { type: QueryTypes.SELECT, replacements:[producId, userId] }); 
        
    } catch (error) {
        throw error;
    }
}

export const createSaleFn = async ({total_sale, total_products, user_id}:Sale): Promise<{fn_create_sale: number}> => {
    try {

        const resultCreateSale = await db.query('SELECT * FROM fn_create_sale(?, ?, ?)', 
        { type: QueryTypes.INSERT, replacements:[total_sale, total_products, user_id] }); 

        const getValues = resultCreateSale.shift() as unknown as Array<{fn_create_sale: number}>;

        return getValues.shift() as {fn_create_sale: number};

    } catch (error) {
        throw error;
    }
}