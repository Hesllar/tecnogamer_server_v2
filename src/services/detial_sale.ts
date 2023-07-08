import { QueryTypes } from 'sequelize';
import db from '../db/config';
import { DetailSale } from '../interfaces';

export const createDetailSaleFn = async (detailSale: DetailSale): Promise<{fn_create_sale: number}> => {
    try {

        const resultCreateSale = await db.query('SELECT * FROM fn_create_sale(?, ?, ?)', 
        { type: QueryTypes.INSERT, replacements:[total_sale, total_products, user_id] }); 

        const getValues = resultCreateSale.shift() as unknown as Array<{fn_create_sale: number}>;

        return getValues.shift() as {fn_create_sale: number};

    } catch (error) {
        throw error;
    }
}