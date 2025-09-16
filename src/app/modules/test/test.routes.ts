import express from 'express';
import { testControllers } from "./test.controller";

const router = express.Router();

router.post('/', testControllers.createTest);
router.get('/', testControllers.getAllTests);
router.get('/:id', testControllers.getTestById);
router.patch('/:id', testControllers.updateTest);
router.delete('/:id', testControllers.deleteTest);

export const testRoutes = router;
  