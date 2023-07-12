import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { ProductInterface, GetProductById, OutPutCreateProduct, CreateProduct, OutPutUpdateProduct } from '../interfaces';
import { lengthParams } from '../utils/lengthParams';

export const getProductsFn = async (): Promise<Array<ProductInterface>> => {
    try {

        const resultgetCategoriesFn = await db.query('SELECT * FROM fn_get_products()',
            { type: QueryTypes.SELECT }) ;
        
        return resultgetCategoriesFn as Array<ProductInterface>;

    } catch (error) {
        throw error;
    }
}

export const getProductByIdFn = async ({ product_id }: GetProductById): Promise<ProductInterface> => {
    try {
        
        const resultGetCategoryById = await db.query('SELECT * FROM fn_get_product_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[ product_id ] });

        return resultGetCategoryById.pop() as ProductInterface;

    } catch (error) {
        throw error;
    }
}

export const createProductFn = async ( productData: CreateProduct ): Promise<ProductInterface> => {
    try {
        const resultCreateProduct = await db.query(`SELECT * FROM fn_create_product(${lengthParams(Object.keys(productData).length)})`,
            { type: QueryTypes.INSERT, replacements: Object.values(productData)});
        
        const getValue = resultCreateProduct.shift() as unknown as Array<ProductInterface>;
            
        return getValue.shift() as ProductInterface;
    } catch (error) {
        throw error;
    }
}

export const updateProductFn = async (productData: ProductInterface): Promise<{wasModified:boolean}> => {
    try {
        
        const resultUpdatePorduct = await db.query(`SELECT * FROM fn_update_product(${lengthParams(Object.keys(productData).length)})`,
            { type: QueryTypes.UPDATE, replacements: Object.values(productData) });

        const [[{fn_update_product}]] = resultUpdatePorduct as unknown as [[{fn_update_product:boolean}]];

        return {wasModified:fn_update_product};
    } catch (error) {
        throw error;
    }
}

export const deleteProductFn = async ( productId: number ): Promise<{wasRemove:boolean}> => {
    try {

        const resultDeleteProduct = await db.query(`SELECT * FROM fn_delete_product(?)`,
            { type: QueryTypes.DELETE, replacements: [productId] });

        const [{fn_delete_product}] = resultDeleteProduct as unknown as [{fn_delete_product:boolean}];

        return  {wasRemove:fn_delete_product};

    } catch (error) {
       throw error;
    }
}




