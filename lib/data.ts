import { Category, Product } from "./types";
export const settings = { businessName:"NOVA MART", tagline:"Everything you need. Delivered simply.", currency:"Rs.", deliveryFee:250, whatsapp:process.env.WHATSAPP_BUSINESS_NUMBER || "923001234567" };
export const categories: Category[] = [
 {id:"electronics",name:"Electronics",slug:"electronics",description:"Smart tech for everyday life."},{id:"fashion",name:"Fashion",slug:"fashion",description:"Everyday pieces, considered well."},{id:"home",name:"Home & Living",slug:"home-living",description:"Make space feel like yours."},{id:"beauty",name:"Beauty",slug:"beauty",description:"Small rituals, better days."},{id:"accessories",name:"Accessories",slug:"accessories",description:"The finishing touches."}
];
const img=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
export const products: Product[] = [
 {id:"p1",slug:"studio-wireless-headphones",name:"Studio Wireless Headphones",category:"electronics",description:"Immersive sound, soft memory-foam comfort, and a battery that keeps up with your day.",price:8999,compareAtPrice:10999,stock:14,rating:4.9,reviews:86,image:img("photo-1505740420928-5e560c06d30e"),featured:true,sku:"NM-ELE-001"},
 {id:"p2",slug:"everyday-canvas-backpack",name:"Everyday Canvas Backpack",category:"fashion",description:"A durable, quietly good-looking carryall with space for your daily essentials.",price:3500,stock:23,rating:4.8,reviews:54,image:img("photo-1553062407-98eeb64c6a62"),featured:true,sku:"NM-FAS-002"},
 {id:"p3",slug:"ceramic-pour-over-set",name:"Ceramic Pour Over Set",category:"home",description:"Slow mornings start here. A handmade-feel brewer and matching cup.",price:4200,stock:8,rating:4.7,reviews:31,image:img("photo-1495474472287-4d71bcdd2085"),featured:true,sku:"NM-HOM-003"},
 {id:"p4",slug:"linen-overshirt-sage",name:"Linen Overshirt / Sage",category:"fashion",description:"Lightweight linen with an easy fit for warm days and cooler evenings.",price:5600,compareAtPrice:6800,stock:6,rating:4.8,reviews:22,image:img("photo-1596755389378-c31d21fd1273"),sku:"NM-FAS-004"},
 {id:"p5",slug:"minimal-desk-lamp",name:"Minimal Desk Lamp",category:"home",description:"Warm, adjustable light for your desk, bedside table, or reading corner.",price:4800,stock:12,rating:4.6,reviews:18,image:img("photo-1507473885765-e6ed057f782c"),sku:"NM-HOM-005"},
 {id:"p6",slug:"daily-face-cleanser",name:"Daily Face Cleanser",category:"beauty",description:"A gentle, non-drying cleanser with oat extract and a fresh finish.",price:1850,stock:40,rating:4.9,reviews:67,image:img("photo-1556228720-195a672e8a03"),sku:"NM-BEA-006"},
 {id:"p7",slug:"leather-card-wallet",name:"Leather Card Wallet",category:"accessories",description:"Slim vegetable-tanned leather wallet with room for the essentials.",price:2400,stock:19,rating:4.7,reviews:29,image:img("photo-1627123424574-724758594e93"),sku:"NM-ACC-007"},
 {id:"p8",slug:"portable-bluetooth-speaker",name:"Portable Bluetooth Speaker",category:"electronics",description:"Room-filling sound in a pocket-sized, splash-resistant form.",price:5200,compareAtPrice:5900,stock:10,rating:4.8,reviews:44,image:img("photo-1608043152269-423dbba4e7e1"),sku:"NM-ELE-008"}
];
export function getProduct(slug:string){return products.find(p=>p.slug===slug)}
export const money=(value:number)=>`${settings.currency} ${value.toLocaleString("en-PK")}`;
