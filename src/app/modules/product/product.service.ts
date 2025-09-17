import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createProduct = async (data: Product) => {
  await prisma.product.create({ data });
  return;
};

const getAllProducts = async () => {
  const results = await prisma.product.findMany();
  return results;
};

const getProductById = async (id: string) => {
  const result = await prisma.product.findUnique({ where: { id } });
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
  updateProduct,
  deleteProduct,
};

