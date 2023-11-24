import client from "@/helpers/client";

export interface ProductsParams {
  latitude?: number;
  logitude?: number;
  category?: string;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, logitude, category } = params;

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
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    return {
      data: products,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
