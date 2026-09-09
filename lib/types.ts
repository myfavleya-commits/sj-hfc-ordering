export type Category = { id:string; name:string; slug:string; description:string };
export type Product = { id:string; slug:string; name:string; category:string; description:string; price:number; compareAtPrice?:number; stock:number; rating:number; reviews:number; image:string; featured?:boolean; sku:string };
export type CartItem = Product & { quantity:number };
export type CustomerOrder = { orderNumber:string; items:CartItem[]; customerName:string; phone:string; address:string; city:string; landmark?:string; notes?:string; subtotal:number; deliveryFee:number; total:number; createdAt:string };
