import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../components/cart-provider";

export const metadata: Metadata = { title: { default: "NOVA MART | Shop smarter", template: "%s | NOVA MART" }, description: "Everything you need. Delivered simply.", metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html>; }
