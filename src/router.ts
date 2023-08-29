import { Router } from "express";
import { CreateCategoryController, DeleteCategoryController, GetAllCategoryController, UpdateCategoryController } from './controllers/categoryController';
import { CreateProdutoController, DeleteProdutoController, GetAllProdutoController, UpdateProdutoController } from "./controllers/ProdutoController";
import { IController } from "./controllers/interface/IController";

const routes = Router();
const createCategory: IController = new CreateCategoryController();
const getAllCategory: IController = new GetAllCategoryController();
const deleteCategory: IController = new DeleteCategoryController();
const updateCategory: IController = new UpdateCategoryController();

routes.post('/categoria', createCategory.handle);
routes.get('/categoria', getAllCategory.handle);
routes.delete('/categoria/:id', deleteCategory.handle);
routes.put('/categoria/:id', updateCategory.handle);

const createProduto: IController = new CreateProdutoController();
const getAllProduto: IController = new GetAllProdutoController();
const updateProduto: IController = new UpdateProdutoController();
const deleteProduto: IController = new DeleteProdutoController();
routes.post('/produto', createProduto.handle);
routes.get('/produto', getAllProduto.handle);
routes.post('/produto/:id', updateProduto.handle);
routes.delete('/produto/:id', deleteProduto.handle);


export { routes }
