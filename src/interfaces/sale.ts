type Products = {
    productId:number;
    unityPrice:number;
    totalPrice:number;
    quantity:number;
}


export interface DetailSale {
    products:Array<Products>;
    saleId?: number
    
}



export interface Sale {
    total_sale:number;
    total_products:number;
    user_id:number;
}