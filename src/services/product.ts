import db from '../db/config';
import { QueryTypes } from 'sequelize';
import { ProductInterface, GetProductById, OutPutCreateProduct, CreateProduct, OutPutUpdateProduct } from '../interfaces';
import { lengthParams } from '../utils/lengthParams';



export const getProductsFn = async (): Promise<Array<ProductInterface>> => {
    try {

        const resultgetCategoriesFn = await db.query('SELECT * FROM fn_get_products()',
            { type: QueryTypes.SELECT }) as Array<ProductInterface>;
        
        return resultgetCategoriesFn;

    } catch (error) {
        throw error;
    }
}

export const getProductByIdFn = async ({ product_id }: GetProductById): Promise<ProductInterface> => {
    try {
        
        const resultGetCategoryById = await db.query<ProductInterface>('SELECT * FROM fn_get_product_by_id(?)', 
        { type: QueryTypes.SELECT, replacements:[ product_id ] });

        return resultGetCategoryById[0];

    } catch (error) {
        throw error;
    }
}

export const createProductFn = async ( productData: CreateProduct ): Promise<OutPutCreateProduct> => {
    try {
        const resultCreateProduct = await db.query<OutPutCreateProduct>(`SELECT * FROM fn_create_product(${lengthParams(Object.keys(productData).length)})`,
            { type: QueryTypes.SELECT, replacements: Object.values(productData) });
            
        return resultCreateProduct[0];
    } catch (error) {
        throw error;
    }
}

export const updateProductFn = async (productData: ProductInterface): Promise<OutPutUpdateProduct> => {
    try {
        
        const resultUpdatePorduct = await db.query<OutPutUpdateProduct>(`SELECT * FROM fn_update_product(${lengthParams(Object.keys(productData).length)})`,
            { type: QueryTypes.SELECT, replacements: Object.values(productData) });
        return resultUpdatePorduct[0];
    } catch (error) {
        throw error;
    }
}

export const deleteProductFn = async ( productId: number ): Promise<Number> => {
    try {

        const [{rows_affected}] = await db.query(`SELECT * FROM fn_delete_product(?)`,
            { type: QueryTypes.DELETE, replacements: [productId] }) as unknown as Array<{rows_affected: number}>;
            
        return rows_affected;

    } catch (error) {
       throw error;
    }
}




