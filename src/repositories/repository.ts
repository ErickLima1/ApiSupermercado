import { EntityRepository, Repository } from "typeorm";
import { Category } from '../entities/category';
import { Produto } from "../entities/produto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    //Busca uma Unica category-Não todas. 
    async findByName(name: string): Promise<Category | undefined> {

        return this.findOne({ where: { name } });
    };
};

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {
    //Pega o ID de category e procura que tem salvo no id category relacionado a produto; 
    async findByCategory(categoryId: string): Promise<Produto[]> {
        return this.find({ where: { category: categoryId } });
    }
};