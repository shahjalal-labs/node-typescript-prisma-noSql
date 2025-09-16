import {testServices} from './test.service';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from "../../../shared/catchAsync";

const createTest = catchAsync (async (req, res) => {
  await testServices.createTest(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "The test has been created successfully"
  });
})

const getAllTests = catchAsync(async (req, res) => {
  const result = await testServices.getAllTests();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All tests has been retrived successfully",
    data: result,
  });
})

const getTestById = catchAsync(async (req, res) => {
  const result = await testServices.getTestById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "test has been retrived successfully",
    data: result,
  });
})

const updateTest = catchAsync(async (req, res) => {
  await testServices.updateTest(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "test has been updated successfully"
  });
})

const deleteTest = catchAsync(async (req, res) => {
  await testServices.deleteTest(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "test has been deleted successfully",
  });
})

export const testControllers = {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
}
  