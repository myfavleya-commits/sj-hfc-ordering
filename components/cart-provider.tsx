"use client";
import { createContext,useContext,useEffect,useState } from "react";
import { CartItem, Product } from "../lib/types";
type Cart={items:CartItem[]; add:(p:Product)=>void; remove:(id:string)=>void; update:(id:string,q:number)=>void; clear:()=>void};
const Context=createContext<Cart|null>(null);
export function CartProvider({children}:{children:React.ReactNode}){const [items,setItems]=useState<CartItem[]>([]);useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem("nova-cart")||"[]"))}catch{}},[]);useEffect(()=>{localStorage.setItem("nova-cart",JSON.stringify(items))},[items]);const add=(p:Product)=>setItems(x=>{const found=x.find(i=>i.id===p.id);return found?x.map(i=>i.id===p.id?{...i,quantity:Math.min(i.quantity+1,p.stock)}:i):[...x,{...p,quantity:1}]});const remove=(id:string)=>setItems(x=>x.filter(i=>i.id!==id));const update=(id:string,q:number)=>setItems(x=>q<1?x.filter(i=>i.id!==id):x.map(i=>i.id===id?{...i,quantity:Math.min(q,i.stock)}:i));return <Context.Provider value={{items,add,remove,update,clear:()=>setItems([])}}>{children}</Context.Provider>}
export function useCart(){const c=useContext(Context);if(!c)throw Error("useCart must be inside CartProvider");return c}
