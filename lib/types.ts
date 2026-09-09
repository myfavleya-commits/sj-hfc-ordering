export type Category = { id:string; name:string; nameUrdu?:string; nameEnglish?:string; slug:string; description:string };
export type ProductVariant = { id:string; name:string; sku:string; price?:number|null; stock:number; attributes?:Record<string,unknown> };
export type Product = { id:string; slug:string; name:string; nameUrdu?:string; category:string; description:string; descriptionUrdu?:string; price:number; compareAtPrice?:number; stock:number; rating:number; reviews:number; image:string; featured?:boolean; sku:string; variants?:ProductVariant[] };
export type CartItem = Product & { quantity:number; variantId?:string; variantName?:string };
export type CustomerOrder = { orderNumber:string; items:CartItem[]; customerName:string; phone:string; address:string; city:string; landmark?:string; notes?:string; subtotal:number; deliveryFee:number; total:number; createdAt:string };
