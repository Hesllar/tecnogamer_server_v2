import { QueryTypes } from 'sequelize';
import db from '../../config';
import { ResponseService } from '../../../interfaces';


export const deleteProductFn = async ( productId: number  ): Promise<ResponseService> => {
    try {
        const resp = await db.query(`SELECT * FROM fn_delete_product(?)`,
            { type: QueryTypes.SELECT, replacements: [productId] });
            
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