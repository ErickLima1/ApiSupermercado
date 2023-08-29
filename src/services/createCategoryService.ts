import { getCustomRepository, getRepository } from "typeorm";
import { Category } from "../entities/category";
import { CategoryRepository } from "../repositories/repository";
import { validationCategorySchema } from "./validations/validation";
import { ZodIssue } from "zod";

type CategoryRequest = {
    name: string,
    description: string;
};

type CategoryUpdateRequest = {
    id: string,
    name: string,
    description: string;
};


export class CreateCateogryService {
    async execute({ name, description }: CategoryRequest): Promise<Category | Error> {
        try {
            const repoCategory = getCustomRepository(CategoryRepository);
            const existingCategory = await repoCategory.findByName(name);

            const validationField = validationCategorySchema.safeParse({ name, description });
            // [X] Validando o campo usando ZOD.
            if (validationField.success === false) {
                const errorMessages = validationField.error.issues.map((issue: ZodIssue) => issue.message);
                throw new Error(`Erros de validação: ${errorMessages.join(", ")}`);
            };

            if (existingCategory) {
                throw new Error('Categoria Já Existe');
            };

            const category = repoCategory.create({
                name,
                description,
            });

            await repoCategory.save(category);

            return category;

        } catch (error) {
            return error;
        };
    };
};

export class GetAllCategoryService {
    async execute() {
        try {
            const repoCategory = getRepository(Category);
            const categories = await repoCategory.find();

            return categories;
        } catch (error) {

            return error;
        }
    };
};

export class UpdateCategoryService {
    async excute({ id, name, description }: CategoryUpdateRequest) {
        try {
            const repoUpdate = getRepository(Category);
            const validationField = validationCategorySchema.safeParse({ name, description });

            const repoCategoryUpdate = getCustomRepository(CategoryRepository);
            const existingCategoryUpdate = await repoCategoryUpdate.findByName(name);


            const category = await repoUpdate.findOne(id);

            if (validationField.success === false) {
                const errorMessages = validationField.error.issues.map((issue: ZodIssue) => issue.message);
                throw new Error(`Erros de validação: ${errorMessages.join(", ")}`);
            };

            if (!category) {
                return new Error('Categoria Não Existe!');

            } else if (existingCategoryUpdate) {
                return new Error('Categoria Já Existe');

            };

            category.name = name ? name : category.name;
            category.description = description ? description : category.description;

            await repoUpdate.save(category);

            return category;


        } catch (error) {
            return error;
        };
    };
};

export class DeleteCategoryService {
    async excute(id: string) {
        try {
            const repoDelete = getRepository(Category);

            if (!(await repoDelete.findOne(id))) {
                return new Error('Categoria Não Existe!');
            };

            await repoDelete.delete(id);

        } catch (error) {
            return error;
        };
    };
};