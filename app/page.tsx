"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock3, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "../components/site-header";
import { fetchProducts } from "../lib/client-catalog";
import { categories as fallbackCategories, settings } from "../lib/data";
import { Product } from "../lib/types";
import { ProductCard } from "../components/product-card";

type HomeCategory = { id: string; name: string; nameEnglish?: string; slug: string; description: string };

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<HomeCategory[]>(fallbackCategories);

  useEffect(() => {
    fetchProducts("featured=true").then(setProducts).catch(() => undefined);
    fetch("/api/categories").then((response) => response.json()).then((value: unknown) => {
      if (Array.isArray(value) && value.length) setCategories(value as HomeCategory[]);
    }).catch(() => undefined);
  }, []);

  return <>
    <SiteHeader />
    <main>
      <section className="hero container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="dot" /> Made fresh in Lahore</div>
            <h1>Big flavour.<br /><em>Zero fuss.</em></h1>
            <p>From first bite to last sip, SJ H.F.C makes your favourites fresh and delivers them straight to your table.</p>
            <div className="actions"><Link className="btn btn-primary" href="/products">Explore the menu <ArrowRight size={16} /></Link><a className="btn" href="#how-it-works">How ordering works</a></div>
            <div className="trust-row"><span><Check size={15} /> Fresh to order</span><span><Check size={15} /> Easy WhatsApp checkout</span></div>
          </div>
          <div className="hero-art" aria-label="SJ H.F.C order preview">
            <div className="art-glow" />
            <div className="order-art"><div className="order-art-top"><span className="brand-mark">SJ</span><span className="badge">OPEN TODAY</span></div><div className="art-kicker">YOUR NEXT FAVOURITE</div><strong>Good food,<br />made simple.</strong><div className="art-lines"><span /><span /><span /></div><div className="art-total"><span>Ready when you are</span><MessageCircle size={18} /></div></div>
            <div className="floating-note"><Clock3 size={17} /><span><strong>Quick ordering</strong><small>Ready in a few taps</small></span></div>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-head"><div><div className="eyebrow">What are you feeling?</div><h2>Pick your mood.</h2></div><Link href="/products" className="btn">View full menu <ArrowRight size={15} /></Link></div>
        <div className="categories">{categories.map((category, index) => <Link className="category" href={`/products?category=${category.slug}`} key={category.id}><span className="category-number">{String(index + 1).padStart(2, "0")}</span><strong>{category.name}<small>{category.nameEnglish}</small></strong><span>{category.description}</span><ArrowRight size={16} /></Link>)}</div>
      </section>
      {products.length > 0 && <section className="section container"><div className="section-head"><div><div className="eyebrow">Customer favourites</div><h2>Popular right now.</h2></div><Link href="/products" className="btn">See all items</Link></div><div className="products-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>}
      <section className="section container"><div className="promo"><div><div className="eyebrow promo-eyebrow">Your order, your way</div><h2>Choose it here.<br />Confirm it on WhatsApp.</h2><p>Build your order first, then send the full details to our team in one tap.</p></div><Link className="btn btn-soft" href="/products">Start an order <ArrowRight size={15} /></Link></div></section>
      <section id="how-it-works" className="section container"><div className="section-head"><div><div className="eyebrow">Why order with us?</div><h2>Simple from start to finish.</h2></div></div><div className="benefits"><div className="benefit"><div className="benefit-icon"><Truck size={19} /></div><h3>Made for your table</h3><p>Fresh food prepared when your order comes in, with clear prices and portions.</p></div><div className="benefit"><div className="benefit-icon"><MessageCircle size={19} /></div><h3>WhatsApp confirmation</h3><p>Your complete order arrives in one familiar chat, ready for our team to confirm.</p></div><div className="benefit"><div className="benefit-icon"><ShieldCheck size={19} /></div><h3>Clear and dependable</h3><p>No surprise checkout. See your estimated total before you send the order.</p></div></div></section>
      <section className="contact-strip container"><div><span className="eyebrow">Need a hand?</span><h2>Talk to the SJ H.F.C team.</h2></div><a className="btn btn-dark" href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}><MessageCircle size={17} /> Chat on WhatsApp</a></section>
    </main>
    <footer className="footer"><div className="container footer-grid"><div><Link href="/" className="brand"><span className="brand-mark">SJ</span><span>SJ H.F.C</span></Link><p>Fresh food, easy ordering.<br />Made for your table.</p></div><div><h4>Explore</h4><div className="footer-links"><Link href="/products">Full menu</Link><Link href="/cart">Your cart</Link><Link href="#how-it-works">How it works</Link></div></div><div><h4>Call or message</h4><div className="footer-links">{settings.contactNumbers.map((number) => <a key={number} href={`tel:${number.replace(/\D/g, "")}`}>{number}</a>)}</div></div></div></footer>
  </>;
}
