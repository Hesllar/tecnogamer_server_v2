import { Request, Response } from 'express';
import { sendOk, internalError, badRequest } from '../utils/http';
import { productMappers } from '../mappers';
import { 
    getProductsFn, 
    getProductByIdFn, 
    createProductFn, 
    updateProductFn, 
    deleteProductFn
    } from '../services/product';

export const getProducts = async (req: Request, res: Response) => {
    try {

        const getProducts = await getProductsFn();
    
         const result = getProducts.map(({product_id, name_product, category_id, mark_id, ...resto}) => {
          
            return { 
                productId:product_id, 
                nameProduct:name_product, 
                categoryId:category_id, 
                markId:mark_id, 
                ...resto
            };

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

        const getProductById = await getProductByIdFn( {product_id: + req.params.productId});
        
        if(!getProductById) return badRequest(res,'No hay datos para este producto', {} );

        const { 
            product_id: productId, 
            name_product:nameProduct, 
            category_id:categoryId, 
            mark_id:markId,
            ...resto
        } = getProductById;
        
        sendOk(res, 'Datos encontrados', {
            productId,
            nameProduct,
            categoryId,
            markId,
            ...resto
        }, 200);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        
        const body = req.body;

        const {product_id, ...resto} = productMappers({
            product_id:body.productId,
            name_product: body.nameProduct,
            stock: body.stock,
            price: body.price,
            description: body.description,
            image: body.image,
            mark_id:body.markId,
            category_id:body.categoryId
        });

        const createProduct =  await createProductFn(resto);

        sendOk(res, 'Producto creado correctamente', {
            productId:createProduct.product_id,
            nameProduct: createProduct.name_product
        }, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;

        const body = req.body;

        const productMapper= productMappers({
            product_id: +productId,
            name_product: body.nameProduct,
            stock: body.stock,
            price: body.price,
            description: body.description,
            image:  body.image,
            mark_id:  body.markId,
            category_id: body.categoryId
        });

        const { product_id } = await updateProductFn(productMapper);;

        sendOk(res, 'Producto actualizado correctamente', {
            productId:product_id
        }, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;

        const resultDeleteProduct = await deleteProductFn(+productId);

        if(resultDeleteProduct === 0) return badRequest(res, 'El producto que intenta eliminar no se encuentra registrado', {});

        sendOk(res, 'Producto eliminado correctamente', resultDeleteProduct, 201);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}




