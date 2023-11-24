import getCurrentUser from "@/app/\baction/getCurrentUser";
import { NextResponse } from "next/server";
import client from "@/helpers/client";

interface Params {
  productId: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (request.method === "POST") {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        product: {
          connect: {
            id: +productId,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.error();
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (request.method === "DELETE") {
    const exists = await client.fav.findFirst({
      where: {
        userId: currentUser.id,
        productId: +productId,
      },
      select: {
        id: true,
      },
    });

    if (exists) {
      await client.fav.delete({
        where: {
          id: exists.id,
        },
      });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.error();
}
