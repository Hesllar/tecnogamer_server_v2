import { Request, Response } from 'express';
import { sendOk, internalError, badRequest } from '../utils/http';
import { createProductFn, getProductsFn, getProductByIdFn, updateProductFn, deleteProductFn } from '../db/function/product';
import { productMappers } from '../mappers';
import { ProductInterface } from '../interfaces';

export const getProducts = async (req: Request, res: Response) => {
    try {

        let { ok , result } = await getProductsFn();
        
        if(!ok) return badRequest(res, result.message, []);

        result = result.map((product : any) => {
            const { 
                product_id: productId, 
                name_product: nameProduct,
                category_id: categoryId,
                mark_id: markId,
                ...resto 
            } = product;
            return productMappers({ productId, nameProduct, categoryId, markId, ...resto});
        });

        

        sendOk(res, (result.length === 0) ? 'No hay productos' : 'Productos encontrados', result, 200);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;
        
        const {ok , result } = await getProductByIdFn( +productId);

        if(!ok) return badRequest(res, result.message, []);

        sendOk(res, (result.length === 0) ? 'No hay datos para este producto' : 'Datos encontrados', result, 200);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {productId, ...resto} = productMappers(req.body);

        const { ok, result } =  await createProductFn(resto);

        if(!ok) return badRequest(res, result.message, []);

        sendOk(res, 'Producto creado correctamente', result, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;

        const productMp= productMappers({productId,...req.body});

        const {ok ,result} = await updateProductFn(productMp);

        if(!ok) return badRequest(res, result.message, []);

        sendOk(res, 'Producto actualizado correctamente', result, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;

        const {ok ,result} = await deleteProductFn(+productId);

        if(!ok) return badRequest(res, result.message, []);

        sendOk(res, 'Producto eliminado correctamente', result, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}




