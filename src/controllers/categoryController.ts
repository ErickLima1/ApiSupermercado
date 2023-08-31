import { Request, Response } from "express";
import { IController } from "./interface/IController";
import { CreateCateogryService, DeleteCategoryService, GetAllCategoryService, UpdateCategoryService } from "../services/createCategoryService";

export class CreateCategoryController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const { name, description } = req.body;
            const service = new CreateCateogryService();

            const result = await service.execute({ name, description });

            if (result instanceof Error) {
                return res.status(400).send(result.message);
            };

            return res.status(200).json({ message: 'Categoria Criada Com Sucesso.', category: result });

        } catch (error) {
            return res.status(500).send('Ocorreu um Erro no Servidor!');
        };
    };

};

export class GetAllCategoryController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const service = new GetAllCategoryService();
            const categories = await service.execute();

            return res.json(categories);

        } catch (error) {
            return res.status(500).send('Ocorreu um Erro no Servidro!');
        };
    };
};

export class UpdateCategoryController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const service = new UpdateCategoryService();
            const result = await service.excute({ id, name, description });

            if(result instanceof Error) {
                return res.status(400).json(result.message);
            };

            return res.status(200).json({ message: 'Categoria Atualizada com Sucesso.', category: result});

        } catch (error) {
            return res.status(500).send("Ocorreu um Erro no Servidor");
        };
    };
};

export class DeleteCategoryController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const service = new DeleteCategoryService();

            const result = await service.excute(id);

            if(result instanceof Error) {
                return res.status(400).json(result.message);
            };

            return res.status(200).json({ message: 'Categoria Excluida com Sucesso.'});

        } catch (error) {
            return res.status(500).send('Ocorreu um Erro no Servidro!');
            
        };
    };
};

