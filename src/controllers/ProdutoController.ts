import { Request, Response } from "express";
import { IController } from "./interface/IController";
import { CreateProdutoService, DeleteProdutoService, GetAllProdutoService, UpdateProdutoService } from "../services/ProdutoService";


export class CreateProdutoController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const { name, category_id, quantidade } = req.body;
            const service = new CreateProdutoService();

            const result = await service.execute({ name, category_id, quantidade });

            if (result instanceof Error) {
                return res.status(400).json(result.message);
            };

            return res.json(result);

        } catch (error) {
            return res.status(500).send('Ocorreu um Erro No Servidor!');
        };

    };
};

export class GetAllProdutoController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const service = new GetAllProdutoService();
            const produto = await service.execute();

            return res.json(produto);

        } catch (error) {
            return res.status(500).send('Ocorreu Um Erro No Servidor!');
        };
    };
};


export class UpdateProdutoController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, quantidade } = req.body;

            const service = new UpdateProdutoService();
            const result = await service.execute({ id, name, quantidade });

            if (result instanceof Error) {
                return res.status(400).send(result.message);
            };

            return res.status(200).send({ message: 'Categoria Atualizada Com Sucesso.', category: result });

        } catch (error) {
            return res.status(500).send('Ocorreu Um Erro No Servidor!');

        };
    };
};

export class DeleteProdutoController implements IController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const service = new DeleteProdutoService();
            const result = await service.execute(id);

            if (result instanceof Error) {
                return res.status(400).send(result.message);
            };

            return res.status(200).send({ message: 'Produto Excluido Com Sucesso.' });

        } catch (error) {
            return res.status(500).send('Ocorreu Um Erro No Servidor!');
        };
    };
};