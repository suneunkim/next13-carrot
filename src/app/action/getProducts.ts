import client from "@/helpers/client";
import { PRODUCT_PER_PAGE } from "../(home)/page";

export interface ProductsParams {
  latitude?: number;
  logitude?: number;
  category?: string;
  page?: number;
  skip?: number;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, logitude, category, skip } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.02,
        lte: Number(latitude) + 0.02,
      };
    }
    if (logitude) {
      query.logitude = {
        gte: Number(logitude) - 0.02,
        lte: Number(logitude) + 0.02,
      };
    }

    const products = await client.product.findMany({
      where: query,
      orderBy: {
        createAt: "desc",
      },
      skip: skip ? Number(skip) : 0,
      take: PRODUCT_PER_PAGE,
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    const totalItems = await client.product.count({ where: query });

    return {
      data: products,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
