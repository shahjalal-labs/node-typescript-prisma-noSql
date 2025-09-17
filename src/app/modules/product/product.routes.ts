import express from 'express';
import { productControllers } from "./product.controller";

const router = express.Router();

router.post('/', productControllers.createProduct);
router.get('/', productControllers.getAllProducts);
router.get('/:id', productControllers.getProductById);
router.patch('/:id', productControllers.updateProduct);
router.delete('/:id', productControllers.deleteProduct);

export const productRoutes = router;
  