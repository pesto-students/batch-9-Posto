import express from 'express';
import CategoryController from '../controllers/categories';

const router = express.Router();

router.get('/', CategoryController.fetchCategories);

export default router;
