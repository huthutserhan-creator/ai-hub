// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Magic link sonrasında buraya gelir, ana sayfaya atıyoruz
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
}
