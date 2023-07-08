import { QueryTypes } from 'sequelize';
import db from '../db/config';
import { DetailSale } from '../interfaces';
import { lengthParams } from '../utils/lengthParams';

export const createDetailSaleFn = async (detailSale: DetailSale): Promise<{fn_create_sale: number}> => {
    try {

        const resultCreateSale = await db.query('SELECT * FROM fn_create_detail_sale(?, ?, ?, ?, ?)', 
        { type: QueryTypes.INSERT, replacements:[detailSale.saleId, ...Object.values(detailSale.products)] }); 

        const getValues = resultCreateSale.shift() as unknown as Array<{fn_create_sale: number}>;

        return getValues.shift() as {fn_create_sale: number};

    } catch (error) {
        throw error;
    }
}