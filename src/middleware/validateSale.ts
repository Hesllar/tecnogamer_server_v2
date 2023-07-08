import { Request, Response,NextFunction } from 'express';
import { badRequest, internalError } from '../utils/http';
import { DetailSale } from '../interfaces';
import { serviceSale } from '../services';



export const validateSale = async (req:Request, res:Response, next:NextFunction)=> {
    try {
        
        const { products }: DetailSale= req.body;

        const { user } = req.userData;
     
        if(products.length > 0){
    
            const arrPromise = [];

            for (const product of products) {
                
                arrPromise.push(serviceSale.validateSaleFn(product.productId, user));
            }

            await Promise.all(arrPromise);

            return next();
        }

        badRequest(res, 'No hay productos', products);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, error?.message ?? 'Error, contacte al admin', error);
        }
    } 
}