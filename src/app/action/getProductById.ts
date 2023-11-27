import client from "@/helpers/client";
import { PRODUCT_PER_PAGE } from "../(home)/page";

export interface ProductsParams {
  productId?: string;
}

export default async function getProductById(params: ProductsParams) {
  try {
    const { productId } = params;

    const product = await client.product.findUnique({
      where: {
        id: Number(productId),
      },
      include: {
        user: true,
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    if (!product) return null;

    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
