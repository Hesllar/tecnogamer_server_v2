import { Request, Response } from 'express';
import { sendOk, internalError, badRequest } from '../utils/http';
import { productMappers } from '../mappers';
import { serviceProduct} from '../services';

export const getProducts = async (req: Request, res: Response) => {
    try {

        const getProducts = await serviceProduct.getProductsFn();
    
         const result = getProducts.map(({product_id, name_product, category_id, mark_id, ...resto}) => {
          
            return { 
                productId:product_id, 
                nameProduct:name_product, 
                categoryId:category_id, 
                markId:mark_id, 
                ...resto
            };

        });

        sendOk(res, (result.length === 0) ? 'No hay productos' : 'Productos encontrados', result);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {

        const getProductById = await serviceProduct.getProductByIdFn( {product_id: + req.params.productId});
        
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
        });

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

        const createProduct =  await serviceProduct.createProductFn(resto);

        sendOk(res, 'Producto creado correctamente', {
            productId:createProduct.product_id,
            nameProduct: createProduct.name_product,
            description:createProduct.description,
            stock:createProduct.stock,
            price:createProduct.price,
            image:createProduct.image,
            categoryId:createProduct.category_id,
            markId: createProduct.mark_id
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

        const resultUpdateProduct= await serviceProduct.updateProductFn(productMapper);;

        sendOk(res, 'Producto actualizado correctamente', resultUpdateProduct);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {

        const { productId } = req.params;

        const resultDeleteProduct = await serviceProduct.deleteProductFn(+productId);

        sendOk(res, 'Producto eliminado correctamente', resultDeleteProduct);

    } catch (error) {
        if (error instanceof Error) {
            internalError(res, `${error.message || 'Error no contrado'}`, error);
        }
    }
}




