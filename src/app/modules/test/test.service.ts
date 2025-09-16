import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createTest = async (data: any) => {
  await prisma.test.create({ data });
  return
};

const getAllTests = async () => {
  const results = await prisma.test.findMany();
  return results
};

const getTestById = async (id: string) => {
  const result = await prisma.test.findUnique({ where: { id } });
  return result
};

const updateTest = async (id: string, data: any) => {
  await prisma.test.update({ where: { id }, data });
  return
};

const deleteTest = async (id: string) => {
  await prisma.test.delete({ where: { id } });
  return
};

export const testServices = {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
}
  