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
const image = (name:string) => `/Business/${name}`;
export const products: Product[] = [
  {id:"burger-zinger",slug:"zinger-burger",name:"Zinger Burger",category:"burger",description:"Crispy spicy chicken, lettuce and signature mayo in a toasted bun.",price:520,stock:20,rating:4.9,reviews:128,image:image("product-zinger-burger.svg"),sku:"HFC-B01",featured:true},
  {id:"burger-beef",slug:"beef-burger",name:"Classic Beef Burger",category:"burger",description:"Juicy seasoned beef patty, onions, lettuce and house sauce.",price:590,stock:20,rating:4.8,reviews:94,image:image("menu-burger.jpg"),sku:"HFC-B02",featured:true},
  {id:"burger-chicken",slug:"chicken-burger",name:"Chicken Burger",category:"burger",description:"Tender chicken fillet, fresh salad and creamy pepper sauce.",price:480,stock:20,rating:4.8,reviews:76,image:image("product-chicken-burger.svg"),sku:"HFC-B03"},
  {id:"burger-cheese",slug:"cheese-burger",name:"Cheese Burger",category:"burger",description:"Crispy chicken fillet layered with melted cheese and burger sauce.",price:550,stock:20,rating:4.9,reviews:102,image:image("product-cheese-burger.svg"),sku:"HFC-B04"},
  {id:"burger-double",slug:"double-patty-burger",name:"Double Patty Burger",category:"burger",description:"Two beef patties, double cheese, pickles and smoky sauce.",price:780,stock:20,rating:5,reviews:61,image:image("product-double-burger.svg"),sku:"HFC-B05"},
  {id:"shake-chocolate",slug:"chocolate-milkshake",name:"Chocolate Milkshake",category:"milkshake",description:"Rich chocolate shake with chocolate drizzle.",price:320,stock:20,rating:4.9,reviews:84,image:image("menu-milkshake.jpg"),sku:"HFC-M01",featured:true},
  {id:"shake-vanilla",slug:"vanilla-milkshake",name:"Vanilla Milkshake",category:"milkshake",description:"Smooth vanilla creaminess, chilled and blended to order.",price:280,stock:20,rating:4.8,reviews:47,image:image("product-vanilla-shake.svg"),sku:"HFC-M02"},
  {id:"shake-strawberry",slug:"strawberry-milkshake",name:"Strawberry Milkshake",category:"milkshake",description:"Fresh strawberry flavour with a cool creamy finish.",price:320,stock:20,rating:4.9,reviews:66,image:image("product-strawberry-shake.svg"),sku:"HFC-M03"},
  {id:"shake-mango",slug:"mango-milkshake",name:"Mango Milkshake",category:"milkshake",description:"Lush mango and dairy cream blended into a sunny treat.",price:340,stock:20,rating:4.9,reviews:71,image:image("product-mango-shake.svg"),sku:"HFC-M04"},
  {id:"shake-oreo",slug:"oreo-milkshake",name:"Oreo Milkshake",category:"milkshake",description:"Crushed Oreo, vanilla cream and chocolate indulgence.",price:380,stock:20,rating:5,reviews:113,image:image("menu-milkshake.jpg"),sku:"HFC-M05"},
  {id:"ice-vanilla",slug:"vanilla-ice-cream",name:"Vanilla Scoop",category:"ice-cream",description:"Classic vanilla scoop with a soft creamy finish.",price:180,stock:20,rating:4.8,reviews:40,image:image("product-ice-vanilla.svg"),sku:"HFC-I01"},
  {id:"ice-chocolate",slug:"chocolate-ice-cream",name:"Chocolate Scoop",category:"ice-cream",description:"Deep cocoa ice cream for a rich timeless scoop.",price:200,stock:20,rating:4.9,reviews:52,image:image("product-ice-chocolate.svg"),sku:"HFC-I02"},
  {id:"ice-mango",slug:"mango-ice-cream",name:"Mango Scoop",category:"ice-cream",description:"Bright mango flavour made for warm Lahore afternoons.",price:200,stock:20,rating:4.8,reviews:44,image:image("product-ice-mango.svg"),sku:"HFC-I03"},
  {id:"ice-strawberry",slug:"strawberry-ice-cream",name:"Strawberry Scoop",category:"ice-cream",description:"Fruity strawberry cream with a pretty pink finish.",price:200,stock:20,rating:4.8,reviews:39,image:image("product-ice-strawberry.svg"),sku:"HFC-I04"},
  {id:"ice-butterscotch",slug:"butterscotch-ice-cream",name:"Butterscotch Scoop",category:"ice-cream",description:"Buttery caramel notes and crunchy butterscotch bites.",price:220,stock:20,rating:4.9,reviews:48,image:image("product-ice-butterscotch.svg"),sku:"HFC-I05"},
  {id:"chaat-yogurt",slug:"dahi-wali-fruit-chaat",name:"Dahi Wali Fruit Chaat",category:"fruit-chaat",description:"Seasonal fruit, chilled yogurt, chaat masala and a sweet kick.",price:350,stock:20,rating:4.9,reviews:33,image:image("product-dahi-chaat.svg"),sku:"HFC-F01",featured:true},
  {id:"chaat-cream",slug:"cream-wali-fruit-chaat",name:"Cream Wali Fruit Chaat",category:"fruit-chaat",description:"Fresh fruit folded through lightly sweet cream.",price:390,stock:20,rating:4.9,reviews:37,image:image("product-cream-chaat.svg"),sku:"HFC-F02"},
  {id:"shawarma-chicken",slug:"chicken-shawarma",name:"Chicken Shawarma",category:"shawarma",description:"Tandoori chicken, garlic sauce, salad and pickles in a warm pita.",price:350,stock:20,rating:4.8,reviews:64,image:image("menu-shawarma.jpg"),sku:"HFC-S01",featured:true},
  {id:"shawarma-cheese",slug:"cheese-shawarma",name:"Cheese Shawarma",category:"shawarma",description:"Spiced chicken shawarma with melted cheese and garlic sauce.",price:420,stock:20,rating:4.9,reviews:51,image:image("product-zinger-shawarma.svg"),sku:"HFC-S02"},
  {id:"shawarma-platter",slug:"shawarma-platter",name:"Shawarma Platter",category:"shawarma",description:"Loaded shawarma, fries, salad and house garlic dip.",price:650,stock:20,rating:4.9,reviews:38,image:image("menu-shawarma.jpg"),sku:"HFC-S03"},
  {id:"shawarma-spicy",slug:"spicy-shawarma",name:"Spicy Shawarma Roll",category:"shawarma",description:"Chilli chicken, crunchy salad and hot sauce in a toasted roll.",price:380,stock:20,rating:4.8,reviews:42,image:image("product-zinger-shawarma.svg"),sku:"HFC-S04"},
  {id:"pizza-tikka",slug:"chicken-tikka-pizza",name:"Chicken Tikka Pizza",category:"pizza",description:"Cheesy pizza topped with tikka chicken, onions and capsicum.",price:950,stock:20,rating:4.8,reviews:31,image:image("product-pizza.svg"),sku:"HFC-P01"},
  {id:"pizza-fajita",slug:"chicken-fajita-pizza",name:"Chicken Fajita Pizza",category:"pizza",description:"Fajita chicken, peppers, onions and mozzarella on a hot crust.",price:1050,stock:20,rating:4.8,reviews:29,image:image("product-pizza.svg"),sku:"HFC-P02"},
  {id:"pizza-cheese",slug:"cheese-lover-pizza",name:"Cheese Lover Pizza",category:"pizza",description:"Extra mozzarella, cheddar and our tangy pizza sauce.",price:850,stock:20,rating:4.7,reviews:25,image:image("product-pizza.svg"),sku:"HFC-P03"},
  {id:"sandwich-club",slug:"chicken-club-sandwich",name:"Chicken Club Sandwich",category:"sandwich",description:"Grilled chicken, egg, cheese and salad in toasted bread.",price:550,stock:20,rating:4.8,reviews:36,image:image("sandwich"),sku:"HFC-SW01"},
  {id:"sandwich-grilled",slug:"grilled-chicken-sandwich",name:"Grilled Chicken Sandwich",category:"sandwich",description:"Juicy grilled chicken, cheese and pepper sauce.",price:480,stock:20,rating:4.7,reviews:28,image:image("sandwich"),sku:"HFC-SW02"},
  {id:"sandwich-cheese",slug:"cheese-sandwich",name:"Loaded Cheese Sandwich",category:"sandwich",description:"Toasted bread packed with cheese, veggies and house sauce.",price:420,stock:20,rating:4.7,reviews:22,image:image("sandwich"),sku:"HFC-SW03"},
  {id:"fries-plain",slug:"masala-fries",name:"Masala Fries",category:"fries",description:"Crispy fries tossed in our signature spicy masala.",price:250,stock:20,rating:4.8,reviews:48,image:image("fries"),sku:"HFC-FR01"},
  {id:"fries-cheese",slug:"cheese-fries",name:"Cheese Fries",category:"fries",description:"Crispy fries covered with cheese sauce and jalapenos.",price:350,stock:20,rating:4.9,reviews:44,image:image("fries"),sku:"HFC-FR02"},
  {id:"fries-loaded",slug:"loaded-fries",name:"Loaded Chicken Fries",category:"fries",description:"Fries loaded with chicken, cheese sauce and garlic mayo.",price:480,stock:20,rating:4.9,reviews:39,image:image("fries"),sku:"HFC-FR03"}
];
export function getProduct(slug:string){return products.find(p=>p.slug===slug)}
export const money=(value:number)=>`${settings.currency} ${value.toLocaleString("en-PK")}`;
