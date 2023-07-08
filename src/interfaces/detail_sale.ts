type Products = {
    productId:number;
    quantity:number;
    unityPrice:number;
    totalPrice:number;
    
}


export interface DetailSale {
    products:Array<Products> | Products;
    saleId?: number;
    
}