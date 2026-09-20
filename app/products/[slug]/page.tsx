"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { ProductCard } from "../../../components/product-card";
import { SiteHeader } from "../../../components/site-header";
import { useCart } from "../../../components/cart-provider";
import { fetchProducts, normalizeProduct } from "../../../lib/client-catalog";
import { getProduct, money } from "../../../lib/data";
import { Product, ProductVariant } from "../../../lib/types";

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product>();
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<ProductVariant>();
  const { add } = useCart();

  useEffect(() => {
    let active = true;
    const local = getProduct(slug);
    fetch(`/api/products/${slug}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!active) return;
        const item = normalizeProduct(data);
        setProduct(item);
        setVariant(item.variants?.[0]);
        return fetchProducts(`category=${item.category}`);
      })
      .then((items) => { if (active && items) setRelated(items.filter((item) => item.slug !== slug)); })
      .catch(() => {
        if (!active || !local) return;
        setProduct(local);
        fetchProducts(`category=${local.category}`).then((items) => {
          if (active) setRelated(items.filter((item) => item.slug !== slug));
        });
      });
    if (local) setProduct(local);
    return () => { active = false; };
  }, [slug]);

  if (!product) return <><SiteHeader /><main className="container"><div className="success"><h1>Loading menu item...</h1><Link className="btn btn-primary" href="/products">Back to menu</Link></div></main></>;
  const availableStock = variant?.stock ?? product.stock;
  const price = variant?.price ?? product.price;
  const addItem = () => { for (let index = 0; index < quantity; index += 1) add(product, variant); };
  return <><SiteHeader /><main className="container">
    <Link href="/products" className="btn" style={{ marginTop: 25 }}><ArrowLeft size={15} /> Back to menu</Link>
    <div className="detail"><img className="detail-image" src={product.image} alt={product.name} /><div>
      <div className="eyebrow">{product.category} · {availableStock > 0 ? "In stock" : "Out of stock"}</div><h1>{product.name}</h1><div className="rating">SJ H.F.C menu item</div>
      <div style={{ marginTop: 25 }}><span className="price" style={{ fontSize: 28 }}>{money(price)}</span></div><p className="detail-description">{product.description}</p>
      {product.variants?.length ? <div style={{ marginBottom: 18 }}><strong>Choose an option</strong><div className="actions" style={{ marginTop: 10 }}>{product.variants.map((item) => <button key={item.id} className={`btn ${variant?.id === item.id ? "btn-primary" : ""}`} onClick={() => setVariant(item)}>{item.name}</button>)}</div></div> : null}
      <div className="quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(availableStock, value + 1))}><Plus size={15} /></button></div>
      <button className="btn btn-primary" style={{ marginTop: 18 }} disabled={!availableStock} onClick={addItem}><ShoppingBag size={16} /> Add to cart · {money(price * quantity)}</button>
    </div></div>
    {related.length > 0 && <section className="section"><div className="section-head"><h2>More from this category</h2></div><div className="products-grid">{related.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
  </main></>;
}
