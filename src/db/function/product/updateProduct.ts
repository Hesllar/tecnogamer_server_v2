import { QueryTypes } from 'sequelize';
import { ResponseService, ProductInterface } from '../../../interfaces';
import { lengthParams } from '../../../utils/lengthParams';
import db from '../../config';

export const updateProductFn = async (productData: ProductInterface): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_update_product(${lengthParams(Object.keys(productData).length)})`,
            { type: QueryTypes.SELECT, replacements: Object.values(productData) });
        return {
            ok:true,
            result: resp
        };
    } catch (error) {
        return{
            ok:false,
            result:error
        };
    }
}