import { productServices } from "./product.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const createProduct = catchAsync(async (req, res) => {
  await productServices.createProduct(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "The product has been created successfully",
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProducts();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All products has been retrived successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await productServices.getProductById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "product has been retrived successfully",
    data: result,
  });
});

const getProductByUserId = catchAsync(async (req, res) => {
  const result = await productServices.getProductByUserIdFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "product has been retrived successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  await productServices.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "product has been updated successfully",
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  await productServices.deleteProduct(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "product has been deleted successfully",
  });
});

export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByUserId,
  updateProduct,
  deleteProduct,
};

