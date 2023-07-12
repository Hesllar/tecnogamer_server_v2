type Products = {
    quantity:number;
    unityPrice:number;
    totalPrice:number;
    productId?:number;
    
}


export interface DetailSale {
    products:Array<Products> | Products;
    saleId?: number;
    
}