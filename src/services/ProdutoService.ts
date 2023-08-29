import { getCustomRepository, getRepository } from "typeorm";
import { CategoryRepository, ProdutoRepository } from "../repositories/repository";
import { ValidationProdutoSchema } from "./validations/validation";
import { ZodIssue } from "zod";
import { Produto } from "../entities/produto";


type ProdutoRequest = {
    name: string,
    quantidade: number,
    category_id: string;

};

export class CreateProdutoService {
    async execute({ name, category_id, quantidade }: ProdutoRequest): Promise<Error | ProdutoRequest> {
        try {
            const produtoRepo = getCustomRepository(ProdutoRepository);
            const repoCategory = getCustomRepository(CategoryRepository);
            const existingProduto = await produtoRepo.findOne({ name, category_id });

            const vlaidationErrorProduto = ValidationProdutoSchema.safeParse({ name, quantidade });
            if (vlaidationErrorProduto.success === false) {
                const errorMessages = vlaidationErrorProduto.error.issues.map((issue: ZodIssue) => issue.message);
                throw new Error(`Erros de validação: ${errorMessages.join(", ")}`);
            };

            if (!(await repoCategory.findOne(category_id))) {
                return new Error('Categoria Não Existe');

            } else if (existingProduto) {
                throw new Error('Produto Duplicado. Um Produto com o mesmo nome e categoria já existe.')
            };

            const produto = produtoRepo.create({ name, category_id, quantidade });

            await produtoRepo.save(produto);
            return produto;

        } catch (error) {
            return error;
        };
    };
};

export class GetAllProdutoService {
    async execute() {
        try {
            const repoProduto = getRepository(Produto);
            const produto = await repoProduto.find({
                relations: ["category"],
            });

            return produto;

        } catch (error) {
            return error;
        };
    };
};


export class UpdateProdutoService {
    async execute({ id, name, quantidade }) {
        try {
            const repoUpdate = getRepository(Produto);
            const produto = await repoUpdate.findOne(id);
            const existingProduto = await repoUpdate.findOne({ name, id });

            const vlaidationErrorProduto = ValidationProdutoSchema.safeParse({ name, quantidade });
            if (vlaidationErrorProduto.success === false) {
                const errorMessages = vlaidationErrorProduto.error.issues.map((issue: ZodIssue) => issue.message);
                throw new Error(`Erros de validação: ${errorMessages.join(", ")}`);
            };

            if (!(await repoUpdate.findOne(id))) {
                return new Error('Produto Não Existe.');

            } else if (existingProduto) {
                throw new Error('Produto Duplicado. Um Produto com o mesmo nome e categoria já existe.')
            };

            produto.name = name ? name: produto.name;
            produto.quantidade = quantidade ? quantidade : produto.quantidade;

            await repoUpdate.save(produto);

            return produto;

        } catch(error) {
            return error
            
        };
    };
};

export class DeleteProdutoService {
    async execute(id: string) {
        try {
            const repoDelete = getRepository(Produto);

            if (!(await repoDelete.findOne(id))) {
                return new Error('Produto Não Existe!');
            };

            await repoDelete.delete(id);

        } catch (error) {
            return error;
        };
    };
};