"use client";import { useEffect } from "react";import { useRouter } from "next/navigation";import { AdminShell } from "../../components/admin-shell";
export default function AdminLayout({children}:{children:React.ReactNode}){const router=useRouter();useEffect(()=>{if(!sessionStorage.getItem("nova-admin"))router.replace("/admin/login")},[router]);return children}
