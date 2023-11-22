import client from "@/helpers/client";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/\baction/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, description, imageSrc, price, category, latitude, longitude } =
    body;

  const product = await client.product.create({
    data: {
      title,
      description,
      imageSrc,
      price: Number(price),
      category,
      latitude,
      longitude,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({ ok: true, product });
}
