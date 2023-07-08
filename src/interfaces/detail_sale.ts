type Products = {
    productId:number;
    unityPrice:number;
    totalPrice:number;
    quantity:number;
}


export interface DetailSale {
    products:Array<Products> | Products;
    saleId?: number
    
}