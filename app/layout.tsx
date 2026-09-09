import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../components/cart-provider";

export const metadata: Metadata = { title: { default: "SJ H.F.C | Fresh food, easy ordering", template: "%s | SJ H.F.C" }, description: "Fresh fast food, bakery and sweets from SJ H.F.C.", metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html>; }
