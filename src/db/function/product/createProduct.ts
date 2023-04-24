import { QueryTypes } from 'sequelize';
import db from '../../config';
import { ResponseService, ProductInterface } from '../../../interfaces';
import { lengthParams } from '../../../utils/lengthParams';

export const createProductFn = async ( productData: ProductInterface ): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_create_product(${lengthParams(Object.keys(productData).length)})`,
            { type: QueryTypes.SELECT, replacements: Object.values(productData) });
            
        return {
            ok:true,
            result: resp[0]
        };
    } catch (error) {
        return{
            ok:false,
            result:error
        }
    }
}