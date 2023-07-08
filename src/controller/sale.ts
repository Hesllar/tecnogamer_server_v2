import { Request, Response } from 'express';
import { serviceSale } from '../services';
import { Category, 
    OutPutGetCategories, 
    OutPutGetCategoryById, 
    OutPutPostCategory,
    DetailSale,
    Sale
 } from '../interfaces';
import { sendOk, internalError, badRequest } from '../utils/http';


export const createSale = async ( req:Request, res:Response)=>{
    try {

        let totalSale = 0;
        
        let dataCreateSale:Sale = {
            total_sale:totalSale,
            total_products:0,
            user_id:0
        };

        
        const { user } = req.userData;

        const { products }:DetailSale = req.body;

        for (const values of products) {
            
            dataCreateSale = {
                total_sale:totalSale += values.totalPrice,
                total_products:products.length,
                user_id:user
            }
        }

        const resultCreateSaleFn = await serviceSale.createSaleFn(dataCreateSale);

        
        
        sendOk(res, 'Compra registrada correctamente', resultCreateSaleFn, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}