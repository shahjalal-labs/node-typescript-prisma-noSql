import { Product } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createProduct = async (data: Product) => {
  await prisma.product.create({ data });
  return;
};

const getAllProducts = async () => {
  const results = await prisma.product.findMany({
    include: {
      Booking: {
        select: {
          id: true,
          productId: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return results;
};

const getProductById = async (id: string) => {
  const result = await prisma.product.findUnique({ where: { id } });
  return result;
};

const getProductByUserIdFromDB = async (id: string) => {
  console.log(id, "product.service.ts", 20);
  const result = await prisma.product.findMany({ where: { sellerId: id } });
  return result;
};

const updateProduct = async (id: string, data: any) => {
  await prisma.product.update({ where: { id }, data });
  return;
};

const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  return;
};

export const productServices = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByUserIdFromDB,
  updateProduct,
  deleteProduct,
};
