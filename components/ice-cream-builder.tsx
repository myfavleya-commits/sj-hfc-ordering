"use client";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
import { money } from "../lib/data";
import { Product } from "../lib/types";

const toppings = [
  { id: "sprinkles", name: "Sprinkles", price: 40, image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=300&q=80" },
  { id: "syrup", name: "Chocolate Syrup", price: 50, image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=300&q=80" },
  { id: "nuts", name: "Chopped Nuts", price: 60, image: "https://images.unsplash.com/photo-1536504999561-5cd1c4f1c08b?auto=format&fit=crop&w=300&q=80" },
  { id: "wafer", name: "Wafer / Pipe", price: 50, image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=300&q=80" }
];

export function IceCreamBuilder({ products }: { products: Product[] }) {
  const { add } = useCart();
  const [flavor, setFlavor] = useState(products[0]?.id || "");
  const [selected, setSelected] = useState<string[]>([]);
  const current = products.find((item) => item.id === flavor) || products[0];
  const extra = toppings.filter((item) => selected.includes(item.id)).reduce((sum, item) => sum + item.price, 0);
  if (!current) return null;
  function addSundae() {
    const names = toppings.filter((item) => selected.includes(item.id)).map((item) => item.name).join(", ");
    add(current, { id: `sundae-${current.id}-${selected.join("-") || "plain"}`, name: names ? `Toppings: ${names}` : "Plain", price: current.price + extra, stock: current.stock });
  }
  return <section className="ice-builder" aria-labelledby="ice-builder-title">
    <div className="builder-intro"><div><div className="eyebrow">Build your bowl</div><h2 id="ice-builder-title">Make it extra special.</h2><p className="muted">Choose a flavour, then add your favourite toppings.</p></div><div className="builder-total"><span>Your bowl</span><strong>{money(current.price + extra)}</strong></div></div>
    <div className="builder-flavours">{products.map((item) => <button type="button" className={`flavour-choice ${item.id === current.id ? "selected" : ""}`} key={item.id} onClick={() => setFlavor(item.id)}><img src={item.image} alt="" /><span>{item.name.replace(" Scoop", "")}</span><small>{money(item.price)}</small>{item.id === current.id && <Check size={15} />}</button>)}</div>
    <div className="topping-list"><div className="topping-heading"><strong>Pick your toppings</strong><span className="muted">Optional add-ons</span></div><div className="topping-grid">{toppings.map((item) => <label className={`topping ${selected.includes(item.id) ? "selected" : ""}`} key={item.id}><input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected((values) => values.includes(item.id) ? values.filter((value) => value !== item.id) : [...values, item.id])} /><img src={item.image} alt="" /><span><strong>{item.name}</strong><small>+ {money(item.price)}</small></span><Check size={15} /></label>)}</div></div>
    <button type="button" className="btn btn-primary builder-add" onClick={addSundae}><ShoppingBag size={16} /> Add bowl · {money(current.price + extra)}</button>
  </section>;
}
