
import { ProductInterface } from '../interfaces';


export const productMappers = (userData: ProductInterface) => {
    const {
            product_id,
            name_product,
            stock,
            price,
            description,
            image,
            mark_id,
            category_id
        } = userData;

        return{
            product_id,
            name_product,
            stock,
            price,
            description,
            image,
            mark_id,
            category_id
        }

}
