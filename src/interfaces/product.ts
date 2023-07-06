export interface ProductInterface {
    name_product: string,
    stock: number,
    price: number,
    description: string,
    image: string
    product_id: number,
    mark_id: number,
    category_id: number,
}

export type OutPutCreateProduct = Pick<ProductInterface, 'product_id' | 'name_product'>;
export type OutPutUpdateProduct = Pick<ProductInterface, 'product_id'>;
export type GetProductById  = Pick<ProductInterface, 'product_id'>;
export type CreateProduct  = Omit<ProductInterface, 'product_id'>;



