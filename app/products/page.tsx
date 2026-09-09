"use client";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "../../components/site-header";
import { ProductCard } from "../../components/product-card";
import { fetchProducts } from "../../lib/client-catalog";
import { categories } from "../../lib/data";
import { Product } from "../../lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]); const [query, setQuery] = useState(""); const [category, setCategory] = useState("all"); const [sort, setSort] = useState("featured"); const [error, setError] = useState("");
  useEffect(() => { const value = new URLSearchParams(window.location.search).get("category"); if (value) setCategory(value); fetchProducts().then(setProducts).catch(() => setError("We could not load the catalog right now.")); }, []);
  const list = useMemo(() => { const result = products.filter((p) => (category === "all" || p.category === category) && `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())); if (sort === "low") result.sort((a, b) => a.price - b.price); if (sort === "high") result.sort((a, b) => b.price - a.price); return result; }, [products, query, category, sort]);
  return <><SiteHeader /><main className="container"><div className="page-head"><div className="eyebrow">The collection</div><h1>Find something good.</h1><p className="muted" style={{ marginTop: 12 }}>Thoughtful essentials, ready to make their way to you.</p></div><div className="toolbar"><input className="search" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} /><div style={{ display: "flex", gap: 10 }}><select className="filter" value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All categories</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select><select className="filter" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div>{error ? <div className="panel" style={{ textAlign: "center", padding: 70 }}><h2>Catalog unavailable</h2><p className="muted">{error}</p></div> : list.length ? <div className="products-grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <div className="panel" style={{ textAlign: "center", padding: 70 }}><h2>Loading products...</h2></div>}</main></>;
}
