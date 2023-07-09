import { Request, Response } from 'express';
import { serviceSale, serviceDetialSale } from '../services';
import { DetailSale, Sale } from '../interfaces';
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

        if(Array.isArray(products)){

            for (const values of products) {
                
                dataCreateSale = {
                    total_sale:totalSale += values.totalPrice,
                    total_products:products.length,
                    user_id:user
                }
            }

            const resultCreateSaleFn = await serviceSale.createSaleFn(dataCreateSale);
            
            let arrayPromise = [];

            for (const product of products) {
                
                arrayPromise.push(serviceDetialSale.createDetailSaleFn({
                    products:product, 
                    saleId: resultCreateSaleFn.fn_create_sale
                }));

            }
            
            await Promise.all(arrayPromise);
            
            return sendOk(res, 'Compra registrada correctamente', resultCreateSaleFn, 201);
        }
        
        badRequest(res, 'Error al registrar la compra',[]);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}