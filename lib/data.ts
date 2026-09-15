import { Category, Product } from "./types";
export const settings = { businessName:"SJ H.F.C", tagline:"Hot, fresh, made for your table.", currency:"Rs.", deliveryFee:250, whatsapp:process.env.WHATSAPP_BUSINESS_NUMBER || "0302-6924100", contactNumbers:["0302-6924100","0322-6993500","0314-5014999"] };
export const categories: Category[] = [
  {id:"shawarma",name:"شوارما",nameUrdu:"شوارما",nameEnglish:"Shawarma",slug:"shawarma",description:"Fresh wraps, made to order."},{id:"burger",name:"برگر",nameUrdu:"برگر",nameEnglish:"Burger",slug:"burger",description:"Loaded burgers and easy bites."},{id:"pizza",name:"پیزا",nameUrdu:"پیزا",nameEnglish:"Pizza",slug:"pizza",description:"Hot, cheesy favourites."},{id:"sandwich",name:"سینڈوچ",nameUrdu:"سینڈوچ",nameEnglish:"Sandwich",slug:"sandwich",description:"Quick, filling and fresh."},{id:"milkshake",name:"ملک شیک",nameUrdu:"ملک شیک",nameEnglish:"Milkshake",slug:"milkshake",description:"Cold, creamy and comforting."},{id:"juice",name:"جوس",nameUrdu:"جوس",nameEnglish:"Juice",slug:"juice",description:"Refreshing drinks for every meal."},{id:"fries",name:"فرائز",nameUrdu:"فرائز",nameEnglish:"Fries",slug:"fries",description:"Crispy sides for the table."}
 ];
export const products: Product[] = [];
export function getProduct(slug:string){return products.find(p=>p.slug===slug)}
export const money=(value:number)=>`${settings.currency} ${value.toLocaleString("en-PK")}`;
