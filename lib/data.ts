import { Category, Product } from "./types";
export const settings = { businessName:"SJ H.F.C", tagline:"Hot, fresh, made for your table.", currency:"Rs.", deliveryFee:250, whatsapp:process.env.WHATSAPP_BUSINESS_NUMBER || "0302-6924100", contactNumbers:["0302-6924100","0322-6993500","0314-5014999"] };
export const categories: Category[] = [
  {id:"burger",name:"برگر",nameUrdu:"برگر",nameEnglish:"Burgers",slug:"burger",description:"Stacked, saucy and made fresh."},
  {id:"milkshake",name:"ملک شیک",nameUrdu:"ملک شیک",nameEnglish:"Milkshakes",slug:"milkshake",description:"Cold, creamy and comforting."},
  {id:"ice-cream",name:"آئس کریم",nameUrdu:"آئس کریم",nameEnglish:"Ice Cream",slug:"ice-cream",description:"Scoop it, top it, love it."},
  {id:"fruit-chaat",name:"فروٹ چاٹ",nameUrdu:"فروٹ چاٹ",nameEnglish:"Fruit Chaat",slug:"fruit-chaat",description:"Fresh fruit with a creamy twist."},
  {id:"shawarma",name:"شوارما",nameUrdu:"شوارما",nameEnglish:"Shawarma",slug:"shawarma",description:"Fresh wraps, made to order."},
  {id:"pizza",name:"پیزا",nameUrdu:"پیزا",nameEnglish:"Pizza",slug:"pizza",description:"Hot, cheesy favourites."},
  {id:"sandwich",name:"سینڈوچ",nameUrdu:"سینڈوچ",nameEnglish:"Sandwich",slug:"sandwich",description:"Quick, filling and fresh."},
  {id:"fries",name:"فرائز",nameUrdu:"فرائز",nameEnglish:"Fries",slug:"fries",description:"Crispy sides for the table."}
];
const image = (id:string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
export const products: Product[] = [
  {id:"burger-zinger",slug:"zinger-burger",name:"Zinger Burger",category:"burger",description:"Crispy spicy chicken, lettuce and our signature mayo in a toasted bun.",price:520,stock:20,rating:4.9,reviews:128,image:image("photo-1568901346375-23c9450c58cd"),sku:"HFC-B01",featured:true},
  {id:"burger-beef",slug:"beef-burger",name:"Classic Beef Burger",category:"burger",description:"Juicy seasoned beef patty, caramelised onions, lettuce and house sauce.",price:590,stock:20,rating:4.8,reviews:94,image:image("photo-1550547660-d9450f859349"),sku:"HFC-B02",featured:true},
  {id:"burger-chicken",slug:"chicken-burger",name:"Grilled Chicken Burger",category:"burger",description:"Tender grilled chicken, fresh salad and creamy pepper sauce.",price:480,stock:20,rating:4.8,reviews:76,image:image("photo-1572802419224-296b0aeee0d9"),sku:"HFC-B03"},
  {id:"burger-cheese",slug:"cheese-burger",name:"Cheese Burger",category:"burger",description:"Crispy chicken fillet layered with melted cheese and burger sauce.",price:550,stock:20,rating:4.9,reviews:102,image:image("photo-1594212699903-ec8a3eca50f5"),sku:"HFC-B04"},
  {id:"burger-double",slug:"double-patty-burger",name:"Double Patty Burger",category:"burger",description:"Two juicy beef patties, double cheese, pickles and smoky sauce.",price:780,stock:20,rating:5,reviews:61,image:image("photo-1586190848861-99aa4a171e90"),sku:"HFC-B05"},
  {id:"shake-chocolate",slug:"chocolate-milkshake",name:"Chocolate Milkshake",category:"milkshake",description:"Rich chocolate shake finished with a silky chocolate drizzle.",price:320,stock:20,rating:4.9,reviews:84,image:image("photo-1572490122747-3968b75cc699"),sku:"HFC-M01",featured:true},
  {id:"shake-vanilla",slug:"vanilla-milkshake",name:"Vanilla Milkshake",category:"milkshake",description:"Smooth vanilla creaminess, chilled and blended to order.",price:280,stock:20,rating:4.8,reviews:47,image:image("photo-1568901839119-631418a3910d"),sku:"HFC-M02"},
  {id:"shake-strawberry",slug:"strawberry-milkshake",name:"Strawberry Milkshake",category:"milkshake",description:"Fresh strawberry flavour with a cool, creamy finish.",price:320,stock:20,rating:4.9,reviews:66,image:image("photo-1553787499-6f8d43e5b6e6"),sku:"HFC-M03"},
  {id:"shake-mango",slug:"mango-milkshake",name:"Mango Milkshake",category:"milkshake",description:"Lush mango and dairy cream blended into a sunny treat.",price:340,stock:20,rating:4.9,reviews:71,image:image("photo-1546173159-315724a31696"),sku:"HFC-M04"},
  {id:"shake-oreo",slug:"oreo-milkshake",name:"Oreo Milkshake",category:"milkshake",description:"Crushed Oreo cookies, vanilla cream and chocolate indulgence.",price:380,stock:20,rating:5,reviews:113,image:image("photo-1579954115545-a95591f28bfc"),sku:"HFC-M05"},
  {id:"ice-vanilla",slug:"vanilla-ice-cream",name:"Vanilla Scoop",category:"ice-cream",description:"Classic vanilla bean scoop with a soft, creamy finish.",price:180,stock:20,rating:4.8,reviews:40,image:image("photo-1501443762994-82bd5dacee"),sku:"HFC-I01"},
  {id:"ice-chocolate",slug:"chocolate-ice-cream",name:"Chocolate Scoop",category:"ice-cream",description:"Deep cocoa ice cream for a rich, timeless scoop.",price:200,stock:20,rating:4.9,reviews:52,image:image("photo-1563805042-7684c019e1cb"),sku:"HFC-I02"},
  {id:"ice-mango",slug:"mango-ice-cream",name:"Mango Scoop",category:"ice-cream",description:"Bright mango flavour made for warm Lahore afternoons.",price:200,stock:20,rating:4.8,reviews:44,image:image("photo-1497034825429-c343d7c6a68f"),sku:"HFC-I03"},
  {id:"ice-strawberry",slug:"strawberry-ice-cream",name:"Strawberry Scoop",category:"ice-cream",description:"Fruity strawberry cream with a pretty pink finish.",price:200,stock:20,rating:4.8,reviews:39,image:image("photo-1551024506-0bccd828d307"),sku:"HFC-I04"},
  {id:"ice-butterscotch",slug:"butterscotch-ice-cream",name:"Butterscotch Scoop",category:"ice-cream",description:"Buttery caramel notes and crunchy butterscotch bites.",price:220,stock:20,rating:4.9,reviews:48,image:image("photo-1570197788417-0e82375c9371"),sku:"HFC-I05"},
  {id:"chaat-yogurt",slug:"dahi-wali-fruit-chaat",name:"Dahi Wali Fruit Chaat",category:"fruit-chaat",description:"Seasonal fruit, chilled yogurt, chaat masala and a gentle sweet kick.",price:350,stock:20,rating:4.9,reviews:33,image:image("photo-1490474418585-ba9bad8fd0ea"),sku:"HFC-F01",featured:true},
  {id:"chaat-cream",slug:"cream-wali-fruit-chaat",name:"Cream Wali Fruit Chaat",category:"fruit-chaat",description:"A colourful bowl of fresh fruit folded through lightly sweet cream.",price:390,stock:20,rating:4.9,reviews:37,image:image("photo-1512621776951-a57141f2eefd"),sku:"HFC-F02"}
];
export function getProduct(slug:string){return products.find(p=>p.slug===slug)}
export const money=(value:number)=>`${settings.currency} ${value.toLocaleString("en-PK")}`;
