
import { ProductInterface } from '../interfaces';


export const productMappers = (userData: ProductInterface) => {
    const {
            productId,
            nameProduct,
            stock,
            price,
            description,
            image,
            markId,
            categoryId
        } = userData;

        return{
            productId,
            nameProduct,
            stock,
            price,
            description,
            image,
            markId,
            categoryId
        }

}
